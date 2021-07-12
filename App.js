import { useEffect, useState } from 'react';
import { Button, Input } from '@material-ui/core';
import Message from './Message.js';
import db from './firebase.js';
import firebase from "firebase";
import FlipMove from "react-flip-move"

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <div className="signInPage">
        <div>
          <img src="https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png" width="100rem" height="100rem" />

          <h3>Welcome Strangers.</h3>
          <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
          <p>Please keep the chats free of cuss words.
            Do not violate the community guidelines or you will be banned!</p>
        </div>

        <div>
        </div>
      </div>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-in sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  var user = firebase.auth().currentUser;
  let userName = user.displayName;
  let profilePhotoURL = user.photoURL;


  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [CHATROOM, SETCHATROOM] = useState("message")


  useEffect(() => {

    db.collection(CHATROOM)
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => (
        setMessage(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
        // setImage()
      ))

  }, [CHATROOM])





  function scrollDown() {
    var elmnt = document.querySelector(".footer");
    elmnt.scrollIntoView(true);
  }

  function sendHandler(event) {

    event.preventDefault();

    db.collection(CHATROOM).add({
      message: input,
      userName: userName,
      profilePhotoURL,
      // sentPhotoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    // console.log(userName)
    setInput("")
  }

  //for rendering all the people names.
  let usernames = []
  message.map(({ message }) => {
    if (!usernames.includes(message.userName)) {
      usernames.push(message.userName)
    }
  })

  let listOfPeople = document.querySelector(".listOfPeople");
  let sidebar = document.querySelector(".sidebar")


  function showList() {
    listOfPeople.classList.toggle("active")
  }

  function showChannelOptions() {
    sidebar.classList.toggle("active")
  }

  return (
    <div className="App">
      <div className="message_box" >


        <img className="mainLogo" src="https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png" width="100rem" height="100rem" />

        <div className="navigation">
          <span className="cursor" style={{ border: "1px white solid", padding: "0.5rem" }} onClick={showChannelOptions}>Channels <i className="fa fa-arrow-right fa-1x"></i></span>
          <div className="sidebar">
            <h4 className="channelName" onClick={() => { SETCHATROOM("message") }}>General</h4>
            <h4 className="channelName" onClick={() => { SETCHATROOM("meet new people") }}>Meet new people</h4>
            <h4 className="channelName" onClick={() => { SETCHATROOM("Web development") }}>Web development</h4>
          </div>
        </div>

        <h5 className="cursor" onClick={showList}>In the room</h5>

        <div className="listOfPeople">
          {usernames.map((item) => {
            return (<h5>{item}</h5>)
          })}
        </div>

        <div >
          <SignOut />
        </div>


        <div className="image_and_signout">
          <h1>Welcome,<br /> {userName}</h1>

          <div><button className="scrollBottom" onClick={scrollDown}>Scroll to Bottom</button></div>
        </div>

        <h3>{CHATROOM}</h3>

        <FlipMove>
          {message &&
            message.map(({ id, message }) =>
            (
              <Message CHATROOM={CHATROOM} id={id} user={user} key={id} photo={profilePhotoURL} userName={userName} message={message} />

            )
            )
          }
        </FlipMove>


        <form className="msgInputForm">
          <Input className="form_input" placeholder="Add a message" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button className="send_button" disabled={!input || input[0] == " "} variant="contained" color="primary" type="submit" onClick={sendHandler}>Send</Button>
        </form>


        <div className="footer"></div>

      </div>
    </div>
  );
}

export default App;


//what all features i wan add:
//scroll to bottom
//probably adding a profile image
//icons and images all over
// more animations with the message
// all for now, lesse.
//animate the message popups
//prolly add a calling feature as well
// add date and time update


//brrrrr, youre too bad at reacttt!!!!!!!
//What you need to do:
//Learn a little more about class based components.
//form handling in react!
//practise more mannnnnnnn
