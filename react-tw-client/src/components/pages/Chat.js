import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PageTemplate from "../modules/PageTemplate"
import DynamicTextBox from "../modules/DynamicTextBox"

const Chat = () => {
    const [textInput, setTextInput] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const createConversation = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/conversations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "messages": [{content: textInput, right:false}]
                    })
                });

                const conversationId = await response.text();
                navigate(`/chat/${conversationId}`, {state: {input: textInput}});               
            } catch(error) {
                console.log(error)
            }
        }
        createConversation();
    }

    return (
        <form onSubmit={handleSubmit}>
            <PageTemplate 
                content={
                    <div className="flex flex-col bg-background h-screen justify-center items-center">
                        <h1 className="font-inter text-headline text-5xl font-bold mb-10">
                            Enter an initial message...
                        </h1>

                        <DynamicTextBox
                            textInput={textInput} 
                            setTextInput={setTextInput}
                            useButton={true}
                        />
                    </div>
                }/>
        </form>
    )
}

export default Chat