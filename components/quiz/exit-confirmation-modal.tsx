import { useTranslations } from 'next-intl';
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
  isOpen: boolean;
};

const ExitConfirmationModal = ({ onConfirm, onCancel, isOpen }: ExitConfirmationModalProps) => {
  const t = useTranslations('ExitConfirmationModal');

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-[95vw] rounded-xl sm:max-w-md">
        <DialogHeader className="space-y-6">
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4 ">
          <Button variant="outline" className="rounded-full" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button variant="destructive" className="min-w-48 rounded-full" onClick={onConfirm}>
            {t('exit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitConfirmationModal;
