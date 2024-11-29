import { generateMock } from '@anatine/zod-mock';
import { z } from 'zod';

export const Device = z.object({
  deviceId: z.string(),
  userId: z.string().uuid(),
  deviceName: z.string(), // e.g., 'John's iPhone'
  deviceType: z.enum(['mobile', 'web', 'TV', 'app', 'other']), // e.g., 'mobile', 'web', 'TV'
  registeredAt: z.date(), // ISO date string
  lastUsedAt: z.date(), // ISO date string
});

export const DeviceList = z.array(Device);

export type Device = z.infer<typeof Device>;
export type DeviceList = z.infer<typeof DeviceList>;

export const mockDevice = generateMock(Device);
export const mockDeviceList = generateMock(DeviceList);