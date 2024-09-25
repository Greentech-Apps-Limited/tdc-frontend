import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ExitConfirmationModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const ExitConfirmationModal = ({ onConfirm, onCancel }: ExitConfirmationModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle>Exit Quiz</DialogTitle>
          <DialogDescription>
            Are you sure you want to exit the game? Progress so far will be updated to your profile
            and leaderboard.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" className="min-w-48 rounded-full" onClick={onConfirm}>
            Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitConfirmationModal;
