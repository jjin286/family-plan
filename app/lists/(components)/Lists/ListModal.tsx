"use client";

import React, { useState } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { PencilOff, CirclePlus } from 'lucide-react';
import { ItemCard } from "./ItemCard";
import { TextInput, Textarea } from '@mantine/core';

interface Item{
    created_at: string;
    id: number;
    list_id: number;
    text: string | null;
}

interface List{
    created_at: string;
    id: number;
    name: string;
};

interface Items extends Array<Item>{}
const b = [{created_at: "a", id:1, list_id: 6, text:"This is an item 1"}]

export function ListModal({items, list}:{items: Items, list: List}){
    const [opened, { open, close }] = useDisclosure(false);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    function handleSave(){

    }

    function handleCancel(){
        setTitle("");
        setNote("");
        setShow(!show);
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
                <Button>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </div>
        </div>
    )

    return (
        <>
            <Modal opened={opened} onClose={close} title={list.name}>
                {show && itemForm}
                {!show && (
                    <div className="item-buttons">
                        <Button
                            onClick={() => setShow((show) => !show)}
                            variant="filled"
                            rightSection={<CirclePlus size={14} />}>
                            <p>New Item</p>
                        </Button>
                    </div>
                )}
                {b.map(item => <ItemCard item={item} />)}
            </Modal>
            <ActionIcon onClick={open} size={42} variant="default" aria-label="ActionIcon with size as a number">
                <PencilOff />
            </ActionIcon>
        </>
    );
}