'use client';

import { Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { TProduct } from '@/types/product';

type ShareButtonProps = {
  data: TProduct;
};

export function ShareButton({ data }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: `Check out this product: ${data.title}`,
          url: window.location.href,
        });
        // eslint-disable-next-line no-console
        console.log('Product shared successfully');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error sharing:', error);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('Sharing not supported');
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      type="button"
      onClick={handleShare}
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share this Product
    </Button>
  );
}
