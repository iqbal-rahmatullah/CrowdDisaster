import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { convertToIndonesianDate } from '@/lib/utils/convertTime';
import { BreadcrumbItem } from '@/types';
import { DisasterPost } from '@/types/disaster-post';
import { Head, Link } from '@inertiajs/react';
import { HiCalendar, HiLocationMarker } from 'react-icons/hi';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Semua Posko Bencana',
        href: '#',
    },
];

interface PostDisasterPageProps {
    allDisasterPost: DisasterPost[];
}

export default function PostDisasterPage({ allDisasterPost }: PostDisasterPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Semua Posko Bencana" />
            <div className="grid grid-cols-1 gap-4 px-5 pt-5 md:grid-cols-2 lg:grid-cols-4">
                {allDisasterPost.map((disasterPost) => (
                    <Link href={`/disaster-posts/${disasterPost.id}`} className="w-full">
                        <Card className="cursor-pointer">
                            <CardContent>
                                <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-lg">
                                    <img
                                        src={`storage/disaster_images/fdaae6d8-f8de-45ea-bbd6-51bd2edabf99.jpg`}
                                        className="h-full w-full object-cover"
                                        alt="Bukti laporan"
                                    />
                                </div>

                                <h2 className="text-xl font-bold">{disasterPost.title}</h2>
                                <div className="w-full max-w-sm">
                                    <p className="truncate text-sm">{disasterPost.description}</p>
                                </div>

                                <div className="mt-3 mb-2 flex items-center gap-x-2">
                                    <HiLocationMarker className="text-primary flex-shrink-0 text-lg" />
                                    <p className="text-xs font-medium">{disasterPost.address}</p>
                                </div>
                                <div className="mb-2 flex items-center gap-x-2">
                                    <HiCalendar className="text-primary flex-shrink-0 text-lg" />
                                    <p className="text-xs font-medium">
                                        {convertToIndonesianDate(new Date(disasterPost.created_at).toLocaleString())}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </AppLayout>
    );
}
