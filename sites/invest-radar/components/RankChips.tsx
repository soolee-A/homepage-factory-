import type { Ranked } from "@/lib/types.ts";

export default function RankChips({ items, empty = "데이터 부족" }: { items: Ranked[]; empty?: string }) {
  if (items.length === 0) return <p className="text-sm text-muted">{empty}</p>;
  return (
    <ol className="flex flex-wrap gap-2">
      {items.map((k, i) => (
        <li key={k.name} className="chip">
          <span className="font-bold text-brand">{i + 1}</span>
          <span>{k.name}</span>
          <span className="text-muted">{k.count}</span>
        </li>
      ))}
    </ol>
  );
}
