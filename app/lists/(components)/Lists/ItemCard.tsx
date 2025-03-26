import React from 'react';
import { Checkbox, CloseButton } from '@mantine/core';
import { Item } from "@/db/Lists";

export function ItemCard(
    {item, handleDelete, handleCheck}:{
        item : Item,
        handleDelete : (id : number) => void,
        handleCheck : (id : number, check : boolean) => void
    }
){
    return(
        <div className="item-card">
            <Checkbox
                onChange={() => handleCheck(item.id, !item.check)}
                checked={item.check}
                label={item.text}
                description={item.note}
                size="md"
            />
            <CloseButton onClick={() => handleDelete(item.id)}/>
        </div>
    );
}