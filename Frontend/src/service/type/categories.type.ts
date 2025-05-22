import { Video } from "@mux/mux-node/resources/index.mjs";


export interface ICategory {
  id: string;
  name: string;
  slug: string;
  created_at?: Date;
  updated_at?: Date;
  videos: Video[];
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
