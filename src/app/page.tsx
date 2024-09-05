'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { AddCartButton } from '@/components/button/add-cart-button';
import { Filtering } from '@/components/sections/filtering';
import { PageContainer } from '@/components/sections/page-container';
import { Card, CardContent } from '@/components/ui/card';

import { productServices } from '@/services/product.service';

export default function Home() {
  const { ref, inView } = useInView({ threshold: 1.0 });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState({
    field: '',
    order: '',
  });

  const { data: categories, isFetching: isLoadCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: productServices.listCategories,
  });

  const {
    data: productsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      'products-store',
      {
        limit: 12,
        skip: 0,
        sortBy: sortOrder.field,
        order: sortOrder.order,
        category: selectedCategory,
        q: search,
      },
    ],
    queryFn: productServices.list,
    initialPageParam: { skip: 0, limit: 10 },
    getNextPageParam: (lastPage, allPages) => {
      const totalProducts = lastPage.total;
      const loadedProducts = allPages.flatMap((page) => page.products).length;

      return loadedProducts < totalProducts
        ? { skip: loadedProducts, limit: 10 }
        : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === 'error') {
    return <div>Error loading products.</div>;
  }

  return (
    <PageContainer>
      <Filtering
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        categories={categories}
        isLoadCategory={isLoadCategory}
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSortOrder={setSortOrder}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData?.pages.map((page, index) =>
          page.products.length > 0 ? (
            page.products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="aspect-square rounded-md object-cover"
                  />
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold transition-all duration-100 hover:underline">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                  <div className="my-2 flex items-center justify-between">
                    <span className="font-bold">${product.price}</span>
                  </div>
                  <AddCartButton product={product} />
                </CardContent>
              </Card>
            ))
          ) : (
            <p key={index}>No products found</p>
          ),
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="mt-4 h-10">
        {status === 'pending' && <p>Loading...</p>}
        {isFetchingNextPage && (
          <div className="flex items-center justify-center">
            <p>Loading more products...</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
