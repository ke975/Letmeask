import './Question/question.scss'


export function Questions(props){
    return(
        <div className="question">
            <p>{props.content}</p>

            <footer>
            <div className="user-info">
                <img src={props.author} alt="" />
                <span>{props.name}</span>
            </div>
            <div></div>

            </footer>
        </div>



    )
}