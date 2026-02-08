import React, { useState, useContext } from 'react'
import './style.scss';
import { experienceData } from '../../data/experienceData';
import { MouseContext } from '../../context/mouse-context';

const Experience = () => {
    const { cursorChangeHandler } = useContext(MouseContext);
    const [experience_data, setExperience_data] = useState(experienceData[0]);
    const [active, setActive] = useState(0);

    const selectedexperience = (data, index) => {
        setExperience_data(data);
        setActive(index);
    }

    return (
    <section className='experiences-page' role="region" aria-label="Work Experience">
        <div className='left'>
            <div className='experiences-list' role="tablist" aria-label="Experience entries">
                {experienceData.map((experience, index) => {
                    return (
                        <div
                            key={experience.id}
                            className={active===index?"experience active":"experience"}
                            onClick={() => selectedexperience(experience, index)}
                            role="tab"
                            aria-selected={active === index}
                            aria-controls={`experience-panel-${experience.id}`}
                            onMouseEnter={() => cursorChangeHandler('hovered')}
                            onMouseLeave={() => cursorChangeHandler('')}
                        >
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

        <div className='right' role="tabpanel" id={`experience-panel-${experience_data?.id}`}>
            <img 
                src={experience_data?.url} 
                alt={`${experience_data?.companyName} company`}
                style={{borderRadius:"50%", width:"430px", height:"430px"}}
            />
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
    </section>
  )
}

export default Experience
