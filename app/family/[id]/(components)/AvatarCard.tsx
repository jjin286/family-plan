import React from 'react';

import "./Family.css";
import { Card, Image, Text, Button, Group, Avatar } from '@mantine/core';

export function AvatarCard(){
    return(
        <div className='avatar-card'>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group align="center">
                    <Avatar />
                    <Text fw={500}>Norway </Text>
                </Group>
            </Card>
        </div>
    );
}