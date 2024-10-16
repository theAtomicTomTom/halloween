import { Character } from "./CharacterSelectTable";
import { Guest } from './Table';

interface CharacterCardProps {
    index: number;
    character: Character;
    guests: Guest[];
    updateCharacters: (character: Character) => void;
    updateGuests: (guest: Guest) => void;
}

export default function CharacterCard({ index, character, guests, updateCharacters, updateGuests }: CharacterCardProps) {
    const handleGuestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        fetch(`https://api.thomaslujan.com/beta/character?id=${character.id}`, {
            method: 'POST',
            body: JSON.stringify({ guest: event.target.value }),
        }).then(res => res.json())
        .then(character => {
            updateCharacters(character);
            const guest = findGuest(character.guest, guests);
            if (guest) {
                guest.assignedCharacter = character.id;
                updateGuests(guest);
            }
        })
        .catch(err => console.log(err));
    };

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (character.guest) {
            const guest = findGuest(character.guest, guests);
            if (guest) {
                delete guest?.assignedCharacter;
                updateGuests(guest);
            }

        }

        fetch(`https://api.thomaslujan.com/beta/character?id=${character.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ guest: character.guest } ),
        }).then(res => res.json())
        .then(character => updateCharacters(character))
        .catch(err => console.log(err));
    }

    return (
        <div className={`character-card ${getCardClassname(character, index)}`}>
            <div><img src={`https://halloween-images.s3.us-east-2.amazonaws.com/${character.id}.png`} style={{ width: '150px', height: '150px'}}/></div>
            <strong>Name:</strong> {character.name}
            <br/>
                {character.guest && <strong>{`Guest: ${getGuestName(character, guests)}`}<button onClick={handleOnClick}> (remove) </button></strong>}
                {!character.guest && 
                    <select value={character.guest ? character.guest : ""} onChange={ handleGuestChange }>
                        <option value="" disabled hidden>--- select guest ---</option>
                        {guests.filter(guest => (guest.rsvpStatus === 'y' && !guest.assignedCharacter)).map(guest => getGuestOption(guest))}
                    </select>
                }
            <br/>
            <strong>Bio:</strong> {character.bio}
        </div>
    );
}

function findGuest(id: string, guests: Guest[]) {
    for (let guest of guests) {
        if (guest.id === id)
            return guest;
    }
    return null;
}

function getGuestName(character: Character, guests: Guest[]) {
    for (let guest of guests) {
        if (character.guest == guest.id)
            return guestName(guest);
    }
    return '';
}

function capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function getGuestOption(guest: Guest) {
    return (
        <option key={guest.id} value={guest.id}>
            {guestName(guest)}
        </option>
    );
}

function guestName(guest: Guest): string {
    return `${capitalize(guest.firstName)} ${capitalize(guest.lastName)}`;
}

function getCardClassname(character: Character, index: number) {
    if (character.guest) {
        if (index % 2 === 0)
            return 'character-card-purple';
        else
            return 'character-card-green';
    } else {
        return '';
    }
}