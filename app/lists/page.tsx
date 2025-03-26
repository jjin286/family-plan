"use client"

import React from 'react'
import { ListContainer } from './(components)/Lists/ListContainer';
import "./(components)/Lists/Lists.css"
import { useState, useEffect } from 'react';
import { getLists, createList, deleteListById, List } from '../../db/Lists';

export default function Lists(){
    const [lists, setLists] = useState<Array<List>>([]);

    useEffect(() => {
        async function get(){
            const data = await getLists();
            setLists(data);
        }

        get();

    },[])

    function create(name : string){
        createList(name);
        setLists(lists => [...lists, {
            created_at: "now",
            id: 0,
            name: name}]);
    }

    function deleteList(id : number){
        deleteListById(id);
        setLists(lists.filter((list) => list.id !== id));
    }

    return(
        <div className='lists'>
            <ListContainer lists={lists} create={create} deleteList={deleteList}/>
        </div>
    );
}
