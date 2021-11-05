
import {useHistory} from 'react-router-dom'
import {useContext,useState} from 'react';
import {AuthContext} from '../context/authContext'
import ilustrations from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg';
import googleIcons from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/button';
import {database} from '../services/firebase'

export function Home(){

    const [romCode , setNewRomCode] = useState('')



const history = useHistory();

const {sigInWithGoogle,user} = useContext(AuthContext)

async function handleCreateRoom(){


    if(!user){
       await sigInWithGoogle()
    }

    history.push('/rooms/new')
    
}

async function handleJoinRoom(event){
event.preventDefault()

if(romCode.trim()===''){
    return;
}


const roomRef = await database.ref(`rooms/${romCode}`).get();



if(!roomRef.exists()){
    alert('does not exist');
    return;
}

history.push(`/room/${romCode}`)


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
            <div className="separator">ou entre em uma sala</div>
            <form onSubmit={handleJoinRoom}>
                <input 
                type="text"
                placeholder="digite el codigo da sala"
                onChange={event => setNewRomCode(event.target.value)}
                value={romCode}
                
                />
                <Button type="submit">entrar en la sala</Button>
            </form>
    </div>
</main>

</div>

    )
}