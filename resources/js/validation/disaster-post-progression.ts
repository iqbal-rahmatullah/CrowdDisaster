import { z } from 'zod';

export const disasterPostAddProgressionValidationSchema = z.object({
    progression: z.string().min(1, { message: 'Komentar tidak boleh kosong' }),
    proof: z
        .array(
            z.custom<File>((file) => file instanceof File && file.size > 0 && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
                message: 'File harus berupa gambar (jpeg/png/webp).',
            }),
        )
        .optional(),
});

export type DisasterPostAddProgressionValidation = z.infer<typeof disasterPostAddProgressionValidationSchema>;
