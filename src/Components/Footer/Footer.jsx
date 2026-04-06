import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer bg-dark text-white pt-5">
      <div className="container">

        <div className="row" style={{ columnGap: "40px", rowGap: "30px" }}>

          <div className="col-12 col-md-6 col-lg-3">
            <h2 className="footer-logo">FITNESS TIME</h2>
            <p>
              Transform your body and mind with our state-of-the-art
              facilities, expert trainers, and AI-powered nutrition guidance.
            </p>
            <div className="d-flex gap-3 social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h5>QUICK LINKS</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/ai-nutrition" className="footer-link">AI Nutrition</Link></li>
              <li><Link to="/membership" className="footer-link">Membership</Link></li>
              <li><Link to="/store" className="footer-link">Store</Link></li>
              <li><Link to="/trainers" className="footer-link">Trainers</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h5>SERVICES</h5>
            <ul className="list-unstyled">
              <li>Personal Training</li>
              <li>Group Classes</li>
              <li>Nutrition Coaching</li>
              <li>Online Training</li>
              <li>Corporate Wellness</li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <h5>CONTACT US</h5>
            <ul className="list-unstyled contact-info">
              <li>📍 123 Fitness Street, New York, NY 10001</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉ info@fitnesstime.com</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom mt-4 pt-3 border-top border-secondary d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0">© 2026 Fitness Time. All rights reserved.</p>
          <div className="d-flex gap-3 footer-bottom-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
