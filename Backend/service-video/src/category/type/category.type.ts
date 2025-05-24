export interface ICategory {
  id: string;
  name: string;
  slug: string;
  created_at?: Date | null;  // <-- cho phép null hoặc undefined
  updated_at?: Date | null;  // <-- cho phép null hoặc undefined
}