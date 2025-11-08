export interface VideoProject {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  settings: ProjectSettings;
  timeline: Timeline;
}

export interface ProjectSettings {
  width: number;
  height: number;
  frameRate: number;
  aspectRatio: AspectRatio;
  duration: number;
}

export type AspectRatio = '16:9' | '9:16' | '4:3' | '3:4' | '1:1';

export interface Timeline {
  tracks: Track[];
  duration: number;
  currentTime: number;
}

export interface Track {
  id: string;
  type: TrackType;
  clips: Clip[];
  muted: boolean;
  locked: boolean;
}

export type TrackType = 'video' | 'audio' | 'text' | 'effects';

export interface Clip {
  id: string;
  type: ClipType;
  startTime: number;
  duration: number;
  sourceUrl?: string;
  effects: Effect[];
  transitions: Transition[];
  keyframes: Keyframe[];
  mask?: Mask;
}

export type ClipType = 'video' | 'audio' | 'image' | 'text';

export interface Effect {
  id: string;
  type: EffectType;
  enabled: boolean;
  parameters: Record<string, any>;
}

export type EffectType =
  | 'color-correction'
  | 'noise-reduction'
  | 'visual-effect'
  | 'audio-effect'
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'saturation';

export interface Transition {
  id: string;
  type: TransitionType;
  duration: number;
  parameters: Record<string, any>;
}

export type TransitionType = 'fade' | 'dissolve' | 'wipe' | 'slide' | 'ai-generated';

export interface Keyframe {
  id: string;
  time: number;
  property: string;
  value: any;
  easing: EasingType;
}

export type EasingType = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface Mask {
  id: string;
  type: MaskType;
  path: string;
  inverted: boolean;
  feather: number;
}

export type MaskType = 'rectangle' | 'ellipse' | 'path' | 'ai-generated';
