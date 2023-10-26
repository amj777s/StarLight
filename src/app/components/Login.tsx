import { useEffect, useState } from 'react';
import login from '../login.module.css';
import '../globals.css';
import { GameState } from '../types';

//TODO FIX problem with game data not being loaded on reidrect to homepage

export default function Login({
    setGameStatus,
    setUser
}:{
    setGameStatus: (state: GameState) => void,
    setUser:(user: string) => void
    
}) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLogin] = useState(false);
    const [attemptedLogin, setLoginAttempt] = useState(false);
   

    useEffect(() => {
        if(loggedIn) {
            setUser(username);
            setGameStatus('home');
        }
    }, [loggedIn])

    const handleFields = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = e.target.value;
        const inputName: string = e.target.name;
        switch (inputName) {
            case 'username':
                setUsername(newValue);
                break;
            case 'password':
                setPassword(newValue);
                break;
            default:
                break;
        }
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));
        const response = await fetch('/api/starlight/login',{
            method: 'POST',
            body: formDataJson
        });
        const data: {loginAccepted: boolean} = await response.json();
        
        if(data.loginAccepted){
            localStorage.setItem('user', username)
        }
        setLogin(data.loginAccepted);
        setLoginAttempt(true);
    }



    return (
        <form className={login.loginForm} onSubmit={handleLogin}>
            <h2>Login</h2>

            {!loggedIn && attemptedLogin && <p className='error'>Username or password is incorrect!</p>}
            <label htmlFor='username'>Username</label>
            <input id='username' name='username' type='text' value={username} onChange={handleFields} required />

            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' value={password} onChange={handleFields} required />

            <button className='activeButton' type='submit' disabled={!username || !password}>Login</button>
            <p>Don&apos;t have an account? <span className='underline' onClick={()=> setGameStatus('signup')}>Signup</span></p>
        </form>
    )
}