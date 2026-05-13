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

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(180),
    location: z.string(),
    woningtype: z.string(),
    bouwjaar: z.string().optional(),
    toestel: z.string(),
    type: z.enum(['single-split', 'multi-split', 'lucht-lucht warmtepomp']),
    capaciteit: z.string(),
    aantalUnits: z.number().int().positive().default(1),
    doorlooptijd: z.string(),
    bijzonderheid: z.string().optional(),
    pubDate: z.coerce.date(),
    /**
     * Markeert dit als illustratief voorbeeld (i.p.v. een
     * specifiek door Benairco uitgevoerd project). Tot we echte
     * cases met klant-toestemming hebben staan, blijven alle
     * items op true.
     */
    isVoorbeeld: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, locations, projects };
