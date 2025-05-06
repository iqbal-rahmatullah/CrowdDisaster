import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { AddDisasterPostValidationSchema } from '../validation/disaster-post';

interface FormAddDisasterPostProps {
    form: UseFormReturn<AddDisasterPostValidationSchema>;
    onSubmit: (values: AddDisasterPostValidationSchema) => void;
}

export default function FormAddDisasterPost({ form, onSubmit }: FormAddDisasterPostProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Judul</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukkan Judul Posko Bencana" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Textarea className="resize-none" placeholder="Masukkan Judul Posko Bencana" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kontak Darurat</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukkan Kontak Darurat" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quota"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kuota Pengungsi</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Masukkan Kuota Pengungsi" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Alamat</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Gambar Posko Bencana</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    Submit
                </Button>
            </form>
        </Form>
    );
}
