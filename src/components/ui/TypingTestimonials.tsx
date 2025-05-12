'use client';

import { useState, useEffect } from 'react';

// List of testimonials to cycle through
const testimonials = [
  {
    text: "Lacombe Gutters did an outstanding job on our home. The crew was professional, efficient, and cleaned up perfectly after the job was done.",
    author: "Mike J., Lacombe"
  },
  {
    text: "I've recommended Lacombe Gutters to all my neighbors. Their pricing was fair, work was high quality, and they were very responsive to all my questions.",
    author: "Sarah T., Red Deer"
  },
  {
    text: "Rob and Ryan were fantastic to work with! They helped us choose the right gutter solution for our new build and the installation was flawless.",
    author: "Dave and Karen B., Blackfalds"
  },
  {
    text: "After a bad experience with another company, Lacombe Gutters came to fix my gutters and did an incredible job. True professionals who take pride in their work.",
    author: "Linda M., Ponoka"
  },
  {
    text: "From estimate to installation, working with Lacombe Gutters was a pleasure. Quality materials, quality workmanship, and honest pricing.",
    author: "John K., Stettler"
  }
];

export default function TypingTestimonials() {
  const [displayText, setDisplayText] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const [startDelay, setStartDelay] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Initial delay before starting the animation
    if (startDelay) {
      timeout = setTimeout(() => setStartDelay(false), 1000);
      return () => clearTimeout(timeout);
    }
    
    const currentTestimonial = testimonials[currentIndex];
    const targetText = currentTestimonial.text;
    
    if (isDeleting) {
      // Backspacing
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, typingSpeed / 2); // Backspace faster than typing
      } else {
        // When fully deleted, move to next testimonial and start typing again
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % testimonials.length);
        setTypingSpeed(50 + Math.random() * 50); // Randomize typing speed for natural effect
      }
    } else {
      // Typing
      if (displayText === '') {
        // When starting a new testimonial, reset the author
        setCurrentAuthor(currentTestimonial.author);
      }
      
      if (displayText.length < targetText.length) {
        timeout = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // When fully typed, wait before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 3000); // Pause 3 seconds before backspacing
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, typingSpeed, startDelay]);

  return (
    <div className="text-center">
      <div className="min-h-[200px] flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute left-0 w-4 h-12 bg-primary/10"></div>
          <p className="text-xl italic text-gray-700 px-8 leading-relaxed min-h-[6rem]">
            &ldquo;{displayText}
            <span className="inline-block h-5 w-0.5 bg-gray-700 ml-1 animate-blink"></span>&rdquo;
          </p>
          <div className="absolute right-0 w-4 h-12 bg-primary/10"></div>
        </div>
        <div className="font-bold text-primary">
          {currentAuthor}
        </div>
      </div>
    </div>
  );
}
