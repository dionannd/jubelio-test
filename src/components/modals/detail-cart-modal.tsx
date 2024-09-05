import Image from 'next/image';

import { cn } from '@/lib/utils';

import ModalResponsive from '@/components/modals/modal-responsive';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { TCart } from '@/types/cart';

type DetailCartModalProps = {
  openModal?: boolean;
  setOpenModal?: (open: boolean) => void;
  data: TCart;
} & React.HTMLAttributes<HTMLDivElement>;

export function DetailCartModal({
  openModal,
  setOpenModal,
  data,
  ...props
}: DetailCartModalProps) {
  return (
    <ModalResponsive
      className={cn('w-full max-w-2xl', props.className)}
      title="Detail Cart"
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <ScrollArea>
        {data?.products.length > 0 &&
          data?.products.map((product, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                    priority
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-bold">{product.title}</h3>
                    <p className="text-xs text-gray-500">
                      {product.quantity} x ${product.price}
                    </p>
                  </div>
                </div>
                <h3>${product.total}</h3>
              </div>
            </div>
          ))}
      </ScrollArea>
      <Separator />
      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">${data?.total}</span>
        </div>
      </div>
    </ModalResponsive>
  );
}
