"use client";

import React, { useState, useEffect } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { PencilOff, CirclePlus } from 'lucide-react';
import { ItemCard } from "./ItemCard";
import { TextInput, Textarea } from '@mantine/core';
import { Item, List, Items, createItem, getListItems, deleteItem, checkItem } from "@/db/Lists";

const b = [{created_at: "a", id:1, list_id: 6, text:"This is an item 1"}]

export function ListModal({ list }:{ list: List}){
    const [opened, { open, close }] = useDisclosure(false);
    const [show, setShow] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [listItems, setListItems] = useState<Array<List>>([]);

    useEffect(() => {
        async function getItems(id : number){
            const data  = await getListItems(id);
            setListItems(data);
        }

        getItems(list.id);

    },[])

    function handleSave(){
        createItem(list.id, title, note);
        setListItems((items: Item) => [...items, {
            created_at: "now",
            id: 0,
            list_id: list.id,
            text: title,
            note: note,
            check: false
        }])
        setTitle("");
        setNote("");
        setShow(false);
    }

    function handleDelete(id : number){
        deleteItem(id);
        setListItems(listItems.filter((item) => item.id !== id));
    }

    function handleCancel(){
        setTitle("");
        setNote("");
        setShow(!show);
    }

    function handleCheck(id : number, check : boolean){
        checkItem(id, check);
        setListItems(listItems.map((item : Item) => {
            if(item.id === id){
                return {...item, check : !item.check}
            }
            return {...item}
        }))
    }

    const itemForm = (
        <div className="item-form">
            <TextInput
                size="md"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
                required
                placeholder="Title"
                className="item-input"
            />
            <Textarea
                size="md"
                placeholder="Additional information"
                value={note}
                onChange={(event) => setNote(event.currentTarget.value)}
            />
            <div className="button-section">
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel} color="red">Cancel</Button>
            </div>
        </div>
    )

    return (
        <>
            <Modal opened={opened} onClose={close} title={list.name}>
                {show && itemForm}
                {!show && (
                    <div className="item-buttons">
                        {/* <Button
                            onClick={() => setShow((show) => !show)}
                            variant="filled"
                            rightSection={<PencilOff size={14} />}>
                            <p>Edit</p>
                        </Button> */}
                        <Button
                            onClick={() => setShow((show) => !show)}
                            variant="filled"
                            rightSection={<CirclePlus size={14} />}>
                            <p>New </p>
                        </Button>
                    </div>
                )}
                {listItems.length === 0 && <p>Add items to the list</p>}
                {listItems.map(item => <ItemCard key={item.id} handleDelete={handleDelete} handleCheck={handleCheck} item={item} />)}
            </Modal>
            <ActionIcon onClick={open} size={42} variant="default" aria-label="ActionIcon with size as a number">
                <PencilOff />
            </ActionIcon>
        </>
    );
}