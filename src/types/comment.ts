import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

const baseCommentSchema = z.object({
  id: z.number(),
  movieId: z.number(),
  userId: z.number(),
  content: z.string(),
  createdAt: z.string(), // ISO date string
});

export type Comment = z.infer<typeof baseCommentSchema> & {
  replies?: Comment[];
};

export const CommentSchema: z.ZodType<Comment> = baseCommentSchema.extend({
  replies: z.lazy(() => CommentSchema.array()).optional(),
});

export const CommentList = z.array(CommentSchema);

export const mockComment = generateMock(CommentSchema);
export const mockCommentList = generateMock(CommentList);
