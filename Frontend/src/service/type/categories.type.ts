
export interface ICategories{
    id:string;
    name:string;
    slug:string;
    created_at:string;
    update_at:string;
}
export interface ICreateCategories{
    name:string;
    slug:string;
}
export interface IUpdateCategory {
  id: string;
  name: string;
  slug: string;
}