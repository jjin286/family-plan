import React from 'react';

import { Button, Checkbox, Group, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createList } from '../../actions';
import { List } from "@/db/Lists";
//TODO:
type Props = {
    setShow : React.Dispatch<React.SetStateAction<boolean>>;
    handleAdd : (list : List) => void ;
    list? : List;
};
//TODO:
export function ListForm({ setShow, handleAdd, list } : Props){
    const form = useForm({
        initialValues: {
            name: list ? list.name : '',
            description : list ? list.description : '',
        },
      });
//TODO:
      function handleSubmit( values : typeof form.values ){
        const newList = {
            created_at: new Date().toISOString(),
            id: list ? list.id : Date.now(),
            name: values.name,
            description: values.description,
        };
        handleAdd(newList);
        setShow(false);
        form.reset();
      }

    return(
        <form className="list-form" onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                // className='list-input'
                size="lg"
                required
                placeholder='Name'
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <Textarea
                // className='list-input'
                size="lg"
                placeholder='Description'
                key={form.key('description')}
                {...form.getInputProps('description')}
            />
            <div className='button-section'>
                <Button type="submit">Submit</Button>
                <Button color='red' onClick={() => {
                    setShow(false);
                    form.reset();
                }}>Cancel</Button>
            </div>
        </form>
    );
}