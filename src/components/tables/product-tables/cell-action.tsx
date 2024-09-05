'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import useModal from '@/hooks/use-modal';

import { AlertModal } from '@/components/modals/alert-modal';
import { ModalForm } from '@/components/sections/products/modal-form';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { productServices } from '@/services/product.service';

import { TProduct } from '@/types/product';

interface CellActionProps {
  data: TProduct;
}

export default function CellAction({ data }: CellActionProps) {
  const queryClient = useQueryClient();
  const modalForm = useModal<{ data?: TProduct; mode: 'add' | 'edit' }>();

  const [open, setOpen] = useState(false);

  const mutateDelete = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: productServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      toast.success('Deleted product successfully');
      setOpen(false);
    },
    onError: () => {
      toast.error('Oops, terjadi kesalahan');
    },
  });

  const onConfirm = async () => {
    const promise = async (id: number) => {
      await mutateDelete.mutateAsync(id);
    };

    toast.promise(promise(data.id as number), {
      loading: 'Processing...',
      success: `Deleted product successfully`,
      error: 'Oops, terjadi kesalahan',
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={mutateDelete.isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tools</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => modalForm.open({ data, mode: 'edit' })}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModalForm
        mode={modalForm.data?.mode}
        openModal={modalForm.isShow}
        data={modalForm.data?.data as TProduct}
        setOpenModal={(e) => !e && modalForm.setIsShow(e)}
        onRefetch={() => {
          queryClient.invalidateQueries({
            queryKey: ['products'],
          });
        }}
      />
    </>
  );
}
