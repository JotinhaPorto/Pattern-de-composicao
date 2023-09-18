import { LabelHTMLAttributes } from "react"

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export const Label = ({ ...props }: LabelProps) => {
    return <label className="text-sm text-zinc-600 flex items-center justify-between" {...props} />
}