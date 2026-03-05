
export interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  colorScheme: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  GENERATING_CONTENT = 'GENERATING_CONTENT',
  ERROR = 'ERROR'
}

export interface CarouselConfig {
  topic: string;
  language: 'ar' | 'en';
  style: string;
  customCss: string;
}

export type LogoPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
