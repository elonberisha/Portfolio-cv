import type { CollectionConfig } from 'payload'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  admin: {
    useAsTitle: 'owner',
    defaultColumns: ['owner', 'template', 'published', 'updatedAt'],
    group: 'Content',
  },
  access: {
    // Students can only read their own portfolio; admins read all
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { owner: { equals: user.id } }
    },
    // Only authenticated users can create (one per user, enforced by unique)
    create: ({ req: { user } }) => !!user,
    // Students update only their own; admins update any
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { owner: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // --- Ownership ---
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'templates',
      admin: {
        position: 'sidebar',
        description: 'Selected portfolio template',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Make portfolio visible at subdomain',
      },
    },
    {
      // The editable page document — a sanitized HTML snapshot of the chosen
      // template that the generic studio editor mutates. Single source of
      // truth for the student's live page.
      name: 'pageHtml',
      type: 'textarea',
      admin: {
        description: 'Editable HTML snapshot of the chosen template (managed by the studio editor)',
      },
    },
    {
      name: 'templateSnapshotAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When the template HTML was last snapshotted',
      },
    },

    // ═══════════════════════════════════════════════
    // COMMON FIELDS (all faculty groups)
    // ═══════════════════════════════════════════════
    {
      name: 'headline',
      type: 'text',
      admin: {
        description: 'Short tagline shown under your name (e.g. "CS student & web developer")',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: '2-4 sentences about who you are',
      },
    },
    {
      name: 'languages',
      type: 'array',
      admin: { description: 'Spoken languages' },
      fields: [
        { name: 'language', type: 'text', required: true },
        {
          name: 'proficiency',
          type: 'select',
          options: [
            { label: 'Native', value: 'native' },
            { label: 'C2 - Proficient', value: 'c2' },
            { label: 'C1 - Advanced', value: 'c1' },
            { label: 'B2 - Upper Intermediate', value: 'b2' },
            { label: 'B1 - Intermediate', value: 'b1' },
            { label: 'A2 - Elementary', value: 'a2' },
            { label: 'A1 - Beginner', value: 'a1' },
          ],
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        { name: 'degree', type: 'text', required: true },
        { name: 'institution', type: 'text', required: true },
        { name: 'startDate', type: 'text' },
        { name: 'endDate', type: 'text' },
        { name: 'gpa', type: 'text' },
        { name: 'thesis', type: 'text' },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Personal Website', value: 'website' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Dribbble', value: 'dribbble' },
            { label: 'Behance', value: 'behance' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'url', type: 'text', required: true },
        { name: 'label', type: 'text' },
      ],
    },

    // ═══════════════════════════════════════════════
    // TECH & ENGINEERING
    // ═══════════════════════════════════════════════
    {
      name: 'projects',
      type: 'array',
      admin: {
        description: 'Tech projects, apps, open source work',
        condition: (data, siblingData, { user }) => true, // Show for all — students toggle on/off
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'techStack', type: 'text', admin: { description: 'Comma-separated: React, Node.js, etc.' } },
        { name: 'liveUrl', type: 'text' },
        { name: 'sourceUrl', type: 'text', admin: { description: 'GitHub / GitLab link' } },
        {
          name: 'screenshots',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'caption', type: 'text' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════
    // SHARED: Experience, Skills, Certifications
    // ═══════════════════════════════════════════════
    {
      name: 'experience',
      type: 'array',
      fields: [
        { name: 'company', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'description', type: 'textarea' },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Full-time', value: 'fulltime' },
            { label: 'Part-time', value: 'parttime' },
            { label: 'Internship', value: 'internship' },
            { label: 'Freelance', value: 'freelance' },
            { label: 'Volunteer', value: 'volunteer' },
          ],
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Programming Language', value: 'language' },
            { label: 'Framework', value: 'framework' },
            { label: 'Tool', value: 'tool' },
            { label: 'Analytical', value: 'analytical' },
            { label: 'Leadership', value: 'leadership' },
            { label: 'Clinical', value: 'clinical' },
            { label: 'Software', value: 'software' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'proficiency',
          type: 'select',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
            { label: 'Expert', value: 'expert' },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'issuer', type: 'text', required: true },
        { name: 'date', type: 'date' },
        { name: 'credentialUrl', type: 'text' },
      ],
    },

    // ═══════════════════════════════════════════════
    // BUSINESS & MANAGEMENT
    // ═══════════════════════════════════════════════
    {
      name: 'caseStudies',
      type: 'array',
      admin: { description: 'Business case studies' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'context', type: 'text' },
        { name: 'challenge', type: 'textarea' },
        { name: 'approach', type: 'textarea' },
        { name: 'result', type: 'textarea' },
      ],
    },

    // ═══════════════════════════════════════════════
    // LAW & POLITICS
    // ═══════════════════════════════════════════════
    {
      name: 'publications',
      type: 'array',
      admin: { description: 'Articles, papers, op-eds' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'venue', type: 'text', admin: { description: 'Journal, conference, or publication' } },
        { name: 'date', type: 'date' },
        { name: 'url', type: 'text' },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Research Paper', value: 'paper' },
            { label: 'Article', value: 'article' },
            { label: 'Book Chapter', value: 'chapter' },
            { label: 'Opinion', value: 'opinion' },
            { label: 'Poster', value: 'poster' },
          ],
        },
      ],
    },
    {
      name: 'mootCourt',
      type: 'array',
      admin: { description: 'Moot court & legal competitions' },
      fields: [
        { name: 'competition', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'date', type: 'date' },
        { name: 'result', type: 'text' },
      ],
    },
    {
      name: 'areasOfInterest',
      type: 'text',
      admin: { description: 'Practice areas — comma-separated tags' },
    },

    // ═══════════════════════════════════════════════
    // MEDICAL & HEALTHCARE
    // ═══════════════════════════════════════════════
    {
      name: 'clinicalRotations',
      type: 'array',
      admin: { description: 'Hospital rotations and clinical placements' },
      fields: [
        { name: 'department', type: 'text', required: true },
        { name: 'hospital', type: 'text', required: true },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'supervisor', type: 'text' },
        { name: 'focus', type: 'text' },
      ],
    },
    {
      name: 'research',
      type: 'array',
      admin: { description: 'Research projects' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'lab', type: 'text', admin: { description: 'Lab or PI name' } },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'description', type: 'textarea' },
        { name: 'publicationStatus', type: 'text' },
      ],
    },

    // ═══════════════════════════════════════════════
    // CREATIVE & MEDIA
    // ═══════════════════════════════════════════════
    {
      name: 'portfolioItems',
      type: 'array',
      admin: { description: 'Creative portfolio pieces (visual, audio, video, writing)' },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Visual', value: 'visual' },
            { label: 'Audio', value: 'audio' },
            { label: 'Video', value: 'video' },
            { label: 'Writing', value: 'writing' },
            { label: 'Mixed Media', value: 'mixed' },
          ],
        },
        { name: 'description', type: 'textarea' },
        {
          name: 'media',
          type: 'array',
          fields: [
            { name: 'file', type: 'upload', relationTo: 'media' },
          ],
        },
        { name: 'externalUrl', type: 'text' },
      ],
    },
    {
      name: 'exhibitions',
      type: 'array',
      admin: { description: 'Shows, exhibitions, screenings, concerts' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'venue', type: 'text' },
        { name: 'date', type: 'date' },
        { name: 'role', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'awards',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'organization', type: 'text' },
        { name: 'date', type: 'date' },
        { name: 'category', type: 'text' },
      ],
    },

    // ═══════════════════════════════════════════════
    // EDUCATION & SOCIAL SCIENCES
    // ═══════════════════════════════════════════════
    {
      name: 'teaching',
      type: 'array',
      admin: { description: 'Teaching and TA experience' },
      fields: [
        { name: 'course', type: 'text', required: true },
        { name: 'institution', type: 'text' },
        { name: 'role', type: 'text', admin: { description: 'TA, Lecturer, etc.' } },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'conferences',
      type: 'array',
      admin: { description: 'Conference presentations' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'conference', type: 'text' },
        { name: 'date', type: 'date' },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Paper', value: 'paper' },
            { label: 'Poster', value: 'poster' },
            { label: 'Keynote', value: 'keynote' },
            { label: 'Panel', value: 'panel' },
          ],
        },
      ],
    },
    {
      name: 'researchInterests',
      type: 'text',
      admin: { description: 'Research interest tags — comma-separated' },
    },

    // ═══════════════════════════════════════════════
    // SPORTS
    // ═══════════════════════════════════════════════
    {
      name: 'athleticProfile',
      type: 'group',
      admin: { description: 'Athletic identity' },
      fields: [
        { name: 'sport', type: 'text' },
        { name: 'position', type: 'text' },
        { name: 'club', type: 'text' },
        { name: 'height', type: 'text' },
        { name: 'weight', type: 'text' },
      ],
    },
    {
      name: 'competitions',
      type: 'array',
      admin: { description: 'Competition history' },
      fields: [
        { name: 'event', type: 'text', required: true },
        { name: 'location', type: 'text' },
        { name: 'date', type: 'date' },
        { name: 'result', type: 'text' },
        {
          name: 'level',
          type: 'select',
          options: [
            { label: 'Local', value: 'local' },
            { label: 'National', value: 'national' },
            { label: 'International', value: 'international' },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      admin: { description: 'Personal bests and season stats' },
      fields: [
        { name: 'metric', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'context', type: 'text' },
        { name: 'date', type: 'date' },
      ],
    },

    // ═══════════════════════════════════════════════
    // AGRICULTURE & ENVIRONMENT
    // ═══════════════════════════════════════════════
    {
      name: 'fieldwork',
      type: 'array',
      admin: { description: 'Field studies and site work' },
      fields: [
        { name: 'site', type: 'text', required: true },
        { name: 'cropOrSpecies', type: 'text' },
        { name: 'methodology', type: 'textarea' },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'findings', type: 'textarea' },
      ],
    },
    {
      name: 'labSkills',
      type: 'array',
      admin: { description: 'Lab techniques and competencies' },
      fields: [
        { name: 'technique', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Soil Analysis', value: 'soil' },
            { label: 'GIS', value: 'gis' },
            { label: 'Microscopy', value: 'microscopy' },
            { label: 'Chemical Analysis', value: 'chemical' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════
    // CUSTOM SECTIONS (Extensibility)
    // ═══════════════════════════════════════════════
    {
      name: 'customSections',
      type: 'array',
      admin: { description: 'Add your own custom sections' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richText' },
      ],
    },
  ],
  timestamps: true,
}
