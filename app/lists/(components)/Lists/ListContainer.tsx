"use client"
import React from 'react';
import { ListCard } from "./ListCard";
import { CirclePlus } from 'lucide-react';
import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';
import "./Lists.css";
import { useState } from 'react';



interface List{
    created_at: string;
    id: number;
    name: string;
};

interface Lists extends Array<List>{}

export function ListContainer({lists, create, deleteList}:{lists: Lists, create: (name:string) => void, deleteList:(id : number) => void}){
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");

    function handleCreate(){
        create(value);
        setValue("");
        setShow(false);
    }

    function handleCancel(){
        setValue("");
        setShow(false);
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
            {show && (
                <div className='list-card'>
                    <TextInput
                        size="lg"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        required
                        className='list-input'
                    />
                    <div className='button-section'>
                        <Button onClick={handleCreate}>Add</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>
            )}
            {lists && lists.map(list => <ListCard key={list.id} list={list} deleteList={deleteList}/>)}

        </div>
    );
}