'use client'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../components/Form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const registerSchema = z.object({
    email: z.string().email("formato de e-mail inválido"),
    senha: z.string().min(4, "senha precisa de 4 caracteres").nonempty("Não pode ser vazia"),
    counter: z.number().positive("O numero precisa ser positivo")
})

type TregisterSchema = z.infer<typeof registerSchema>

const page = () => {
    const [output, setOutput] = useState('')
    const registerForm = useForm<TregisterSchema>({
        resolver: zodResolver(registerSchema), defaultValues: {
            email: '',
            senha: ''
        }
    })


    const { handleSubmit, formState: { errors, isSubmitting }, watch } = registerForm

    const RegisterFormSubmit = (data: TregisterSchema) => {
        console.log(data)
        setOutput(JSON.stringify(data))
    }

    // const exec = () => {
    //     const objectError: Record<any, any> = {
    //         email: {
    //             message: "Erro no email"
    //         },
    //         senha: {
    //             message: "Erro na senha"
    //         }
    //     }
    //     let fieldName = "email"
    //     let transformToArray = fieldName.split(' ').reduce((res: Record<any, any>, key) => {
    //         console.log("res:", res); // Mostra o valor de res a cada iteração
    //         console.log("key:", key); // Mostra o valor de key a cada iteração
    //         return (res !== undefined && res !== null) ? res[key] : res;
    //     }, objectError);
    //     console.log("MESSAGE:", transformToArray.message.toString())
    // }



    return (
        <>
            <div>
                <FormProvider {...registerForm}>
                    <form onSubmit={handleSubmit(RegisterFormSubmit)} className='flex flex-col gap-4 w-full max-w-xs'>
                        <Form.Field>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Input type='text' name='email' />
                            <Form.ErrorMessage field="email" />
                        </Form.Field>
                        <Form.Field>
                            <Form.Label>
                                Senha
                            </Form.Label>
                            <Form.Input type='password' name='senha' />
                            <Form.ErrorMessage field="senha" />
                        </Form.Field>
                        <button className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600" type='submit' disabled={isSubmitting} >Criar</button>
                    </form>
                </FormProvider>
                <div>
                    {output}
                </div>
            </div>
        </>
    )
}


export default page

