import React from 'react';

import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createList } from '../../actions';
import { List } from "@/db/Lists";

type Props = {
    setShow : React.Dispatch<React.SetStateAction<boolean>>;
    handleAdd : (list : List) => void ;
    list? : List;
};

export function ListForm({ setShow, handleAdd, list } : Props){
    const form = useForm({
        // mode: 'uncontrolled',
        initialValues: {
            name: list ? list.name : '',
        },
      });

      function handleSubmit( values : typeof form.values ){
        const newList = {
            created_at: new Date().toISOString(),
            id: list ? list.id : Date.now(),
            name: values.name
        };
        handleAdd(newList);
        setShow(false);
        form.reset();
      }

    return(
        <form className="list-card" onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                className='list-input'
                size="lg"
                required
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <div className='button-section'>
                <Button type="submit">Submit</Button>
                <Button onClick={() => {
                    setShow(false);
                    form.reset();
                }}>Cancel</Button>
            </div>
        </form>
    );
}