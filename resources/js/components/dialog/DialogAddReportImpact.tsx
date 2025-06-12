import { AddRepportImpactValidationSchema } from '@/validation/repport-impact';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface DialogAddRepportImpactProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    form: UseFormReturn<AddRepportImpactValidationSchema>;
    onSubmit: (data: AddRepportImpactValidationSchema) => void;
}

export const DialogAddRepportImpact = ({ isDialogOpen, setIsDialogOpen, form, onSubmit }: DialogAddRepportImpactProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="mb-3">Tambah Dampak Bencana</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="victim_died"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Korban Meninggal Dunia</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Masukkan Jumlah Korban Meninggal Dunia"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value ? Number(e.target.value) : 0;
                                                field.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="victim_injured"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Korban Terluka</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Masukkan Jumlah Korban Terluka"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value ? Number(e.target.value) : 0;
                                                field.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="damaged_house"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rumah Rusak</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Masukkan Jumlah Rumah Rusak"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value ? Number(e.target.value) : 0;
                                                field.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="damaged_building"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bangunan Rusak</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Masukkan Jumlah Bangunan Rusak"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value ? Number(e.target.value) : 0;
                                                field.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="damaged_village"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Desa Terdampak</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Masukkan Desa Terdampak"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value ? Number(e.target.value) : 0;
                                                field.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid place-content-end">
                            <Button type="submit">Simpan</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
