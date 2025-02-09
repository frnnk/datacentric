import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import TextButton from "../modules/TextButton"


const Hero = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const [loginVisible, setLoginVisible] = useState(false);
    const [emailContent, setEmailContent] = useState("");

    const handleInput = (e) => {
        setEmailContent(e.target.value)
    }

    return (
        <div className="flex flex-col bg-background h-screen justify-center items-center relative">
            <h1 className="text-7xl font-inter text-headline w-[48rem] text-center">
                Chatbot datasets, created effortlessly
            </h1>
            <p className="text-paragraph mt-8 w-[28rem] text-center font-inter text-sm">
                Build and customize datasets tailored to your chatbot's needs with ease. Start creating smarter conversations today.
            </p>
            <div className="flex relative mt-5 rounded-3xl border-paragraph border-[1px] w-[22rem] py-2 px-3 items-center">
                <input 
                    className="bg-transparent font-inter text-xs focus:outline-none text-paragraph"
                    placeholder="Enter your email"
                    type="email"
                    size="30"
                    value={emailContent}
                    onInput={handleInput}
                    autoFocus
                />

                <TextButton
                    classes="absolute right-1 bg-button font-inter text-xs px-2 py-1 hover:bg-tertiary"
                    content="Sign Up"
                    isSubmit={false}
                    onClick={() => {navigate("/signup", {state: {email: emailContent}})}}
                />
            </div>

            <div className="flex absolute rounded-3xl border-paragraph border-[1px] w-[44rem] h-[2.6rem] items-center top-7">
                <TextButton
                    classes="absolute right-[5.5rem] bg-transparent font-inter border-[1px] border-buttonText
                    text-xs text-buttonText px-4 py-2 hover:bg-white hover:text-background"
                    content="Login"
                    isSubmit={false}
                    onClick={() => {navigate("/login")}}
                />
                <TextButton
                    classes="absolute right-1 bg-button font-inter text-xs px-4 py-2 hover:bg-tertiary"
                    content="Sign Up"
                    isSubmit={false}
                    onClick={() => {navigate("/signup")}}
                />
                <h2 className="flex ml-4 font-hbf text-headline font-medium pt-1">
                    Datacentric
                </h2>
            </div>

            <p className="absolute bottom-6 text-paragraph mt-8 w-[28rem] text-center font-inter text-xs">
                Powered by React, TailwindCSS, Flask, and MongoDB Atlas 
            </p>
        </div>
        
    )
}

export default Hero