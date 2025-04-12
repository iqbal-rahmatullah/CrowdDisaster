import { convertToIndonesianDate } from '@/lib/utils/convertTime';
import { GetRepportStatusBackground, GetRepportStatusLabel, Repport } from '@/types/repport';
import { Link } from '@inertiajs/react';
import { HiCalendar, HiLocationMarker } from 'react-icons/hi';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

export const RepportCard = ({ repport }: { repport: Repport }) => {
    return (
        <Link href={`/repports/${repport.id}`} className="w-full">
            <Card className="cursor-pointer">
                <CardContent>
                    <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-lg">
                        <img src={`/img/dummy/${repport.repport_proofs[0].file_path}`} className="h-full w-full object-cover" alt="Bukti laporan" />
                        <div className="absolute bottom-2 left-2">
                            <Badge className={`${GetRepportStatusBackground[repport.status]}`}>{GetRepportStatusLabel[repport.status]}</Badge>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold">{repport.title}</h2>
                    <div className="w-full max-w-sm">
                        <p className="truncate text-sm">{repport.description}</p>
                    </div>

                    <div className="mt-3 mb-2 flex items-center gap-x-2">
                        <HiLocationMarker className="text-primary flex-shrink-0 text-lg" />
                        <p className="text-xs font-medium">{repport.address}</p>
                    </div>
                    <div className="mb-2 flex items-center gap-x-2">
                        <HiCalendar className="text-primary flex-shrink-0 text-lg" />
                        <p className="text-xs font-medium">{convertToIndonesianDate(new Date(repport.created_at).toLocaleString())}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
