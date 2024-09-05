'use client';

import { Package2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { navigation } from '@/constant/navigation';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          {navigation.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
