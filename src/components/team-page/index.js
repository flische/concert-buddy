import React from 'react';
import './team-page.css';
import githubIcon from '../../images/github.svg';
import linkedInIcon from '../../images/linkedin.svg';
import howardPic from '../../images/howard_pic.png';
import rebecca from '../../images/rebecca_pic.jpeg';
import tien from '../../images/tien_pic.jpeg';
import fed from '../../images/federico_pic.jpeg';

const members = [
    {
        name: 'Rebecca Martin',
        role: 'Frontend',
        imgUrl: rebecca,
        favoriteArtist: 'Taylor Swift',
        linkedin: 'https://www.linkedin.com/in/rebecca-martin-63a19256/',
        github: 'https://www.github.com/rebeccacodes'
    },
    {
        name: 'Howard Kim',
        role: "Team Lead",
        imgUrl: howardPic,
        favoriteArtist: 'Tien',
        linkedin: 'https://www.linkedin.com/in/howardkim820/',
        github: 'https://www.github.com/howardskim'
    },
    {
        name: 'Tien Pham',
        role: 'Backend',
        imgUrl: tien,
        favoriteArtist: 'Naruto',
        linkedin: 'https://www.linkedin.com/in/tien-m-pham/',
        github: 'https://www.github.com/TMPHAM1'
    },
    {
        name: 'Federico Lische',
        role: 'Frontend',
        imgUrl: fed,
        favoriteArtist: 'Pink Floyd',
        linkedin: 'https://www.linkedin.com/in/flische/',
        github: 'https://www.github.com/flische'
    }
];

export default () => {
    return (
        <div className="div-container">
            <h3 className="title">MEET THE TEAM</h3>

            <div className="team-container">
                {members.map(item => {
                    const{ name, role, imgUrl, favoriteArtist, linkedin, github } = item;

                    return (
                        <div className="eachPerson" key={name}>
                            <div className="profile">
                                <p>{name}</p>
                                <img src={imgUrl} alt="photo" />
                                <p>{role}</p>
                            </div>
                            <div className="details">
                                <p>favorite artist:</p>
                                <p>{favoriteArtist}</p>
                                <div className="links">
                                    <a href={linkedin} target="_blank"><img src={linkedInIcon} alt="linkedIn" /></a>
                                    <a href={github} target="_blank"><img src={githubIcon} alt="linkedIn" /></a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
