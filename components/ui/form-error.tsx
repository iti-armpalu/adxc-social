import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormErrorProps {
    message?: string
    className?: string
}

export function FormError({ message, className }: FormErrorProps) {
    if (!message) return null
    return (
        <p
            role="alert"
            className={cn(
                "flex items-center gap-1.5 text-xs text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200",
                className
            )}
        >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {message}
        </p>
    )
}