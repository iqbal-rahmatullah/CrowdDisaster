import { z } from 'zod';

export const repportUpdateStatusValidationSchema = z.object({
    status: z.enum(['need_support', 'need_responsible', 'in_progress', 'done'], {
        errorMap: () => ({ message: 'Status tidak valid' }),
    }),
});

export type RepportUpdateStatusValidationSchema = z.infer<typeof repportUpdateStatusValidationSchema>;
