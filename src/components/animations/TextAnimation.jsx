import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TextAnimation = ({ 
    text, 
    className, 
    splitBy = 'words', // 'words', 'chars', or 'lines'
    stagger = 0.2,
    duration = 0.8,
    from = { opacity: 0, y: 50, rotationX: -90 },
    highlightedIndices = [], // Indices of words to apply highlight class to
    highlightClass = 'blue-gradient_text drop-shadow font-semibold',
    onAnimationComplete = () => {} 
}) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;
        
        // Create timeline
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Hide initially
        gsap.set(textRef.current, { opacity: 0 });
        
        // Extract words or characters
        const content = textRef.current.textContent;
        let elements = [];
        let htmlContent = '';
        
        if (splitBy === 'words') {
            // Split by words
            const words = content.trim().split(/\s+/);
            htmlContent = words.map((word, i) => 
                `<span class="word-container">
                    <span class="word ${highlightedIndices.includes(i) ? highlightClass : ''}">
                        ${word}${i < words.length - 1 ? ' ' : ''}
                    </span>
                </span>`
            ).join('');
            
        } else if (splitBy === 'chars') {
            // Split by characters
            const chars = content.split('');
            htmlContent = chars.map(char => 
                `<span class="char-container">
                    <span class="char">${char === ' ' ? '&nbsp;' : char}</span>
                </span>`
            ).join('');
        }
        
        textRef.current.innerHTML = htmlContent;
        
        // Select elements for animation
        elements = splitBy === 'words' ? 
                  textRef.current.querySelectorAll('.word') : 
                  textRef.current.querySelectorAll('.char');

        // Show the text container
        gsap.set(textRef.current, { opacity: 1 });
        
        // Animate elements
        tl.from(elements, {
            ...from,
            stagger,
            duration,
            onComplete: onAnimationComplete
        });
        
        return () => {
            tl.kill();
        };
    }, [text, splitBy, stagger, duration, highlightedIndices, highlightClass]);

    return (
        <div className={className} ref={textRef}>
            {text}
        </div>
    );
};

export default TextAnimation;