import { SearchView } from "@/modules/search/ui/views/search-view";
import { VideoService } from "@/service/axios/videos/video";
import { useQuery } from "@tanstack/react-query";


export const dynamic="force-dynamic";

interface PageProps{
    searchParams:Promise<{
        query:string;
        category:string|undefined
    }>
}

const Page=async ({searchParams}:PageProps)=>{
    // http://localhost:8080/videos/search?keyword=Faker
    
    const {query}=await searchParams ;
   

    return(
        <div>
            <SearchView query={query}/>
        </div>
    )
}

export default Page