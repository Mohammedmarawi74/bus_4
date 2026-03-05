
import React, { useState, useRef } from 'react';
import { Slide, AppStatus, LogoPosition } from '../types';
import './Sidebar.css';

interface SidebarProps {
  topic: string;
  setTopic: (t: string) => void;
  onGenerate: () => void;
  status: AppStatus;
  activeSlide: Slide;
  updateSlide: (updates: Partial<Slide>) => void;
  customCss: string;
  setCustomCss: (css: string) => void;
  onUploadClick: () => void;
}

type Tab = 'content' | 'design' | 'css';

const DEFAULT_CSS = `.slide-container { border-radius: 20px; }\n.slide-title { text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }`;

const Sidebar: React.FC<SidebarProps> = ({ 
  topic, 
  setTopic, 
  onGenerate, 
  status, 
  activeSlide, 
  updateSlide,
  customCss,
  setCustomCss,
  onUploadClick
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('content');

  const handleColorChange = (color: string) => {
    updateSlide({ colorScheme: color });
  };

  const handleResetCss = () => {
    setCustomCss(DEFAULT_CSS);
  };

  return (
    <aside className="sidebar-container">
      {/* Tabs Header */}
      <div className="tabs-header">
        <button 
          className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          المحتوى
        </button>
        <button 
          className={`tab-button ${activeTab === 'design' ? 'active' : ''}`}
          onClick={() => setActiveTab('design')}
        >
          التصميم
        </button>
        <button 
          className={`tab-button ${activeTab === 'css' ? 'active' : ''}`}
          onClick={() => setActiveTab('css')}
        >
          CSS مخصص
        </button>
      </div>

      <div className={`tab-content-area ${activeTab === 'css' ? 'dark' : 'light'}`}>
        {/* Tab content panels */}
        {activeTab === 'content' && (
          <div className="tab-panel animate">
            <div>
              <h2 className="section-title">توليد المحتوى</h2>
              <div className="input-group">
                <div>
                  <label className="field-label">الموضوع / الدولة</label>
                  <input 
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="مثال: رؤية السعودية 2030"
                    className="text-input"
                  />
                </div>
                <button 
                  onClick={onGenerate}
                  disabled={status !== AppStatus.IDLE || !topic}
                  className={`btn-primary ${status !== AppStatus.IDLE ? 'generating' : 'ready'}`}
                >
                  {status === AppStatus.GENERATING_CONTENT ? 'يتم كتابة المحتوى...' : 
                   status === AppStatus.GENERATING_IMAGE ? 'يتم رسم الخريطة...' : 'توليد الكاروسيل'}
                </button>
              </div>
            </div>

            <div className="divider">
              <h3 className="section-title">نصوص الشريحة</h3>
              <div className="input-group">
                <div>
                  <label className="field-label">العنوان</label>
                  <textarea 
                    value={activeSlide?.title}
                    onChange={(e) => updateSlide({ title: e.target.value })}
                    rows={2}
                    className="text-area"
                  />
                </div>
                <div>
                  <label className="field-label">الوصف</label>
                  <textarea 
                    value={activeSlide?.description}
                    onChange={(e) => updateSlide({ description: e.target.value })}
                    rows={4}
                    className="text-area"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="tab-panel animate">
             <div>
              <h3 className="section-title">صورة الشريحة</h3>
              <button 
                onClick={onUploadClick}
                className="upload-box"
              >
                <div className="upload-icon-container">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                   </svg>
                </div>
                <span className="upload-text">ارفع صورة مخصصة</span>
              </button>
            </div>

            <div className="divider">
              <h3 className="section-title">الألوان والسمة</h3>
              <label className="field-label">اختر لون الهوية</label>
              <div className="color-grid">
                {['#008080', '#2E8B57', '#20B2AA', '#004d4d', '#3CB371', '#D4AF37', '#800000', '#4B0082', '#000080', '#2F4F4F'].map(color => (
                  <button 
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`color-button ${activeSlide?.colorScheme === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'css' && (
          <div className="css-editor-container animate">
            <div className="css-editor-header">
              <h2 className="css-editor-title">محرر CSS المتقدم</h2>
            </div>
            
            <div className="css-hint">
              <span>Classes: </span>
              <span className="css-class-name">.slide-container</span>,{' '}
              <span className="css-class-name">.slide-title</span>,{' '}
              <span className="css-class-name">.slide-desc</span>,{' '}
              <span className="css-class-name">.map-image</span>...
            </div>

            <div className="textarea-container">
              <textarea 
                value={customCss}
                onChange={(e) => setCustomCss(e.target.value)}
                className="css-textarea"
                spellCheck={false}
                dir="ltr"
                placeholder="...هنا لتخصيص التصميم CSS اكتب كود"
              />
            </div>

            <button 
              onClick={() => setCustomCss(DEFAULT_CSS)}
              className="btn-reset-css"
            >
              إعادة تعيين CSS
            </button>
          </div>
        )}
      </div>

      <div className={`sidebar-footer ${activeTab === 'css' ? 'dark' : 'light'}`}>
        <div className={`footer-content ${activeTab === 'css' ? 'dark' : 'light'}`}>
          <span>الإصدار 2.0</span>
          <span>مدعوم بـ Gemini AI</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

