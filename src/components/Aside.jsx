import React from 'react';
import Asidelink from './Asidelink';


export default function Aside (){
    return <>
    <aside className='aside'>
        <ul>
            <Asidelink
            item='Menu' />
            <Asidelink
            item='Deliveries' />
        </ul>
    </aside>
    </>
}