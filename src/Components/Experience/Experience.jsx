import React, { useState, useContext } from 'react'
import './style.scss';
import { experienceData } from '../../data/experienceData';
import { MouseContext } from '../../context/mouse-context';

const Experience = () => {
    const { cursorChangeHandler } = useContext(MouseContext);
    const [experienceDataSelected, setExperienceDataSelected] = useState(experienceData[0]);
    const [active, setActive] = useState(0);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const selectedExperience = (data, index) => {
        setExperienceDataSelected(data);
        setActive(index);
        setIsPanelOpen(true);
    }

    return (
        <section className='experiences-page' aria-label="Work Experience">
            <div className='left'>
                <div className='experiences-list' role="tablist" aria-label="Experience entries">
                    {experienceData.map((experience, index) => {
                        return (
                            <div
                                key={experience.id}
                                className={active === index ? "experience active" : "experience"}
                                onClick={() => selectedExperience(experience, index)}
                                role="tab"
                                aria-selected={active === index}
                                aria-controls={`experience-panel-${experience.id}`}
                                onMouseEnter={() => cursorChangeHandler('hovered')}
                                onMouseLeave={() => cursorChangeHandler('')}
                            >
                                <div className='experience-main'>
                                    <span className='role'> {experience?.designation} </span>
                                    <span className='company'> {experience?.companyName} </span>
                                </div>
                                <span className='duration'> {experience?.experience} </span>
                                <div className='stack-preview'>
                                    <p>{experience?.experience} of experience</p>
                                    <p>Stacks worked on:</p>
                                    <div className='chips'>
                                        {experience?.stacks?.map((stack) => (
                                            <span key={stack} className='chip'>{stack}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='heading'>
                    <h1>Experiences.</h1>
                    <p>Click any role to view complete journey and impact.</p>
                </div>
            </div>

            <div className={isPanelOpen ? 'panel-placeholder hidden' : 'panel-placeholder'}>
                <div className='doodle-box'>
                    <p>Select any role to explore details</p>
                    <div className='doodle-lines'>
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className='doodle-circle' />
                </div>
            </div>

            <aside
                className={isPanelOpen ? 'experience-panel open' : 'experience-panel'}
                role="tabpanel"
                id={`experience-panel-${experienceDataSelected?.id}`}
                aria-hidden={!isPanelOpen}
            >
                <article className='experience-des'>
                    <button
                        type='button'
                        className='close-panel'
                        onClick={() => setIsPanelOpen(false)}
                        aria-label='Close details panel'
                    >
                        x
                    </button>
                    <header>
                        <h2 className='header'>{experienceDataSelected?.companyName}</h2>
                        <p className='location'>{experienceDataSelected?.location}</p>
                        <p className='sub-header'>
                            {experienceDataSelected?.experience} | {experienceDataSelected?.designation}
                        </p>
                        <p>{experienceDataSelected?.expToandFrom}</p>
                    </header>
                    <section>
                        <ul>
                            {experienceDataSelected?.highlights?.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </section>
                </article>
            </aside>
        </section>
    )
}

export default Experience
