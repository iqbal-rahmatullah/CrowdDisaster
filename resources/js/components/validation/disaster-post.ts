import { z } from 'zod';

export const disasterPostValidationSchema = z.object({
    title: z.string().min(1, { message: 'Judul tidak boleh kosong' }),
    description: z.string().min(1, { message: 'Deskripsi tidak boleh kosong' }),
    quota: z.coerce
        .number({
            required_error: 'Kuota tidak boleh kosong',
        })
        .min(1, { message: 'Kuota tidak boleh kosong' }),
    contact: z.string().min(1, { message: 'Kontak tidak boleh kosong' }),
    address: z.string().min(1, { message: 'Alamat tidak boleh kosong' }),
    image: z.custom<File>(
        (file) => {
            return file instanceof File && file.size > 0 && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
        },
        {
            message: 'File harus berupa gambar.',
        },
    ),
    latitude: z.string().min(1, { message: 'Latitude tidak boleh kosong' }),
    longitude: z.string().min(1, { message: 'Longitude tidak boleh kosong' }),
});

export type AddDisasterPostValidationSchema = z.infer<typeof disasterPostValidationSchema>;
