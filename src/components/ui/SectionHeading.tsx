export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-base text-ink/70">{description}</p>}
    </div>
  );
}
