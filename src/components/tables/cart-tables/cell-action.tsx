'use client';

import useModal from '@/hooks/use-modal';

import { DetailCartModal } from '@/components/modals/detail-cart-modal';
import { Button } from '@/components/ui/button';

import { TCart } from '@/types/cart';

interface CellActionProps {
  data: TCart;
}

export default function CellAction({ data }: CellActionProps) {
  const modalForm = useModal<{ data?: TCart }>();

  return (
    <>
      <Button className="w-22" onClick={() => modalForm.open({ data })}>
        View Detail
      </Button>

      <DetailCartModal
        openModal={modalForm.isShow}
        setOpenModal={(e) => !e && modalForm.setIsShow(e)}
        data={modalForm.data?.data as TCart}
      />
    </>
  );
}
