import { useState } from 'react';
import { Guest } from './Table';

interface GuestRowProps {
    guest: Guest;
    updateGuests: (guest: Guest) => void;
}

export function GuestRow({ guest, updateGuests }: GuestRowProps) {
    const handleRsvpChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        fetch(`https://api.thomaslujan.com/guests?guestId=${guest.guestId}&lastName=${guest.lastName}&rsvpStatus=${event.target.value}`, {
            method: 'POST'
        }).then(res => res.json())
        .then(data => updateGuests(data))
        .catch(err => console.log(err));
    };

    return (
        <tr key={ guest.guestId } className={getColor(guest)}>
            <td>
                { guestName(guest) }
            </td>
            <td>
                <select value={ guest.rsvpStatus } onChange={ handleRsvpChange }>
                    <option value="" selected disabled hidden>--- we're waiting on your response... ---</option>
                    <option value='y'>"It's showtime!" (yes)</option>
                    <option value='m'>"Please, it's a little late to be neurotic." (maybe)</option>
                    <option value='n'>"I'm trying to cut back myself." (no)</option>
                </select>
            </td>
            <td>
                {guest.email}
            </td>
        </tr>
    );
}

function capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function guestName(guest: Guest): string {
    return `${capitalize(guest.firstName)} ${capitalize(guest.lastName)}`;
}

function getColor(guest: Guest): string {
    switch (guest.rsvpStatus) {
        case 'y':
            return 'tr-green';
        case 'm':
            return 'tr-purple';
        case 'n':
            return 'tr-grey';
        default:
            return 'tr-white';
    }
}