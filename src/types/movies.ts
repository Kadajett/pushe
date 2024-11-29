import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';
import { generateMovieCoverUrl } from './unsplash';

// Define VideoTrack schema
export const VideoTrack = z.object({
    url: z.string().url(), // File location of the video track
    quality: z.enum(['SD', 'HD', 'Full HD', '4K', '8K']), // Quality tied to the video URL
    format: z.string(), // Video format (e.g., 'mp4', 'mkv')
});

// Define AudioTrack schema
export const AudioTrack = z.object({
    url: z.string().url(), // File location of the audio track
    language: z.string(), // Language code (e.g., 'en', 'es')
    name: z.string(), // Name or description of the audio track
    format: z.string(), // Audio format (e.g., 'aac', 'mp3')
});

// Define SubtitleTrack schema
export const SubtitleTrack = z.object({
    url: z.string().url(), // File location of the subtitle track
    language: z.enum(['aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu']), // ISO 639-1 language codes
    name: z.string(), // Name or description of the subtitle track
    format: z.enum(['srt', 'vtt']), // Subtitle file format
});

// Modified CoverArt schema
export const CoverArt = z.object({
  url: z.string().url(),
  resolution: z.string(),
});

export const Movie = z.object({
    title: z.string(),
    description: z.string(),
    themes: z.array(z.string()), // Movie themes
    cast: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ), // Cast by name and id
    director: z.object({
        id: z.number(),
        name: z.string(),
    }), // Director by name and id
    genres: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ), // Genres by name and id
    releaseDate: z.string(), // Release date as string (ISO format)
    runtime: z.number().min(0), // Duration in minutes
    ratings: z.object({
        average: z.number().min(0).max(10),
        count: z.number().min(0),
    }), // Ratings info
    likes: z.array(z.number()), // User IDs who liked the movie
    userTags: z.array(z.string()), // User tags
    coverArtUrls: z.array(CoverArt), // Different resolutions of cover art
    videoTracks: z.array(VideoTrack), // Video tracks with qualities and formats
    audioTracks: z.array(AudioTrack), // Audio tracks with file locations and names
    subtitleTracks: z.array(SubtitleTrack), // Subtitle tracks with file locations and names
});

export const MovieList = z.array(Movie);

export type Movie = z.infer<typeof Movie>;
export type MovieList = z.infer<typeof MovieList>;

export const mockMovie = { ...generateMock(Movie), coverArtUrls: [{ url: generateMovieCoverUrl(), resolution: '1920x1080' }] };
export const mockMovieList = Array(6).fill(null).map(() => mockMovie);