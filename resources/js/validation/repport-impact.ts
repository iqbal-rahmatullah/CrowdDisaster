import { z } from 'zod';

export const repportImpactbValidationSchema = z.object({
    victim_died: z.number().min(0, { message: 'Jumlah korban meninggal tidak boleh kurang dari 0' }),
    victim_injured: z.number().min(0, { message: 'Jumlah korban luka tidak boleh kurang dari 0' }),
    damaged_house: z.number().min(0, { message: 'Jumlah rumah rusak tidak boleh kurang dari 0' }),
    damaged_building: z.number().min(0, { message: 'Jumlah bangunan rusak tidak boleh kurang dari 0' }),
    damaged_village: z.number().min(0, { message: 'Jumlah desa rusak tidak boleh kurang dari 0' }),
});

export type AddRepportImpactValidationSchema = z.infer<typeof repportImpactbValidationSchema>;
