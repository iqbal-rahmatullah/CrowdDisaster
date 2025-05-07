import { DisasterPostProgression } from '@/types/disaster-post';
import { Paperclip, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { DisasterPostAddProgressionValidation } from '../validation/disaster-post-progression';

interface DialoagPostProgressionProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    progression: DisasterPostProgression[];
    form: UseFormReturn<DisasterPostAddProgressionValidation>;
    onSubmit: (data: DisasterPostAddProgressionValidation) => void;
}

export const DialoagPostProgression = ({ isDialogOpen, setIsDialogOpen, progression, form, onSubmit }: DialoagPostProgressionProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[580px]">
                <DialogTitle className="mb-2">Semua Perkembangan</DialogTitle>
                <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                    {progression.map((item) => (
                        <div key={item.id} className="mb-2 rounded-lg bg-gray-100 p-4">
                            <div className="flex gap-x-4">
                                <Avatar>
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${item.user.name}`} alt={item.user.name} />
                                    <AvatarFallback>US</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="mb-1 flex items-center gap-x-2 text-sm font-semibold">{item.user.name}</div>

                                    {item.proof.length > 0 && (
                                        <div className="mb-2 flex gap-x-2">
                                            {item.proof.map((proof) => (
                                                <img
                                                    key={proof.id}
                                                    src={`/storage/${proof.file_path}`}
                                                    alt="Bukti Perkembangan"
                                                    className="h-20 w-20 rounded-lg object-cover"
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <div className="mb-1 text-sm text-gray-600">{item.progression}</div>
                                    <div className="text-xs text-gray-400">{new Date(item.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {progression.length === 0 && <div className="my-16 text-center text-sm text-gray-500">Belum ada perkembangan</div>}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="progression"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Tulis komentar..." className="w-full resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name="proof"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <input
                                                    ref={fileInputRef}
                                                    id="fileInput"
                                                    type="file"
                                                    multiple
                                                    accept="image/jpeg,image/png,image/webp"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const files = e.target.files ? Array.from(e.target.files) : [];
                                                        setSelectedFiles(files);
                                                        field.onChange(files);
                                                    }}
                                                />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                                                    <Paperclip className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                onClick={() => {
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = '';
                                    }
                                    setSelectedFiles([]);
                                }}
                                className="bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Kirim
                            </Button>
                        </div>

                        {selectedFiles.length > 0 && (
                            <div className="mt-2 grid grid-cols-3 gap-2">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img src={URL.createObjectURL(file)} alt={`preview-${index}`} className="h-20 w-full rounded object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newFiles = [...selectedFiles];
                                                newFiles.splice(index, 1);
                                                setSelectedFiles(newFiles);
                                                form.setValue('proof', newFiles);
                                            }}
                                            className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5 text-white"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
