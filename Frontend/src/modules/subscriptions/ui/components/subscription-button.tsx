import {Button,ButtonProps} from '@/components/ui/button'
import { cn } from '@/lib/utils';

interface SubscriptionButtonProps{
    onClick:ButtonProps["onClick"];
    disabled:boolean;
    isSuscribed:boolean;
    className?:string
    size?:ButtonProps["size"]
}

export const SubscriptionButton=({
    onClick,
    disabled,
    isSuscribed,
    className,
    size,
}:SubscriptionButtonProps)=>{
    return (
        <Button
        size={size}
        variant={isSuscribed?"secondary":"default"}
        className={cn("rounded-full",className)}
        onClick={onClick}
        disabled={disabled}
        >{isSuscribed?"Unsubscribe":"Subbcribe"}</Button>
    )
}