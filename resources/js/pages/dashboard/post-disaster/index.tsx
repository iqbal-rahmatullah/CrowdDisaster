import { Card, CardContent } from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { convertToIndonesianDate } from '@/lib/utils/convertTime';
import { BreadcrumbItem, PaginatedData } from '@/types';
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
    allDisasterPost: PaginatedData<DisasterPost>;
}

export default function PostDisasterPage({ allDisasterPost }: PostDisasterPageProps) {
    const { current_page, prev_page_url, last_page, next_page_url } = allDisasterPost;

    const pageRange = 2;

    const pagesToShow = [];

    pagesToShow.push(1);

    for (let i = current_page - pageRange; i <= current_page + pageRange; i++) {
        if (i > 1 && i < last_page) {
            pagesToShow.push(i);
        }
    }

    if (!pagesToShow.includes(last_page)) {
        pagesToShow.push(last_page);
    }

    const showEllipsisBefore = pagesToShow[0] > 2;
    const showEllipsisAfter = pagesToShow[pagesToShow.length - 1] < last_page - 1;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Semua Posko Bencana" />
            <div className="grid grid-cols-1 gap-4 px-5 pt-5 md:grid-cols-2 lg:grid-cols-4">
                {allDisasterPost.data.map((disasterPost) => (
                    <Link href={`/disaster-posts/${disasterPost.id}`} className="w-full">
                        <Card className="cursor-pointer">
                            <CardContent>
                                <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-lg">
                                    <img
                                        src={`/storage/${disasterPost.disaster_posts_proof[0]?.file_path}`}
                                        alt={disasterPost.disaster_posts_proof[0]?.file_path}
                                        className="h-full w-full rounded-lg object-cover"
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

            <div className="my-5 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={prev_page_url || '#'} />
                        </PaginationItem>

                        {showEllipsisBefore && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {pagesToShow.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href={`/disaster-posts?page=${page}`}
                                    className={page === current_page ? 'active' : ''}
                                    isActive={page === current_page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {showEllipsisAfter && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationNext href={next_page_url || '#'} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    );
}
