import { useCallback, useEffect, useState } from 'react';
import PotluckEntry from './PotluckEntry';
import { Guest } from './Table';
import PotluckInput from './PotluckInput';

export interface Potluck {
    id: string;
    food: string;
    guest: string;
    entryTime: number;
}

export default function PotluckTable() {
    const [potlucks, setPotlucks] = useState<Potluck[]>([]);
    const [guests, setGuests] = useState<Guest[]>([]);

    useEffect(() => {
        fetch('https://api.thomaslujan.com/beta/potluck', {
            method: 'GET'
        }).then(res => res.json())
        .then(data => setPotlucks(sortPotlucks(data)))
        .catch(err => console.log(err));

        fetch('https://api.thomaslujan.com/beta/guest', {
            method: 'GET'
        }).then(res => res.json())
        .then(data => setGuests(sortGuests(data)))
        .catch(err => console.log(err));
    }, []);

    const addPotluck = useCallback((potluck: Potluck) => {
        setPotlucks([...potlucks, potluck]);
    }, [potlucks]);

    const deletePotluck = useCallback((id: string) => {
        setPotlucks(potlucks.filter(p => p.id !== id));
    }, [potlucks]);

    const mapGuest = (id: string): Guest|null => {
        for (let guest of guests) {
            if (guest.id === id)
                return guest;
        }
        return null;
    };

    return (
        <div className='potluck-table'>
            <div className='potluck-entry'>
                <div className='potluck-header-purple'>Name</div>
                <div className='potluck-header-green'>Food/Drink</div>
            </div>
            {potlucks.map((potluck, index) => <PotluckEntry key={potluck.id} potluck={potluck} index={index} deletePotluck={deletePotluck} mapGuest={mapGuest}/>)}
            <PotluckInput guests={guests} addPotluck={addPotluck}/>
        </div>
    );
}

function sortGuests(guests: Guest[]): Guest[] {
    return guests.sort((g1, g2) => {
        return g1.firstName.localeCompare(g2.firstName);
    });
}

function sortPotlucks(potlucks: Potluck[]): Potluck[] {
    return potlucks.sort((p1, p2) => {
        return p1.entryTime - p2.entryTime;
    });
}