import { FC, PropsWithChildren, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces/entry';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState{
     entries: Entry[];
}
const Entries_INITIAL_STATE: EntriesState = {
     entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Prueba inicio1',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'En-Progreso: Prueba inicio2',
            status: 'in-progress',
            createdAt: Date.now()-1000000,
        },
        {
            _id: uuidv4(),
            description: 'Terminadas: Prueba inicio3',
            status: 'finished',
            createdAt: Date.now()-100000,
        }
    ],
}
export const EntriesProvider:FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const AddNewEntry=(description:string)=>{
        const newEntry:Entry={
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }
        dispatch({type: '[Entry] - Add Entry', payload: newEntry});

    }
    return (
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            AddNewEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}