"use client";

import React, { SetStateAction } from 'react';
import { TextInput, Textarea, Button, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Announcement } from "@/db/Announcements";
import "./Announcement.css"

export function AnnouncementForm({showModal, announcement, handle, setShowModal}:{showModal : boolean, announcement?: Announcement, handle : (announcement : Announcement) => void, setShowModal: React.Dispatch<SetStateAction<boolean>>}){
    const form = useForm({
        initialValues: {
            title: announcement ? announcement.title : "",
            text: announcement? announcement.text : "",
        },
      });

    function handleSubmit( values : typeof form.values ){
        const newAnnouncement = {
            id: 0,
            created_at: new Date().toISOString(),
            title: values.title,
            text: values.text,
            user_id: "tempId"
        };
        handle(newAnnouncement);
        form.reset();
    }
    return(
        <Modal opened={showModal} onClose={() => setShowModal(false)} centered={true} title="Add Announcement">
            <form className="announcement-form" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    size="lg"
                    required
                    placeholder='Title'
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />

                <Textarea
                    size="lg"
                    placeholder='Optional description'
                    key={form.key('text')}
                    {...form.getInputProps('text')}
                />

                <div className='button-section'>
                    <Button type="submit">Submit</Button>
                    <Button color='red' onClick={() => {
                        setShowModal(false)
                        form.reset();
                    }}>Cancel</Button>
                </div>

            </form>
        </Modal>
    );
}