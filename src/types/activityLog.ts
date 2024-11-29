import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

export const ActivityLog = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  action: z.enum(['PLAY', 'PAUSE', 'STOP', 'SEEK', 'RATE', 'COMMENT', 'SHARE', 'SKIP', 'QUEUE', 'PREVIOUS']), // e.g., 'PLAY', 'PAUSE', 'STOP'
  details: z.record(z.any()).optional(), // Additional details as key-value pairs
  timestamp: z.date(), // ISO date string
});

export const ActivityLogList = z.array(ActivityLog);

export type ActivityLog = z.infer<typeof ActivityLog>;
export type ActivityLogList = z.infer<typeof ActivityLogList>;

export const mockActivityLog = generateMock(ActivityLog);
export const mockActivityLogList = generateMock(ActivityLogList);