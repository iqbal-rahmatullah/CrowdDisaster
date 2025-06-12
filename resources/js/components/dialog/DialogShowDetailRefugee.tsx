import { DisasterPost, DisasterPostRefugee } from '@/types/disaster-post';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiPencil, HiTrash, HiUserCircle } from 'react-icons/hi';
import { AddDisasterPostRefugeeValidationSchema, disasterPostRefugeeValidationSchema } from '../../validation/disaster-post-refugee';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { DialogAddRefugee } from './DialogAddRefugee';
import { DialogDeleteConfirm } from './DialogDeleteConfirm';

interface DialogShowDetailRefugeeProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    disasterPost: DisasterPost;
}

export const DialogShowDetailRefugee = ({ isDialogOpen, setIsDialogOpen, disasterPost }: DialogShowDetailRefugeeProps) => {
    const [isDialogAddRefugeeOpen, setIsDialogAddRefugeeOpen] = useState(false);
    const [isDialogEditRefugeeOpen, setIsDialogEditRefugeeOpen] = useState(false);
    const [isDialogDeleteRefugeeOpen, setIsDialogDeleteRefugeeOpen] = useState(false);
    const [selectedDeleteRefugee, setSelectedDeleteRefugee] = useState<DisasterPostRefugee>();
    const [selectedEditRefugee, setSelectedEditRefugee] = useState<DisasterPostRefugee>();

    useEffect(() => {
        if (!isDialogEditRefugeeOpen) {
            formAddRefuge.reset({
                name: '',
                phone: '',
                nik: '',
                gender: 'male',
            });
        }
    }, [isDialogEditRefugeeOpen]);

    const formAddRefuge = useForm<AddDisasterPostRefugeeValidationSchema>({
        resolver: zodResolver(disasterPostRefugeeValidationSchema),
        defaultValues: {
            name: '',
            phone: '',
            nik: '',
            gender: 'male',
        },
    });

    const onSubmitAddRefugee = (data: AddDisasterPostRefugeeValidationSchema) => {
        router.post(`/disaster-posts/${disasterPost.id}/refugee`, data);
        setIsDialogAddRefugeeOpen(false);
        formAddRefuge.reset();
    };

    const onSubmitEditRefugee = (data: AddDisasterPostRefugeeValidationSchema) => {
        router.put(`/disaster-posts/${disasterPost.id}/refugee/${selectedEditRefugee?.id}`, data);
        setIsDialogEditRefugeeOpen(false);
        formAddRefuge.reset();
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogTitle className="mb-3">Daftar Pengungsi</DialogTitle>
                    <div className="mb-4">
                        <Button
                            size={'sm'}
                            onClick={() => {
                                setIsDialogOpen(false);
                                setIsDialogAddRefugeeOpen(true);
                            }}
                        >
                            Tambah Pengungsi
                        </Button>
                    </div>
                    <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                        {disasterPost.disaster_posts_refugees?.length > 0 ? (
                            disasterPost.disaster_posts_refugees.map((item, index) => (
                                <div key={index} className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <HiUserCircle className="text-primary h-6 w-6" />
                                            <div>
                                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                                <p className="text-sm text-gray-500">{item.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-400">#{index + 1}</span>
                                    </div>

                                    <div className="mb-2 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
                                        <div>
                                            <span className="font-medium">NIK:</span> {item.nik}
                                        </div>
                                        <div>
                                            <span className="font-medium">No. HP:</span> {item.phone}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-x-2">
                                        <Button
                                            variant={'outline'}
                                            onClick={() => {
                                                setIsDialogDeleteRefugeeOpen(true);
                                                setSelectedDeleteRefugee(item);
                                            }}
                                        >
                                            <HiTrash />
                                        </Button>
                                        <Button
                                            variant={'outline'}
                                            onClick={() => {
                                                setIsDialogEditRefugeeOpen(true);
                                                setSelectedEditRefugee(item);
                                                formAddRefuge.setValue('name', item.name);
                                                formAddRefuge.setValue('nik', item.nik);
                                                formAddRefuge.setValue('phone', item.phone);
                                                formAddRefuge.setValue('gender', item.gender as 'male' | 'female');
                                            }}
                                        >
                                            <HiPencil />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-4 text-center text-sm text-gray-500">Belum ada pengungsi di posko ini.</div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <DialogAddRefugee
                isDialogOpen={isDialogEditRefugeeOpen}
                setIsDialogOpen={setIsDialogEditRefugeeOpen}
                form={formAddRefuge}
                onSubmit={onSubmitEditRefugee}
                isEdit={true}
            />

            <DialogAddRefugee
                isDialogOpen={isDialogAddRefugeeOpen}
                setIsDialogOpen={setIsDialogAddRefugeeOpen}
                form={formAddRefuge}
                onSubmit={onSubmitAddRefugee}
            />

            <DialogDeleteConfirm
                isDialogOpen={isDialogDeleteRefugeeOpen}
                setIsDialogOpen={setIsDialogDeleteRefugeeOpen}
                onDelete={() => {
                    router.delete(`/disaster-posts/${disasterPost.id}/refugee/${selectedDeleteRefugee?.id}`);
                    setIsDialogDeleteRefugeeOpen(false);
                }}
                id={selectedDeleteRefugee?.id}
                title="Hapus Pengungsi"
                body={`Apakah Anda yakin ingin menghapus ${selectedDeleteRefugee?.name} dari pengungsi?`}
            />
        </>
    );
};
