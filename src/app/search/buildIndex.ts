export type DocIndexItem = {
  route: string;
  title: string;
  text: string;
};

function firstLineTitle(raw: string) {
  const line = raw.split("\n").find((l) => l.trim().length > 0);
  return line?.trim() ?? "Untitled";
}

function normalizeText(raw: string) {
  return raw.replace(/\s+/g, " ").trim();
}


const searchFiles = import.meta.glob("../docs/**/*.search.txt", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const DOC_INDEX: DocIndexItem[] = Object.entries(searchFiles).map(([path, raw]) => {
  // ../docs/auth.search.txt -> auth
  const base = path.split("/").pop()?.replace(".search.txt", "") ?? "doc";

  return {
    route: `/${base}`,
    title: firstLineTitle(raw),
    text: normalizeText(raw),
  };
});
