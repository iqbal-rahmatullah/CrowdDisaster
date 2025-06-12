import { PageProps } from '@/types/inertia';
import { Repport } from '@/types/repport';
import { usePage } from '@inertiajs/react';
import { Paperclip, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RepportAddCommentValidationSchema } from '../../validation/repport-comment';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

interface DialogShowCommentRepportProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    repport: Repport;
    form: UseFormReturn<RepportAddCommentValidationSchema>;
    onSubmit: (data: RepportAddCommentValidationSchema) => void;
}

export const DialogShowCommentRepport = ({ isDialogOpen, setIsDialogOpen, repport, form, onSubmit }: DialogShowCommentRepportProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { auth } = usePage<PageProps>().props;

    const pinnedComments = repport.repport_comments
        .filter((comment) => comment.user.id === auth.user.id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const otherComments = repport.repport_comments
        .filter((comment) => comment.user.id !== auth.user.id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const orderedComments = [...pinnedComments, ...otherComments];

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[580px]">
                <DialogTitle className="mb-2">Semua Komentar</DialogTitle>
                <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                    {orderedComments.map((comment) => (
                        <div key={comment.id} className="mb-2 rounded-lg bg-gray-100 p-4">
                            <div className="flex gap-x-4">
                                <Avatar>
                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${comment.user.name}`} alt={comment.user.name} />
                                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="mb-1 flex items-center gap-x-2 text-sm font-semibold">
                                        {comment.user.name}
                                        {comment.user.id === auth.user.id && (
                                            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">Disematkan</span>
                                        )}
                                    </div>

                                    {comment.proofs.length > 0 && (
                                        <div className="mb-2 flex gap-x-2">
                                            {comment.proofs.map((proof) => (
                                                <img
                                                    key={proof.id}
                                                    src={`/storage/${proof.file_path}`}
                                                    alt="Bukti Komentar"
                                                    className="h-20 w-20 rounded-lg object-cover"
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <div className="mb-1 text-sm text-gray-600">{comment.comment}</div>
                                    <div className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {repport.repport_comments.length === 0 && <div className="text-center text-sm text-gray-500">Tidak ada komentar</div>}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="comment"
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
