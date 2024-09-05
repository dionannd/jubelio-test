import { Star } from 'lucide-react';
import Image from 'next/image';

import apiInstance from '@/lib/api-instance';

import { AddCartButton } from '@/components/button/add-cart-button';
import { ShareButton } from '@/components/button/share-button';
import { PageContainer } from '@/components/sections/page-container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { TProduct } from '@/types/product';

type DetailProductPageProps = {
  params: {
    productId: string;
  };
};

export default async function DetailProductPage({
  params,
}: DetailProductPageProps) {
  const response = await apiInstance.get(
    `/products/${Number(params.productId)}`,
  );
  const product = response.data as TProduct;

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Images */}
          <div>
            <Carousel className="mx-auto w-full max-w-xs">
              <CarouselContent>
                {product?.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      alt={`${product.title} - View ${index + 1}`}
                      width={400}
                      height={400}
                      className="rounded-lg"
                      priority
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
            <div className="mb-4 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product?.rating as number) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product?.reviews?.length} reviews)
              </span>
            </div>
            <p className="mb-4 text-2xl font-bold">
              ${product.price.toFixed(2)}
            </p>
            <p className="mb-4">{product.description}</p>

            {/* Quantity Selection */}
            <div className="mb-4 flex items-center gap-2">
              <Label htmlFor="quantity">Stock</Label>
              <Input
                type="number"
                min="1"
                className="w-20 text-center"
                value={product.stock}
                disabled
              />
            </div>

            {/* Add to Cart and Wishlist */}
            <div className="mb-4 flex space-x-2">
              <AddCartButton product={product} />
            </div>

            {/* Share */}
            <ShareButton data={product} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
