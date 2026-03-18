import index from "./docsIndex.generated.json";

export type DocSection = {
  route: string;
  sectionId: string;
  sectionTitle: string;
  text: string;
};

const SECTIONS = index as DocSection[];

export function searchSections(query: string, limit = 8): DocSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  return SECTIONS
    .map((s) => {
      const hay = `${s.sectionTitle} ${s.text}`.toLowerCase();

      // prefer exact phrase match
      if (hay.includes(q)) {
        return { s, score: tokens.length + 3 };
      }

      // split into words for proximity/word-boundary checks
      const words = hay.split(/\W+/).filter(Boolean);

      // try to find tokens in order with small proximity window
      let lastPos = -1;
      const positions: number[] = [];
      for (const t of tokens) {
        const idx = words.findIndex((w, i) => i > lastPos && (w === t || w.startsWith(t)));
        if (idx === -1) {
          positions.length = 0;
          break;
        }
        positions.push(idx);
        lastPos = idx;
      }

      if (positions.length === tokens.length) {
        const span = positions[positions.length - 1] - positions[0];
        // accept only if tokens occur within small window (e.g. 3 words)
        if (span <= 3) {
          return { s, score: tokens.length + Math.max(0, 3 - span) };
        }
      }

      return { s, score: 0 };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.s);
}
