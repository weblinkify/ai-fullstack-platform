type ProjectCardProps = {
  name: string;
  status: string;
  description: string;
};

export function ProjectCard({
  name,
  status,
  description,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 transition hover:border-white/20">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium">{name}</h3>

        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/60">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-white/40">
        {description}
      </p>

      <button type="button" className="mt-5 text-sm text-white/70 transition hover:text-white">
        View project →
      </button>
    </div>
  );
}