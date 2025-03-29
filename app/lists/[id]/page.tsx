import React from 'react';
import { getItems } from "../actions";
import { Item, Items } from "../../../db/Lists";
import { ItemCard } from '../(components)/Lists/ItemCard';
import { ItemContainer } from '../(components)/ItemContainer';

export default async function List({ params }:{ params:{ id: string } }){
    const { id } = await params;

    const list : Items = await getItems(parseInt(id));

    return(
        <div>
            <ItemContainer />
            {
                list.map((item : Item) => (
                    <div>
                        <ItemCard key={item.id} item={item} />
                    </div>
                ))
            }
        </div>
    );
}