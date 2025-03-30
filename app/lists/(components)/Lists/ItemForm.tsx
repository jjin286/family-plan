'use client'

import React, { SetStateAction } from 'react';
import { TextInput, Textarea, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Item } from '@/db/Lists';

//TODO:
export function ItemForm({handle, show, item} : {handle :(item: Item) => Promise<void>, show : React.Dispatch<SetStateAction<boolean>>, item? : Item}) {
    const form = useForm({
        initialValues: {
            text: item ? item.text : '',
            note : item ? item.note : '',
        },
      });
//TODO:
      function handleSubmit( values : typeof form.values ){
        const newItem = {
            created_at: new Date().toISOString(),
            id: item ? item.id : Date.now(),
            list_id: item ? item.list_id : Date.now(),
            text: values.text,
            note: values.note,
            check: false,
        };
        handle(newItem);
        show(false);
        form.reset();
      }

    return (
        <form className="item-form" onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                size="lg"
                required
                placeholder='Text'
                key={form.key('text')}
                {...form.getInputProps('text')}
            />
            <Textarea
                size="lg"
                placeholder='Notes'
                key={form.key('note')}
                {...form.getInputProps('note')}
            />
            <div className='button-section'>
                <Button type="submit">Submit</Button>
                <Button color='red' onClick={() => {
                    show(false);
                    form.reset();
                }}>Cancel</Button>
            </div>
        </form>
    )
}