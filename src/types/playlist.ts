import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

export const Playlist = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    userId: z.number(), // Owner of the playlist
    movies: z.array(z.number()), // Array of Movie IDs
    createdAt: z.string(), // ISO date string
    updatedAt: z.string(), // ISO date string
    isPublic: z.boolean().optional(), // If the playlist can be viewed by others
});

export const PlaylistList = z.array(Playlist);

export type Playlist = z.infer<typeof Playlist>;
export type PlaylistList = z.infer<typeof PlaylistList>;

export const mockPlaylist = generateMock(Playlist);
export const mockPlaylistList = generateMock(PlaylistList);
