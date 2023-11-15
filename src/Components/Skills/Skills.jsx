import React, { useState } from 'react'
import './style.scss';

const Skills = () => {
    const [skill_data, setSkill_data] = useState({
        "name": "front-end",
        "img" : "assets/imgs/skills/tianyi-ma-WiONHd_zYI4-unsplash.jpg",
        "data": {
            "languages": ["javascript", "python"],
            "framworks": ["react", "angular", "vue"]
        }
    })
    const [active, setActive] = useState(0);
    
    const skills = [
        {
            "name": "front-end",
            "img" : "assets/imgs/skills/tianyi-ma-WiONHd_zYI4-unsplash.jpg",
            "data": {
                "languages": ["javascript", "python"],
                "framworks": ["react", "angular", "vue"]
            }
        },
        {
            "name": "back-end",
            "img" : "assets/imgs/skills/ales-nesetril-Im7lZjxeLhg-unsplash.jpg",
            "data": {
                "languages": ["javascript", "python"],
                "framworks": ["node", "django"]
            }
        },
        {
            "name": "core",
            "img" : "assets/imgs/skills/emile-perron-xrVDYZRGdw4-unsplash.jpg",
            "data": {
                "concepts": ["javascript", "python"],
                "framworks": ["node", "django"]
            }
        }
    ]

    const selectedSkill = (data, index) => {
        setSkill_data(data);
        setActive(index);
    }

  return (
    <div className='skills-page'>
        <div className='left'>
            <div className='skills-list'>
                {skills.map((skill, index) => {
                    return (
                        <div className={active===index?"skill active":"skill"} key={index} onClick={() => selectedSkill(skill, index)}>
                            <span> {skill.name.toUpperCase()} </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="83" height="18" viewBox="0 0 103 38" fill="none">
                                <path className={active===index?"active":""}  fill={active===index?"#eeeeee":"#eeeeee70"} d="M101.768 20.7678C102.744 19.7915 102.744 18.2085 101.768 17.2322L85.8579 1.32233C84.8816 0.34602 83.2986 0.34602 82.3223 1.32233C81.346 2.29864 81.346 3.88155 82.3223 4.85786L96.4645 19L82.3223 33.1421C81.346 34.1184 81.346 35.7014 82.3223 36.6777C83.2986 37.654 84.8816 37.654 85.8579 36.6777L101.768 20.7678ZM0 21.5H100V16.5H0V21.5Z"/>
                            </svg>
                        </div>
                    )
                })}
            </div>
            <div className='heading'>
                <h1>SKills.</h1>
                <p>skills I have gained over the years of learning..</p>
            </div>
        </div>
        <div className='right'>
            <img src={skill_data?.img} alt="img" style={{borderRadius:"50%", width:"430px", height:"430px"}}/>
            <article className='skill-des'>
                <header> {skill_data?.name.toUpperCase()} </header>
                <section>
                    <div>
                        <span> {Object.keys(skill_data?.data)[0].toUpperCase()}: </span>  { skill_data?.data[Object.keys(skill_data?.data)[0]].join(" | ").toUpperCase() }
                    </div>
                    <div>
                        <span> {Object.keys(skill_data?.data)[1].toUpperCase()}: </span>  { skill_data?.data[Object.keys(skill_data?.data)[0]].join(" | ").toUpperCase() }
                    </div>
                </section>
            </article>
        
        </div>
    </div>
  )
}

export default Skills