import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

interface DialogDeletePostDisasterProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    onDelete: () => void;
}

export const DialogDeletePostDisaster = ({ isDialogOpen, setIsDialogOpen, onDelete }: DialogDeletePostDisasterProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="mb-3">Hapus Posko Bencana</DialogTitle>
                <p>Apakah Anda yakin ingin menghapus posko bencana ini?</p>
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
