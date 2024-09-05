'use client';

import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import useModal from '@/hooks/use-modal';

import { DashboardContainer } from '@/components/layouts/dashboard-container';
import { ModalForm } from '@/components/sections/products/modal-form';
import { columns } from '@/components/tables/product-tables/columns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

import { productServices } from '@/services/product.service';

import { TProduct } from '@/types/product';

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function ProductPage({ searchParams }: ParamsProps) {
  const page = Number(searchParams?.page) || 1;
  const pageLimit = Number(searchParams?.limit) || 10;
  const product = searchParams.q || null;

  const modalForm = useModal<{ data?: TProduct; mode: 'add' | 'edit' }>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      'products',
      {
        limit: pageLimit,
        skip: (page - 1) * pageLimit,
        q: product,
      },
    ],
    queryFn: productServices.list,
    select: (data) => data,
  });

  const pageCount = Math.ceil((data?.total || 0) / pageLimit);
  const breadcrumb = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Product', link: '/dashboard/product' },
  ];

  return (
    <DashboardContainer breadcrumb={breadcrumb}>
      <Card x-chunk="dashboard-product">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>Product</CardTitle>
            <CardDescription>Manage products.</CardDescription>
          </CardHeader>

          <Button
            className="mr-5"
            onClick={() => modalForm.open({ mode: 'add' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Product
          </Button>
        </div>

        <CardContent>
          <DataTable
            searchKey="title"
            pageNo={page}
            pageCount={pageCount}
            columns={columns}
            data={data?.products || []}
            isLoading={isLoading}
            isSearch
          />
        </CardContent>
      </Card>

      <ModalForm
        mode={modalForm.data?.mode}
        openModal={modalForm.isShow}
        data={modalForm.data?.data as TProduct}
        setOpenModal={(e) => !e && modalForm.setIsShow(e)}
        onRefetch={() => refetch()}
      />
    </DashboardContainer>
  );
}
