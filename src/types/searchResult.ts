import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';
import { Movie } from './movies';
import { User } from './user';

export const SearchResult = z.object({
  movies: z.array(Movie),
  users: z.array(User),
  playlists: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
});

export type SearchResult = z.infer<typeof SearchResult>;

export const mockSearchResult = generateMock(SearchResult);