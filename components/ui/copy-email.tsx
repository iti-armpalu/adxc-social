"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function CopyEmail({ email }: { email: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
        >
            <span>{email}</span>
            <span className="text-muted-foreground group-hover:text-primary transition-colors">
                {copied
                    ? <Check className="w-3.5 h-3.5 text-green-600" />
                    : <Copy className="w-3.5 h-3.5" />
                }
            </span>
            {copied && (
                <span className="text-xs text-green-600">Copied!</span>
            )}
        </button>
    )
}