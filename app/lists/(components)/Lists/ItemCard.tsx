"use client";

import React from 'react';
import { Checkbox, CloseButton } from '@mantine/core';
import { Item } from "@/db/Lists";

export function ItemCard({item, item : Item}){
    return(
        <div className="item-card">
            <Checkbox
                // onChange={() => handleCheck(item.id, !item.check)}
                defaultChecked
                checked={item.check}
                label={item.text}
                description={item.note}
                size="md"
            />
            {/* <CloseButton onClick={() => handleDelete(item.id)}/> */}
        </div>
    );
}