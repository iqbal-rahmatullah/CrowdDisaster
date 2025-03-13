import { getReportsByMonth } from '@/lib/utils/getReportsByMonth';
import { Repport } from '@/types/repport';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

export const RepportChartByMonth = ({ allRepports }: { allRepports: Repport[] }) => {
    const monthlyData = getReportsByMonth(allRepports);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
            {
                label: 'Jumlah Laporan',
                data: monthlyData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Statistik Laporan Bencana Per Bulan',
            },
        },
    };

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    return <Line data={data} options={options} height={200} />;
};
