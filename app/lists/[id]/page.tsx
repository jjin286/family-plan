import React from 'react';
import { getItems, getListById } from "../actions";
import { Item, Items, List } from "../../../db/Lists";
import { ItemCard } from '../(components)/Lists/ItemCard';
import { ItemContainer } from '../(components)/Lists/ItemContainer';
//TODO:

export default async function List({ params }:{ params:{ id: string } }){
    const { id } = await params;

    const list : List = await getListById(parseInt(id));
    const listItems : Items = await getItems(parseInt(id));

    return(
        <div>
            <ItemContainer list={list} items={listItems}/>
        </div>
    );
}