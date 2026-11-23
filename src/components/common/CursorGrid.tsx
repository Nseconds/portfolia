import React, { useEffect, useRef } from 'react';

interface CursorGridProps {
  /** Size of each square cell in pixels (default: 28px, matching notebook ruling) */
  cellSize?: number;
  /** Number of cells across the grid window (default: 5 for a 5x5 grid, or 7 for 7x7) */
  gridSize?: number;
}

export const CursorGrid: React.FC<CursorGridProps> = ({
  cellSize = 28,
  gridSize = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Mobile & Touch Detection (disable cursor grid on mobile/touch screens)
    if (
      typeof window === 'undefined' ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 2. High-DPI Canvas Resizing
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

    // 3. Smooth Mouse Position & Interpolation
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isMouseOnPage = false;
    let lastMoveTime = 0;
    let currentOpacity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isMouseOnPage = true;
      lastMoveTime = performance.now();

      // If first appearance, initialize currentX/Y immediately to avoid gliding from off-screen
      if (currentX < -500) {
        currentX = targetX;
        currentY = targetY;
      }
    };

    const handleMouseLeave = () => {
      isMouseOnPage = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      currentX = targetX;
      currentY = targetY;
      isMouseOnPage = true;
      lastMoveTime = performance.now();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 4. Main 60fps Animation Loop
    let animationFrameId: number;
    const totalSpan = gridSize * cellSize;
    const halfSpan = totalSpan / 2;
    const centerIndex = Math.floor(gridSize / 2);

    const render = () => {
      const now = performance.now();

      // Easing / Interpolation for fluid cursor tracking
      // currentX smoothly approaches targetX (lerp factor 0.16)
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      // Target Opacity Calculation
      let targetOpacity = 0;
      if (isMouseOnPage && currentX > -200) {
        const timeSinceMove = now - lastMoveTime;
        if (timeSinceMove < 800) {
          // Actively moving: full bold visibility (1.0)
          targetOpacity = 1.0;
        } else if (timeSinceMove < 2000) {
          // Stationary pause: gently relax to subtle resting visibility (0.45)
          const relaxProgress = (timeSinceMove - 800) / 1200;
          targetOpacity = 1.0 - relaxProgress * 0.55;
        } else {
          // Long stationary: maintain calm resting visibility
          targetOpacity = 0.45;
        }
      } else {
        // Mouse left page or not yet entered: fade out completely (0)
        targetOpacity = 0;
      }

      // Smooth Fade (duration approximately 300ms - 600ms)
      if (targetOpacity > currentOpacity) {
        // Quick responsive fade-in (~60ms)
        currentOpacity += (targetOpacity - currentOpacity) * 0.28;
      } else {
        // Gentle smooth fade-out (~400-500ms)
        currentOpacity += (targetOpacity - currentOpacity) * 0.08;
      }

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Only draw when visible
      if (currentOpacity > 0.01 && currentX > -300) {
        const startX = currentX - halfSpan;
        const startY = currentY - halfSpan;

        // Viewport bounds check
        if (
          startX + totalSpan >= 0 &&
          startX <= width &&
          startY + totalSpan >= 0 &&
          startY <= height
        ) {
          ctx.save();

          // 1. Draw Cell Interiors (very subtle cream/ink wash)
          for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
              const d = Math.max(Math.abs(col - centerIndex), Math.abs(row - centerIndex));
              // Center cell has a very subtle tint, outer cells transparent
              const interiorAlpha = d === 0 ? 0.04 : d === 1 ? 0.02 : 0.008;

              const cellX = startX + col * cellSize;
              const cellY = startY + row * cellSize;

              ctx.fillStyle = `rgba(24, 21, 17, ${interiorAlpha * currentOpacity})`;
              ctx.fillRect(Math.floor(cellX), Math.floor(cellY), cellSize, cellSize);
            }
          }

          // 2. Subtle Brutalist Shadow on the Active Grid
          ctx.shadowColor = `rgba(24, 21, 17, ${0.12 * currentOpacity})`;
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          ctx.lineWidth = 1;

          // 3. Draw Grid Lines with Radial Distance Falloff
          // Horizontal Lines
          for (let r = 0; r <= gridSize; r++) {
            const y = Math.floor(startY + r * cellSize) + 0.5; // Sharp 1px stroke
            const distY = Math.abs(r - centerIndex - 0.5);

            for (let c = 0; c < gridSize; c++) {
              const x1 = startX + c * cellSize;
              const x2 = x1 + cellSize;
              const distX = Math.abs(c - centerIndex);
              const maxDist = Math.max(distX, Math.floor(distY));

              // Clean contrast hierarchy:
              // Center lines: 0.88 opacity (clearly visible black)
              // Ring 1: 0.62 opacity (dark black)
              // Ring 2: 0.38 opacity (medium)
              // Outer: 0.16 opacity (soft boundary)
              let lineAlpha = 0.88;
              if (maxDist === 1) lineAlpha = 0.62;
              else if (maxDist === 2) lineAlpha = 0.38;
              else if (maxDist >= 3) lineAlpha = 0.16;

              ctx.strokeStyle = `rgba(24, 21, 17, ${lineAlpha * currentOpacity})`;
              ctx.beginPath();
              ctx.moveTo(Math.floor(x1), y);
              ctx.lineTo(Math.floor(x2), y);
              ctx.stroke();
            }
          }

          // Vertical Lines
          for (let c = 0; c <= gridSize; c++) {
            const x = Math.floor(startX + c * cellSize) + 0.5; // Sharp 1px stroke
            const distX = Math.abs(c - centerIndex - 0.5);

            for (let r = 0; r < gridSize; r++) {
              const y1 = startY + r * cellSize;
              const y2 = y1 + cellSize;
              const distY = Math.abs(r - centerIndex);
              const maxDist = Math.max(Math.floor(distX), distY);

              let lineAlpha = 0.88;
              if (maxDist === 1) lineAlpha = 0.62;
              else if (maxDist === 2) lineAlpha = 0.38;
              else if (maxDist >= 3) lineAlpha = 0.16;

              ctx.strokeStyle = `rgba(24, 21, 17, ${lineAlpha * currentOpacity})`;
              ctx.beginPath();
              ctx.moveTo(x, Math.floor(y1));
              ctx.lineTo(x, Math.floor(y2));
              ctx.stroke();
            }
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cellSize, gridSize]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  );
};
