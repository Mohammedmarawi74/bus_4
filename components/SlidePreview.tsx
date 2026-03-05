
import React, { forwardRef, useState, useLayoutEffect, useRef } from 'react';
import { Slide, LogoPosition } from '../types';
import './SlidePreview.css';

interface SlidePreviewProps {
  slide: Slide;
  isLoading: boolean;
  customCss?: string;
}

const SlidePreview = forwardRef<HTMLDivElement, SlidePreviewProps>(({ slide, isLoading, customCss }, ref) => {
  const [titleFontSize, setTitleFontSize] = useState(36); // Default 36px (2.25rem)
  const [descFontSize, setDescFontSize] = useState(18);   // Default 18px (1.125rem)
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!slide) return;

    // Reset to defaults first to recalculate
    setTitleFontSize(36);
    setDescFontSize(18);

    // Give React a moment to render the reset sizes
    const timer = setTimeout(() => {
      let currentTitleSize = 36;
      let currentDescSize = 18;
      const maxHeight = 160; // Fixed text-content height from CSS

      const adjustSizes = () => {
        if (!titleRef.current || !descRef.current) return;

        let iterations = 0;
        const maxIterations = 20; // Safety break

        while (iterations < maxIterations) {
          const totalHeight = titleRef.current.offsetHeight + descRef.current.offsetHeight + 8; // +gap
          
          if (totalHeight <= maxHeight || (currentTitleSize <= 16 && currentDescSize <= 12)) {
            break;
          }

          // Shrink proportionately
          if (currentTitleSize > 16) currentTitleSize -= 2;
          if (currentDescSize > 12) currentDescSize -= 1;
          
          setTitleFontSize(currentTitleSize);
          setDescFontSize(currentDescSize);
          iterations++;
        }
      };

      adjustSizes();
    }, 50);

    return () => clearTimeout(timer);
  }, [slide.title, slide.description]);

  if (!slide) return null;

  return (
    <div className="preview-wrapper">
      {/* Inject Custom CSS */}
      <style>
        {customCss}
      </style>

      <div 
        ref={ref}
        className="slide-container"
      >
        {/* Topographic Background Pattern */}
        <div className="background-layer">
          <div className="topo-accent-glow" style={{ backgroundColor: slide.colorScheme }}></div>
          <div className="topographic-pattern" style={{ color: slide.colorScheme }}>
            <svg viewBox="0 0 1000 1000" className="topo-svg" preserveAspectRatio="none">
              <path className="topo-line" d="M0,200 Q250,150 500,200 T1000,200" />
              <path className="topo-line" d="M0,400 Q300,350 600,450 T1000,400" />
              <path className="topo-line" d="M0,600 Q400,650 700,550 T1000,650" />
              <path className="topo-line" d="M0,800 Q150,850 450,750 T1000,850" />
              <path className="topo-line" d="M-100,300 Q200,400 500,300 T1100,500" style={{ opacity: 0.5 }} />
              <path className="topo-line" d="M-200,700 Q300,600 600,800 T1200,600" style={{ opacity: 0.5 }} />
              <circle cx="800" cy="200" r="150" className="topo-line" style={{ opacity: 0.3 }} />
              <circle cx="150" cy="750" r="200" className="topo-line" style={{ opacity: 0.3 }} />
            </svg>
          </div>
        </div>

        {isLoading && (
          <div className="loading-overlay no-print">
            <div className="spinner"></div>
            <p className="loading-text">جاري العمل على إبداعك...</p>
          </div>
        )}

        {/* Slide Header Decor */}
        <div className="header-decor" style={{ backgroundColor: slide.colorScheme }} />

        {/* Text Content */}
        <div className="text-content" ref={containerRef}>
          <h2 
            ref={titleRef}
            className="slide-title"
            style={{ 
              color: slide.colorScheme,
              fontSize: `${titleFontSize}px`
            }}
          >
            {slide.title}
          </h2>
          <p 
            ref={descRef}
            className="slide-desc"
            style={{ fontSize: `${descFontSize}px` }}
          >
            {slide.description}
          </p>
        </div>

        {/* Main Map Image */}
        <div className="image-container">
          <img 
            src={slide.imageUrl} 
            alt="Map or Uploaded Asset"
            className="map-image"
            crossOrigin="anonymous"
          />
          {/* Glow Effect behind image */}
          <div 
            className="glow-effect"
            style={{ backgroundColor: slide.colorScheme }}
          />
        </div>

        {/* Brand Footer */}
        <div className="slide-footer">
          <span className="footer-brand-name">منصة المستثمر الاقتصادية</span>
          <span className="footer-brand-url">al_investor.com</span>
        </div>
      </div>
    </div>
  );
});

SlidePreview.displayName = 'SlidePreview';

export default SlidePreview;


