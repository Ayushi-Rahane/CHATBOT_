const chatInput=document.querySelector(".chat-input textarea");
const sendChatBtn=document.querySelector(".chat-input span");
const chatbox=document.querySelector(".chatbox");

let userMessage;
//const APT_KEY="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";
const APT_KEY="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";

const createChatLi=(message,className)=>{
    // create a chat <li> element with passed message and className
    const chatLi=document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent=className==="outgoing"?`<p>${message}</p>`:` <span class="material-symbols-outlined">Smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML=chatContent;
    return chatLi;
}

const generateResponse=()=>{
    const API_URL="https://api.openai.com/v1/chat/completions";
    const requestOptions={
        method:"POSt",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${APT_KEY}`
        },
        body:JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [ {role: "user",content: userMessage}]

        })
    }

    //send POST request to API, get response
    fetch(API_URL,requestOptions).then(res=>res.json()).then(data=>{
        console.log(data);

    }).catch((error)=>{
        console.log(error);
    })
}

const handleChat=()=>{
    userMessage=chatInput.value.trim();
    if(!userMessage) return;

    //append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(()=>{
        //display "Tinking ..." message while waiting for the response 
        chatbox.appendChild(createChatLi("Thinking...","incoming"));
        generateResponse();
    },600)
}

sendChatBtn.addEventListener("click",handleChat)