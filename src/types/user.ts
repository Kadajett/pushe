import { z } from 'zod';
import { generateMock } from '@anatine/zod-mock';
import { AudioTrack, SubtitleTrack, VideoTrack } from './movies';
import { generateAvatarUrl } from './unsplash';

// UserSettings schema
export const UserSettings = z.object({
  defaultSubtitleLanguage: SubtitleTrack.shape.language.optional(), // e.g., 'en', 'es'
  defaultAudioLanguage: AudioTrack.shape.language.optional(),
  preferredPlaybackQuality: VideoTrack.shape.quality.optional(),
  parentalControls: z
    .object({
      enabled: z.boolean(),
      ratingLimit: z.enum(['G', 'PG', 'PG-13', 'R', 'NC-17']).optional(),
    })
    .optional(),
});

// UserActivity schema
export const UserActivity = z.object({
  lastLoginDate: z.date(), // Date object
  watchHistory: z
    .array(
      z.object({
        movieId: z.number(),
        watchedAt: z.date(),
        durationWatched: z.number().min(0), // in minutes
      })
    )
    .optional(),
  watchlist: z.array(z.number()).optional(), // List of movie IDs
  likedMovies: z.array(z.number()).optional(),
  dislikedMovies: z.array(z.number()).optional(),
  ratings: z
    .array(
      z.object({
        movieId: z.number(),
        rating: z.number().min(0).max(10),
      })
    )
    .optional(),
  reviews: z
    .array(
      z.object({
        movieId: z.number(),
        review: z.string(),
        reviewedAt: z.date(),
      })
    )
    .optional(),
});

// User schema conforming to NextAuth.js
export const User = z.object({
  id: z.string().uuid(), // Unique identifier, UUID format
  name: z.string().optional(), // User's display name
  email: z.string().email().optional(),
  emailVerified: z.date().nullable(), // Date when email was verified
  image: z.string().url().nullable().default(generateAvatarUrl),
  username: z.string(),
  profilePictureUrl: z.string().url().optional().default(generateAvatarUrl),
  preferredGenres: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .optional(),
  preferredLanguages: z.array(z.string()).optional(),
  accountCreationDate: z.date(),
  settings: UserSettings.optional(),
  activity: UserActivity.optional(),
});

// AuthRequest schema for login
export const AuthRequest = z.object({
  username: z.string(),
  password: z.string(),
});

// AuthResponse schema for authentication responses
export const AuthResponse = z.object({
  token: z.string(),
  user: User,
});

export type User = z.infer<typeof User>;
export type AuthRequest = z.infer<typeof AuthRequest>;
export type AuthResponse = z.infer<typeof AuthResponse>;

export const mockUser = { ...generateMock(User), image: generateAvatarUrl(), profilePictureUrl: generateAvatarUrl() };
export const mockAuthResponse = { ...generateMock(AuthResponse), user: mockUser };