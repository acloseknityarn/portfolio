import { defineCollection, z } from 'astro:content';
// schema
export const collections = {
	post: defineCollection({
		type: 'content',
		schema: ( {image} ) => {
			return z.object({
				title: z.string(),
				description: z.string(),
				publishDate: z.coerce.date(),
				tags: z.array(z.string()),
				img: z.object({
					src: image(),
					alt: z.string()
				}).optional()
			})
		}
	}),
};

const blogCollection = defineCollection({
	schema: ({ image }) => z.object({
	  title: z.string(),
	  cover: image().refine((img) => img.width >= 1080, {
		message: "Cover image must be at least 1080 pixels wide!",
	  }),
	  coverAlt: z.string(),
	}),
  });