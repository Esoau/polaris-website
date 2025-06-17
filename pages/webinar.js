import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
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

export default function Webinar() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const webinarFormRef = useRef(null);
  const router = useRouter();

  // Handle webinar form submit
  const handleWebinarSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(webinarFormRef.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const date = formData.get("date");

    try {
      const response = await fetch("/api/webinar-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, date }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      setToast({
        show: true,
        message: `You have successfully signed up the Polaris Information Session on ${date}! We will send you an email shortly with more information.`,
      });
      setTimeout(() => {
        setToast({ show: false, message: "" });
        router.push("/");
      }, 3500);
      if (webinarFormRef.current) webinarFormRef.current.reset();
    } catch (error) {
      setSubmitError(error.message);
      console.error("Failed to submit webinar form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth scroll for anchor links
  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>Webinar Sign-Up | Polaris Consulting</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header & Navigation */}
      <header>
        <div className="container nav-container">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => router.push("/")}> 
            <img src="/Logo.png" alt="Polaris Logo" className="logo-img" />
            <div className="logo-text">
              Polaris <span>Consulting</span>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              {/* Add other relevant navigation links here if needed */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Polaris Consulting Info Session</h1>
          <p>
            Join us for a free information session on June 25 or June 29 at 9am EST! Learn about our services and how we can help you with college admissions.
          </p>
        </div>
      </section>

      {/* Webinar Sign-Up Section */}
      <section id="webinar-signup" className="contact">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '40px' }}>
          {/* Flyer Image */}
          <div style={{ flex: '1 1 350px', minWidth: 320, maxWidth: 420, margin: '0 auto' }}>
            <img src="/flyer.png" alt="Polaris Consulting Info Session Flyer" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }} />
          </div>
          {/* Sign-Up Form */}
          <div className="contact-form-container" style={{ flex: '1 1 350px', minWidth: 320, maxWidth: 600 }}>
            <form ref={webinarFormRef} onSubmit={handleWebinarSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="date">Select Session Date</label>
                <select id="date" name="date" required>
                  <option value="">Select a date</option>
                  <option value="June 25, 2025">June 25, 2025</option>
                  <option value="June 29, 2025">June 29, 2025</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="questions">Questions/Comments (Optional)</label>
                <textarea id="questions" name="questions" rows="4"></textarea>
              </div>
              <button type="submit" className="cta-btn" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
              {submitError && <p style={{ color: 'red', marginTop: '10px' }}>Error: {submitError}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Thank You!</h3>
            <p>You have successfully registered for the webinar. We will send you more details soon.</p>
            <button onClick={() => setShowSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="toast-notification">
          {toast.message}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Polaris Consulting. All rights
            reserved.
          </p>
          {/* Add social media links or other footer content here */}
        </div>
      </footer>

      <style jsx global>{`
        // Utilizing existing global styles from globals.css
        // Add any page-specific styles here if needed, or ensure they are covered in globals.css
        // For example, if hero section for webinar needs different styling:
        // .hero { background: url('/webinar-hero-background.jpg') no-repeat center center/cover; }

        .contact { // Reusing contact section styling for the form
          padding: 60px 0;
          background-color: #f9f9f9; // Example background
        }
        .contact-form-container {
          max-width: 600px;
          margin: 0 auto;
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .form-group textarea {
          resize: vertical;
        }
        .cta-btn { // Ensuring cta-btn is styled if not globally available or needs override
          display: inline-block;
          background-color: #007bff; // Example color
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .cta-btn:hover {
          background-color: #0056b3; // Darker shade on hover
        }
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        .modal h3 {
          margin-top: 0;
          color: #333;
        }
        .modal p {
          margin-bottom: 20px;
          color: #555;
        }
        .modal button {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .modal button:hover {
          background-color: #0056b3;
        }
        .footer {
          background-color: #333; // Example background
          color: white;
          text-align: center;
          padding: 20px 0;
          margin-top: 40px; // Ensure some space before footer
        }
        .toast-notification {
          position: fixed;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: #007bff;
          color: #fff;
          padding: 18px 32px;
          border-radius: 8px;
          font-size: 1.1rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          z-index: 2000;
          animation: fadeInOut 3.5s;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
