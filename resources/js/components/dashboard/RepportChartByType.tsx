import { getRepportsByType } from '@/lib/utils/getRepportsByType';
import { Repport } from '@/types/repport';
import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export const RepportChartByType = ({ allRepports }: { allRepports: Repport[] }) => {
    const { labels, counts } = getRepportsByType(allRepports);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Jumlah Laporan',
                data: counts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Statistik Laporan Bencana' },
        },
    };

    ChartJS.register(ArcElement, Tooltip, Legend);

    return <Pie data={data} options={options} />;
};
