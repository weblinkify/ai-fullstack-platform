import Footer from "@/components/Footer";

import { ActivityChart } from "./components/ActivityChart";
import { AIPipeline } from "./components/AIPipeline";
import { DashboardHeader } from "./components/DashboardHeader";
import { MetricsGrid } from "./components/MetricsGrid";
import { RecentProjects } from "./components/RecentProjects";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#212121] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <DashboardHeader />

        <MetricsGrid />

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <ActivityChart />
          <AIPipeline />
        </section>

        <RecentProjects />

        <Footer />
      </div>
    </main>
  );
}