import React,{forwardRef} from 'react'
import db from './firebase.js';


let  Message = forwardRef(
     ({ message, userName, url, photo, id, user, CHATROOM } , ref) =>{
    let isUsername = message.userName === userName;

    var elmnt = document.querySelector(".footer");
    elmnt.scrollIntoView();

    //deleting a message

    function deleteMessage(message, id) {
        // console.log(message.userName, user.displayName);

        if (message.userName == user.displayName) {
            var delMsg = window.confirm("Do you want to delete the message?");
            if (delMsg == true) {
                db.collection(CHATROOM).doc(id).delete();
            }
        }
        else {
            alert("You aren't the one who sent this message, therefore you cannot delete it.")
            return
        }
    }

    function showOptions() {
        let options = document.querySelector(`.options${id}`)
        options.style.display = "block";
    }

    function hideOptions() {
        let options = document.querySelector(`.options${id}`)
        options.style.display = "none";
    }


    return (
        <>

            <div  style={{ display: "none" }}  onClick={hideOptions} onClick={() => deleteMessage(message, id)} className={`options${id} options`}> <span><div style={{textAlign:"right"}} onClick={hideOptions}>X</div></span> Delete</div>


            <div ref={ref} className={`single_message ${isUsername ? `single_message_sender` : `single_message_reciever`}`}>
                <div onClick={showOptions}  className={`msg_text_span ${isUsername ? `msg_text_span_sender` : `msg_text_span_reciever`}`}>

                    <div style={{ display: "none" }} onClick={showOptions} className={`optionsDots${id}`}>
                        <i className="fa fa-ellipsis-h fa-1x"></i>
                    </div>

                    <span onClick={hideOptions} className={`${!isUsername ? 'display_sender' : " "}`}>{!isUsername && `${message.userName || `Unknown`}: `}</span>
                    <span onClick={hideOptions} className="display_text" >{message.message}</span>

                </div>


            </div>
        </>
    )
}
)

export default Message
