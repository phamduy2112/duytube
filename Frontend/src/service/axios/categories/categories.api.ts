import { ICategories, ICreateCategories, IUpdateCategory } from "@/service/type/categories.type";
import { axiosWithAuth } from "../axios.config";
import axios, { AxiosResponse } from "axios";

class CategoriesService{
    async createCategory({name,slug}:ICreateCategories):Promise<any>{
        try {

            const response=await axiosWithAuth.post('category',{name,slug});
            return response.data


            
        } catch (error) {
            console.error("Tạo bài viết thất bại:", error);
    throw error;
        }
    
    }
    async getCategory():Promise<any>{
        try {
            const response=await axiosWithAuth.get<ICategories[]>("category");
            return response.data
        } catch (error) {
            console.error("Tạo bài viết thất bại:", error);
    throw error;
        }
    }


async putCategory(dataForm: IUpdateCategory): Promise<ICategories> {
  try {
    const { id, name, slug } = dataForm;
    const response: AxiosResponse<ICategories> = await axiosWithAuth.put(`category/${id}`, {
      name,
      slug
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi cập nhật danh mục:", error);
    throw error;
  }
}


}

export default new CategoriesService();
