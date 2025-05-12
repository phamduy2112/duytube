import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { useUser } from "@clerk/nextjs";
import { Form } from "react-hook-form";

interface CommentFormProps{
    videoId:string;
    parentId?:string;
    onSuccess?:()=>void;
    onCancel?:()=>void;
    variant?:"comment"|"reply"

}

const handleCancel=()=>{
    // form.reset();
    onCancel?.();
}

export const CommentForm=({
    videoId,
    parentId,
    onCancel,
    onSuccess,
    variant="comment"

}:CommentFormProps)=>{
    const {user}=useUser()

    return (
<Form>
<form className="flex gap-4 group">
            <UserAvatar
                size="lg"
                imageUrl={user?.imageUrl||"/placeholder.svg"}
                name={user?.username||"User"}
            />
            <div className="flex-1">
                <FormField name="value" render={({field})=>(
                        <FormItem>
                            <FormControl>
                            <Textarea
                            {...field}
                placeholder={
                    variant==="reply" ?"Reply to this comment" : "Add a comment"
                }
                className="resize-none bg-transparent overflow-hidden min-h-0"
                
                ></Textarea>
                            
                            </FormControl>
                        </FormItem>
                )}>
             
                </FormField>
           
                <div className="justify-end gap-2 mt-2 flex">
                    {
                        onCancel && (
                            <Button variant="ghost" type="button" onClick={handleCancel}>Cancel</Button>
                        )
                    }
                    <Button type="submit" size="sm">
                        {variant==="reply" ? "Reply":"Comment"}
                    </Button>
                </div>
            </div>
        </form>
</Form>
    )
}


