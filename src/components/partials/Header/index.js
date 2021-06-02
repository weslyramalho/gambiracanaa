import React from 'react';
import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';
import { doLogout, isLogged } from '../../../helpers/AuthHandler';

const Header = () => {

    let logged = isLogged();

    const handleLogout = ()=> {
        doLogout();
        window.location.href = '/';
    }

    return(
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <span className="logo-1">O</span>
                        <span className="logo-2">L</span>
                        <span className="logo-3">X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                        <>
                        <li>
                        <Link to="/my-acount" className="a">Minha Conta</Link>
                        </li>
                        <li>
                        <button onClick={handleLogout}>Sair</button>
                        </li>
                        <li>
                        <Link to="/post-an-ad" className="button">Poste um anúncio</Link>
                        </li>
                        </>
                        }
                        {!logged &&
                        <>
                        <li>
                        <Link to="/signin" className="a">Login</Link>
                        </li>
                        <li>
                        <Link to="/signup" className="a">Cadastrar</Link>
                        </li>
                        </>
                        }
                        
                       
                    </ul>
                </nav>

            </div>
        </HeaderArea>
    );
}
export default Header;