import { BulletItem } from "@/features/project/domain";

interface BulletListProps {
  heading: string;
  items: BulletItem[];
}

export function BulletList({ heading, items }: BulletListProps) {
  return (
    <section className="space-y-4 leading-loose">
      <h3 className="mb-3 text-lg font-bold">{heading}</h3>

      <ul className="space-y-4 list-disc">
        {items.map((item, i) => (
          <li key={i} className="space-y-1">
            <p className="font-bold text-neutral-100">{item.title}</p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
