import { XIcon } from 'lucide-react';

import useMediaQuery from '@/hooks/use-media-query';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

export interface ModalResponsiveProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  openModal?: boolean;
  setOpenModal?: (open: boolean) => void;
  title?: string;
}

export default function ModalResponsive({
  openModal,
  setOpenModal,
  title,
  children,
  className,
}: ModalResponsiveProps) {
  const isMobile = useMediaQuery(768);

  if (isMobile) {
    return (
      <Drawer open={openModal} onOpenChange={setOpenModal}>
        <DrawerContent>
          <DrawerHeader className="flex items-center justify-between px-6 py-6 text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerClose>
              <XIcon className="h-4 w-4" />
            </DrawerClose>
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className={className || 'max-w-4xl'}>
        {!!title && (
          <DialogHeader>
            <DialogTitle className="text-lg">{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function ModalResponsiveFooter({
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const isMobile = useMediaQuery(768);
  if (isMobile) {
    return <DrawerFooter {...props}>{children}</DrawerFooter>;
  }

  return <DialogFooter {...props}>{children}</DialogFooter>;
}
