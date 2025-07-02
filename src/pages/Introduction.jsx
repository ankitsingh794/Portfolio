import React from "react";
import ProfileCard from "../components/ProfileCard";
import ShinyText from "../components/ShinyText";
import "./Introduction.css";

export const Introduction = () => {
    return (
        <div className="introduction" >
            
            <div className="intro-text">
                <ShinyText
                    text="Hey fam! Welcome to my Portfolio."
                    disabled={false}
                    speed={3}
                    className="custom-class"
                />
            </div>

            <div className="profile-section">
                <ProfileCard
                    name="Ankit Singh"
                    title="Software Engineer"
                    handle="ankitsingh794"
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="https://res.cloudinary.com/divulwxho/image/upload/v1751456065/WhatsApp_Image_2025-07-02_at_17.00.05_63987d7e-removebg-preview_mntuxp.png"
                    showUserInfo={true}
                    enableTilt={true}
                    onContactClick={() => console.log('Contact clicked')}
                />
            </div>

            <div className="contact-info" >
                Feel free to connect or explore more below.
            </div>

        </div>
    );
};

export default Introduction;
