import copyImage from'../assets/images/copy.svg'
import '../styles/roomcode.scss'
export function RoomCode(props){

    
    function copyRoomCode(){
        navigator.clipboard.writeText(props.code)
    }

    return(

            <button className="room-code" 
            onClick={copyRoomCode}
            >
                <div>
                    <img src={copyImage} alt="copier" />
                </div>
                <span>sala #{props.code}</span>


            </button>


    )
}