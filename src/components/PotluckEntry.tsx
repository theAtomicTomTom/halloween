import { Potluck } from "./PotluckTable";
import { Guest } from './Table';

interface PotluckEntryProps {
    potluck: Potluck;
    index: number;
    deletePotluck: (id: string) => void;
    mapGuest: (id: string) => Guest|null;
}

export default function PotluckEntry({ potluck, index, deletePotluck, mapGuest }: PotluckEntryProps) {
    const handleButtonOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = potluck.id;
        fetch(`https://api.thomaslujan.com/beta/potluck?id=${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
        .then(potluck => deletePotluck(id))
        .catch(err => console.log(err));
    };

    return (
        <div className='potluck-entry'>
            <div className={`potluck-entry-name ${getNameColor(index)}`}>
                {guestName(mapGuest(potluck.guest))}
            </div>
            <div className={`potluck-entry-food ${getFoodColor(index)}`}>{potluck.food}</div>
            <button className={`potluck-entry-button ${getFoodColor(index)}`} onClick={handleButtonOnClick}>(remove)</button>
        </div>
    );
}

function capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function getNameColor(index: number): string {
    if (index % 2 === 0)
        return 'potluck-green';
    else
        return 'potluck-white';
}

function getFoodColor(index: number): string {
    if (index % 2 === 0)
        return 'potluck-white';
    else
        return 'potluck-purple';
}

function guestName(guest: Guest|null): string {
    if (!guest)
        return '';
    return `${capitalize(guest.firstName)} ${capitalize(guest.lastName)}`;
}