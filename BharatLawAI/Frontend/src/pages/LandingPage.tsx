import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Gavel, Users, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LandingPage.css';

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null); // Ref for the title

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- GLITCH TEXT ANIMATION ---
      const title = titleRef.current;
      if (title) {
        const originalText = title.innerText;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';
        let interval: NodeJS.Timeout | null = null;

        const scramble = () => {
          let charIndex = 0; // This will track how many characters are revealed
          if(interval) clearInterval(interval);

          interval = setInterval(() => {
            title.innerText = originalText
              .split('')
              .map((letter, index) => {
                if (index < charIndex) { // If the character's index is less than the revealed count
                  return originalText[index]; // Keep the original character
                }
                // Otherwise, scramble it
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');

            if (charIndex >= originalText.length) { // If all characters are revealed
              if(interval) clearInterval(interval);
              title.innerText = originalText; // Ensure final text is correct
            }
            charIndex++; // Reveal one more character in the next interval
          }, 50); // 50ms delay between character reveals
        };
        
        // Start the scramble effect after a short delay
        const startTimeout = setTimeout(scramble, 300);
      }

      // --- HERO AND VIDEO ANIMATIONS ---
      // Animate the container of the title for a smooth fade-in
      gsap.from(titleRef.current, { duration: 0.5, opacity: 0, delay: 0.2 });
      gsap.from('.subtitle', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 1.5 });
      gsap.from('.cta-button', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 1.7 });
      
      // Continuous Video Parallax (applies to the whole page scroll)
      gsap.to(videoRef.current, {
        y: () => window.innerHeight * 0.2, // Move video 20% of viewport height
        ease: 'none',
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // --- SECTION REVEAL ANIMATIONS ---
      gsap.utils.toArray('.service-section').forEach((section) => {
        gsap.fromTo(section as HTMLElement, 
          { opacity: 0, y: 100 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power3.out', 
            scrollTrigger: {
              trigger: section as HTMLElement,
              start: 'top 80%', // When the top of the section hits 80% of the viewport
              end: 'bottom 20%', // When the bottom of the section leaves 20% of the viewport
              toggleActions: 'play none none reverse', // Play on enter, reverse on leave
              scrub: false, // Play once, not scrubbed
            }
          }
        );
      });

    }, mainRef);

    // Cleanup function to clear intervals and timeouts
    return () => {
        ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="landing-container">
      <div className="video-background">
        <video
          ref={videoRef}
          src="/background-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="video-element"
        />
        <div className="video-overlay"></div>
      </div>

      {/* Hero Section */}
      <div className="content-section hero-section">
        <h1 ref={titleRef} className="main-title">BHARATLAW</h1>
        <p className="subtitle">Your Advocate in the Digital Age.</p>
        <Link to="/chat" className="cta-button">
          Begin Consultation <ArrowRight className="ml-2" />
        </Link>
      </div>

      {/* Service Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        <div className="content-section service-section card-elegant legal-border text-center">
          <Scale size={60} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Constitutional Law</h2>
          <p className="text-gray-400">Fundamental rights, constitutional interpretation, and judicial review.</p>
        </div>

        <div className="content-section service-section card-elegant legal-border text-center">
          <Gavel size={60} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Criminal Law</h2>
          <p className="text-gray-400">IPC, CrPC, evidence law, and criminal procedure.</p>
        </div>

        <div className="content-section service-section card-elegant legal-border text-center">
          <Users size={60} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Civil Litigation</h2>
          <p className="text-gray-400">Contract disputes, property law, and civil procedures.</p>
        </div>

        <div className="content-section service-section card-elegant legal-border text-center">
          <Shield size={60} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Corporate Law</h2>
          <p className="text-gray-400">Company law, securities regulation, and compliance.</p>
        </div>
      </div>

      {/* Final Section */}
      <div className="content-section final-section">
        <h2>Ready to Begin?</h2>
        <Link to="/chat" className="cta-button">
          Enter the Chat
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
