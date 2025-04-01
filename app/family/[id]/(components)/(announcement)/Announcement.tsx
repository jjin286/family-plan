'use client';

import React, { useOptimistic, useTransition } from 'react';
import { useState } from 'react';
import { Family } from '../../../../../db/Family';
import { Button } from '@mantine/core';
import { AnnouncementCard } from './AnnouncementCard';
import { AnnouncementForm } from './AnnouncementForm';
import { Announcement } from '@/db/Announcements';
import { createAnnouncement, deleteAnnouncement } from '../../actions';
import "./Announcement.css"

/**
 * type for handling useOptimistic hook
 */
type Action = {
    type : string,
    announcement : Announcement,
}

// TODO:
export function Announcement({ family, announcements, userId } : { family : Family, announcements : Array<Announcement>, userId: string}){
    const [showModal, setShowModal] = useState<boolean>(false);
    const [optimisticAnnouncements, setOptimisticAnnouncements] = useOptimistic(announcements,
        (state, action : Action) => {
            switch (action.type){
                case "add":
                    return [...state, action.announcement];

                case "delete":
                    return state.filter((announcement : Announcement) => announcement.id !== action.announcement.id);

                case "update":
                    return state.map((announcement : Announcement) => announcement.id === action.announcement.id ? action.announcement : announcement);

                default:
                return state;
            }
        }
    );

    const [_, startTransition] = useTransition();

    /**
     * Handle adding announcement to database
     * @param announcement - New announcement to be added to database
     */
    async function handleAdd(announcement : Announcement){
        startTransition(() => {
            setOptimisticAnnouncements({ type: "add", announcement : {...announcement, user_id: userId} });
        });

        try {
            await createAnnouncement(family.id, announcement.title, announcement.text);
        } catch (error) {
            console.error("Error adding announcement:", error);
        }

        setShowModal(false);
    }

    /**
     * Handle deleting announcement from database
     * @param announcement - Announcement to be deleted from database
     */
    async function handleDelete(announcement : Announcement){
        startTransition(() => {
            setOptimisticAnnouncements({ type: "delete", announcement});
        });

        try {
            await deleteAnnouncement(family.id, announcement.id);
        } catch (error) {
            console.error("Error deleting announcement:", error);
        }
    }

    return(
        <div className="announcement-container">
            <div className='heading'>
                <h1>"Family" Announcements</h1>
                <Button className='add-button' onClick={() => setShowModal(true)}>Add</Button>
            </div>
            {showModal && <AnnouncementForm showModal={showModal} handle={handleAdd}/>}
            {optimisticAnnouncements.length === 0 &&  <h3>There are no announcements</h3>}
            {optimisticAnnouncements.map((announcement : Announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} userId={userId} handleDelete={handleDelete}/>
            ))}
        </div>
    )
}