import React, { useState, useContext } from 'react'
import './style.scss';
import { skillsData } from '../../data/skillsData';
import { MouseContext } from '../../context/mouse-context';

const Skills = () => {
    const [skill_data, setSkill_data] = useState(skillsData[0]);
    const [active, setActive] = useState(0);

    const selectedSkill = (data, index) => {
        setSkill_data(data);
        setActive(index);
    }

    const getSkillCategories = () => {
        const categories = [];
        if (skill_data?.data) {
            Object.entries(skill_data.data).forEach(([key, values]) => {
                categories.push({
                    label: key,
                    items: values
                });
            });
        }
        return categories;
    };

    return (
        <section className='skills-page' aria-label="Skills">
            <div className='left'>
                <div className='skills-list' role="tablist" aria-label="Skill categories">
                    {skillsData.map((skill, index) => {
                        return (
                            <div
                                key={skill.id}
                                className={active === index ? "skill active" : "skill"}
                                onClick={() => selectedSkill(skill, index)}
                                role="tab"
                                aria-selected={active === index}
                                aria-controls={`skill-panel-${skill.id}`}
                            >
                                <span> {skill.name.toUpperCase()} </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="83" height="18" viewBox="0 0 103 38" fill="none" aria-hidden="true">
                                    <path className={active === index ? "active" : ""} fill={active === index ? "#eeeeee" : "#eeeeee70"} d="M101.768 20.7678C102.744 19.7915 102.744 18.2085 101.768 17.2322L85.8579 1.32233C84.8816 0.34602 83.2986 0.34602 82.3223 1.32233C81.346 2.29864 81.346 3.88155 82.3223 4.85786L96.4645 19L82.3223 33.1421C81.346 34.1184 81.346 35.7014 82.3223 36.6777C83.2986 37.654 84.8816 37.654 85.8579 36.6777L101.768 20.7678ZM0 21.5H100V16.5H0V21.5Z" />
                                </svg>
                            </div>
                        )
                    })}
                </div>
                <div className='heading'>
                    <h1>Skills.</h1>
                    <p>skills I have gained over the years of learning..</p>
                </div>
            </div>
            <div className='right' role="tabpanel" id={`skill-panel-${skill_data?.id}`}>
                <img
                    src={skill_data?.img}
                    alt={`${skill_data?.name} technology illustration`}
                    style={{ borderRadius: "50%", width: "430px", height: "430px" }}
                />
                <article className='skill-des'>
                    <header> {skill_data?.name.toUpperCase()} </header>
                    <section>
                        {getSkillCategories().map((category, idx) => (
                            <div key={idx}>
                                <span> {category.label.toUpperCase()}: </span>
                                {category.items.join(" | ").toUpperCase()}
                            </div>
                        ))}
                    </section>
                </article>
            </div>
        </section>
    )
}

export default Skills