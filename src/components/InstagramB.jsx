import instagramAnimation from "./instagram.json";
import Lottie from "lottie-react";


export const InstagramB = () => {
  return (
    <a
      href="https://www.instagram.com/__.ank.it.__/"
      target="_blank"
      rel="noopener noreferrer"
      className="Instagram-animation"
      style={{ cursor: "pointer", display: "inline-block", width: 100, height: 100,margin: "0 4rem" }}
    >
      <Lottie 
        animationData={instagramAnimation} 
        loop={true} 
        autoplay={true} 
        style={{ width: "100%", height: "100%" }} 
      />
    </a>
  );
};