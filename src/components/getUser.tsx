'use client'

import React from "react";

export default function GetUser() {
    const [lastName, setLastName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    return (
        <section>
            <label>Last Name: <input value={ lastName } onChange={e => setLastName(e.target.value)}/></label>
            <br/>
            <br/>
            <label>Last 4 Digist of Phone #: <input value={ phoneNumber } onChange={e => setPhoneNumber(e.target.value)}/></label>
            <br/>
            <br/>
            <button disabled={!lastName || !phoneNumber} onClick={() => {console.log(lastName + phoneNumber);}}>next</button>
        </section>
    );
}