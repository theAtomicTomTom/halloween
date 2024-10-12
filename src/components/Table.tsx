import { useEffect, useState } from 'react'; 
import { GuestRow } from '@/components/GuestRow';

export interface Guest {
    id: string;
    assignedCharacter?: string;
    email?: string;
    firstName: string;
    lastName: string;
    rsvpStatus?: string;
}

export default function Table() {
    const [guests, setGuests] = useState<Guest[]>([]);

    useEffect(() => {
        console.log('fetching...');
        fetch('https://api.thomaslujan.com/beta/guest', {
          method: 'GET'
        }).then(res => res.json())
        .then(data => setGuests(sortedGuests(data)))
        .catch(err => console.log(err));
      }, []);

    const updateGuests = (guest: Guest) => {
        let index = -1;
        for (let i = 0; i < guests.length; i++) {
            if (guests[i].id === guest.id) {
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
                { guests.map(guest => <GuestRow key={ guest.id }  guest={ guest } updateGuests={updateGuests}/>) }
            </tbody>
        </table>
    );
}

function sortedGuests(guests: Guest[]): Guest[] {
    return guests.sort((g1, g2) => {
        if (g1.rsvpStatus && !g2.rsvpStatus) {
            return 1;
        } else if (!g1.rsvpStatus && g2.rsvpStatus) {
            return -1;
        } else {
            if (g1.rsvpStatus === g2.rsvpStatus) {
                return g1.firstName.localeCompare(g2.firstName);
            } else {
                if (g1.rsvpStatus && g2.rsvpStatus) {
                    if (g1.rsvpStatus === 'y') {
                        return -1;
                    } else if (g2.rsvpStatus === 'y') {
                        return 1;
                    } else if (g1.rsvpStatus === 'm') {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                else 
                    return 1;
            }
        }
    });
}