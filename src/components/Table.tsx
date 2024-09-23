import { useEffect, useState } from 'react'; 
import { GuestRow } from '@/components/GuestRow';

export interface Guest {
    guestId: string;
    email?: string;
    firstName: string;
    lastName: string;
    rsvpStatus?: string;
}

export default function Table() {
    const [guests, setGuests] = useState<Guest[]>([]);

    useEffect(() => {
        console.log('fetching...');
        fetch('https://api.thomaslujan.com/guests', {
          method: 'GET'
        }).then(res => res.json())
        .then(data => setGuests(data))
        .catch(err => console.log(err));
      }, []);

    const updateGuests = (guest: Guest) => {
        let index = -1;
        for (let i = 0; i < guests.length; i++) {
            if (guests[i].guestId === guest.guestId) {
                index = i;
                break;
            }
        }

        setGuests([
            ...guests.slice(0, index),
            guest,
            ...guests.slice(index+1)
        ]);
    };

    return (
        <table>
            <thead>
                {guests.length > 0 &&
                    <tr>
                        <th>Guest List</th>
                        <th>RSVP Reponse</th>
                        <th>Email</th>
                    </tr>
                }
            </thead>
            <tbody>
                { guests.map(guest => <GuestRow key={ guest.guestId }  guest={ guest } updateGuests={updateGuests}/>) }
            </tbody>
        </table>
    );
}