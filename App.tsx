import React, { useState, useCallback, useRef } from "react";
import { Slide, AppStatus, LogoPosition } from "./types";
import {
  generateMapImage,
  generateCarouselContent,
} from "./services/geminiService";
import Sidebar from "./components/Sidebar";
import SlidePreview from "./components/SlidePreview";
import SlideList from "./components/SlideList";
import * as htmlToImage from "html-to-image";
import "./App.css";

const App: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: "1",
      title: "مرحباً بك في منصة التصميم",
      description:
        "ابدأ بإنشاء كاروسيل خرائط احترافي بضغطة زر واحدة أو ارفع صورتك الخاصة.",
      imageUrl: "https://picsum.photos/800/800?random=1",
      colorScheme: "#008080",
    },
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [topic, setTopic] = useState("");
  const [customCss, setCustomCss] = useState(
    ".slide-container { border-radius: 20px; }\n.slide-title { text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }",
  );
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Logo State
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<LogoPosition>("top-left");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!topic) return;

    try {
      setStatus(AppStatus.GENERATING_CONTENT);
      setError(null);

      const content = await generateCarouselContent(topic);

      setStatus(AppStatus.GENERATING_IMAGE);
      const mainImageUrl = await generateMapImage(topic);

      const newSlides: Slide[] = content.map((item, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: item.title || "",
        description: item.description || "",
        imageUrl: mainImageUrl,
        colorScheme: "#008080",
      }));

      setSlides(newSlides);
      setActiveSlideIndex(0);
      setStatus(AppStatus.IDLE);
    } catch (err: any) {
      console.error(err);
      setError("حدث خطأ أثناء التوليد. يرجى المحاولة مرة أخرى.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleExportAsImage = async () => {
    if (!slideRef.current) return;
    setIsExporting(true);
    try {
      // Small delay to ensure any CSS transitions finish
      await new Promise((r) => setTimeout(r, 100));
      const dataUrl = await htmlToImage.toPng(slideRef.current, {
        quality: 1,
        pixelRatio: 2, // Double quality for crisp images
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `carousel-slide-${activeSlideIndex + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
      setError("فشل تصدير الصورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSlide(activeSlideIndex, { imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSlide = (index: number, updates: Partial<Slide>) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], ...updates };
    setSlides(updated);
  };

  return (
    <div className="app-container" dir="rtl">
      {/* Sidebar Editor */}
      <Sidebar
        topic={topic}
        setTopic={setTopic}
        onGenerate={handleGenerate}
        status={status}
        activeSlide={slides[activeSlideIndex]}
        updateSlide={(updates) => updateSlide(activeSlideIndex, updates)}
        customCss={customCss}
        setCustomCss={setCustomCss}
        onUploadClick={() => fileInputRef.current?.click()}
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
        logoPosition={logoPosition}
        setLogoPosition={setLogoPosition}
      />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUploadImage}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar no-print">
          <div className="top-bar-title-container">
            <h1 className="top-bar-title">محرر الكاروسيل الاحترافي</h1>
          </div>
          <div className="top-bar-actions">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-upload"
            >
              رفع صورة
            </button>
            <button
              onClick={handleExportAsImage}
              disabled={isExporting}
              className={`btn-download ${isExporting ? "btn-disabled" : ""}`}
            >
              {isExporting ? "جاري التصدير..." : "تحميل PNG"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Slide Canvas */}
        <div className="canvas-area">
          <SlidePreview
            ref={slideRef}
            slide={slides[activeSlideIndex]}
            isLoading={status !== AppStatus.IDLE && status !== AppStatus.ERROR}
            customCss={customCss}
            logoUrl={logoUrl}
            logoPosition={logoPosition}
          />
        </div>

        {/* Slide Navigation/Timeline */}
        <div className="bottom-navigation no-print">
          <SlideList
            slides={slides}
            activeId={slides[activeSlideIndex]?.id}
            onSelect={setActiveSlideIndex}
            onAdd={() =>
              setSlides([
                ...slides,
                {
                  id: Date.now().toString(),
                  title: "شريحة جديدة",
                  description: "أضف وصفاً هنا",
                  imageUrl: slides[0].imageUrl,
                  colorScheme: "#008080",
                },
              ])
            }
            onRemove={(idx) => {
              if (slides.length <= 1) return;
              const newSlides = slides.filter((_, i) => i !== idx);
              setSlides(newSlides);
              setActiveSlideIndex(Math.max(0, idx - 1));
            }}
          />
        </div>

        {error && <div className="error-toast">{error}</div>}
      </main>
    </div>
  );
};

export default App;
