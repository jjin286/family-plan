

import React from 'react'
import { ListContainer } from './(components)/Lists/ListContainer';
import "./(components)/Lists/Lists.css"
import { useState, useEffect } from 'react';
import { getLists } from './actions';

export default async function Lists(){
    const lists = await getLists();

    return(
        <div className='lists'>
            <ListContainer props={lists}/>
        </div>
    );
}
