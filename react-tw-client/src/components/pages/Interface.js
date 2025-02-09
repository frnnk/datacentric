import PageTemplate from "../modules/PageTemplate"
import ChatInterface from "../modules/ChatInterface"
import { useParams } from "react-router-dom"

const Interface = () => {
    const { id } = useParams();

    return (
        <PageTemplate 
            content={
                <ChatInterface 
                    id={id}
                />
            }
        />
    )
}

export default Interface