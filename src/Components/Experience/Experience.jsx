import React, { useState } from 'react'
import './style.scss';

const Experience = () => {
    const [experience_data, setExperience_data] = useState({
        "companyName": "CloudEQ",
        "designation": "Jr. SDE",
        "experience": "1 year",
        "url": 'assets/imgs/experience/ben-kolde-cpLsWmMEa1Q-unsplash.jpg',
        "expToandFrom": "01-2023 to 01-2024",
        "description": "It was a remarkable experience working here in  the company where seniors where tutoring and guiding me to the brighter future. And I learnt more than 10 technologies here and become specialist in few of them." 
    })

    // const [class_exp, setClass_exp] = useState("experience")
    const [active, setActive] = useState(0);
    
    const experiences = [
        {
            "companyName": "CloudEQ",
            "designation": "Jr. SDE",
            "experience": "1 year",
            "url": 'assets/imgs/experience/ben-kolde-cpLsWmMEa1Q-unsplash.jpg',
            "expToandFrom": "01-2023 to 01-2024",
            "description": "It was a remarkable experience working here in  the company where seniors where tutoring and guiding me to the brighter future. And I learnt more than 10 technologies here and become specialist in few of them." 
        },
        {
            "companyName": "Persistent System",
            "designation": "SDE",
            "experience": "4 months",
            "url": 'assets/imgs/experience/luca-bravo-XJXWbfSo2f0-unsplash.jpg',
            "expToandFrom": "06-2022 to 09-2022",
            "description": "It was a remarkable experience working here in  the company where seniors where tutoring and guiding me to the brighter future. And I learnt more than 10 technologies here and become specialist in few of them." 
        },
        {
            "companyName": "Persistent System",
            "designation": "SDE - Intern",
            "experience": "6 months",
            "url": 'assets/imgs/experience/luca-bravo-XJXWbfSo2f0-unsplash.jpg',
            "expToandFrom": "12-2021 to 06-2022",
            "description": "It was a remarkable experience working here in  the company where seniors where tutoring and guiding me to the brighter future. And I learnt more than 10 technologies here and become specialist in few of them." 
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