import { useEffect, useState, useRef } from 'react';

// Function to handle scroll animations
export function useScrollAnimation() {
  useEffect(() => {
    // Short delay to allow manual scroll positioning to take effect first
    const initDelay = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });
  
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.observe(el));
  
      return () => {
        animatedElements.forEach(el => observer.unobserve(el));
        clearTimeout(initDelay);
      };
    }, 200);
    
    return () => clearTimeout(initDelay);
  }, []);
}

// Hook to create 3D tilt effect
export function useTilt(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
}

// Magnetic effect for buttons or elements
export function useMagneticEffect(ref: React.RefObject<HTMLElement>, strength: number = 20) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const deltaX = (x - centerX) / strength;
      const deltaY = (y - centerY) / strength;
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
}

// Hook for staggered animations
export function useStaggeredAnimation(itemsCount: number, staggerDelay: number = 0.1) {
  const [items, setItems] = useState<{ delay: string }[]>([]);

  useEffect(() => {
    const newItems = Array.from({ length: itemsCount }, (_, i) => ({
      delay: `${i * staggerDelay}s`
    }));
    setItems(newItems);
  }, [itemsCount, staggerDelay]);

  return items;
}

// Parallax effect hook
export function useParallax(speed: number = 0.1) {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return { y: offset * speed };
}
