"use client";

import React from 'react';
import { useState, useOptimistic, useTransition, useEffect } from 'react';
import { ItemCard } from "./ItemCard";
import { Button } from '@mantine/core';
import { Item, List, Items } from "@/db/Lists";
import { ItemForm } from "./ItemForm";
import { createItem, deleteItem, updateItem } from "../../actions"
import "./Lists.css";

/**
 * type for handling useOptimistic hook
 */
type Action = {
    type : string,
    item : Item
}

/**
 * Component to contain list of ItemCard components, holds the logic of the page
 *
 * @param list - An object containing the parent list for the list items
 * @param items - An array of Item objects that belong to the parent list
 * @returns A container div for Item components
 *
 * {/app/lists/[id] -> ItemContainer -> ItemForm, ItemCard, Button}
 */
export function ItemContainer({ list, items } : { list : List, items : Items }){
    const [show, setShow] = useState<boolean>(false);
    const [optimisticItems, setOptimisticItems] = useOptimistic(items,
        (state, action : Action) => {
            switch (action.type){
                case "add":
                    return [...state, action.item];

                case "delete":
                    return state.filter((item : Item) => item.id !== action.item.id);

                case "update":
                    return state.map((item : Item) => item.id === action.item.id ? action.item : item);

                default:
                return state;
            }
        }
    );

    const [_, startTransition] = useTransition();

    /**
     * Handle adding item to database
     * @param item - New item to be added to database
     */
    async function handleAdd(item : Item){
        startTransition(() => {
            setOptimisticItems({ type: "add", item : item });
        });

        try {
            await createItem(list.id, item.text, item.note);
        } catch (error) {
            console.error("Error adding item:", error);
        }
    }


    /**
     * Handle deleting item from database
     * @param item - Item to be deleted from database
     */
    async function handleDelete(item : Item){
        startTransition(() => {
            setOptimisticItems({ type: "delete", item});
        });

        try {
            await deleteItem(list.id, item.id);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    /**
     * Handle editing of item to database
     * @param item - Item to be edited in database
     */
    async function handleEdit(item : Item){
        startTransition(() => {
            setOptimisticItems({ type: "update", item});
        });

        try {
            await updateItem(list.id, item.id, item.text, item.note, item.check);
        } catch (error) {
            console.error("Error updating item:", error);
        }
    }

    return (
        <div className="list-container">
            <h1>{list.name}</h1>
            <p>{list.description}</p>

            {show &&  <ItemForm handle={handleAdd} show={setShow} /> }
            {!show && <Button onClick={() => setShow(true)}>Add new item</Button>}

            {optimisticItems.map( (item : Item) => (
                <ItemCard key={item.id} item={item} show={setShow} handleDelete={handleDelete} handleUpdate={handleEdit}/>
            ))}
        </div>
    );
}