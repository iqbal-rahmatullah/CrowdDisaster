import { DashboardStatisticCardProps } from '@/types';

export function CardStatisticDashboard({ title, value, icon: Icon }: DashboardStatisticCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{title}</h3>
                <Icon />
            </div>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}
