import type { CollectionConfig } from 'payload'

export const Universities: CollectionConfig = {
  slug: 'universities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'country', 'city', 'type', 'status'],
    group: 'Universities',
  },
  access: {
    // Everyone can read universities (needed for domain checking on signup)
    read: () => true,
    // Only admins can create/update/delete
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full institution name, e.g. "Universiteti i Prishtinës"',
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
        description: 'Official university website URL',
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
      name: 'emailDomains',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Accepted email domains for this university (e.g. "uni-pr.edu", "student.uni-pr.edu")',
      },
      fields: [
        {
          name: 'domain',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g. uni-pr.edu',
          },
        },
      ],
    },
    {
      name: 'accreditation',
      type: 'text',
      admin: {
        description: 'Accreditation ID, link, or note (optional)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
