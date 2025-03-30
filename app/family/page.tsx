"use client";
import React from 'react';

import { AvatarCard } from './(components)/AvatarCard';
import { Scheduler } from "./(components)/(scheduler)/Scheduler";
//TODO:
export default function Family(){

    return(
        <div className='family-grid'>
            <div className='banner'>
                <h1> Meet the "Family"! </h1>
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
                <Scheduler />
            </div>
            <div className='family-announcement'>
                <p>No announcements</p>
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