import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-col">
          <h2 className="footer-logo">FITNESS TIME</h2>

          <p>
            Transform your body and mind with our state-of-the-art
            facilities, expert trainers, and AI-powered nutrition guidance.
          </p>

       <div className="social-icons">
         <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
         <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
         <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
         <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
        </div>
        </div>

        <div className="footer-col">
          <h3>QUICK LINKS</h3>
          <ul>
            <li>Home</li>
            <li>AI Nutrition</li>
            <li>Membership</li>
            <li>Store</li>
            <li>Trainers</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>SERVICES</h3>
          <ul>
            <li>Personal Training</li>
            <li>Group Classes</li>
            <li>Nutrition Coaching</li>
            <li>Online Training</li>
            <li>Corporate Wellness</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>CONTACT US</h3>
          <ul className="contact-info">
            <li>📍 123 Fitness Street,<br/>New York, NY 10001</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>✉ info@fitnesstime.com</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Fitness Time. All rights reserved.</p>

        <div className="footer-bottom-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
