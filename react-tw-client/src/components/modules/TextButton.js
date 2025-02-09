const TextButton = ({ content, onClick, classes, isSubmit }) => {
    return (
        // default behavior might be to submit!
        <button 
            className={`${classes} rounded-3xl ease-in-out duration-200 font-inter hover:bg-tertiary`}
            onClick={onClick}
            type={`${isSubmit === true ? "submit" : "button"}`}
        >
            {content}
        </button> 
    )
}

export default TextButton