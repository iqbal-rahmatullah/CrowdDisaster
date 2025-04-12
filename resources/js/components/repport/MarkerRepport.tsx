import { convertToIndonesianDate } from '@/lib/utils/convertTime';
import { getIconMarker } from '@/lib/utils/getIconMarker';
import { GetRepportStatusBackground, GetRepportStatusLabel, Repport } from '@/types/repport';
import { Link } from '@inertiajs/react';
import { HiCalendar, HiLocationMarker } from 'react-icons/hi';
import { Marker, Popup } from 'react-leaflet';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const MarkerRepport = ({ repport }: { repport: Repport }) => {
    return (
        <Marker key={repport.id} position={[parseFloat(repport.latitude), parseFloat(repport.longitude)]} icon={getIconMarker(repport)}>
            <Popup>
                <div className="relative mb-4 h-[180px] w-full overflow-hidden rounded-lg">
                    <img src={`/img/dummy/${repport.repport_proofs[0].file_path}`} className="h-full w-full object-cover" alt="Bukti laporan" />
                    <div className="absolute bottom-2 left-2">
                        <Badge className={`${GetRepportStatusBackground[repport.status]}`}>{GetRepportStatusLabel[repport.status]}</Badge>
                    </div>
                </div>

                <h2 className="text-lg font-bold">{repport.title}</h2>
                <p>{repport.description}</p>
                <div className="flex items-center gap-x-2">
                    <HiLocationMarker className="text-primary flex-shrink-0 text-lg" />
                    <p className="text-xs font-medium">{repport.address}</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <HiCalendar className="text-primary flex-shrink-0 text-lg" />
                    <p className="text-xs font-medium">{convertToIndonesianDate(new Date(repport.created_at).toLocaleString())}</p>
                </div>

                <div className="mt-4 text-center">
                    <Link href={`/repports/${repport.id}`} className="w-full">
                        <Button>Lihat Selengkapnya</Button>
                    </Link>
                </div>
            </Popup>
        </Marker>
    );
};
