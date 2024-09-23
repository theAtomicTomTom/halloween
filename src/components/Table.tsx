import { useEffect, useState } from 'react'; 
import { GuestRow } from '@/components/GuestRow';

export interface Guest {
    guestId?: string;
    email?: string;
    firstName: string;
    lastName: string;
    rsvpStatus?: string;
}

export default function Table() {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        console.log('fetching...');
        fetch('https://api.thomaslujan.com/guests', {
          method: 'GET'
        }).then(res => res.json())
        .then(data => setGuests(data))
        .catch(err => console.log(err));
      }, []);

    return (
        <table>
            <thead>
                {guests.length > 0 &&
                    <tr>
                        <th className='font-AmaticSC'>Guest List</th>
                        <th>RSVP Reponse</th>
                        <th>Email</th>
                    </tr>
                }
            </thead>
            <tbody>
                { guests.map(guest => <GuestRow guest={ guest }/>) }
            </tbody>
        </table>
    );
}