import React from "react";
import { FaInstagram, FaYoutube, FaSquareXTwitter } from "react-icons/fa6";
import googlePlayImage from "../../../public/images/google-play.png";
import appStoreImage from "../../../public/images/AppStore.png"; 
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footers: React.FC = () => {

  const path = usePathname();

  return (
    <footer>
      <div className={path === "/"? "f-content": "not-f-c"}>
        <div className="leftColumn">
        <div className="title">Coming Soon</div>
        <div className="btn-app-st">
          <a 
            href="#"
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon"
          >
            <Image src={googlePlayImage} alt="Google Play Store" className="buttonImage"/>
          </a>
          <a 
            href="#"
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon"
          >
            <Image src={appStoreImage} alt="App Store" className="buttonImage" />
          </a>
          </div>
        </div>
        <p className="text">
          © {new Date().getFullYear()} Xottle. All rights reserved.
        </p>
        <div className="socialContainer">
          <a 
            href="https://www.instagram.com/xottle_official" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://x.com/xottle_official" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon"
            >
            <FaSquareXTwitter />
          </a>
          <a 
            href="https://www.youtube.com/@Xottle_Official" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footers;