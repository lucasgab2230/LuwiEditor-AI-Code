export interface AIModelRequest {
  id: string;
  type: AIModelType;
  status: AIModelStatus;
  input: any;
  output?: any;
  error?: string;
  progress: number;
  createdAt: Date;
  completedAt?: Date;
}

export type AIModelType =
  | 'upscale'
  | 'music-generation'
  | 'sound-effects'
  | 'transitions'
  | 'visual-effects'
  | 'tts'
  | 'text-to-video'
  | 'color-correction'
  | 'aspect-ratio-conversion'
  | 'noise-reduction'
  | 'silence-detection'
  | 'shorts-generator'
  | 'chat';

export type AIModelStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface UpscaleRequest {
  videoUrl: string;
  targetResolution: '4K' | '2K' | '1080p';
  targetFrameRate: 60 | 30 | 24;
}

export interface UpscaleResponse {
  videoUrl: string;
  resolution: string;
  frameRate: number;
  processingTime: number;
}

export interface MusicGenerationRequest {
  theme: string;
  duration: number;
  tempo?: 'slow' | 'medium' | 'fast';
  mood?: string;
  audioReference?: string;
}

export interface MusicGenerationResponse {
  audioUrl: string;
  duration: number;
  metadata: {
    tempo: number;
    key: string;
    mood: string;
  };
}

export interface SoundEffectsRequest {
  description: string;
  duration: number;
  category?: string;
}

export interface SoundEffectsResponse {
  audioUrl: string;
  duration: number;
  category: string;
}

export interface TransitionGenerationRequest {
  fromFrame: string;
  toFrame: string;
  duration: number;
  style?: string;
}

export interface TransitionGenerationResponse {
  videoUrl: string;
  duration: number;
  style: string;
}

export interface VisualEffectsRequest {
  videoUrl: string;
  effectType: string;
  parameters: Record<string, any>;
}

export interface VisualEffectsResponse {
  videoUrl: string;
  effectType: string;
  processingTime: number;
}

export interface TTSRequest {
  text: string;
  voice?: string;
  language?: string;
  speed?: number;
}

export interface TTSResponse {
  audioUrl: string;
  duration: number;
  voice: string;
  language: string;
}

export interface TextToVideoRequest {
  text: string;
  duration: number;
  style?: string;
  aspectRatio?: AspectRatio;
}

export interface TextToVideoResponse {
  videoUrl: string;
  duration: number;
  sources: Array<{
    type: 'image' | 'video';
    url: string;
    attribution?: string;
  }>;
}

export interface ColorCorrectionRequest {
  videoUrl: string;
  autoCorrect?: boolean;
  parameters?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    temperature?: number;
  };
}

export interface ColorCorrectionResponse {
  videoUrl: string;
  appliedCorrections: Record<string, number>;
  processingTime: number;
}

export interface AspectRatioConversionRequest {
  videoUrl: string;
  fromRatio: AspectRatio;
  toRatio: AspectRatio;
  contentAware: boolean;
}

export interface AspectRatioConversionResponse {
  videoUrl: string;
  fromRatio: AspectRatio;
  toRatio: AspectRatio;
  processingTime: number;
}

export interface NoiseReductionRequest {
  audioUrl: string;
  strength?: 'low' | 'medium' | 'high';
  removeCompletely?: boolean;
}

export interface NoiseReductionResponse {
  audioUrl: string;
  noiseLevel: number;
  processingTime: number;
}

export interface SilenceDetectionRequest {
  audioUrl: string;
  threshold?: number;
  minDuration?: number;
  autoRemove?: boolean;
}

export interface SilenceDetectionResponse {
  audioUrl?: string;
  silenceRanges: Array<{
    start: number;
    end: number;
    duration: number;
  }>;
  processingTime: number;
}

export interface ShortsGeneratorRequest {
  videoUrl: string;
  targetDuration: number;
  count?: number;
  viralScore?: number;
}

export interface ShortsGeneratorResponse {
  shorts: Array<{
    videoUrl: string;
    startTime: number;
    duration: number;
    viralScore: number;
    keywords: string[];
  }>;
  processingTime: number;
}

export interface ChatRequest {
  message: string;
  context?: any;
  projectId?: string;
}

export interface ChatResponse {
  message: string;
  action?: {
    type: string;
    parameters: Record<string, any>;
  };
  suggestions?: string[];
}

export type AspectRatio = '16:9' | '9:16' | '4:3' | '3:4' | '1:1';
