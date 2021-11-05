import {useContext} from 'react'
import {TestContext} from '../App';
import ilustrations from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg';
import {Link} from 'react-router-dom'
import '../styles/auth.scss'
import { Button } from '../components/button';
export function NewRoom(){

    const {value,setValue} = useContext(TestContext)


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
            <h1>{value}</h1>
            <div className="separator">ou entre em uma sala</div>
            <form action="">
                <input 
                type="text"
                placeholder="nome da sala"
                />
                <Button type="submit">Criar Sala</Button>

            </form>

            <p>quer entrar numa sala <Link to=""> clique aqui</Link> </p>
  </div>
</main>

</div>

    )
}