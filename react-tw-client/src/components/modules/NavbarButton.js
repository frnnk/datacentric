
const NavbarButton = ({svg, onClick, classes}) => {
    return (
        <button 
            className={`flex rounded-lg h-8 w-8 justify-center items-center ${classes}
            hover:bg-tertiary ease-in-out duration-200`}
            type="button"
            onClick={onClick}
        >
            {svg}
        </button>
    )
}

export default NavbarButton;