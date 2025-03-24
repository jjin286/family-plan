'use client'
import React from 'react';

import "./Lists.css";
import { Trash2 } from 'lucide-react';
import { ActionIcon } from '@mantine/core';
import { ListModal } from './ListModal';
import { useState, useEffect } from 'react';
import { getListItems } from '../../../../db/Lists';


interface List{
    created_at: string;
    id: number;
    name: string;
};

export function ListCard({list, deleteList}:{list: List, deleteList : (id:number) => void}){
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        async function getItems(id : number){
            const data  = await getListItems(id);
            setListItems(data);
        }

        getItems(list.id);

    },[])


    return(
        <div className="list-card">
            <h3>{list.name}</h3>
            <div className='button-section'>
                <ListModal list={list} items={listItems}/>
                <ActionIcon onClick={() => deleteList(list.id)}size={42} variant="default" aria-label="ActionIcon with size as a number">
                    <Trash2 />
                </ActionIcon>
            </div>
        </div>
    );
}