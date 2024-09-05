'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import CellAction from '@/components/tables/product-tables/cell-action';

import { TProduct } from '@/types/product';

export const columns: ColumnDef<TProduct>[] = [
  {
    id: 'thumbnail',
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.thumbnail}
          width={64}
          height={64}
          alt="thumbnail product"
          className="aspect-square rounded-md object-cover"
        />
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
