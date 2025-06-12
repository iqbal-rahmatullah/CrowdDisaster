import { GetRepportImpact, Repport, RepportImpact } from '@/types/repport';
import { BsBuildingFillExclamation } from 'react-icons/bs';
import { FaUsersSlash } from 'react-icons/fa';
import { FaBuildingUser, FaHouseCircleExclamation } from 'react-icons/fa6';
import { GiVillage } from 'react-icons/gi';

import { AddRepportImpactValidationSchema, repportImpactbValidationSchema } from '@/validation/repport-impact';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { DialogAddRepportImpact } from './DialogAddReportImpact';

type DialogShowReportImpactProps = {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    repport: Repport;
};

export const DialogShowReportImpact = ({ isDialogOpen, setIsDialogOpen, repport }: DialogShowReportImpactProps) => {
    const [isDialogAddReportImpactOpen, setIsDialogAddReportImpactOpen] = useState(false);

    const icons = {
        victim_died: <FaUsersSlash className="text-primary" />,
        victim_injured: <FaBuildingUser className="text-primary" />,
        damaged_house: <FaHouseCircleExclamation className="text-primary" />,
        damaged_building: <BsBuildingFillExclamation className="text-primary" />,
        damaged_village: <GiVillage className="text-primary" />,
    };

    const formAddReportImpact = useForm<AddRepportImpactValidationSchema>({
        resolver: zodResolver(repportImpactbValidationSchema),
        defaultValues: {
            victim_died: repport.repport_impacts?.victim_died ?? 0,
            victim_injured: repport.repport_impacts?.victim_injured ?? 0,
            damaged_house: repport.repport_impacts?.damaged_house ?? 0,
            damaged_building: repport.repport_impacts?.damaged_building ?? 0,
            damaged_village: repport.repport_impacts?.damaged_village ?? 0,
        },
    });

    const onSubmitAddReportImpact = (data: AddRepportImpactValidationSchema) => {
        router.post(`/repports/${repport.id}/impact`, data);

        setIsDialogAddReportImpactOpen(false);
        formAddReportImpact.reset();
    };

    useEffect(() => {
        formAddReportImpact.reset({
            victim_died: repport.repport_impacts?.victim_died ?? 0,
            victim_injured: repport.repport_impacts?.victim_injured ?? 0,
            damaged_house: repport.repport_impacts?.damaged_house ?? 0,
            damaged_building: repport.repport_impacts?.damaged_building ?? 0,
            damaged_village: repport.repport_impacts?.damaged_village ?? 0,
        });
    }, [repport, formAddReportImpact]);

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle className="mb-3">Dampak Bencana</DialogTitle>
                    <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                        {Object.entries(GetRepportImpact).map(([key, { title }]) => (
                            <div>
                                <div key={key} className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-x-2">
                                        {icons[key as keyof typeof icons]}
                                        <h1>{title}</h1>
                                    </div>
                                    <p className="text-xs font-medium">{repport.repport_impacts?.[key as keyof RepportImpact] ?? '0'}</p>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button
                            variant="default"
                            onClick={() => {
                                setIsDialogAddReportImpactOpen(true);
                                setIsDialogOpen(false);
                            }}
                        >
                            Edit Dampak Bencana
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <DialogAddRepportImpact
                form={formAddReportImpact}
                isDialogOpen={isDialogAddReportImpactOpen}
                setIsDialogOpen={setIsDialogAddReportImpactOpen}
                onSubmit={onSubmitAddReportImpact}
                key={repport.id}
            />
        </>
    );
};
