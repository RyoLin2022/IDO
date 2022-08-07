import React from 'react'
import * as FaIcons from "react-icons/fa";
import './Community.css';

const iconData = [
    {
        title: 'Twitter',
        URL: "https://twitter.com/home",
        icon: <FaIcons.FaTwitter size={"50px"} />,
        cName: 'nav-textCom'
    },
    {
        title: 'Telegram',
        URL: "https://t.me/RyoLin",
        icon: <FaIcons.FaTelegram size={"50px"} />,
        cName: 'nav-textCom'
    },
]

function Community() {
    return (
        <div className='community'>
            <div className="insideCommunity">
                <div id="community-Title">INFINITY</div>

                {iconData.map((item, index) => {
                    console.log(item+"    "+index);
                    return (
                        <><br />
                        <li key={index} className={item.cName}>
                            <a href={item.URL}>
                                {item.icon}
                                <h1><span>{item.title}</span></h1>
                            </a>
                        </li></>
                    )
                })}
                <ul className="icons">
                </ul>
            </div>
        </div>
    )
}

export default Community
