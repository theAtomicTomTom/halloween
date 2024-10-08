import { Character } from "./CharacterSelectTable";
import { Guest } from './Table';

interface CharacterCardProps {
    character: Character
    guests: Guest[];
    updateCharacters: (character: Character) => void;
}

export default function CharacterCard({ character, guests, updateCharacters }: CharacterCardProps) {
    const handleGuestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        fetch(`https://api.thomaslujan.com/beta/character?id=${character.id}`, {
            method: 'POST',
            body: JSON.stringify({ guest: event.target.value }),
        }).then(res => res.json())
        .then(character => updateCharacters(character))
        .catch(err => console.log(err));
    };

    return (
        <div className='character-card'>
            <strong>Name:</strong> {character.name}
            <br/>
            <select value={character.guest ? character.guest : ""} onChange={ handleGuestChange }>
                <option value="" disabled hidden>--- select guest ---</option>
                {guests.map(guest => getGuestOption(guest))}
            </select>
            <br/>
            <strong>Bio:</strong> {character.bio}
        </div>
    );
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
