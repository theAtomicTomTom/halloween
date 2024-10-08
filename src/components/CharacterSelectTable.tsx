import { useEffect, useState } from 'react';

import CharacterCard from "./CharacterCard";
import { Guest } from './Table';

export interface Character {
    id: string;
    bio: string;
    name: string;
    guest?: string;
}

export default function CharacterSelectTable() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [guests, setGuests] = useState<Guest[]>([]);

    useEffect(() => {
        fetch('https://api.thomaslujan.com/beta/character', {
            method: 'GET'
        }).then(res => res.json())
        .then(data => setCharacters(data))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch('https://api.thomaslujan.com/beta/guest', {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            const guests = data as Guest[];
            setGuests(guests.filter(guest => guest.rsvpStatus === 'y'));
        }).catch(err => console.log(err));
    })

    const updateCharacters = (character: Character) => {
        let index = -1;
        for (let i = 0; i < characters.length; i++) {
            if (characters[i].id === character.id) {
                index = i;
                break;
            }
        }

        setCharacters([
            ...characters.slice(0, index),
            character,
            ...characters.slice(index+1)
        ]);
    }

    return (
        <div>
            {characters.map(character => <CharacterCard key={character.id} character={ character } guests={guests} updateCharacters={updateCharacters}/>)}
        </div>
    );
}