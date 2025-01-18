import { AddButton } from '@/components/recipe/AddButton';
import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import { IngredientData } from '@/pages/api/recipe';

export interface Ingredient {
    name: string;
    quantity: string;
    id?: number;
}

export default function IngredientList({
    ingredients,
    onChange
}: {
    ingredients: Ingredient[];
    onChange: (ingredients: Ingredient[]) => void;
}) {
    const [inputs, _setInputs] = useState<Ingredient[]>(ingredients);

    const setInputs = (ingredients: Ingredient[]) => {
        _setInputs(ingredients);
        onChange(ingredients);
    };

    function extendList() {
        setInputs([...inputs, { name: '', quantity: '' }]);
    }

    function deleteAtIndex(index: number) {
        const newInputs = [...inputs];
        if (index >= 0 && inputs.length > index) {
            newInputs.splice(index, 1);
            setInputs(newInputs);
        }
    }

    function setNameAtIndex(value: string, index: number) {
        const newInputs = [...inputs];
        newInputs[index].name = value;
        setInputs(newInputs);
    }

    function setQuantityAtIndex(value: string, index: number) {
        const newInputs = [...inputs];
        newInputs[index].quantity = value;
        setInputs(newInputs);
    }

    return (
        <>
            <ul>
                {inputs.map((_, index) => (
                    <li key={index}>
                        <div className="flex gap-4 columns-3 pb-2">
                            <input
                                className="text-black p-2.5 rounded"
                                type="text"
                                name={'name-' + index}
                                value={inputs[index].name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNameAtIndex(e.target.value, index)
                                }
                                placeholder="Name"
                            />
                            <input
                                className="text-black p-2.5 rounded"
                                type="text"
                                name={'qty-' + index}
                                value={inputs[index].quantity}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setQuantityAtIndex(e.target.value, index)
                                }
                                placeholder="Quantity"
                            />

                            <button
                                type="button"
                                className="text-white pl-3 pr-3 pt-2 pb-2 bg-red-500 hover:bg-red-300 rounded-full"
                                onClick={() => deleteAtIndex(index)}
                            >
                                <Delete></Delete>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                type="button"
                className="text-white pl-3 pr-3 pt-2 pb-2 bg-blue-500 hover:bg-blue-300 rounded-full"
                onClick={extendList}
            >
                <Add></Add>
            </button>
            <br />
        </>
    );
}
