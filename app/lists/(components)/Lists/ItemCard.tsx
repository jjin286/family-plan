"use client";

import React, { SetStateAction } from 'react';
import { Checkbox, CloseButton } from '@mantine/core';
import { Item } from "@/db/Lists";


/**
 * Component to display item information on item card
 *
 * @param item - An object containg list items
 * @param handleDelete - Function to handle delete onclick action
 * @param handleUpdate - Function to handle edit onclick action
 * @returns An item card component
 *
 * {ItemContainer -> ItemCard -> Checkbox, CloseButton}
 */
export function ItemCard({item, handleDelete, handleUpdate} : {
    item : Item, show : React.Dispatch<React.SetStateAction<boolean>>,
    handleDelete : (item : Item) => Promise<void>,
    handleUpdate : (item : Item) => Promise<void>,
}){
    return(
        <div className="item-card">
            <Checkbox
                onChange={() => handleUpdate({...item, check : !item.check})}
                checked={item.check}
                label={item.text}
                description={item.note}
                size="md"
            />
            <CloseButton onClick={() => handleDelete(item)}/>
        </div>
    );
}