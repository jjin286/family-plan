import React from 'react';

import { AvatarCard } from './(components)/AvatarCard';
//TODO:
export default function Family(){
    return(
        <div className='family'>
            <div className='banner'>
              Meet the "Family"!
            </div>
            <div className='card-container'>
                <AvatarCard />
                <AvatarCard />
            </div>
            <div className='family-list'>

            </div>
            <div className='family-poll'>

            </div>
            <div className='family-wheel'>

            </div>
            <div className='family-calendar'>

            </div>
            <div className='family-todo'>

            </div>
            <div className='family-schedule'>

            </div>
            <div className='family-announcement'>

            </div>
            <div className='family-meal'>

            </div>
            <div className='family-photos'>

            </div>
            <div className='family-messages'>

            </div>
        </div>
    );
}