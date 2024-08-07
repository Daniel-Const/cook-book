'use client'

import { FormEvent, useContext } from 'react'
import { useRouter } from "next/navigation"

import ListInput from './ListInput'
import { AlertContext, AlertType } from '@/context/AlertContext';

export default function CreateRecipe() {
    const router = useRouter()

    const alertContext = useContext(AlertContext);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const title = formData.get("title")

        const ingredients = []
        let value = formData.get("list-0")
        let i = 1
        while (value != null) {
            ingredients.push(value)
            value = formData.get(`list-${i}`)
            i++
        }

        const method = formData.get("method")

        // TODO: API Request to save recipe
        // On save -> Check status of request, trigger alert and go back to recipe list
        router.push("/recipe")
        alertContext?.trigger(AlertType.Info, "Succesfully created new recipe!")
    }

    return (
        <>
            <h1 className="text-2xl">Add a recipe!</h1>
            <form onSubmit={onSubmit}>
                <div className="flex-row">
                    <div className="mt-8">
                        <label className="block mb-2 text-sm font-medium text-white">Title</label>
                        <input className="text-black pl-2" type="text" id="title" name="title" />
                    </div>
                    <div className="mt-8">
                        <label className="block mb-2 text-sm font-medium text-white">Ingredients</label>
                        <ListInput />
                    </div>
                    <div className="mt-8">
                        <label className="block mb-2 text-sm font-medium text-white">Method</label>
                        <textarea className="text-black pl-2" id="method" name="method" rows={8} cols={40} />
                    </div>
                    <div className="text-center mt-8" >
                        <button className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-300" type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
