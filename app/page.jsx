// app/page.jsx
import { Suspense } from 'react';
import DashboardContent from '../app/components/dashboardContent';

export default function Dashboard() {
  return (
    <div className="h-screen w-full flex">
      <div className="bg-zinc-900 w-full sm:w-[9/12] h-full pt-28 sm:pt-0">
        <Suspense fallback={<p className="p-8">Loading dashboard...</p>}>
          <DashboardContent />
        </Suspense>
      </div>
    </div>
  );
}