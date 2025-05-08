import { CardStatisticDashboard } from '@/components/CardStatisticDashboard';
import { RepportChartByMonth } from '@/components/dashboard/RepportChartByMonth';
import { RepportChartByType } from '@/components/dashboard/RepportChartByType';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Repport } from '@/types/repport';
import { Head } from '@inertiajs/react';
import { ChartArea, House, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export interface DashboardProps {
    repportCount: number;
    userCount: number;
    disasterPostCount: number;
    allRepports: Repport[];
}

export default function Dashboard({ repportCount, userCount, allRepports, disasterPostCount }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <CardStatisticDashboard title={'Jumlah Bencana'} value={repportCount} icon={ChartArea} />
                    <CardStatisticDashboard title={'Jumlah Posko Bencana'} value={disasterPostCount} icon={House} />
                    <CardStatisticDashboard title={'Jumlah Pengguna'} value={userCount} icon={User} />
                </div>
                <div className="flex flex-col gap-x-0 gap-y-5 md:flex-row md:gap-x-5 md:gap-y-0">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border flex w-full overflow-hidden rounded-xl border md:w-1/2">
                        <RepportChartByMonth allRepports={allRepports} />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border flex w-full overflow-hidden rounded-xl border md:w-1/2">
                        <RepportChartByType allRepports={allRepports} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
