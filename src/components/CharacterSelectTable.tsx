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
        .then(data => setCharacters(sorted(data)))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch('https://api.thomaslujan.com/beta/guest', {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            const guests = data as Guest[];
            setGuests(sortedGuests(guests));
        }).catch(err => console.log(err));
    }, []);

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
        <div>
            {characters.map((character, index) => <CharacterCard key={character.id} index={index} character={ character } guests={guests} updateCharacters={updateCharacters} updateGuests={updateGuests}/>)}
        </div>
    );
}

function sorted(characters: Character[]): Character[] {
    return characters.sort((c1, c2) => {
        if (c1.guest && !c2.guest) {
            return 1;
        } else if (!c1.guest && c2.guest) {
            return -1;
        } else {
            return c1.name.localeCompare(c2.name);
        }
    });
}

function sortedGuests(guests: Guest[]): Guest[] {
    return guests.sort((g1, g2) => {
        return g1.firstName.localeCompare(g2.firstName);
    })
}