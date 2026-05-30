import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  access: {
    // Anyone can view media (needed for public portfolios)
    read: () => true,
    // Authenticated users can upload
    create: ({ req: { user } }) => !!user,
    // Users can update their own media; admins update any
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { owner: { equals: user.id } }
    },
    // Only admins can delete media
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: [
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'application/pdf',
    ],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1200,
        height: undefined,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Alternative text for accessibility' },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      // Auto-set owner to current user
      ({ data, req }) => {
        if (req.user && !data?.owner) {
          data = data || {}
          data.owner = req.user.id
        }
        return data
      },
    ],
  },
  timestamps: true,
}
