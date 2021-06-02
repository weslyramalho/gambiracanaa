import React from 'react';
import { Link } from 'react-router-dom';

export default function Page () {
    return(

        <div>
            <h1>Pagina inicial</h1>
            <Link to="/about">SOBRE</Link>

        </div>
    )
}