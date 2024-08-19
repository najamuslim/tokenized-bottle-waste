import React from "react";
<<<<<<< HEAD

const Footers: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={textStyle}>
          © {new Date().getFullYear()} Xottle. All rights reserved.
        </p>
=======
import { FaInstagram, FaYoutube, FaSquareXTwitter } from "react-icons/fa6";
import googlePlayImage from "../../../public/images/google-play.png";
import appStoreImage from "../../../public/images/AppStore.png"; 
import Image from "next/image";

const Footers: React.FC = () => {
  return (
    <footer>
      <div className="f-content">
        <div className="leftColumn">
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
>>>>>>> 49c0225 (update footer view)
      </div>
    </footer>
  );
};

<<<<<<< HEAD
const footerStyle: React.CSSProperties = {
  backgroundColor: "#F5CC00",
  color: "#003566",
  padding: "1rem 0",
  position: "relative",
  bottom: 0,
  width: "100%",
  textAlign: "center",
  marginTop: "auto",
};

const containerStyle: React.CSSProperties = {
  margin: "0 auto",
  padding: "0 1rem",
};

const textStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "1rem",
};

=======
>>>>>>> 49c0225 (update footer view)
export default Footers;
