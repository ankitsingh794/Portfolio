import React from "react";
import ProfileCard from "../components/ProfileCard";
import "./Introduction.css"; 

export const Introduction = () => {
    return (
        <div className="introduction">
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
    );
}

export default Introduction;