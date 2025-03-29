'use client'

import React from 'react';
import { useFormState } from 'react-dom';
import { createItem } from '../../actions';

export default function ItemForm() {
    const [state, formAction] = useFormState(createItem, { message: '' });

    return (
        <div>
          <form action={formAction}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="notes">Name:</label>
            <input type="text" id="notes" name="notes" />

            <button type="submit">Submit</button>
          </form>
          {state.message && <p>{state.message}</p>}
        </div>
    )
}