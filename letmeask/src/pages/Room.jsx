import Logo from "../assets/images/logo.svg";
import { Button } from "../components/button";
import { RoomCode } from "../components/roomCode";
import "../styles/Room.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { database } from "../services/firebase";
import { Questions } from "../components/Questions";

export function Room() {
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");

  const params = useParams();
  const roomId = params.id;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions = databaseRoom.question ?? {};

      const parseQuestion = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLihted: value.isHighLihted,
            isAnswered: value.isAnswered,
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parseQuestion);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("usted no esta logeado");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLihted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${roomId}/question`).push(question);
    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={Logo} alt="Logo letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala{title}</h1>
          {questions.length > 0 && <span>{questions.length}preguntas</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="voce quer preguntar"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />

                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                para enviar una pregunta <button> haga su login</button>
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pregunta
            </Button>
          </div>

        </form>


            <div className="question-list">

            {questions.map(question =>{
            return(
                <Questions
                key={question.id}
                    content={question.content} 
                   author={question.name}  
                   avatar={question.avatar}   
                />
            )
        })}
            </div>

     
      </main>
    </div>
  );
}
