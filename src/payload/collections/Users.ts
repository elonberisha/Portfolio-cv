import type { CollectionConfig } from 'payload'

const emailVerificationEnabled = process.env.ENABLE_EMAIL_VERIFICATION === 'true'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role', 'university'],
    group: 'People',
  },
  auth: {
    // Enable only when a real email flow is configured.
    ...(emailVerificationEnabled
      ? {
          verify: {
            generateEmailHTML: ({ token, user }) => {
              return `
                <h1>Verify your email</h1>
                <p>Hi ${(user as any).firstName || 'there'},</p>
                <p>Click the link below to verify your email address:</p>
                <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">
                  Verify Email
                </a>
              `
            },
          },
        }
      : {}),
    tokenExpiration: 7200, // 2 hours
  },
  access: {
    // Anyone can create an account (signup)
    create: () => true,
    // Only admins can read all users; students read only themselves
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // Students can update only themselves; admins can update anyone
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin'
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        // Only admins can change roles
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'university',
      type: 'relationship',
      relationTo: 'universities',
      admin: {
        position: 'sidebar',
        description: 'Assigned automatically based on email domain',
      },
    },
    {
      name: 'facultyGroup',
      type: 'select',
      options: [
        { label: 'Tech & Engineering', value: 'tech' },
        { label: 'Business & Management', value: 'business' },
        { label: 'Law & Politics', value: 'law' },
        { label: 'Medical & Healthcare', value: 'medical' },
        { label: 'Creative & Media', value: 'creative' },
        { label: 'Education & Social Sciences', value: 'education' },
        { label: 'Sports', value: 'sports' },
        { label: 'Agriculture & Environment', value: 'agriculture' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Determines which portfolio sections are shown',
      },
    },
    {
      name: 'subdomain',
      type: 'text',
      unique: true,
      admin: {
        description: 'e.g. "elon-berisha" → elon-berisha.portfolio-cv.online',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'twoFactorEnabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'twoFactorSecret',
      type: 'text',
      admin: {
        hidden: true,
      },
      access: {
        read: () => false, // Never expose the TOTP secret
      },
    },
    {
      name: 'agreedToTerms',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description: 'User agreed to Terms of Service and Privacy Policy',
      },
    },
  ],
  timestamps: true,
}
