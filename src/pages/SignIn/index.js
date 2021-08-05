import React from 'react';
import { useState } from 'react';
import { ErrorMesssage, PageContainer, PageTitle } from '../../components/MainComponents';
import { PageArea } from './styled';
import useAPI from '../../helpers/GambiraCanaaApi';
import { doLogin } from '../../helpers/AuthHandler';


const SignIn = () => {
    const api = useAPI();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRemenberPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.login(email, password);

       if(json.error) {
            setError(json.error);
        }else{
            doLogin(json.token, rememberPassword);
            window.location.href='/';
        }
        window.location.href='/';

        setDisabled(false);

        }

        
    

    return (
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error && 
                <ErrorMesssage>{error}</ErrorMesssage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                            type="email" 
                            disabled={disabled}
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                            type="password" 
                            disabled={disabled}  
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Lembrar Senha</div>
                        <div className="area--input">
                            <input 
                            type="checkbox" 
                            disabled={disabled} 
                            checked={rememberPassword}
                            onChange={()=>setRemenberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>

    )
}

export default SignIn;