import { SearchView } from "@/modules/search/ui/views/search-view";


export const dynamic="force-dynamic";

interface PageProps{
    searchParams:Promise<{
        query:string;
        category:string|undefined
    }>
}

const Page=async ({searchParams}:PageProps)=>{
    const {query,categoryId}=await searchParams;
    return(
        <div>
            <SearchView query={query} categoryId={categoryId}/>
        </div>
    )
}

export default Page