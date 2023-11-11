import React, { useState } from 'react'
import './style.scss';
// import imagese from '../../assets/imgs';
import frontendIMG from '../../assets/imgs/luca-bravo-XJXWbfSo2f0-unsplash.jpg';
// import frontendIMG from './imgs/tianyi-ma-WiONHd_zYI4-unsplash.jpg';
import backendIMG from './imgs/luca-bravo-XJXWbfSo2f0-unsplash.jpg';
import coreIMG from './imgs/emile-perron-xrVDYZRGdw4-unsplash.jpg';

const Skills = () => {
    const [skill_data, setSkill_data] = useState({
        "name": "front-end",
        // "img" : "../../assets/imgs/tianyi-ma-WiONHd_zYI4-unsplash.jpg",
        // "url": "https://austinlibrary.org/wp-content/uploads/2020/05/tianyi-ma-WiONHd_zYI4-unsplash-scaled.jpg",
        "url": frontendIMG,
        "data": {
            "languages": ["javascript", "python"],
            "framworks": ["react", "angular", "vue"]
        }
    })

    // const [active, setActive] = useState(false);
    
    const skills = [
        {
            "name": "front-end",
            "url" : "/logo192.png",
            // "url": "https://austinlibrary.org/wp-content/uploads/2020/05/tianyi-ma-WiONHd_zYI4-unsplash-scaled.jpg",
            // "url": frontendIMG,
            "data": {
                "languages": ["javascript", "python"],
                "framworks": ["react", "angular", "vue"]
            }
        },
        {
            "name": "back-end",
            // "img" : "../../assets/imgs/ales-nesetril-Im7lZjxeLhg-unsplash.jpg",
            "url": backendIMG,
            "data": {
                "languages": ["javascript", "python"],
                "framworks": ["node", "django"]
            }
        },
        {
            "name": "core",
            // "img" : "../../assets/imgs/ales-nesetril-Im7lZjxeLhg-unsplash.jpg",
            "url": coreIMG,
            "data": {
                "concepts": ["javascript", "python"],
                "framworks": ["node", "django"]
            }
        }
    ]
    // const images = require.context(imagese, false, /\.(png|jpe?g|svg)$/);

    const selectedSkill = (data) => {
        setSkill_data(data);
        // setActive(true);
    }

  return (
    <div className='skills-page'>
        <div className='left'>
            <div className='skills-list'>
                {skills.map((skill, index) => {
                    return (
                        <div className="skill" key={index} onClick={() => selectedSkill(skill)}>
                            <span> {skill.name.toUpperCase()} </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="83" height="18" viewBox="0 0 103 38" fill="none">
                                <path style={{strokeWidth:"2px", stroke:"#FBFBFB"}} d="M101.768 20.7678C102.744 19.7915 102.744 18.2085 101.768 17.2322L85.8579 1.32233C84.8816 0.34602 83.2986 0.34602 82.3223 1.32233C81.346 2.29864 81.346 3.88155 82.3223 4.85786L96.4645 19L82.3223 33.1421C81.346 34.1184 81.346 35.7014 82.3223 36.6777C83.2986 37.654 84.8816 37.654 85.8579 36.6777L101.768 20.7678ZM0 21.5H100V16.5H0V21.5Z" fill="#FBFBFB"/>
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
            <img src={skill_data?.url} alt="img" style={{borderRadius:"50%", width:"430px", height:"430px"}}/>
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