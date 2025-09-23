import React, { useState } from 'react'
import './style.scss';

const Experience = () => {
    const [experience_data, setExperience_data] = useState({
        "companyName": "CloudEQ",
        "designation": "Jr. SDE",
        "experience": "1 year + current",
        "url": 'assets/imgs/experience/ben-kolde-cpLsWmMEa1Q-unsplash.jpg',
        "expToandFrom": "01-2023 to PRESENT",
        "description": "It was a remarkable experience working here in  the company where seniors where tutoring and guiding me to the brighter future. And I learnt more than 10 technologies here and become specialist in few of them." 
    })

    // const [class_exp, setClass_exp] = useState("experience")
    const [active, setActive] = useState(0);
    
    const experiences = [
        {
            "companyName": "CloudEQ",
            "designation": "SDE - II",
            "experience": "2 months",
            "url": 'assets/imgs/experience/ben-kolde-cpLsWmMEa1Q-unsplash.jpg',
            "expToandFrom": "08-2025 to PRESENT",
            "description": "It's a remarkable journey here in CloudEQ where I can learn and implement new technologies, learning is curve is moving exponentially from internal products to leading Client calls." 
        },
        {
            "companyName": "CloudEQ",
            "designation": "SDE - I",
            "experience": "2 yrs 8 months",
            "url": 'assets/imgs/experience/ben-kolde-cpLsWmMEa1Q-unsplash.jpg',
            "expToandFrom": "01-2023 to 08-2025",
            "description": "From implementing multiple resuable React components to integrating Client inteface with our. Architecturing client intake automation for our company to reduce manual efforts to null." 
        },
        {
            "companyName": "InfoHub Innovations",
            "designation": "SE - I",
            "experience": "7 months",
            "url": 'assets/imgs/experience/luca-bravo-XJXWbfSo2f0-unsplash.jpg',
            "expToandFrom": "06-2022 to 12-2022",
            "description": "It was a remarkable experience working here in the company where seniors where tutoring and guiding me to the brighter future. And I learnt may Frontend techstacks and how OAuth 2.0 works." 
        },
        {
            "companyName": "Persistent System",
            "designation": "SDE - Intern",
            "experience": "8 months",
            "url": 'assets/imgs/experience/luca-bravo-XJXWbfSo2f0-unsplash.jpg',
            "expToandFrom": "12-2021 to 08-2022",
            "description": "As a fresher working and learing from HELLO WORLD to responsive UI components in Reactjs, working & collaborating with Agile team, it was the best platform to have insight about the IT industry where people supports you in all condition." 
        }
    ]


    const selectedexperience = (data, index) => {
        setExperience_data(data);
        setActive(index);
    }

    return (
    <div className='experiences-page'>
        <div className='left'>
            <div className='experiences-list'>
                {experiences.map((experience, index) => {
                    return (
                        <div className={active===index?"experience active":"experience"} key={index} onClick={() => selectedexperience(experience, index)}>
                            <span> {experience?.designation.toUpperCase()} - {experience?.companyName.toUpperCase()} </span>
                            <span> {experience?.experience.toLowerCase()} </span>
                        </div>
                    )
                })}
            </div>
            <div className='heading'>
                <h1>Experiences.</h1>
                <p>experiences I have gained over the years of learning..</p>
            </div>
        </div>

        <div className='right'>
            <img src={experience_data?.url} alt="img" style={{borderRadius:"50%", width:"430px", height:"430px"}}/>
            <article className='experience-des'>
                <header>
                    <div className='header'> {experience_data?.designation} - {experience_data?.companyName} </div>
                    <div> {experience_data?.expToandFrom} </div>
                </header>
                <section>
                    <div>
                        {experience_data?.description}
                    </div>
                </section>
            </article>
        
        </div>
    </div>
  )
}

export default Experience
