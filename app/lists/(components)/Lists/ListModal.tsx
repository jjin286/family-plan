"use client";

import React from "react";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { PencilOff } from 'lucide-react';

interface Item{
    created_at: string;
    id: number;
    list_id: number;
    text: string | null;
}

interface Items extends Array<Item>{}

export function ListModal({items}:{items: Items}){
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Header is sticky">
                {items.map(item => <p>{item.text}</p>)}
            </Modal>
            <ActionIcon onClick={open} size={42} variant="default" aria-label="ActionIcon with size as a number">
                <PencilOff />
            </ActionIcon>
        </>
    );
}