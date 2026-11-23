import React, { useEffect, useRef } from 'react';

export interface CursorGridBackgroundProps {
  /**
   * Size of each square grid cell in pixels.
   * Default: 48 (which aligns cleanly 2x2 with the 24px background dot grid).
   * Set to 44 or any other custom size as desired.
   */
  cellSize?: number;
  /** Stroke color for the cell outline (default: '#181511') */
  strokeColor?: string;
  /** Fill opacity for the active cells (default: 0.04) */
  fillOpacity?: number;
  /** Duration in ms for cells to smoothly fade out (default: 700) */
  fadeDuration?: number;
  /** Cell radius affected around the cursor (default: 1 for a 3x3 plus/cluster) */
  radius?: number;
  /** Additional CSS class names */
  className?: string;
}

interface ActiveCell {
  col: number;
  row: number;
  intensity: number;
}

function parseRgb(color: string): { r: number; g: number; b: number } {
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }
  const match = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }
  return { r: 24, g: 21, b: 17 };
}

export const CursorGridBackground: React.FC<CursorGridBackgroundProps> = ({
  cellSize = 48,
  strokeColor = '#181511',
  fillOpacity = 0.04,
  fadeDuration = 700,
  radius = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Accessibility: Disable completely on prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const strokeRgb = parseRgb(strokeColor);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();

    // Map of active cells: key -> ActiveCell
    const activeCells = new Map<string, ActiveCell>();

    let animationFrameId: number | null = null;
    let isLoopRunning = false;
    let lastTime = performance.now();

    // Positive modulo helper
    const mod = (n: number, m: number) => ((n % m) + m) % m;

    // Helper to calculate grid offsets aligned with body dot grid (offset 12px 12px)
    const getOffsets = () => {
      const scrollX = window.scrollX || 0;
      const scrollY = window.scrollY || 0;
      const dotBaseOffset = 12;
      return {
        offsetX: mod(dotBaseOffset - (scrollX % cellSize), cellSize),
        offsetY: mod(dotBaseOffset - (scrollY % cellSize), cellSize),
      };
    };

    // Main 60fps render loop: runs ONLY while active cells exist, stops when idle
    const render = (now: number) => {
      const deltaTime = Math.min(100, now - lastTime);
      lastTime = now;

      // Clear the canvas completely each frame
      ctx.clearRect(0, 0, width, height);

      if (activeCells.size === 0) {
        // No cells left: stop RAF loop completely (0% CPU at rest)
        isLoopRunning = false;
        animationFrameId = null;
        return;
      }

      const { offsetX, offsetY } = getOffsets();
      const decay = deltaTime / fadeDuration;
      const keysToDelete: string[] = [];

      // Draw all active cells
      for (const [key, cell] of activeCells.entries()) {
        cell.intensity -= decay;

        if (cell.intensity <= 0.005) {
          keysToDelete.push(key);
          continue;
        }

        const x = cell.col * cellSize + offsetX;
        const y = cell.row * cellSize + offsetY;

        // Viewport culling
        if (x + cellSize < 0 || x > width || y + cellSize < 0 || y > height) {
          continue;
        }

        // 1. Soft tinted fill
        if (fillOpacity > 0) {
          ctx.fillStyle = `rgba(${strokeRgb.r}, ${strokeRgb.g}, ${strokeRgb.b}, ${fillOpacity * cell.intensity})`;
          ctx.fillRect(Math.floor(x), Math.floor(y), cellSize, cellSize);
        }

        // 2. Thin black square outline (1px, ~0.85 opacity at center, weaker farther away)
        const outlineAlpha = Math.min(1, 0.85 * cell.intensity);
        ctx.strokeStyle = `rgba(${strokeRgb.r}, ${strokeRgb.g}, ${strokeRgb.b}, ${outlineAlpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.floor(x) + 0.5, Math.floor(y) + 0.5, cellSize, cellSize);
      }

      for (let i = 0; i < keysToDelete.length; i++) {
        activeCells.delete(keysToDelete[i]);
      }

      if (activeCells.size > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        // Clear canvas cleanly and stop loop
        ctx.clearRect(0, 0, width, height);
        isLoopRunning = false;
        animationFrameId = null;
      }
    };

    // Activate cluster around cursor
    const activateAt = (clientX: number, clientY: number) => {
      const { offsetX, offsetY } = getOffsets();
      const cursorCol = Math.floor((clientX - offsetX) / cellSize);
      const cursorRow = Math.floor((clientY - offsetY) / cellSize);

      for (let dc = -radius; dc <= radius; dc++) {
        for (let dr = -radius; dr <= radius; dr++) {
          const dist = Math.sqrt(dc * dc + dr * dr);
          if (dist > radius + 0.25) continue;

          // Distance falloff: center is 1.0, direct neighbors are 0.65, diagonals are 0.35
          let weight = 0;
          if (dc === 0 && dr === 0) {
            weight = 1.0;
          } else if (Math.abs(dc) + Math.abs(dr) === 1) {
            weight = 0.65;
          } else if (Math.abs(dc) === 1 && Math.abs(dr) === 1) {
            weight = 0.35;
          } else {
            weight = Math.max(0.15, 1 - dist / (radius + 0.5));
          }

          const c = cursorCol + dc;
          const r = cursorRow + dr;
          const key = `${c},${r}`;
          const existing = activeCells.get(key);

          if (existing) {
            existing.intensity = Math.max(existing.intensity, weight);
          } else {
            activeCells.set(key, { col: c, row: r, intensity: weight });
          }
        }
      }

      // Start animation loop if not currently running
      if (!isLoopRunning) {
        isLoopRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Listen on window: works over cards, buttons, nav, portrait & margins
    const handleMouseMove = (e: MouseEvent) => {
      activateAt(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        activateAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      activeCells.clear();
    };
  }, [cellSize, strokeColor, fillOpacity, fadeDuration, radius]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGridBackground;
