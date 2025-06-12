import { DialoagPostProgression } from '@/components/dialog/DialogPostProgression';
import { DialogShowDetailRefugee } from '@/components/dialog/DialogShowDetailRefugee';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DisasterPost } from '@/types/disaster-post';
import { DisasterPostAddProgressionValidation, disasterPostAddProgressionValidationSchema } from '@/validation/disaster-post-progression';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiLocationMarker, HiOutlineTrendingDown, HiOutlineUserCircle, HiPhone } from 'react-icons/hi';

interface DetailPostDisasterPageProps {
    disasterPost: DisasterPost;
}

export default function DetailPostDisasterPage({ disasterPost }: DetailPostDisasterPageProps) {
    const [isShowDetailRefugee, setIsShowDetailRefugee] = useState(false);
    const [isShowDetailProgression, setIsShowDetailProgression] = useState(false);

    const formAddProgression = useForm({
        resolver: zodResolver(disasterPostAddProgressionValidationSchema),
        defaultValues: {
            progression: '',
            proof: [],
        },
    });

    const onSubmitProgression = (data: DisasterPostAddProgressionValidation) => {
        const formData = new FormData();
        formData.append('progression', data.progression);
        if (data.proof) {
            data.proof.forEach((file) => {
                formData.append('proof[]', file);
            });
        }
        router.post(`/disaster-posts/${disasterPost.id}/progression`, formData, {
            forceFormData: true,
        });

        formAddProgression.reset();
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Posko Bencana',
            href: '/disaster-posts',
        },
        {
            title: disasterPost.title,
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={disasterPost.title} />
            <section className="px-7 pt-5">
                <Card>
                    <CardContent>
                        <Carousel>
                            <CarouselContent>
                                {disasterPost.disaster_posts_proof.map((disasterPost) => {
                                    return (
                                        <CarouselItem key={disasterPost.id} className="h-[600px] w-full">
                                            {disasterPost.file_type === 'image' ? (
                                                <img
                                                    src={`/storage/${disasterPost.file_path}`}
                                                    alt={disasterPost.file_path}
                                                    className="h-full w-full rounded-lg object-cover"
                                                />
                                            ) : disasterPost.file_type === 'video' ? (
                                                <div className="video-wrapper h-full w-full">
                                                    <video
                                                        src={'/video/dummy/' + disasterPost.file_path}
                                                        title={`${disasterPost.file_path}`}
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
                                <h2 className="text-2xl font-bold">{disasterPost.title}</h2>
                                <div className="mt-4 flex items-center gap-x-2">
                                    <HiLocationMarker className="text-primary text-lg" />
                                    <p className="text-xs font-medium">{disasterPost.address}</p>
                                </div>
                                <div className="mt-4 flex items-center gap-x-2">
                                    <HiPhone className="text-primary text-lg" />
                                    <p className="text-xs font-medium">{disasterPost.contact}</p>
                                </div>
                                <h3 className="mt-5 text-lg font-bold">Deskripsi</h3>
                                <p className="text-muted-foreground mt-2 text-sm">{disasterPost.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Card>
                            <CardContent>
                                <h2 className="mb-2 text-xl font-bold">Detail Posko Bencana</h2>
                                <div className="flex justify-between gap-x-2">
                                    <div className="flex w-10/12 items-center gap-x-2">
                                        <HiOutlineUserCircle className="text-primary text-lg" />
                                        <p className="text-xs font-medium">
                                            {disasterPost.disaster_posts_refugees.length} / {disasterPost.quota} orang
                                        </p>
                                    </div>
                                    <div className="flex w-2/12 justify-end">
                                        <Button variant={'ghost'} onClick={() => setIsShowDetailRefugee(true)}>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-x-2">
                                    <div className="flex w-10/12 items-center gap-x-2">
                                        <HiOutlineTrendingDown className="text-lg text-yellow-400" />
                                        <p className="text-xs font-medium">{disasterPost.disaster_posts_progression.length} Perkembangan</p>
                                    </div>
                                    <div className="flex w-2/12 justify-end">
                                        <Button variant={'ghost'} onClick={() => setIsShowDetailProgression(true)}>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <Button className="w-full bg-blue-500 py-5">Edit Posko Bencana</Button>
                                    <Button className="w-full py-5" variant={'destructive'}>
                                        Hapus Laporan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <DialogShowDetailRefugee isDialogOpen={isShowDetailRefugee} setIsDialogOpen={setIsShowDetailRefugee} disasterPost={disasterPost} />
            <DialoagPostProgression
                isDialogOpen={isShowDetailProgression}
                setIsDialogOpen={setIsShowDetailProgression}
                progression={disasterPost.disaster_posts_progression}
                form={formAddProgression}
                onSubmit={onSubmitProgression}
            />
        </AppLayout>
    );
}
