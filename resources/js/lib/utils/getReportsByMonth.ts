import { Repport } from '@/types/repport';

export const getReportsByMonth = (reports: Repport[]) => {
    const monthlyCounts = new Array(12).fill(0);

    reports.forEach((report) => {
        const date = new Date(report.created_at);
        const month = date.getMonth();
        monthlyCounts[month]++;
    });

    return monthlyCounts;
};
