import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';
import { Movie, mockMovie } from './movies';

export const Recommendation = z.object({
    userId: z.string().uuid(),
    recommendedMovies: z.array(
        z.object({
            movie: Movie,
            score: z.number().min(1).max(5), // Relevance score
        })
    ),
    generatedAt: z.date(), // ISO date string
});

export type Recommendation = z.infer<typeof Recommendation>;

export const mockRecommendation = { 
    ...generateMock(Recommendation), 
    recommendedMovies: Array(3).fill(null).map(() => ({
        movie: mockMovie,
        score: Math.floor(Math.random() * 5) + 1
    }))
};