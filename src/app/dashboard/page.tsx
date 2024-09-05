import { DashboardContainer } from '@/components/layouts/dashboard-container';

export default function DashboardPage() {
  const breadcrumb = [{ name: 'Dashboard', link: '/dashboard' }];

  return (
    <DashboardContainer breadcrumb={breadcrumb}>
      <div>Dashboard</div>
    </DashboardContainer>
  );
}
