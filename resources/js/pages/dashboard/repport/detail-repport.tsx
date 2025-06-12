import { DialogDeleteRepport } from '@/components/dialog/DialogDeleteRepport';
import { DialogEditRepport } from '@/components/dialog/DialogEditRepport';
import { DialogRepportSupport } from '@/components/dialog/DialogRepportSupport';
import { DialogShowCommentRepport } from '@/components/dialog/DialogShowCommentRepport';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { convertToIndonesianDate } from '@/lib/utils/convertTime';
import { BreadcrumbItem } from '@/types';
import { GetRepportStatusBackground, GetRepportStatusLabel, GetRepportTypeLabel, Repport } from '@/types/repport';
import { repportUpdateStatusValidationSchema, RepportUpdateStatusValidationSchema } from '@/validation/repport';
import { repportAddCommentValidationSchema, RepportAddCommentValidationSchema } from '@/validation/repport-comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    HiCalendar,
    HiChatAlt,
    HiExclamationCircle,
    HiLocationMarker,
    HiOutlineLightningBolt,
    HiOutlineTrendingDown,
    HiOutlineUserCircle,
} from 'react-icons/hi';

export default function DetailRepportPage({ repport }: { repport: Repport }) {
    const [isDialogSupportOpen, setIsDialogSupportOpen] = useState(false);
    const [isDialogEditRepportOpen, setIsDialogEditRepportOpen] = useState(false);
    const [isDialogDeleteRepportOpen, setIsDialogDeleteRepportOpen] = useState(false);
    const [isDialogShowCommentOpen, setIsDialogShowCommentOpen] = useState(false);

    //Breadcrumb
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Laporan',
            href: '/repports',
        },
        {
            title: repport.title,
            href: '#',
        },
    ];

    const editStatusForm = useForm<RepportUpdateStatusValidationSchema>({
        resolver: zodResolver(repportUpdateStatusValidationSchema),
        defaultValues: {
            status: repport.status,
        },
    });

    const commentRepportForm = useForm<RepportAddCommentValidationSchema>({
        resolver: zodResolver(repportAddCommentValidationSchema),
        defaultValues: {
            comment: '',
        },
    });

    const onSubmitEditStatus = (values: RepportUpdateStatusValidationSchema) => {
        router.put(`/repports/${repport.id}`, values);
        setIsDialogEditRepportOpen(false);
        editStatusForm.reset();
    };

    const onSubmitComment = (values: RepportAddCommentValidationSchema) => {
        const formData = new FormData();
        formData.append('comment', values.comment);
        if (values.proof) {
            values.proof.forEach((file) => {
                formData.append('proof[]', file);
            });
        }
        router.post(`/repports/${repport.id}/comment`, formData, {
            forceFormData: true,
        });

        commentRepportForm.reset();
    };

    const onDeleteRepport = () => {
        router.delete(`/repports/${repport.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={repport.title} />
            <section className="px-7 pt-5">
                <Card>
                    <CardContent>
                        <Carousel>
                            <CarouselContent>
                                {repport.repport_proofs.map((repport) => {
                                    return (
                                        <CarouselItem key={repport.id} className="h-[600px] w-full">
                                            {repport.file_type === 'image' ? (
                                                <img
                                                    src={`/storage/${repport.file_path}`}
                                                    alt={repport.file_path}
                                                    className="h-full w-full rounded-lg object-cover"
                                                />
                                            ) : repport.file_type === 'video' ? (
                                                <div className="video-wrapper h-full w-full">
                                                    <video
                                                        src={'/storage/' + repport.file_path}
                                                        title={`${repport.file_path}`}
                                                        className="h-full w-full rounded-lg object-cover"
                                                        autoPlay
                                                        muted
                                                        loop
                                                        controls
                                                    />
                                                </div>
                                            ) : null}
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </CardContent>
                </Card>

                <div className="mt-5 flex flex-col gap-x-5 md:flex-row">
                    <div className="w-full md:w-3/4">
                        <Card>
                            <CardContent>
                                <div className="flex justify-between">
                                    <h2 className="text-2xl font-bold">{repport.title}</h2>
                                    <Badge className={`${GetRepportStatusBackground[repport.status]}`}>{GetRepportStatusLabel[repport.status]}</Badge>
                                </div>
                                <div className="mt-4 flex items-center gap-x-2">
                                    <HiOutlineLightningBolt className="text-primary text-lg" />
                                    <p className="text-xs font-medium">
                                        {GetRepportTypeLabel[repport.type]} &nbsp;<Badge>radius {repport.radius}m</Badge>
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center gap-x-2">
                                    <HiLocationMarker className="text-primary text-lg" />
                                    <p className="text-xs font-medium">{repport.address}</p>
                                </div>
                                <div className="mt-4 flex items-center gap-x-2">
                                    <HiCalendar className="text-primary text-lg" />
                                    <p className="text-xs font-medium">{convertToIndonesianDate(new Date(repport.created_at).toLocaleString())}</p>
                                </div>
                                <h3 className="mt-5 text-lg font-bold">Deskripsi</h3>
                                <p className="text-muted-foreground mt-2 text-sm">{repport.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Card>
                            <CardContent>
                                <h2 className="mb-2 text-xl font-bold">Detail Laporan</h2>
                                <div className="flex justify-between gap-x-2">
                                    <div className="flex w-10/12 items-center gap-x-2">
                                        <HiOutlineUserCircle className="text-primary text-lg" />
                                        <p className="text-xs font-medium">{repport.repport_supports.length} orang mendukung</p>
                                    </div>
                                    <div className="flex w-2/12 justify-end">
                                        <Button variant={'ghost'} onClick={() => setIsDialogSupportOpen(true)}>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-x-2">
                                    <div className="flex w-10/12 items-center gap-x-2">
                                        <HiChatAlt className="text-lg text-blue-400" />
                                        <p className="text-xs font-medium">{repport.repport_comments.length} komentar</p>
                                    </div>
                                    <div className="flex w-2/12 justify-end">
                                        <Button variant={'ghost'} onClick={() => setIsDialogShowCommentOpen(true)}>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-x-2">
                                    <div className="flex w-10/12 items-center gap-x-2">
                                        <HiExclamationCircle className="text-lg text-red-400" />
                                        <p className="text-xs font-medium">0 melaporkan</p>
                                    </div>
                                    <div className="flex w-2/12 justify-end">
                                        <Button variant={'ghost'}>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-x-2">
                                    <div className="flex w-10/12 items-center gap-x-2">
                                        <HiOutlineTrendingDown className="text-lg text-yellow-400" />
                                        <p className="text-xs font-medium">{repport.repport_impacts.length} dampak bencana </p>
                                    </div>
                                    <div className="flex w-2/12 justify-end">
                                        <Button variant={'ghost'}>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <Button className="w-full bg-blue-500 py-5" onClick={() => setIsDialogEditRepportOpen(true)}>
                                        Edit Laporan
                                    </Button>
                                    <Button className="w-full py-5" variant={'destructive'} onClick={() => setIsDialogDeleteRepportOpen(true)}>
                                        Hapus Laporan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <DialogRepportSupport isDialogOpen={isDialogSupportOpen} setIsDialogOpen={setIsDialogSupportOpen} repport={repport} />
                <DialogEditRepport
                    isDialogOpen={isDialogEditRepportOpen}
                    setIsDialogOpen={setIsDialogEditRepportOpen}
                    repport={repport}
                    form={editStatusForm}
                    onSubmit={onSubmitEditStatus}
                />
                <DialogDeleteRepport
                    isDialogOpen={isDialogDeleteRepportOpen}
                    setIsDialogOpen={setIsDialogDeleteRepportOpen}
                    onDelete={onDeleteRepport}
                />
                <DialogShowCommentRepport
                    isDialogOpen={isDialogShowCommentOpen}
                    setIsDialogOpen={setIsDialogShowCommentOpen}
                    repport={repport}
                    form={commentRepportForm}
                    onSubmit={onSubmitComment}
                />
            </section>
        </AppLayout>
    );
}
