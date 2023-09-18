'use client'
import { useForm, FieldValues } from "react-hook-form"
import { useState } from 'react'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    email: z.string().email("Formato de e-mail inválido").nonempty("o campo não pode ser vazio"),
    password: z.string().nonempty("O campo senha não pode ser vazio").min(4, "A senha tem que ter mais que 4 caracteres")
})

type TformSchema = z.infer<typeof formSchema>

const ConventionalForm = () => {
    const [output, setOutput] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<TformSchema>({ resolver: zodResolver(formSchema) })
    const onSubmit = (data: TformSchema) => {
        setOutput(JSON.stringify(data))
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-slate-800">
                <form onSubmit={handleSubmit(onSubmit)} className=" w-full flex  flex-col items-center justify-center max-w-lg">

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" {...register('email')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        {errors.email?.message}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" {...register('password')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        {errors.password?.message}
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                </form>

                <div className="bg-teal-500 absolute bottom-80 flex flex-col">
                    {output}
                </div>
            </div>
        </>
    )
}

export default ConventionalForm


// Zod → VALIDAÇÃO e TRANSFORMAÇÃO dos dados
// Schema → serve pra criar as validações dos campos
// Pra fazer validações mais avançadas → usar o refine, com ele posso percorrer os campos e validá-los
// Pra transaformar os dados ao enviar o form → transform


// Resolver → vai ligar o schema com o formularios e seus respectivos campos
// Criamos a tipagem por inferencia dos nosso schema e tipamos o useForm com ele e o data do nosso submit também



// Register : registra o campo do nosso formulario  com um nome
// HandleSubmit →  serve pra pevenir o evento padrão do form, vai ser usado no onSubmit do nosso form
//  getValues vs watch : o watch capta os valores cada vez que um valor for adicionado no campo, já o getvalues vai captar os valores quando você definir, com um click por ex ou na submissão do form.

// setValue →Quando a gente precisar definir dinamicamente um campo
// ShouldValidate → determina se deve validar um campo após o valor ser atualizado através do setValue
// ShouldDirty → pega o valor default do campo e verifica se ele foi modificado 
// ShouldTouch → se o campo foi tocado