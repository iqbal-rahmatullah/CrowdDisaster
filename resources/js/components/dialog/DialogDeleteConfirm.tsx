import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

interface DialogDeleteConfirmProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    onDelete: (id: unknown) => void;
    id: unknown;
    title: string;
    body: string;
}

export function DialogDeleteConfirm({ isDialogOpen, setIsDialogOpen, onDelete, id, title, body }: DialogDeleteConfirmProps) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="mb-3">{title}</DialogTitle>
                <p>{body}</p>
                <div className="mt-4 flex justify-end space-x-3">
                    <Button variant="outline" size={'sm'} onClick={() => setIsDialogOpen(false)}>
                        Batalkan
                    </Button>
                    <Button variant="destructive" size={'sm'} onClick={() => onDelete(id)}>
                        Hapus
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
