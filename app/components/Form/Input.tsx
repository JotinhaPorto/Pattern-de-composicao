import { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
}

export const Input = ({ ...props }: InputProps) => {

    const { register } = useFormContext()

    return (
        <input
            className="flex-1 rounded border border-zinc-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
            {...register(props.name)}
            id={props.name}
            {...props}
        />
    )
}