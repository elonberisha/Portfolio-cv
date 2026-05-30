import type { CollectionConfig } from 'payload'

// A student's CV. Either built with our Europass builder (`source: 'builder'`,
// data lives in `data`) or uploaded as a PDF (`source: 'upload'`, file in
// `file`). Uploaded CVs are replace/delete only — the frontend disallows
// editing `data` for them.
export const CVs: CollectionConfig = {
  slug: 'cvs',
  admin: {
    useAsTitle: 'owner',
    defaultColumns: ['owner', 'source', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { owner: { equals: user.id } }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { owner: { equals: user.id } }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { owner: { equals: user.id } }
    },
  },
  fields: [
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'builder',
      options: [
        { label: 'Built (Europass)', value: 'builder' },
        { label: 'Uploaded PDF', value: 'upload' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Uploaded PDF (only when source is "upload")' },
    },
    {
      // Europass-standard structured CV data.
      name: 'data',
      type: 'group',
      fields: [
        {
          name: 'personalInfo',
          type: 'group',
          fields: [
            { name: 'firstName', type: 'text' },
            { name: 'lastName', type: 'text' },
            { name: 'headline', type: 'text' },
            { name: 'email', type: 'text' },
            { name: 'phone', type: 'text' },
            { name: 'address', type: 'text' },
            { name: 'city', type: 'text' },
            { name: 'country', type: 'text' },
            { name: 'dateOfBirth', type: 'text' },
            { name: 'nationality', type: 'text' },
            { name: 'website', type: 'text' },
            { name: 'about', type: 'textarea' },
          ],
        },
        {
          name: 'workExperience',
          type: 'array',
          fields: [
            { name: 'jobTitle', type: 'text' },
            { name: 'employer', type: 'text' },
            { name: 'city', type: 'text' },
            { name: 'country', type: 'text' },
            { name: 'startDate', type: 'text' },
            { name: 'endDate', type: 'text' },
            { name: 'current', type: 'checkbox', defaultValue: false },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'education',
          type: 'array',
          fields: [
            { name: 'qualification', type: 'text' },
            { name: 'institution', type: 'text' },
            { name: 'city', type: 'text' },
            { name: 'country', type: 'text' },
            { name: 'startDate', type: 'text' },
            { name: 'endDate', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'languageSkills',
          type: 'array',
          fields: [
            { name: 'language', type: 'text' },
            { name: 'mother', type: 'checkbox', defaultValue: false },
            {
              name: 'level',
              type: 'select',
              options: [
                { label: 'A1', value: 'a1' },
                { label: 'A2', value: 'a2' },
                { label: 'B1', value: 'b1' },
                { label: 'B2', value: 'b2' },
                { label: 'C1', value: 'c1' },
                { label: 'C2', value: 'c2' },
                { label: 'Native', value: 'native' },
              ],
            },
          ],
        },
        {
          name: 'digitalSkills',
          type: 'text',
          admin: { description: 'Comma-separated digital skills' },
        },
        {
          name: 'otherSkills',
          type: 'textarea',
          admin: { description: 'Communication, organisational, and other skills' },
        },
      ],
    },
  ],
  timestamps: true,
}
