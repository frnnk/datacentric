import { useState } from "react";
import TextButton from "./TextButton";
import DynamicTextBox from "./DynamicTextBox";

const Message = ({content, right, ref, index, replaceFunction}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editInput, setEditInput] = useState(content);

    const replaceHandler = (e) => {
        e.preventDefault();
        replaceFunction(index, editInput);
    }

    return (
        <div className="flex flex-col w-full relative">
            <p 
                className={`bg-secondBackground text-textSecondary inline-block max-w-[75%]
                rounded-3xl pt-3 pb-2 px-4 mt-1 mb-8 ${right === true ? "self-end" : "self-start"}
                ${isEditing === true ? "hidden" : ""}`}
                ref={ref}
            >
                {content}
            </p>

            <button 
                className={`absolute flex rounded-lg h-8 w-8 justify-center items-center
                hover:bg-gray-600 ease-in-out duration-200 ${isEditing === true ? "hidden" : ""}
                ${right === true ? "right-[-2.5rem] top-[0.75rem]" : "left-[-2.5rem] top-[0.75rem]"}`}
                onClick={() => setIsEditing(!isEditing)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="size-5 text-navbarIcons">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>

            <form 
                className={`bg-secondBackground text-textSecondary w-full rounded-3xl pt-3 pb-8 mt-1 mb-8
                flex flex-col relative ${isEditing === true ? "" : "hidden"} ${right === true ? "self-end" : "self-start"}`}
                onSubmit={replaceHandler}
            >
                <DynamicTextBox 
                    useButton={false}
                    textInput={editInput}
                    setTextInput={setEditInput}
                />

                <TextButton 
                    classes="absolute bottom-2 right-[6.2rem] bg-navbarBackground text-textSecondary font-medium hover:opacity-75"
                    content="Cancel"
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                />

                <TextButton 
                    classes="absolute bottom-2 right-2 bg-white text-navbarBackground font-medium hover:opacity-75"
                    content="Submit"
                    type="submit"
                    onClick={() => setIsEditing(!isEditing)}
                />
            </form>
            

        </div>
        
    );
};

export default Message