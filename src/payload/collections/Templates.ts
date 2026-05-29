import type { CollectionConfig } from 'payload'

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'compatibleGroups', 'sortOrder'],
    group: 'Content',
  },
  access: {
    // Everyone can read templates (for gallery)
    read: () => true,
    // Only admins can manage templates
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Display name, e.g. "Swiss Grid"' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-friendly ID, e.g. "swiss-grid"' },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'compatibleGroups',
      type: 'select',
      hasMany: true,
      required: true,
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
      admin: { description: 'Faculty groups this template is designed for' },
    },
    {
      name: 'componentName',
      type: 'text',
      required: true,
      admin: { description: 'React component name to render, e.g. "SwissGrid"' },
    },
    {
      name: 'tone',
      type: 'text',
      admin: { description: 'One-word vibe label, e.g. "Mono", "Serif", "Grid"' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Show in template gallery',
      },
    },
    {
      name: 'featuredOnLanding',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in the landing-page template marquee (requires a thumbnail component)',
      },
    },
    {
      name: 'landingTags',
      type: 'text',
      admin: {
        description: 'Comma-separated filter tags for the landing marquee, e.g. "dev, mono"',
        condition: (data) => Boolean(data?.featuredOnLanding),
      },
    },
    {
      name: 'landingUrl',
      type: 'text',
      admin: {
        description: 'Sample subdomain shown in the marquee chrome, e.g. "jordan.portfolio-cv.online"',
        condition: (data) => Boolean(data?.featuredOnLanding),
      },
    },
  ],
  timestamps: true,
}
