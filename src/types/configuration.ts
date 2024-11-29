import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

export const ServerConfiguration = z.object({
  streamingBaseUrl: z.string().url(),
  supportedVideoFormats: z.array(z.string()),
  supportedAudioFormats: z.array(z.string()),
  maxStreamingBitrate: z.number(), // in kbps
  announcements: z.array(z.string()).optional(),
});

export type ServerConfiguration = z.infer<typeof ServerConfiguration>;

export const mockServerConfiguration = generateMock(ServerConfiguration);