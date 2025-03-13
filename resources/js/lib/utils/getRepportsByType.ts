import { GetRepportTypeLabel, Repport, RepportType } from '@/types/repport';

export const getRepportsByType = (allRepports: Repport[]): { labels: string[]; counts: number[] } => {
    const counts = Object.values(RepportType).reduce(
        (acc, type) => {
            const count = allRepports.filter((r) => r.type === type).length;
            if (count > 0) acc[type] = count;
            return acc;
        },
        {} as Record<RepportType, number>,
    );

    return {
        labels: Object.keys(counts).map((key) => GetRepportTypeLabel[key as RepportType]),
        counts: Object.values(counts),
    };
};
