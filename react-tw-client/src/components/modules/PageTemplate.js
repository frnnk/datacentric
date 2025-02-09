import {useState, useRef, use} from "react"
import NavbarButton from "./NavbarButton";

const PageTemplate = ({content}) => {
    const backgroundRef = useRef(null);
    const [isToggled, setIsToggled] = useState(true);

    const handleClick = () => {
        const background = backgroundRef.current;

        if (isToggled) {
            background.style.marginLeft = "0rem"; 
        } else {
            background.style.marginLeft = "2.8rem";
        }
        setIsToggled(!isToggled);
    };

    return (
        <div className="flex h-screen flex-row">
            <div className="absolute hidden md:flex md:w-[2.8rem] left-0 h-screen bg-button">
                <NavbarButton 
                    svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="size-6 text-white hover:text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    }
                    classes={"absolute left-[0.35rem] top-[0.35rem] z-20"}
                    onClick={handleClick}
                />
            </div>

            <div 
                className="bg-background flex ml-[2.8rem] grow justify-center items-center z-10
                transition-all ease-in-out duration-500"
                ref={backgroundRef}
            >
                {content}
            </div>
        </div>   
    )
}

export default PageTemplate;

