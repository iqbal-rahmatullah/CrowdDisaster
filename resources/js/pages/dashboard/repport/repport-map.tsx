import FormAddDisasterPost from '@/components/disaster-post/FormAddDisasterPost';
import { MarkerDisasterPost } from '@/components/disaster-post/MarkerPostDisaster';
import { MarkerRepport } from '@/components/repport/MarkerRepport';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { AddDisasterPostValidationSchema, disasterPostValidationSchema } from '@/components/validation/disaster-post';
import AppLayout from '@/layouts/app-layout';
import { getRadiusColor } from '@/lib/utils/getRadiusColor';
import { useGetAddress } from '@/services/use-get-address';
import { BreadcrumbItem } from '@/types';
import { DisasterPost } from '@/types/disaster-post';
import { Location } from '@/types/location';
import { Repport } from '@/types/repport';
import { zodResolver } from '@hookform/resolvers/zod';

import { Head, router } from '@inertiajs/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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

interface RepportMapPageProps {
    allRepports: Repport[];
    allDisasterPost: DisasterPost[];
    success?: string;
    error?: string;
}

export default function RepportMapPage({ allRepports, allDisasterPost }: RepportMapPageProps) {
    const LocationMarker = () => {
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const form = useForm<AddDisasterPostValidationSchema>({
            resolver: zodResolver(disasterPostValidationSchema),
            defaultValues: {
                address: '',
                contact: '',
                description: '',
                latitude: '',
                longitude: '',
                quota: 0,
                title: '',
            },
        });

        const onSubmit = (values: AddDisasterPostValidationSchema) => {
            router.post('/disaster-posts', values);

            setIsDialogOpen(false);
            form.reset();
        };

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
                {isDialogOpen ? (
                    <div className="fixed inset-0 z-[9980] bg-black/40 backdrop-blur-sm">
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" opacity={0.1} />
                    </div>
                ) : (
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                )}
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
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <DialogTrigger asChild>
                                        <div className="flex justify-center">
                                            <Button
                                                onClick={() => {
                                                    form.setValue('latitude', newPin.latitude.toString());
                                                    form.setValue('longitude', newPin.longitude.toString());
                                                    form.setValue('address', addressState.data);
                                                }}
                                            >
                                                Tambah Posko Bencana
                                            </Button>
                                        </div>
                                    </DialogTrigger>
                                </div>
                                {isDialogOpen && (
                                    <DialogContent className="z-[9999] sm:max-w-[425px]">
                                        <FormAddDisasterPost form={form} onSubmit={onSubmit} />
                                    </DialogContent>
                                )}
                            </Dialog>
                        </Popup>
                    </Marker>
                ) : null}
                {allDisasterPost.map((disasterPost) => (
                    <MarkerDisasterPost key={disasterPost.id} post={disasterPost} />
                ))}
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
