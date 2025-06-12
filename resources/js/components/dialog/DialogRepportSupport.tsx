import { Repport } from '@/types/repport';
import { HiUserCircle } from 'react-icons/hi';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

type DialogRepportSupportProps = {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    repport: Repport;
};

export const DialogRepportSupport = ({ isDialogOpen, setIsDialogOpen, repport }: DialogRepportSupportProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="mb-3">Daftar Orang Yang Mendukung</DialogTitle>
                <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                    {repport.repport_supports.length > 0 ? (
                        repport.repport_supports.map((item, index) => (
                            <div key={index}>
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <HiUserCircle className="text-primary" />
                                        <h1>{item.user.name}</h1>
                                    </div>
                                    <p className="text-xs font-medium">{new Date(item.created_at).toLocaleDateString('id-ID')}</p>
                                </div>
                                {index !== repport.repport_supports.length - 1 && <hr />}
                            </div>
                        ))
                    ) : (
                        <div className="py-4 text-center text-sm text-gray-500">Belum ada dukungan pada laporan ini.</div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
