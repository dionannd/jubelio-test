'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { cn } from '@/lib/utils';

import ModalResponsive, {
  ModalResponsiveFooter,
} from '@/components/modals/modal-responsive';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { productServices } from '@/services/product.service';

import { TProduct } from '@/types/product';

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, { message: 'Please enter the field' }),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  stock: z.number(),
  thumbnail: z.string(),
});

type ProductFormValues = z.infer<typeof formSchema>;

type ModalFormProps = {
  openModal: boolean;
  data?: TProduct;
  mode?: 'edit' | 'add';
  setOpenModal: (open: boolean) => void;
  onRefetch?: () => void;
} & React.HTMLAttributes<HTMLFormElement>;

export function ModalForm({
  setOpenModal,
  openModal,
  mode,
  data,
  onRefetch,
  ...props
}: ModalFormProps) {
  const isNew = data?.id === 0;

  const title: Record<string, string> = {
    add: 'Add New Product',
    edit: 'Edit Product',
  };

  const defaultValues: ProductFormValues = {
    id: isNew ? 0 : Number(data?.id) || 0,
    title: data?.title || '',
    description: data?.description || '',
    category: data?.category || '',
    price: data?.price || 0,
    stock: data?.stock || 0,
    thumbnail: data?.thumbnail || 'https://placehold.co/400',
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, openModal, form.reset]);

  const { data: categories, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productServices.listCategories(),
  });

  const mutateCreate = useMutation({
    mutationKey: ['addProduct'],
    mutationFn: productServices.save,
  });

  const mutateUpdate = useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: productServices.update,
  });

  const onSubmit = async (value: ProductFormValues) => {
    const promise = async () => {
      if (mode === 'add') {
        await mutateCreate.mutateAsync(value).then(() => {
          onRefetch?.();
          form.reset();
          setOpenModal(false);
        });
      } else {
        await mutateUpdate.mutateAsync(value).then(() => {
          onRefetch?.();
          form.reset();
          setOpenModal(false);
        });
      }
    };

    toast.promise(promise, {
      loading: 'Processing...',
      success: `${title[mode as string]} successfully`,
      error: 'Oops, something went wrong',
    });
  };

  return (
    <ModalResponsive
      className={cn('w-full', props.className)}
      title={title[mode as string]}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-5 grid gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Product Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isFetching}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select Category"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {categories.map((item: string, index: number) => (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Stock"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <ModalResponsiveFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className={cn(
                  mutateCreate.isPending ? 'cursor-not-allowed' : '',
                )}
                variant="default"
                type="submit"
                disabled={mutateCreate.isPending}
              >
                {mutateCreate.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </ModalResponsiveFooter>
          </form>
        </Form>
      </div>
    </ModalResponsive>
  );
}
