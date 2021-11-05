import {useContext} from 'react'

import {useHistory} from 'react-router-dom'
import {auth, firebase} from '../services/firebase'
import ilustrations from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg';
import googleIcons from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/button';
import {TestContext} from '../App';



export function Home(){

const history = useHistory();
const {value, setValue} = useContext(TestContext)
function handleCreateRoom(){

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result=>{
        console.log(result)
        history.push('/rooms/new')
    });

    
}



    return(
<div id="page-Auth">

<aside>
<img src={ilustrations} alt="pr" />
<strong>Crie salas de Q&amp; ao vivo </strong>
<p>tire as duvidas de su audeiencia en tempo real </p>
</aside>
<main>
    <div className="main-content">
        <img src={logo} alt="Letmeask" />
        <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcons} alt="haga login" />
            Crie sua sala com o google
            </button>
            <h1>{value}</h1>
            <div className="separator">ou entre em uma sala</div>
            <form action="">
                <input 
                type="text"
                placeholder="digite el codigo da sala"
                />
                <Button type="submit">entrar en la sala</Button>
            </form>
    </div>
</main>

</div>

    )
}