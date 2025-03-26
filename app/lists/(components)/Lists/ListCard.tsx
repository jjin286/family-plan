
import React from 'react';

import "./Lists.css";
import { Trash2 } from 'lucide-react';
import { ActionIcon } from '@mantine/core';
import { ListModal } from './ListModal';


export function ListCard({list, deleteList}:{list: List, deleteList : (id:number) => void}){

    return(
        <div className="list-card">
            <h3>{list.name}</h3>
            <div className='button-section'>
                <ListModal list={list} />
                <ActionIcon onClick={() => deleteList(list.id)}size={42} variant="default" aria-label="ActionIcon with size as a number">
                    <Trash2 />
                </ActionIcon>
            </div>
        </div>
    );
}