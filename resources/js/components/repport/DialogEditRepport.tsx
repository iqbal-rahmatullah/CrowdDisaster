import { Repport } from '@/types/repport';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormField } from '../ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RepportUpdateStatusValidationSchema } from '../validation/repport';

interface DialogEditRepportProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    repport: Repport;
    form: UseFormReturn<RepportUpdateStatusValidationSchema>;
    onSubmit: (values: RepportUpdateStatusValidationSchema) => void;
}

export const DialogEditRepport = ({ isDialogOpen, setIsDialogOpen, repport, form, onSubmit }: DialogEditRepportProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="mb-3">Edit Laporan</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    defaultValue={repport.status}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Status Laporan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="need_support">Perlu Dukungan</SelectItem>
                                            <SelectItem value="need_responsible">Perlu Diatasi</SelectItem>
                                            <SelectItem value="in_progress">Sedang Diatasi</SelectItem>
                                            <SelectItem value="done">Sudah Diatasi</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        ></FormField>
                        <div className="flex justify-end">
                            <Button size={'sm'} type="submit">
                                Ubah Status
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
