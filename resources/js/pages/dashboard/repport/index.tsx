import { RepportCard } from '@/components/repport/RepportCard';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
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

export default function AllRepportPage({ allRepports }: { allRepports: Repport[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Semua Laporan" />
            <div className="grid grid-cols-1 gap-4 px-5 pt-5 md:grid-cols-2 lg:grid-cols-4">
                {allRepports.map((repport) => (
                    <RepportCard key={repport.id} repport={repport} />
                ))}
            </div>
        </AppLayout>
    );
}
