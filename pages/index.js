import Head from "next/head";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const contactFormRef = useRef(null);
  const router = useRouter();

  // Handle contact form submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    if (contactFormRef.current) contactFormRef.current.reset();
  };

  // Handle password reset submit
  const handleResetSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link has been sent to your email.");
    setShowPasswordModal(false);
  };

  // Smooth scroll for anchor links
  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    let lastScrollY = window.scrollY;
    let scrollingDown = true;

    const onScroll = () => {
      scrollingDown = window.scrollY > lastScrollY;
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll);

    const revealSection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        } else {
          const rect = entry.target.getBoundingClientRect();
          // Hide if section is below the viewport (scrolling down or up)
          if (rect.top > window.innerHeight) {
            entry.target.classList.remove("section-visible");
          }
        }
      });
    };
    const observer = new window.IntersectionObserver(revealSection, {
      threshold: 0.15,
    });
    sections.forEach(section => {
      section.classList.add("section-hidden");
      observer.observe(section);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Polaris Consulting | Expert College Admissions Guidance</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header & Navigation */}
      <header>
        <div className="container nav-container">
          <div
            className="logo"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <img src="/Logo.png" alt="Polaris Logo" className="logo-img" />
            <div className="logo-text">
              Polaris <span>Consulting</span>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, "#about")}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleSmoothScroll(e, "#services")}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={(e) => handleSmoothScroll(e, "#team")}
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Navigate Your Path to College Success</h1>
          <p>
            Expert guidance from students who've successfully conquered the
            admissions process at top universities
          </p>
          <a
            href="#contact"
            className="cta-btn"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
          >
            Get Started Today
          </a>
        </div>
      </section>

      {/* Webinar Info Section */}
      <section id="webinar-info" className="about">
        {/* Reusing about section styles */}
        <div className="container">
          <div className="section-title">
            <h2>Polaris Consulting Info Session</h2>
            <p>
              Join us for a free information session on June 25 or June 29 at 9am
              EST!
            </p>
          </div>
          <div className="about-content">
            <p>
              Learn about our services, including College Essay Writing,
              Application Construction, and developing an Admissions Strategy.
              Meet our team from Northwestern University and get your questions
              answered about the college admissions process.
            </p>
            <br />
            <p>
              <strong>Info Session Dates:</strong> June 25 or June 29, 9am EST
              <br />
            </p>
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              <Link href="/webinar" legacyBehavior>
                <a className="cta-btn">Sign Up for the Info Session</a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-title">
            <h2>About Polaris Consulting</h2>
            <p>Your guiding star in the college admissions journey</p>
          </div>
          <div className="about-content">
            <p>
              Polaris Consulting offers an unparalleled approach to college
              admissions guidance. Our team is made up of students who have
              successfully navigated through the admissions process at the
              nation's top universities themselves and have experience helping
              others do the same. Our consultants don't just offer theoretical
              advice; they provide relevant, up-to-date insights, ensuring that
              every student receives a personalized strategy that will resonate
              with admissions committees and maximize their chances in a
              complicated and competitive admissions landscape.
            </p>
            <br />
            <p>
              Polaris Consulting provides comprehensive support throughout the
              entire college admissions journey, starting as early as freshman
              year of high school. Our services include essay coaching,
              application strategy development, interview preparation,
              extracurricular planning, and tutoring for standardized tests. We
              ensure every student's final application contributes to a cohesive
              and compelling narrative.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>Comprehensive support throughout your college admissions journey</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              </div>
              <h3>Essay Coaching</h3>
              <p>
                Develop compelling essays that authentically showcase your unique
                voice and experiences. Our coaches work closely with you to
                brainstorm ideas, refine your narrative, and polish your writing
                to perfection.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Application Strategy</h3>
              <p>
                Create a personalized roadmap for your college applications,
                including school selection, timeline planning, and strategic
                positioning of your academic and extracurricular achievements.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3>Interview Preparation</h3>
              <p>
                Build confidence through mock interviews and personalized
                feedback. Learn how to articulate your goals, showcase your
                strengths, and leave a lasting impression on admissions officers.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3>Extracurricular Planning</h3>
              <p>
                Develop a strategic approach to activities that align with your
                interests and strengthen your application. We help you identify
                meaningful opportunities that demonstrate leadership and
                commitment.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3>Test Preparation</h3>
              <p>
                Receive targeted tutoring for standardized tests from consultants
                who have achieved top scores. Our personalized approach focuses on
                your specific areas for improvement and effective test-taking
                strategies.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3>Comprehensive Packages</h3>
              <p>
                Benefit from holistic support throughout your entire admissions
                journey with our tailored packages. From freshman year planning to
                final decisions, we're with you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team">
        <div className="container">
          <div className="section-title">
            <h2>Our Team</h2>
            <p>Meet the consultants who will guide your journey</p>
          </div>
          <div className="team-intro">
            <p>
              Our team consists of admits from top universities including
              Harvard, Princeton, Oxford, Northwestern, and other prestigious
              institutions. Each consultant has not only navigated the complex
              admissions process successfully but has also helped numerous
              students achieve their college dreams.
            </p>
            <br />
            <p>
              What sets Polaris consultants apart is our firsthand, recent
              experience with the ever-evolving admissions landscape. We provide
              insights that are relevant and actionable, drawing from our own
              successes and our understanding of what admissions committees are
              looking for today.
            </p>
            <br />
            <div
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--white)",
                padding: 25,
                borderRadius: 8,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              <h3
                style={{
                  color: "var(--secondary)",
                  marginBottom: 15,
                  fontSize: 24,
                }}
              >
                2025 Admission Results
              </h3>
              <p style={{ fontSize: 18 }}>
                Our students were admitted to Princeton, Berkeley, Dartmouth,
                Northwestern, Johns Hopkins, Brown, UPenn, UCLA, and other top
                universities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-login">
        <div className="container">
          <div className="section-title">
            <h2>Get in Touch</h2>
            <p>Take the first step toward your dream college</p>
          </div>
          <div
            className="container"
            style={{ maxWidth: 600, margin: "0 auto" }}
          >
            <div className="contact-form">
              <h3 className="form-title">Book a Consultation</h3>
              <div style={{ width: "100%", minHeight: 650 }}>
                <iframe
                  src="https://calendly.com/evanlifansun/30min"
                  width="100%"
                  height="650"
                  frameBorder="0"
                  style={{ border: "none" }}
                  allowFullScreen
                  title="Schedule with Polaris Consulting"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <div className="footer-logo">
                Polaris <span>Consulting</span>
              </div>
              <p>
                Guiding students to their best-fit colleges with personalized,
                expert admissions consulting.
              </p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleSmoothScroll(e, "#about")}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    onClick={(e) => handleSmoothScroll(e, "#team")}
                  >
                    Meet the Team
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, "#contact")}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>Contact Info</h3>
              <p>Email: consultants.polaris@gmail.com</p>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 Polaris Consulting. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal for Forgot Password */}
      {showPasswordModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <span
              className="close-modal"
              onClick={() => setShowPasswordModal(false)}
            >
              &times;
            </span>
            <h3 className="form-title">Reset Password</h3>
            <form id="resetForm" onSubmit={handleResetSubmit}>
              <div className="form-group">
                <label htmlFor="resetEmail">Email Address</label>
                <input type="email" id="resetEmail" name="resetEmail" required />
              </div>
              <button type="submit" className="submit-btn">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Successful Submission */}
      {showSuccessModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <span
              className="close-modal"
              onClick={() => setShowSuccessModal(false)}
            >
              &times;
            </span>
            <h3 className="form-title">Thank You!</h3>
            <p>
              Your message has been sent successfully. One of our consultants
              will contact you shortly.
            </p>
            <button
              className="submit-btn"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* ...existing styles... */

        section.section-hidden {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        section.section-visible {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </>
  );
}
