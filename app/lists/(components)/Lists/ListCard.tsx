
import React from 'react';

import "./Lists.css";
import { Trash2, Pencil } from 'lucide-react';
import { ActionIcon } from '@mantine/core';
// import { ListModal } from './ListModal';
import { List } from '@/db/Lists'
import Link from 'next/link';
import { useState } from "react";
import { deleteListById } from '../../actions';
import { ListForm } from "./ListForm";


export function ListCard({list, handleDelete, handleEdit }:{list: List, handleDelete : (list : List) => void, handleEdit : (list : List) => void}){
    const [edit, setEdit] = useState(false);

    if(!edit)
    return(
        <div className="list-card">
            <Link className="list-title" href={`/lists/${list.id}`}>
                <h3>{list.name}</h3>
            </Link>
            <div className='button-section'>
                <ActionIcon onClick={() => setEdit(true)} size={42} variant="default" aria-label="ActionIcon with size as a number">
                    <Pencil />
                </ActionIcon>
                <ActionIcon onClick={() => handleDelete(list)} size={42} variant="default" aria-label="ActionIcon with size as a number">
                    <Trash2 />
                </ActionIcon>
            </div>
        </div>
    );

    return(
        <ListForm setShow={setEdit} handleAdd={handleEdit} list={list}/>
    );
}