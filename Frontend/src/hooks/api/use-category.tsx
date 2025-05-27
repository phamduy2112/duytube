// hooks/useApiCategory.ts
import categoriesApi from '@/service/axios/categories/categories.api';
import { useQuery } from '@tanstack/react-query';

export const useApiCategory = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn:()=> categoriesApi.getCategory(),
    staleTime: 5 * 60 * 1000, // optional: cache 5 phút
  });
};
