import {useContext,useState} from 'react';
import { FormEvent } from 'react';
import { AuthContext } from '../context/authContext';
import ilustrations from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg';
import {Link,useHistory} from 'react-router-dom'
import '../styles/auth.scss'
import { Button } from '../components/button';
import {database} from '../services/firebase'


export function NewRoom(){




const {user} = useContext(AuthContext)

const history = useHistory()

const [newRoom, setNewRomm]= useState('')


async function handleCreateRoom(event:FormEvent){
event.preventDefault();

if(newRoom.trim()===""){
    return;
}

const roomRef = database.ref('rooms');

const firebaseRoom = await roomRef.push({
    title:newRoom,
    authorId:user?.id
})

history.push(`/room/${firebaseRoom.key}`)





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
       
            <h2>Criar uma nova sala</h2>
            <div className="separator">ou entre em uma sala</div>
            <form onSubmit={handleCreateRoom}>
                <input 
                type="text"
                placeholder="nome da sala"
                onChange={event => setNewRomm(event.target.value)}
                value={newRoom}
                />
                <Button type="submit">Criar Sala</Button>

            </form>

            <p>quer entrar numa sala <Link to=""> clique aqui</Link> </p>
  </div>
</main>

</div>

    )
}