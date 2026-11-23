import React from 'react';

// Hand-drawn arrow pointing down/right or customizable
export const CurvedArrow: React.FC<{
  className?: string;
  direction?: 'down-right' | 'down-left' | 'up-right' | 'right';
  label?: string;
  color?: string;
}> = ({ className = '', direction = 'down-right', label, color = 'currentColor' }) => {
  return (
    <div className={`inline-flex flex-col items-center pointer-events-none ${className}`}>
      {label && (
        <span className="font-handwriting text-base md:text-lg font-bold -mb-1 transform -rotate-3 text-ink">
          {label}
        </span>
      )}
      <svg
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-10 overflow-visible"
        style={{ color }}
      >
        {direction === 'down-right' && (
          <path
            d="M 10 10 C 35 15, 65 20, 85 45 M 65 42 C 75 45, 83 46, 85 45 C 83 37, 80 28, 78 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {direction === 'down-left' && (
          <path
            d="M 90 10 C 65 15, 35 20, 15 45 M 35 42 C 25 45, 17 46, 15 45 C 17 37, 20 28, 22 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {direction === 'right' && (
          <path
            d="M 10 30 C 40 28, 70 32, 88 30 M 70 20 C 78 25, 85 28, 88 30 C 84 35, 78 40, 72 45"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
};

// Hand-drawn sketchy circle/oval for highlighting text or objects
export const HandDrawnCircle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#ff4d8d'
}) => (
  <svg
    viewBox="0 0 140 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute pointer-events-none overflow-visible ${className}`}
  >
    <path
      d="M 15 32 C 12 18, 45 8, 80 8 C 115 8, 134 19, 130 35 C 126 50, 95 55, 60 55 C 25 55, 6 44, 18 25 C 28 12, 60 10, 95 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn sketchy box with uneven corners
export const HandDrawnBox: React.FC<{
  className?: string;
  children: React.ReactNode;
  color?: string;
  fill?: string;
}> = ({ className = '', children, color = '#181511', fill = 'transparent' }) => (
  <div className={`relative ${className}`}>
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 3 3 C 25 2, 75 4, 97 2 C 98 25, 96 75, 98 97 C 75 98, 25 96, 2 98 C 4 75, 2 25, 3 3 Z"
        stroke={color}
        strokeWidth="2"
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div className="relative z-10">{children}</div>
  </div>
);

// Hand-drawn playful asterisk / starburst
export const HandDrawnStar: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 24, color = '#f7c948' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block pointer-events-none ${className}`}
    style={{ color }}
  >
    <path
      d="M 12 2 L 12 22 M 2 12 L 22 12 M 5 5 L 19 19 M 5 19 L 19 5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// Pushpin icon for sticky notes
export const PushPin: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#ff4d8d'
}) => (
  <div className={`w-4 h-4 rounded-full border-2 border-ink shadow-brutal-sm ${className}`} style={{ backgroundColor: color }}>
    <div className="w-1.5 h-1.5 bg-white/70 rounded-full mx-auto mt-0.5"></div>
  </div>
);

// Hand-drawn sketchy underline
export const HandDrawnUnderline: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = '', color = '#f7c948' }) => (
  <svg
    viewBox="0 0 200 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-4 overflow-visible pointer-events-none ${className}`}
  >
    <path
      d="M 3 10 C 45 4, 95 16, 145 8 C 165 5, 185 13, 198 9"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);
