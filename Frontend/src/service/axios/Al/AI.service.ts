import { parseVideoData } from "@/contants";

export async function generateVideoData(description: string): Promise<
 any
> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: "Bạn là một AI hỗ trợ sáng tạo nội dung YouTube bằng tiếng Việt." },
        { role: "user", content: `Dựa trên mô tả sau: "${description}", hãy cung cấp:\n- 3 tiêu đề hấp dẫn\n- 1 đoạn mô tả video khoảng 100-200 từ` },
      ],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? "";

  return parseVideoData(content);
}
