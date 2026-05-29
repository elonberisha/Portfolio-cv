import type { CollectionConfig } from 'payload'

export const UniversityRequests: CollectionConfig = {
  slug: 'university-requests',
  admin: {
    useAsTitle: 'institutionName',
    defaultColumns: ['institutionName', 'country', 'city', 'status', 'createdAt'],
    group: 'Universities',
    description: 'Pending university verification requests from students',
  },
  access: {
    // Anyone can create a request (unregistered students)
    create: () => true,
    // Only admins can read/update/delete requests
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'admin'
    },
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the person submitting',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            description: 'Contact email for notifications',
          },
        },
      ],
    },
    {
      name: 'institutionName',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the institution',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      admin: {
        description: 'Official university website (used to verify it exists)',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'University', value: 'university' },
        { label: 'College', value: 'college' },
        { label: 'Vocational School', value: 'vocational' },
        { label: 'Academy', value: 'academy' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'accreditation',
      type: 'text',
      admin: {
        description: 'Accreditation ID or link (optional)',
      },
    },
    // --- Review section (admin-only) ---
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Admin who reviewed this request',
        readOnly: true,
      },
    },
    {
      name: 'reviewNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about approval/rejection reason',
      },
    },
  ],
  hooks: {
    beforeChange: [
      // Auto-set reviewedBy when status changes from pending
      ({ data, req, originalDoc }) => {
        if (
          originalDoc?.status === 'pending' &&
          data?.status &&
          data.status !== 'pending' &&
          req.user
        ) {
          data.reviewedBy = req.user.id
        }
        return data
      },
    ],
    // afterChange hook for sending emails will be added when Resend is configured
  },
  timestamps: true,
}
