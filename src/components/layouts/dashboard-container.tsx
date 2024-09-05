import AuthLayout from '@/components/layouts/auth-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

import { MobileNav } from './mobile-nav';
import { PageBreadcrumb } from './page-breadcrumb';
import { Sidebar } from './sidebar';
import { UserNav } from './user-nav';

import { TBreadcrumb } from '@/types/breadcrumb';

type DashboardContainerProps = {
  children: React.ReactNode;
  breadcrumb?: TBreadcrumb[];
  scrollable?: boolean;
};

export function DashboardContainer({
  children,
  breadcrumb,
  scrollable = false,
}: DashboardContainerProps) {
  return (
    <AuthLayout>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <PageBreadcrumb breadcrumb={breadcrumb} />
            <div className="relative ml-auto flex-1 md:grow-0"></div>
            <UserNav />
          </header>
          {scrollable ? (
            <ScrollArea className="h-[calc(100dvh-52px)]">
              <div className="h-full p-4 md:px-8">{children}</div>
            </ScrollArea>
          ) : (
            <div className="h-full p-4 md:px-8">{children}</div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
