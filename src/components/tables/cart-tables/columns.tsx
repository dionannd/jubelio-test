'use client';

import { ColumnDef } from '@tanstack/react-table';

import CellAction from '@/components/tables/cart-tables/cell-action';

import { TCart } from '@/types/cart';

export const columns: ColumnDef<TCart>[] = [
  {
    id: 'title',
    cell: ({ row }) => <CellAction data={row.original as TCart} />,
  },
  {
    header: 'Total',
    cell: ({ row }) => <div>${row.original.total}</div>,
  },
  {
    accessorKey: 'totalProducts',
    header: 'Total Products',
  },
  {
    accessorKey: 'totalQuantity',
    header: 'Total Quantity',
  },
];
