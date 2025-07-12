import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Loader.css';
import { Scale } from 'lucide-react'; // Using Scale icon as a placeholder for your logo

interface LoaderProps {
  onLoaded: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoaded }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onLoaded(); // Notify parent component that loading is complete
      },
    });

    // Animate counter
    gsap.to(counterRef.current, {
      duration: 2.5, // Duration for the counter animation
      innerText: 100,
      roundProps: "innerText",
      ease: "power1.inOut",
      onUpdate: function() {
        setProgress(parseInt(this.targets()[0].innerText));
      }
    });

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 2.5, // Match counter duration
      ease: "power1.inOut",
    }, 0); // Start at the same time as counter

    // Fade out loader after progress is complete
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5, // Small delay after progress completes
      pointerEvents: "none", // Disable interactions during fade out
    });

  }, [onLoaded]);

  return (
    <div ref={loaderRef} className="loader-overlay">
      <div className="loader-content">
        <div className="loader-logo">
          <Scale size={80} color="white" /> {/* Placeholder for your logo */}
        </div>
        <div className="loader-progress">
          <span ref={counterRef} className="loader-counter">0</span>%
          <div className="loader-bar-container">
            <div ref={progressBarRef} className="loader-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
