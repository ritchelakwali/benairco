import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(80),
      description: z.string().max(170),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      category: z.enum(['subsidie', 'techniek', 'onderhoud', 'kosten', 'verhaal']),
      keywords: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/locations' }),
  schema: z.object({
    title: z.string(),
    city: z.string(),
    description: z.string().max(170),
    province: z.string().default('Gelderland'),
    travelMinutes: z.number().int().positive(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog, locations };
