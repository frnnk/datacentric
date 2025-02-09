import { useState } from "react";

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);


    return (
        <div className="h-screen w-full flex justify-center items-center px-20">
            <div className="h-5/6 w-5/6 bg-background rounded-l-2xl flex border-[1px] border-paragraph">

                {/* <div className="w-full p-8">
                    <h2 className="text-2xl font-hbf font-semibold mt-6 text-white">Projects</h2>
                    <div className="flex space-x-6 mt-6">
                        <ProjectCard color="bg-blue-500" name="Marketing" initials="M" />
                        <ProjectCard color="bg-orange-400" name="Feature lists" initials="Fl" />
                        <ProjectCard color="bg-yellow-500" name="boardme development" initials="bd" />
                        <ProjectCard color="bg-purple-500" name="UIDD development" initials="Ud" />

                        <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer">
                            <span className="text-2xl">+</span>
                            <p className="text-xs">Add a project</p>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="h-5/6 w-2/6 bg-highlight text-white p-6 rounded-r-2xl border-[1px] border-highlight">
                <h2 className="text-headline font-inter text-sm mb-4">PROJECTS</h2>
            </div>
        </div>
    );
}

function ProjectCard({ color, name, initials }) {
    return (
        <div className={`w-20 h-20 ${color} flex flex-col items-center justify-center rounded-lg text-white shadow-lg`}>
            <span className="text-lg font-bold">{initials}</span>
            <p className="text-xs">{name}</p>
        </div>
    );
}

export default ProjectsSection