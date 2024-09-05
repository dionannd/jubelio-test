'use client';

import { useQuery } from '@tanstack/react-query';

import { DashboardContainer } from '@/components/layouts/dashboard-container';
import { columns } from '@/components/tables/cart-tables/columns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

import { cartServices } from '@/services/cart.service';

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function CartPage({ searchParams }: ParamsProps) {
  const page = Number(searchParams?.page) || 1;
  const pageLimit = Number(searchParams?.limit) || 10;
  const cart = searchParams.q || null;

  const { data, isLoading } = useQuery({
    queryKey: [
      'carts',
      {
        limit: pageLimit,
        skip: (page - 1) * pageLimit,
        q: cart,
      },
    ],
    queryFn: cartServices.list,
    select: (data) => data,
  });

  const pageCount = Math.ceil((data?.total || 0) / pageLimit);
  const breadcrumb = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Cart', link: '/dashboard/cart' },
  ];

  return (
    <DashboardContainer breadcrumb={breadcrumb}>
      <Card x-chunk="dashboard-cart">
        <CardHeader>
          <CardTitle>Cart</CardTitle>
          <CardDescription>Manage list cart.</CardDescription>
        </CardHeader>

        <CardContent>
          <DataTable
            searchKey="title"
            pageNo={page}
            pageCount={pageCount}
            columns={columns}
            data={data?.carts || []}
            isLoading={isLoading}
            isSearch={false}
          />
        </CardContent>
      </Card>
    </DashboardContainer>
  );
}
