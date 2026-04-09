import { defineCollection, z } from "astro:content";

// Shared schema for note articles.
// Add a file under src/content/notes/<lang>/<slug>.md to create a new post.
// <lang> must be "ja" or "en". The slug (filename without extension)
// links the two language versions together.
const noteSchema = z.object({
  title: z.string(),
  date: z.string(), // YYYY-MM-DD
  excerpt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const notes = defineCollection({
  type: "content",
  schema: noteSchema,
});

export const collections = { notes };
