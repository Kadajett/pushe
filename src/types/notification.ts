import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

export const Notification = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string(),
  message: z.string(),
  createdAt: z.date(), // ISO date string
  read: z.boolean().default(false),
  type: z.enum(['NEW_RELEASE', 'COMMENT_REPLY', 'SYSTEM_ALERT']),
  relatedResourceId: z.string().uuid().optional(), // e.g., movieId or commentId
});

export const NotificationList = z.array(Notification);

export type Notification = z.infer<typeof Notification>;
export type NotificationList = z.infer<typeof NotificationList>;

export const mockNotification = generateMock(Notification);
export const mockNotificationList = generateMock(NotificationList);