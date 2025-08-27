import linkedinAnimation from "./linkedin.json";
import Lottie from "lottie-react";


export const LinkedinB = () => {
  return (
    <a
      href="https://www.linkedin.com/in/ankitsingh794/"
      target="_blank"
      rel="noopener noreferrer"
      className="linkedin-animation"
      style={{ cursor: "pointer", display: "inline-block", width: 100, height: 100, margin: "0 4rem" }}
    >
      <Lottie 
        animationData={linkedinAnimation} 
        loop={true} 
        autoplay={true} 
        style={{ width: "100%", height: "100%" }} 
      />
    </a>
  );
};
