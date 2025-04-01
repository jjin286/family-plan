'use client';

import React from 'react';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import addHours from 'date-fns/addHours'
import startOfHour from 'date-fns/startOfHour'
// import { addHours, startOfHour } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function FamilyCalendar() {
  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Learn cool stuff',
      start,
      end,
    },
  ])

  return (
    <div className="myCustomHeight">
    <Calendar
        localizer={localizer}
        events={events} // your events array
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 500 }}
    />
  </div>
  )
}


