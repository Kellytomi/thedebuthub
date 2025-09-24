/**
 * Shared component interfaces for consistent prop types
 */

import { ReactNode } from 'react';
import { AlbumCardData, TrackCardData, ArtistData } from './index';

export interface CardProps {
  className?: string;
  children?: ReactNode;
}

export interface AlbumCardProps extends CardProps {
  album: AlbumCardData;
  index: number;
  priority?: boolean;
}

export interface TrackCardProps extends CardProps {
  track: TrackCardData;
  index: number;
  priority?: boolean;
}

export interface SkeletonProps extends CardProps {
  count?: number;
  variant?: 'album' | 'track' | 'article';
}

export interface SectionProps extends CardProps {
  title?: string;
  subtitle?: string;
  loading?: boolean;
  error?: string | null;
}

export interface ButtonProps extends CardProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallback?: string;
  className?: string;
}

export interface FlankDecorationProps {
  variant?: 'default' | 'compact';
}
