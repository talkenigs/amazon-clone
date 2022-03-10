import { Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react'
import './Login.css'
import { auth } from '../firebase'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState(); 

    const signIn = (e) => {        
        e.preventDefault();
        
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {  
         e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email , password)
            .then((auth) => {
                if(auth) {
                    navigate('/')
                }
            })
            .catch((error) => alert(error.message))
    }

  return (
    <div className='login'>
        <Link to="/">
            <img className='login__logo'
            src="https://microbelift.com/wp-content/uploads/2020/06/amazon-logo-png-4.png"
             alt="" 
             />
        </Link>

        <div className="login__container">
            <h1>Sign-in</h1>
        <form action="">

            <h5>E-mail</h5>
            <input type="text" value={email} onChange=
            {e => setEmail(e.target.value)} />

            <h5>Password</h5>
            <input type="password" value={password} 
            onChange={e => setPassword(e.target.value)}/>

            <button className='login__signInButton' 
            type='submit' onClick={e => signIn(e)}>Sign In</button>

            </form>

            <p>
                By sign in, you agree to Amazon Clone's
                Conditions of Use and Privacy Notice.
            </p>

            <button onClick={register} className='login__registerButton'
            >Create Amazon Account</button>
        
        </div>

        </div>
  )
}

export default Login