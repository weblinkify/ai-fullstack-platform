import AIChat from "@/components/AIChat";
import Footer from "@/components/Footer";

const pipeline = [
  { title: "Idea", description: "Describe" },
  { title: "Architect", description: "Design" },
  { title: "Build", description: "Generate" },
  { title: "Review", description: "Validate" },
  { title: "Deploy", description: "Ship" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-12">
        <section className="flex flex-1 flex-col items-center">
          <div className="w-full max-w-5xl">
            <AIChat />
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-5xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {pipeline.map((item, index) => (
              <PipelineItem
                key={item.title}
                number={String(index + 1).padStart(2, "0")}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

function PipelineItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="text-[10px] tracking-widest text-white/20">
        {number}
      </div>

      <div className="mt-3 text-sm font-medium text-white/70">
        {title}
      </div>

      <div className="mt-1 text-xs text-white/25">
        {description}
      </div>
    </div>
  );
}