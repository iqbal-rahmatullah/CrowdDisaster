import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

interface DialogDeleteRepportProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;

    onDelete: () => void;
}

export const DialogDeleteRepport = ({ isDialogOpen, setIsDialogOpen, onDelete }: DialogDeleteRepportProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="mb-3">Hapus Laporan</DialogTitle>
                <p>Apakah Anda yakin ingin menghapus laporan ini?</p>
                <div className="mt-4 flex justify-end space-x-3">
                    <Button variant="outline" size={'sm'} onClick={() => setIsDialogOpen(false)}>
                        Batalkan
                    </Button>
                    <Button variant="destructive" size={'sm'} onClick={() => onDelete()}>
                        Hapus
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
