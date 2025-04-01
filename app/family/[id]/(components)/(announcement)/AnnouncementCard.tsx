import React from 'react';

import { Avatar, Badge, Card, Group, Text, CloseButton  } from '@mantine/core';
import { Announcement } from '@/db/Announcements';
import { formatDistance } from 'date-fns'

export function AnnouncementCard({announcement, userId, handleDelete} : {announcement : Announcement , userId: string, handleDelete : (announcement : Announcement) => void}){
    const date = new Date(announcement.created_at);
    const timeDistance = formatDistance(date, new Date(), { addSuffix: true });
    return(
        <div className="accouncement-card">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between">
                    <Group>
                        <Avatar />
                        <Text fw={500}>{announcement.title}</Text>
                    </Group>
                    <Group>
                        <Badge>{timeDistance}</Badge>
                        {userId === announcement.user_id && <CloseButton onClick={() => handleDelete(announcement)}/>}
                    </Group>
                </Group>
                <Group align="center">
                    <Text fw={500}>{announcement.text}</Text>
                </Group>
            </Card>
        </div>
    )
}