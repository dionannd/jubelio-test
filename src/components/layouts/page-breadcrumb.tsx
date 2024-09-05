import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { TBreadcrumb } from '@/types/breadcrumb';

type PageBreadcrumbProps = {
  breadcrumb?: TBreadcrumb[];
};

export function PageBreadcrumb({ breadcrumb }: PageBreadcrumbProps) {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumb?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.link}>{item.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
