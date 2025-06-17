import { RepportCard } from '@/components/card/RepportCard';
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
import { BreadcrumbItem, PaginatedData } from '@/types';
import { Repport } from '@/types/repport';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Semua Laporan',
        href: '#',
    },
];

export default function AllRepportPage({ allRepports }: { allRepports: PaginatedData<Repport> }) {
    const { current_page, prev_page_url, last_page, next_page_url } = allRepports;

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
            <Head title="Semua Laporan" />
            <div className="grid grid-cols-1 gap-4 px-5 pt-5 md:grid-cols-2 lg:grid-cols-4">
                {allRepports.data.map((repport) => (
                    <RepportCard key={repport.id} repport={repport} />
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
                                    href={`/repports?page=${page}`}
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
