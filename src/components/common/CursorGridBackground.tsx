import React, { useEffect, useRef } from 'react';

export interface CursorGridBackgroundProps {
  /** Real horizontal cell spacing in pixels (defaults to CSS variable --grid-w or detected 24px) */
  cellWidth?: number;
  /** Real vertical cell spacing in pixels (defaults to CSS variable --grid-h or detected 24px) */
  cellHeight?: number;
  /** Pattern horizontal origin offset in pixels (defaults to CSS variable --grid-offset-x or detected 0px) */
  offsetX?: number;
  /** Pattern vertical origin offset in pixels (defaults to CSS variable --grid-offset-y or detected 0px) */
  offsetY?: number;
  /** Stroke color for cell outlines (default: '#181511') */
  strokeColor?: string;
  /** Maximum stroke opacity at the center cell (default: 0.38, reduced for soft elegance) */
  maxStrokeOpacity?: number;
  /** Fill opacity for active cells (default: 0.015, reduced soft ink wash) */
  fillOpacity?: number;
  /** Duration in ms for cells to smoothly fade out (default: 700) */
  fadeDuration?: number;
  /** Cell radius affected around cursor (default: 1 for a 3x3 plus cluster) */
  radius?: number;
  /** Optional custom CSS classes */
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

function getCssVariablePx(name: string, fallback: number): number {
  if (typeof window === 'undefined') return fallback;
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!val) return fallback;
  const parsed = parseFloat(val);
  return isNaN(parsed) ? fallback : parsed;
}

export const CursorGridBackground: React.FC<CursorGridBackgroundProps> = ({
  cellWidth,
  cellHeight,
  offsetX,
  offsetY,
  strokeColor = '#181511',
  maxStrokeOpacity = 0.38,
  fillOpacity = 0.015,
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

    // Accessibility: Disable completely if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const strokeRgb = parseRgb(strokeColor);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    // Read real grid spacing and origin offsets from CSS variables or props
    let curCellW = cellWidth ?? getCssVariablePx('--grid-w', 24);
    let curCellH = cellHeight ?? getCssVariablePx('--grid-h', 24);
    let curOffX = offsetX ?? getCssVariablePx('--grid-offset-x', 0);
    let curOffY = offsetY ?? getCssVariablePx('--grid-offset-y', 0);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-read CSS variables in case breakpoint changed styles
      curCellW = cellWidth ?? getCssVariablePx('--grid-w', 24);
      curCellH = cellHeight ?? getCssVariablePx('--grid-h', 24);
      curOffX = offsetX ?? getCssVariablePx('--grid-offset-x', 0);
      curOffY = offsetY ?? getCssVariablePx('--grid-offset-y', 0);
    };
    handleResize();

    // Map of active cells: key -> ActiveCell
    const activeCells = new Map<string, ActiveCell>();

    let animationFrameId: number | null = null;
    let isLoopRunning = false;
    let lastTime = performance.now();

    // Positive modulo helper
    const mod = (n: number, m: number) => ((n % m) + m) % m;

    // Calculate current viewport-relative origin offsets accounting for page scroll
    const getOffsets = () => {
      const scrollX = window.scrollX || 0;
      const scrollY = window.scrollY || 0;
      return {
        viewportOffX: mod(curOffX - (scrollX % curCellW), curCellW),
        viewportOffY: mod(curOffY - (scrollY % curCellH), curCellH),
      };
    };

    // Main 60fps render loop: runs ONLY while cells are active; stops completely at idle
    const render = (now: number) => {
      const deltaTime = Math.min(100, now - lastTime);
      lastTime = now;

      // Clear the entire canvas each frame
      ctx.clearRect(0, 0, width, height);

      if (activeCells.size === 0) {
        // Zero active cells left: stop RAF loop completely (0% CPU at rest)
        isLoopRunning = false;
        animationFrameId = null;
        return;
      }

      const { viewportOffX, viewportOffY } = getOffsets();
      const decay = deltaTime / fadeDuration;
      const keysToDelete: string[] = [];

      // Render each active cell
      for (const [key, cell] of activeCells.entries()) {
        cell.intensity -= decay;

        if (cell.intensity <= 0.005) {
          keysToDelete.push(key);
          continue;
        }

        // Exact snap position: (offsetX + col * cellWidth, offsetY + row * cellHeight)
        const x = viewportOffX + cell.col * curCellW;
        const y = viewportOffY + cell.row * curCellH;

        // Viewport culling
        if (x + curCellW < 0 || x > width || y + curCellH < 0 || y > height) {
          continue;
        }

        // 1. Soft tinted fill (optional very light black fill)
        if (fillOpacity > 0) {
          ctx.fillStyle = `rgba(${strokeRgb.r}, ${strokeRgb.g}, ${strokeRgb.b}, ${fillOpacity * cell.intensity})`;
          ctx.fillRect(Math.floor(x), Math.floor(y), curCellW, curCellH);
        }

        // 2. Thin black outline (1px, subtle reduced opacity, weaker farther away)
        const strokeAlpha = Math.min(1, maxStrokeOpacity * cell.intensity);
        ctx.strokeStyle = `rgba(${strokeRgb.r}, ${strokeRgb.g}, ${strokeRgb.b}, ${strokeAlpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.floor(x) + 0.5, Math.floor(y) + 0.5, curCellW, curCellH);
      }

      for (let i = 0; i < keysToDelete.length; i++) {
        activeCells.delete(keysToDelete[i]);
      }

      if (activeCells.size > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        // Clean clear and halt loop
        ctx.clearRect(0, 0, width, height);
        isLoopRunning = false;
        animationFrameId = null;
      }
    };

    // Activate cluster of cells around the mouse cursor
    const activateAt = (clientX: number, clientY: number) => {
      const { viewportOffX, viewportOffY } = getOffsets();
      // Snap formula: col = floor((clientX - offsetX) / cellWidth)
      const cursorCol = Math.floor((clientX - viewportOffX) / curCellW);
      const cursorRow = Math.floor((clientY - viewportOffY) / curCellH);

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
  }, [cellWidth, cellHeight, offsetX, offsetY, strokeColor, maxStrokeOpacity, fillOpacity, fadeDuration, radius]);

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
