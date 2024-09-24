import { useState } from 'react';
import { Guest } from './Table';

interface GuestRowProps {
    guest: Guest;
    updateGuests: (guest: Guest) => void;
}

export function GuestRow({ guest, updateGuests }: GuestRowProps) {
    const [email, setEmail] = useState(guest.email ? guest.email : '');
    const [focused, setFocused] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // remove focus from text input
        event.currentTarget.focus();
        event.currentTarget.blur();
        
        if (email != guest.email) {
            fetch(`https://api.thomaslujan.com/guests?guestId=${guest.guestId}&lastName=${guest.lastName}&email=${email.toLowerCase()}`, {
                method: 'POST'
            }).then(res => res.json())
            .then(data => updateGuests(data))
            .catch(err => console.log(err));
        }
    }
    const handleRsvpChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        fetch(`https://api.thomaslujan.com/guests?guestId=${guest.guestId}&lastName=${guest.lastName}&rsvpStatus=${event.target.value}`, {
            method: 'POST'
        }).then(res => res.json())
        .then(data => updateGuests(data))
        .catch(err => console.log(err));
    };
    const onBlur = () => setFocused(false);
    const onFocus = () => setFocused(true);

    return (
        <tr className={ `input-${getColor(guest)}` }>
            <td>
                { guestName(guest) }
            </td>
            <td>
                <select value={ guest.rsvpStatus ? guest.rsvpStatus : "" } onChange={ handleRsvpChange }>
                    <option value="" disabled hidden>--- we&lsquo;re waiting on your response... ---</option>
                    <option value='y'>&ldquo;It&lsquo;s showtime!&rdquo; (yes)</option>
                    <option value='m'>&ldquo;Please, it&lsquo;s a little late to be neurotic.&rdquo; (maybe)</option>
                    <option value='n'>&ldquo;I&lsquo;m trying to cut back myself.&rdquo; (no)</option>
                </select>
            </td>
            <td>
                <input className={ focused ? 'input-white' : `input-${getColor(guest)}`}
                    id={ `email-input-${guest.guestId}` } 
                    type='text'
                    value={ email }
                    onBlur={ onBlur }
                    onChange={ handleEmailChange }
                    onFocus={ onFocus }
                    maxLength={ 100 }
                    />
                {focused && <button onMouseDown={ (event) => { event.preventDefault(); } } onClick={ handleOnClick }>save</button>}
            </td>
        </tr>
    );
}

function capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function guestName(guest: Guest): string {
    return `${capitalize(guest.firstName)} ${capitalize(guest.lastName)}`;
}

function getColor(guest: Guest): string {
    switch (guest.rsvpStatus) {
        case 'y':
            return 'green';
        case 'm':
            return 'purple';
        case 'n':
            return 'grey';
        default:
            return 'white';
    }
}