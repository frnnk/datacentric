import { useLocation } from "react-router-dom"
import PageTemplate from "../modules/PageTemplate";
import ProjectsSection from "../modules/ProjectsSection";

const Projects = () => {
    const location = useLocation();

    const handleClick = () => {
        const sendUserInfo = async () => {
            try {
                const response = await fetch("http://localhost:5000/test", {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Access-Control-Allow-Credentials": "true"
                    }
                  });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        sendUserInfo()
    }

    return (
        <PageTemplate
            content={
                <ProjectsSection />
            }
        />
    )
}

export default Projects