import React from 'react';

import { AvatarCard } from './(components)/AvatarCard';
import FamilyCalendar from './(components)/FamilyCalendar';
import "./(components)/Family.css";
import { Announcement } from './(components)/(announcement)/Announcement';
import { getFamilyAnnouncements, getFamilyById } from './actions';
import { getUser } from '../../../helper/getUser';


//TODO:
export default async function Family({ params }:{ params:{ id: string } }){
    const user = await getUser();
    const { id } = await params;
    const family = await getFamilyById(parseInt(id));
    const announcements = await getFamilyAnnouncements(parseInt(id));

    return(
        <div className='family'>
            <div className='banner'>
                <h1>
                    Meet the {family.name}!
                </h1>
            </div>
            <div className='family-announcement'>
                <Announcement family={family} announcements={announcements} userId={user.id}/>
            </div>
            <div className='family-cards'>
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
                <AvatarCard />
            </div>
            <div className='family-calendar'>
                <h1>"Family" Schedule</h1>
                <FamilyCalendar />
            </div>
            <div className='family-list'>
                <h1>"Family" Lists</h1>

            </div>
            <div className='family-poll'>
                <h1>"Family" Polls</h1>

            </div>
            <div className='family-wheel'>
                <h1>"Family" Wheel</h1>

            </div>
            <div className='family-todo'>
                <h1>"Family" Todo</h1>

            </div>
            <div className='family-schedule'>

            </div>
            <div className='family-meal'>

            </div>
            <div className='family-photos'>
                <h1>"Family" Photos</h1>

            </div>
            <div className='family-messages'>
                <h1>"Family" Messages</h1>

            </div>
        </div>
    );
}