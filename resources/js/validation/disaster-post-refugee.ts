import { z } from 'zod';

export const disasterPostRefugeeValidationSchema = z.object({
    name: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
    phone: z.string().min(1, { message: 'No HP tidak boleh kosong' }).max(15, {
        message: 'No HP tidak boleh lebih dari 15 karakter',
    }),
    nik: z.string().min(1, { message: 'NIK tidak boleh kosong' }).max(16, {
        message: 'NIK tidak boleh lebih dari 16 karakter',
    }),
    gender: z.enum(['male', 'female'], {
        message: 'Jenis kelamin tidak boleh kosong',
    }),
});

export type AddDisasterPostRefugeeValidationSchema = z.infer<typeof disasterPostRefugeeValidationSchema>;
