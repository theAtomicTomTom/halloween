import { useEffect, useState } from 'react';
import { Guest } from './Table';
import { Potluck } from './PotluckTable';

interface PotluckInputProps {
    guests: Guest[];
    addPotluck: (potluck: Potluck) => void;
}

export default function PotluckInput({ guests, addPotluck }: PotluckInputProps) {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

    const [food, setFood] = useState<string>('');
    const [guest, setGuest] = useState<Guest>();

    useEffect(() => {
        if (food && guest) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [food, guest]);

    const handleButtonOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        fetch('https://api.thomaslujan.com/beta/potluck', {
            method: 'POST',
            body: JSON.stringify({ food, guest: guest?.id }),
        }).then(res => res.json())
        .then(potluck => addPotluck(potluck))
        .then(() => {
            setFood('');
            setGuest(undefined);
        }).catch(err => console.log(err));
    };

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFood(event.target.value);
    };

    const handleSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        for (let guest of guests) {
            if (guest.id === event.target.value) {
                setGuest(guest);
            }
        }
    };

    return (
        <div className='potluck-entry'>
            <div className='potluck-entry-name-input'>
                <select value={guest ? guest.id : ''} onChange={handleSelectOnChange}>
                    <option value='' disabled>--- guest ---</option>
                    {guests.filter(guest => guest.rsvpStatus && guest.rsvpStatus != 'n').map(guest => 
                        <option key={guest.id} value={guest.id}>
                            {guestName(guest)}
                        </option>
                    )}
                </select>
            </div>
            <div className='potluck-entry-food-input'>
                <input value={ food } onChange={ handleInputOnChange } />
            </div>
            <button className='potluck-entry-button-input' disabled={buttonDisabled} onClick={handleButtonOnClick}>{!buttonDisabled && '(add)'}</button>
        </div>
    );
}

function capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function guestName(guest: Guest|null): string {
    if (!guest)
        return '';
    return `${capitalize(guest.firstName)} ${capitalize(guest.lastName)}`;
}