import AppLayout from '@/layouts/app-layout';
import { getIconMarker } from '@/lib/utils/getIconMarker';
import { getRadiusColor } from '@/lib/utils/getRadiusColor';
import { BreadcrumbItem } from '@/types';
import { Repport } from '@/types/repport';
import { Head } from '@inertiajs/react';
import 'leaflet/dist/leaflet.css';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

//Breadcrumb
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Pemantauan Map',
        href: '/repports/map',
    },
];

export default function RepportMapPage({ allRepports }: { allRepports: Repport[] }) {
    console.log(allRepports);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pemantauan Map" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <MapContainer
                    center={[-7.279057311066713, 112.79032117546787]}
                    zoom={16}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                    doubleClickZoom={false}
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                    {allRepports.map((repport) => (
                        <>
                            <Marker
                                key={repport.id}
                                position={[parseFloat(repport.latitude), parseFloat(repport.longitude)]}
                                icon={getIconMarker(repport)}
                            >
                                <Popup>
                                    <img src={`/img/dummy/${repport.repport_proofs[0].file_path}`} className="h-[180px] w-full rounded-lg"></img>
                                    <strong>{repport.title}</strong>
                                    <br />
                                    {repport.description}
                                    <br />
                                    📍 {repport.address}
                                    <br />
                                    🕒 {new Date(repport.created_at).toLocaleString()}
                                </Popup>
                            </Marker>

                            <Circle
                                center={[parseFloat(repport.latitude), parseFloat(repport.longitude)]}
                                radius={repport.radius}
                                color={getRadiusColor(repport.status)}
                                fillOpacity={0.2}
                            />
                        </>
                    ))}
                </MapContainer>
            </div>
        </AppLayout>
    );
}
