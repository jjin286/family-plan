"use client"

import React from 'react'
import { ListContainer } from './(components)/Lists/ListContainer';
import "./(components)/Lists/Lists.css"
import { useState, useEffect } from 'react';
import { getLists, createList, deleteListById } from '../../db/Lists';

export default function Lists(){
    const [lists, setLists] = useState([]);

    useEffect(() => {
        async function get(){
            const data = await getLists();
            setLists(data);
        }

        get();

    },[lists])

    function create(name : string){
        createList(name);
        setLists(lists => [...lists]);
    }

    function deleteList(id : number){
        deleteListById(id);
        setLists(lists => [...lists]);
    }

    return(
        <div className='lists'>
            <ListContainer lists={lists} create={create} deleteList={deleteList}/>
        </div>
    );
}
