"use client"
import React from 'react';
import { ListCard } from "./ListCard";
import { CirclePlus } from 'lucide-react';
import { Button } from '@mantine/core';
import { useState, useOptimistic, useTransition } from 'react';
import { createList, deleteListById, updateList } from "../../actions";
import { ListForm } from "./ListForm";
import { List, Lists } from "@/db/Lists";
import "./Lists.css";

/**
 * type for handling useOptimistic hook
 */
type Action = {
    type : string,
    list : List
}

/**
 * Component to contain list of ItemCard components, holds the logic of the page
 *
 * @param props - An object containing list of a family's list
 * @returns A container div for List components
 *
 * {/app/lists -> ListContainer -> ListForm, ListCard, Button}
 */
export function ListContainer({props}:{props: Lists}){
    const [show, setShow] = useState(false);
    const [optimisticList, setOptimisticList] = useOptimistic(props,
        (state, action : Action) => {
            switch (action.type){
                case "add":
                    return [...state, action.list];

                case "delete":
                    return state.filter((list) => list.id !== action.list.id);

                case "update":
                    return state.map((list) => list.id === action.list.id ? action.list : list);

                default:
                return state;
            }
        }
    );

    const [_, startTransition] = useTransition();

     /**
     * Handle adding list to database
     * @param list - New list to be added to database
     */
    async function handleAdd(list : List){
        startTransition(() => {
            setOptimisticList({ type: "add", list : list });
        });

        try {
            await createList(list.name);
        } catch (error) {
            console.error("Error adding list:", error);
        }
    }

    /**
     * Handle deleting list from database
     * @param list - New list to be added to database
     */
    async function handleDelete(list : List){
        startTransition(() => {
            setOptimisticList({ type: "delete", list});
        });

        try {
            await deleteListById(list.id);
        } catch (error) {
            console.error("Error deleting list:", error);
        }
    }
    /**
     * Handle editing of list to database
     * @param list - List to be edited in database
     */
    async function handleEdit(list : List){
        startTransition(() => {
            setOptimisticList({ type: "update", list});
        });

        try {
            await updateList(list.id, list.name, list.description);
        } catch (error) {
            console.error("Error updating list:", error);
        }
    }

    return(
        <div className="list-container">
            <div className='heading'>
                <h1>The "Family" Lists</h1>
                <Button
                    onClick={() => setShow((show) => !show)}
                    variant="filled"
                    rightSection={<CirclePlus size={14} />}>
                    <p>New List</p>
                </Button>
            </div>
            {show && <ListForm setShow={setShow} handleAdd={handleAdd}/>}
            {optimisticList && optimisticList.map(list => <ListCard key={list.id} list={list} handleDelete={handleDelete} handleEdit={handleEdit}/>)}
            {optimisticList.length === 0 && <h1>Add new lists!</h1>}
        </div>
    );
}