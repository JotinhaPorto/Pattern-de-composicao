'use client'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

function MyForm() {
    const { control, handleSubmit } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const onSubmit = (data: any) => {
        const id = { ...data, selectField: data.selectField.id }
        console.log(data.selectField);
        console.log(id)
    };
    const toggle = () => {
        setIsOpen((value) => !value)
    }
    const outdoors = [
        { id: 1, label: 'Opção 1' },
        { id: 2, label: 'Opção 2' },
        { id: 3, label: 'Opção 3' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="selectField" onClick={toggle}>Selecione uma opção:</label>
                <Controller
                    name="selectField"
                    control={control}
                    defaultValue="" // Define um valor padrão para o campo
                    rules={{ required: 'Este campo é obrigatório' }} // Adicione regras de validação, se necessário
                    render={({ field, fieldState }) => (
                        <>
                            <input type="text" readOnly defaultValue={field.value.label} />
                            <div {...field}>
                                {isOpen && (
                                    <ul className='rounded border border-slate-600 max-w-sm' >
                                        {outdoors.map((item) => (
                                            <li key={item.id} className='hover:bg-slate-300 cursor-pointer' onClick={() => field.onChange(item)}>{item.label}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {fieldState?.error && (
                                <p>{fieldState?.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
}

export default MyForm;