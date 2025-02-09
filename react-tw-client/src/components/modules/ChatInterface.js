import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import DynamicTextBox from "./DynamicTextBox"
import Message from "./Message"

const ChatInterface = ({ id }) => {
    const location = useLocation();
    const bottomMessageRef = useRef(null);
    const messagesRefs = useRef([]);
    const scrollContainerRef = useRef(null);
    const [textInput, setTextInput] = useState("");
    const [finalTextInput, setFinalTextInput] = useState("");
    const [conversationArray, setConversationArray] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFinalTextInput(textInput);
    }
    const replaceMessage = (index, message) => {
        const updatedConversationArray = [...conversationArray];
        updatedConversationArray[index] = { ...updatedConversationArray[index], content: message };
        setConversationArray(updatedConversationArray);
    }

    useEffect(() => {
        if (!location.state) return;
        setFinalTextInput(location.state.input)
    }, [])

    useEffect(() => {
        if (!finalTextInput) return;

        setConversationArray((prev) => [...prev, {content: finalTextInput, right:false}]);

        const handleFetch = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: finalTextInput
                });
                const data = await response.text();
                setConversationArray((prev) => [...prev, {content: data, right:true}]);
            } catch (error) {
                console.log(error);
            }
        }
        handleFetch();
    }, [finalTextInput])

    useEffect(() => {
        // scroll so bottom message always on screen
        const conversationBottom = bottomMessageRef.current;
        conversationBottom.scrollIntoView({ behavior: "smooth" });

        // send conversation info to backend
        const sendConversation = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/conversations", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "messages": conversationArray,
                        "id": id
                    })
                });
                const data = await response.text();
            } catch (error) {
                console.log(error);
            }
        }
        sendConversation();

        // hide messages below dynamic textbox using IntersectionObserver API
        if (!scrollContainerRef.current) return;

        const options = {
            root: scrollContainerRef.current,
            rootMargin: "0px 0px -120px 0px",
            threshold: 0.0,
        }
        const callback = (entries) => {
            entries.forEach((entry) => {
                const messageBox = entry.target;
                if (entry.isIntersecting) {
                    messageBox.style.opacity = 1;
                } else {
                    messageBox.style.opacity = 0;
                }
            });
        }
        const messageArray = messagesRefs.current;

        const observer = new IntersectionObserver(callback, options);
        messageArray.forEach((msg) => {
            if (msg) observer.observe(msg);
        });
        return () => {
            observer.disconnect();
        };
    }, [conversationArray])
    // pass in a state variable isEditing, put it in dependency, so this triggers whenever something
    // is edited?

    return (
        <div 
            className="flex flex-col bg-mainBackground h-screen w-full items-center overflow-y-auto overflow-x-hidden scrollBar"
            ref={scrollContainerRef}
        >
            <div className="flex flex-col grow mb-28 mt-8 px-8 items-start w-[min(90vw,40rem)]">
                {conversationArray.map((item, index) => {
                    return (
                        <Message 
                            content={item.content} 
                            right={item.right}
                            ref={(el) => {messagesRefs.current[index] = el}}
                            index={index}
                            replaceFunction={replaceMessage} 
                        />
                    )
                })}
                <div ref={bottomMessageRef}></div>
            </div>
            
            <form 
                className="absolute bottom-6"
                onSubmit={handleSubmit}    
            >
                <DynamicTextBox 
                    textInput={textInput} 
                    setTextInput={setTextInput}
                    useButton={true}
                />
            </form>
        </div>
    )
}

export default ChatInterface;