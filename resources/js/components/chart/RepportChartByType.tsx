import { getRepportsByType } from '@/lib/utils/getRepportsByType';
import { Repport } from '@/types/repport';
import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
            datalabels: {
                display: true,
                color: '#fff',
                formatter: (value, context) => {
                    // @ts-expect-error Is possible nul
                    const total: number = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                    const percentage = (value / total) * 100;
                    return `${percentage.toFixed(2)}%`;
                },
                font: {
                    weight: 'bold',
                },
            },
        },
    };

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

    if (allRepports.length == 0) {
        return (
            <div className="h-auto w-full items-center justify-center py-64">
                <h6 className="text-center">Belum ada laporan yang terjadi</h6>
            </div>
        );
    }

    return <Pie data={data} options={options} />;
};
