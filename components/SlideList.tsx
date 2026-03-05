
import React from 'react';
import { Slide } from '../types';
import './SlideList.css';

interface SlideListProps {
  slides: Slide[];
  activeId: string;
  onSelect: (index: number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const SlideList: React.FC<SlideListProps> = ({ slides, activeId, onSelect, onAdd, onRemove }) => {
  return (
    <div className="slide-list-container">
      {slides.map((slide, index) => (
        <div key={slide.id} className="slide-item-wrapper group">
          <button
            onClick={() => onSelect(index)}
            className={`slide-item-btn ${activeId === slide.id ? 'active' : 'inactive'}`}
          >
            <div className="slide-item-preview">
               <img src={slide.imageUrl} alt="preview" />
            </div>
            <div className="slide-item-info">
              <span className="slide-item-title">{slide.title}</span>
            </div>
          </button>
          
          {slides.length > 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); onRemove(index); }}
              className="remove-slide-btn"
            >
              ×
            </button>
          )}
          
          <div className="slide-number">
            {index + 1}
          </div>
        </div>
      ))}
      
      <button 
        onClick={onAdd}
        className="add-slide-btn"
      >
        <span className="add-slide-icon">+</span>
      </button>
    </div>
  );
};

export default SlideList;

