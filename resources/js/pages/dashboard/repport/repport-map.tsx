import { MarkerRepport } from '@/components/repport/MarkerRepport';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { getRadiusColor } from '@/lib/utils/getRadiusColor';
import { useGetAddress } from '@/services/use-get-address';
import { BreadcrumbItem } from '@/types';
import { Location } from '@/types/location';
import { Repport } from '@/types/repport';
import { Head } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

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
    const LocationMarker = () => {
        const [newPin, setNewPin] = useState<Location>({ latitude: 0, longitude: 0 });
        const newPinMarkerRef = useRef(null);
        const addressState = useGetAddress({
            location: {
                latitude: newPin.latitude,
                longitude: newPin.longitude,
            },
        });

        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setNewPin({
                    latitude: lat,
                    longitude: lng,
                });
            },
        });

        useEffect(() => {
            if (newPin && newPin.latitude !== 0 && newPin.longitude !== 0 && newPinMarkerRef.current) {
                addressState.refetch();
                // @ts-expect-error type dont exist
                newPinMarkerRef.current.openPopup();
            }
        }, [newPin]);

        return (
            <>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                {allRepports.map((repport) => (
                    <>
                        <MarkerRepport key={repport.id} repport={repport} />
                        <Circle
                            center={[parseFloat(repport.latitude), parseFloat(repport.longitude)]}
                            radius={repport.radius}
                            color={getRadiusColor(repport.status)}
                            fillOpacity={0.2}
                        />
                    </>
                ))}
                {newPin.latitude != 0 && newPin.longitude != 0 ? (
                    <Marker
                        position={[newPin.latitude, newPin.longitude]}
                        interactive={false}
                        ref={newPinMarkerRef}
                        icon={L.icon({
                            iconUrl: '/img/marker.png',
                            iconSize: [40, 40],
                            popupAnchor: [0, -20],
                        })}
                    >
                        <Popup closeButton={false}>
                            {addressState.isLoading || addressState.isPending || addressState.isFetching ? (
                                <Skeleton className="mb-3 h-6 w-full" />
                            ) : addressState.isFetched ? (
                                <p className="text-sm font-medium">{addressState.data}</p>
                            ) : (
                                <p className="text-sm font-medium">Tidak ada alamat</p>
                            )}
                            <div className="grid place-content-center">
                                <Button className="mx-auto">Tambah Posko Bantuan</Button>
                            </div>
                        </Popup>
                    </Marker>
                ) : null}
            </>
        );
    };

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
                    <LocationMarker />
                </MapContainer>
            </div>
        </AppLayout>
    );
}
