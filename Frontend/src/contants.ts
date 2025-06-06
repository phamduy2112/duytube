export function parseVideoData(content: string) {
  const titlesMatch = content.match(/Tiêu đề hấp dẫn:[\s\S]*?(?=Mô tả video:|$)/);
  const descriptionMatch = content.match(/Mô tả video:[\s\S]*?(?=Thẻ tags gợi ý:|$)/);

  const titles = titlesMatch
    ? titlesMatch[0]
        .replace(/Tiêu đề hấp dẫn:/, "")
        .split("\n")
        .map((line) => line.replace(/^\s*[\d\.\)\"]+\s*/, "").trim())
        .filter(Boolean)
    : [];

  const videoDescription = descriptionMatch
    ? descriptionMatch[0].replace(/Mô tả video:/, "").trim()
    : "";



  return { titles, videoDescription };
}
export function truncateWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}