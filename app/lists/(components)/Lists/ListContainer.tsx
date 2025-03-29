"use client"
import React from 'react';
import { ListCard } from "./ListCard";
import { CirclePlus } from 'lucide-react';
import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';
import "./Lists.css";
import { useState, useOptimistic, useTransition, useEffect } from 'react';
import { createList, deleteListById, updateList } from "../../actions";
import { ListForm } from "./ListForm";

interface List{
    created_at: string;
    id: number;
    name: string;
};

interface Lists extends Array<List>{}

type Action = {
    type : string,
    list : List
}

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

    async function handleEdit(list : List){
        startTransition(() => {
            setOptimisticList({ type: "update", list});
        });



        try {
            await updateList(list.id, list.name);
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