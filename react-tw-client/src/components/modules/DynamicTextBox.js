import {useRef, useState} from "react"

const DynamicTextBox = ({textInput, setTextInput, useButton}) => {
    const textAreaRef = useRef(null);
    const buttonRef = useRef(null);

    const handleInput = (e) => {
        const textArea = textAreaRef.current;
        const textAreaEvent = e.target;

        if (textArea) {
           textArea.style.height = "auto";
           textArea.style.height = `${textArea.scrollHeight}px`;
        }
        setTextInput(textAreaEvent.value);
    }
    const handleClick = () => {
        setTextInput("");
    }
    const handleEnter = (e) => {
        const textArea = textAreaRef.current;

        if (e.key === "Enter") {
            buttonRef.current.click();
            e.preventDefault();

            textArea.style.height = "auto";
        }
    }

    return (
        <div className="flex relative bg-transparent border-paragraph border-[1px] px-8 pt-3 pb-16 rounded-3xl justify-center">
            <textarea
                ref={textAreaRef}
                className="flex bg-transparent w-[min(90vw,40rem)] placeholder:text-textPrimary
                     text-textSecondary max-h-28 focus:outline-none resize-none overflow-auto"
                onInput={handleInput}
                onKeyDown={handleEnter}
                placeholder="Type a Message"
                rows={1}
                value={textInput}
                autoFocus
            >
            </textarea>
            
            <button 
                className={`flex absolute bottom-2 right-2 bg-button h-8 w-8 rounded-full justify-center 
                items-center ${ useButton === false ? "hidden" : ""} hover:bg-tertiary`}
                type="submit"
                onClick={handleClick}
                ref={buttonRef}
                disabled={!useButton}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="size-5 text-stroke">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </div>
        
    )
}

export default DynamicTextBox