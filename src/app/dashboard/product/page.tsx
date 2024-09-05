'use client';

import { useQuery } from '@tanstack/react-query';

import { DashboardContainer } from '@/components/layouts/dashboard-container';
import { columns } from '@/components/tables/product-tables/columns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

import { productServices } from '@/services/product.service';

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function ProductPage({ searchParams }: ParamsProps) {
  const page = Number(searchParams?.page) || 1;
  const pageLimit = Number(searchParams?.limit) || 10;
  const product = searchParams.q || null;

  const { data: products, isLoading } = useQuery({
    queryKey: [
      'products',
      {
        limit: pageLimit,
        skip: (page - 1) * pageLimit,
        q: product,
      },
    ],
    queryFn: productServices.list,
    select: (data) => data.products,
  });

  const pageCount = Math.ceil((products?.length || 0) / pageLimit);
  const breadcrumb = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Product', link: '/dashboard/product' },
  ];

  return (
    <DashboardContainer breadcrumb={breadcrumb}>
      <Card x-chunk="dashboard-product">
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>Manage your products.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            searchKey="title"
            pageNo={page}
            pageCount={pageCount}
            columns={columns}
            data={products || []}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </DashboardContainer>
  );
}
