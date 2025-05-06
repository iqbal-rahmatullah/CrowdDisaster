import { z } from 'zod';

export const repportUpdateStatusValidationSchema = z.object({
    status: z.enum(['need_support', 'need_responsible', 'in_progress', 'done'], {
        errorMap: () => ({ message: 'Status tidak valid' }),
    }),
});

export const repportAddCommentValidationSchema = z.object({
    comment: z.string().min(1, { message: 'Komentar tidak boleh kosong' }),
    proof: z
        .array(
            z.custom<File>((file) => file instanceof File && file.size > 0 && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
                message: 'File harus berupa gambar (jpeg/png/webp).',
            }),
        )
        .optional(),
});

export type RepportUpdateStatusValidationSchema = z.infer<typeof repportUpdateStatusValidationSchema>;
export type RepportAddCommentValidationSchema = z.infer<typeof repportAddCommentValidationSchema>;
