import React, { useEffect, useState } from "react";
import axios from "axios";



const About = () => {
  const [user, setUser] = useState({});
    useEffect(() => {
      const getMyProfile = async () => {
        const { data } = await axios.get(
          "https://portfolio-a55l.onrender.com/api/v1/user/me/portfolio",
          { withCredentials: true }
        );
        setUser(data.user);
      };
      getMyProfile();
    }, []);


  return (

    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
      
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-10">
          <div className="flex justify-center items-center">

            <img
               src = {user.avatar && user.avatar.url  || "/default.jpg"}
              // src= "/default.jpg"
              alt={user.fullName}
              className="bg-white p-2 sm:p-4 rotate-[0deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[0.25px] text-xl gap-5">
            <p>
             
            I’m Aman Chaurasiya, a pre-final year B.Tech student in Electrical Engineering at IET Lucknow, with a strong foundation in problem-solving, system design, and software development. My expertise in data structures, algorithms, and full-stack development (MERN stack) enables me to build scalable and high-performance applications while ensuring efficiency and reliability. Passionate about AI/ML and Blockchain, I actively explore emerging technologies to drive innovation at the intersection of software and engineering.
            </p>
            <p>
            Beyond technology, I am passionate about entrepreneurship and driven to create innovative, real-world solutions with a lasting impact. I actively participate in hackathons and problem-solving competitions, applying my skills to tackle complex challenges. I thrive in dynamic environments that push creativity and efficiency. Outside of work, I enjoy cricket, which instills discipline, teamwork, and a competitive mindset in me.
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
        I am dedicated to building impactful solutions, embracing challenges with perseverance, and constantly pushing the boundaries of innovation.
        </p>
      </div>
    </div>
  );
};

export default About;


