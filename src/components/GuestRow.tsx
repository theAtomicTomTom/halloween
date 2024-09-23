import { useState } from 'react';

interface Guest {
    guestId?: string;
    email?: string;
    firstName: string;
    lastName: string;
    rsvpStatus?: string;
}

interface GuestRowProps {
    guest: Guest;
}

export function GuestRow({ guest }: GuestRowProps) {
    const [ rsvpStatus, setRsvpStatus ] = useState(guest.rsvpStatus);

    const handleRsvpChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        fetch(`https://api.thomaslujan.com/guests?guestId=${guest.guestId}&lastName=${guest.lastName}&rsvpStatus=${event.target.value}`, {
            method: 'POST'
        }).then(res => res.json())
        .then(data => setRsvpStatus(data.rsvpStatus))
        .catch(err => console.log(err));
    };

    return (
        <tr key={ guest.guestId } className={getColor(guest)}>
            <td>
                { guestName(guest) }
            </td>
            <td>
                <select value={ rsvpStatus } onChange={ handleRsvpChange }>
                    <option value='y'>Yes</option>
                    <option value='n'>No</option>
                    <option value='m'>Maybe</option>
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