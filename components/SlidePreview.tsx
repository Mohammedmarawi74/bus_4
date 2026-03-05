
import React, { forwardRef } from 'react';
import { Slide, LogoPosition } from '../types';
import './SlidePreview.css';

interface SlidePreviewProps {
  slide: Slide;
  isLoading: boolean;
  customCss?: string;
  logoUrl: string | null;
  logoPosition: LogoPosition;
}

const SlidePreview = forwardRef<HTMLDivElement, SlidePreviewProps>(({ slide, isLoading, customCss, logoUrl, logoPosition }, ref) => {
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
        {isLoading && (
          <div className="loading-overlay no-print">
            <div className="spinner"></div>
            <p className="loading-text">جاري العمل على إبداعك...</p>
          </div>
        )}

        {/* User Logo */}
        {logoUrl && (
          <div className={`logo-overlay ${logoPosition}`}>
            <img 
              src={logoUrl} 
              alt="Brand Logo" 
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* Slide Header Decor */}
        <div className="header-decor" style={{ backgroundColor: slide.colorScheme }} />

        {/* Text Content */}
        <div className="text-content">
          <h2 
            className="slide-title"
            style={{ color: slide.colorScheme }}
          >
            {slide.title}
          </h2>
          <p className="slide-desc">
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
          <div className="brand-icon">SM</div>
          <span className="brand-text">SMART CAROUSEL</span>
        </div>
      </div>
    </div>
  );
});

SlidePreview.displayName = 'SlidePreview';

export default SlidePreview;

