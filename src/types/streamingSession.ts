import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

export const StreamingSession = z.object({
    sessionId: z.string().uuid(),
    userId: z.string().uuid(),
    movieId: z.string().uuid(),
    startedAt: z.date(), // ISO date string
    lastAccessedAt: z.date(), // ISO date string
    currentPosition: z.number().min(0), // Current position in seconds
    deviceInfo: z.object({
        deviceId: z.string(),
        deviceType: z.enum(['web', 'mobile', 'tv', 'game', 'desktop']), // e.g., 'web', 'mobile'
        ipAddress: z.string().ip(),
        userAgent: z.enum(['chrome', 'firefox', 'safari', 'edge', 'other']),
    }),
});

export const StreamingSessionList = z.array(StreamingSession);

export type StreamingSession = z.infer<typeof StreamingSession>;
export type StreamingSessionList = z.infer<typeof StreamingSessionList>;

export const mockStreamingSession = generateMock(StreamingSession);
export const mockStreamingSessionList = generateMock(StreamingSessionList);