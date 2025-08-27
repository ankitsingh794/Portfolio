import GmailAnimation from "./Gmail.json";
import Lottie from "lottie-react";

export const GmailB = () => {
  return (
    <a
      href="mailto:ankitsingh794@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      className="gmail-animation"
      style={{
        cursor: "pointer",
        display: "inline-block",
        width: 100,
        height: 100,
        margin: "0 4rem"
      }}
    >
      <Lottie
        animationData={GmailAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </a>
  );
};
