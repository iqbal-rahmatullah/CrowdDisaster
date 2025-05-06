import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DisasterPost } from '@/types/disaster-post';
import { Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { HiLocationMarker, HiOutlineTrendingDown, HiOutlineUserCircle, HiPhone } from 'react-icons/hi';

interface DetailPostDisasterPageProps {
    disasterPost: DisasterPost;
}

export default function DetailPostDisasterPage({ disasterPost }: DetailPostDisasterPageProps) {
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

    console.log(disasterPost);

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
                                        <p className="text-xs font-medium">0 / {disasterPost.quota} orang</p>
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
                                        <p className="text-xs font-medium">0 Perkembangan</p>
                                    </div>
                                    <div className="flex w-2/12 justify-end">
                                        <Button variant={'ghost'}>
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
        </AppLayout>
    );
}
