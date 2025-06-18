import { convertToIndonesianDate } from '@/lib/utils/convertTime';
import { Repport } from '@/types/repport';
import { HiUserCircle } from 'react-icons/hi';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

type DialogShowProlemReportProps = {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    repport: Repport;
};

export const DialogShowProblemReport = ({ isDialogOpen, setIsDialogOpen, repport }: DialogShowProlemReportProps) => {
    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle className="mb-3">Daftar Orang Yang Melaporkan</DialogTitle>
                    <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                        {repport.problem_repport?.length ? (
                            repport.problem_repport.map((problem) => {
                                return (
                                    <div key={problem.id} className="mb-4 rounded-md border p-5">
                                        <div className="flex gap-x-2">
                                            <HiUserCircle className="text-primary h-12 w-12" />
                                            <div className="flex flex-col">
                                                <p className="font-semibold">{problem.user.name}</p>
                                                <p className="mb-2 text-xs text-gray-400">
                                                    {convertToIndonesianDate(new Date(problem.created_at).toLocaleString())}
                                                </p>
                                                <p className="text-sm">{problem.reason}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex h-[400px] items-center justify-center">
                                <p className="text-center text-gray-500">Tidak ada laporan masalah yang ditemukan.</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
