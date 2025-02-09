import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextButton from "../modules/TextButton"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const sendUserInfo = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    }),
                    credentials: "include"
                })
            } catch (error) {
                console.log(error)
            }
        }
        sendUserInfo()
    }

    return (
        <form 
            className="flex h-screen bg-background justify-center items-center"
            onSubmit={handleSubmit}
        >
            <div className={`absolute flex flex-col bg-background h-96 w-80 border-[1.5px]
            border-gray-700 rounded-2xl p-5 gap-3`}>
                <div className="flex flex-col gap-[0.1rem]">
                    <h1 className="font-inter text-headline text-xl font-medium">Login</h1>
                    <p className="font-inter text-paragraph text-[0.6rem]">
                        Enter your email below to login to your account
                    </p>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="font-inter text-headline text-[0.7rem] font-medium">Email</h2>
                    <input 
                        className="border-[1px] border-gray-800 rounded-md bg-transparent focus:outline-none px-2 h-6 text-xs text-paragraph"
                        value={email} 
                        onInput={(e) => setEmail(e.target.value)}
                        required
                    />  
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="font-inter text-headline text-[0.7rem] font-medium">Password</h2>
                    <input 
                        className="border-[1px] border-gray-800 rounded-md bg-transparent focus:outline-none px-2 h-6 text-xs text-paragraph" 
                        type="password"
                        value={password} 
                        onInput={(e) => setPassword(e.target.value)}
                        required
                    />  
                </div>

                <TextButton 
                    content="Login"
                    classes="absolute w-[17.5rem] bottom-12 bg-button rounded-md text-sm text-[0.61rem] text-headline h-6 hover:bg-tertiary"
                    isSubmit={true}
                />

                <div className="absolute flex flex-row bottom-4 justify-center gap-1 w-[17.5rem]">
                    <p className="font-inter text-headline text-[0.7rem] font-medium">Don't have an account?</p>
                    <TextButton 
                        content="Sign up"
                        classes="text-headline text-[0.7rem] font-medium underline underline-offset-4 hover:bg-transparent"
                        onClick={() => navigate("/signup")}
                        isSubmit={false}
                    />
                </div>
            </div>
        </form>
        
    )
}

export default Login