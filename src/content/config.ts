import { defineCollection, z } from 'astro:content';
// schema
export const collections = {
	post: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.object({
				src: z.string(),
				alt: z.string()
			}).optional()
		}),
	}),
};