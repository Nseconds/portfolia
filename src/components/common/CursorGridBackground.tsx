import React, { useEffect, useRef } from 'react';

export interface CursorGridBackgroundProps {
  /** Size of each square grid cell in pixels (default: 44) */
  cellSize?: number;
  /** Color of the static faint grid lines (default: 'rgba(0, 0, 0, 0.06)') */
  lineColor?: string;
  /** Color of the active cluster around the cursor (default: 'rgba(24, 21, 17, 1)') */
  activeColor?: string;
  /** Duration in ms for cells to smoothly fade out (default: 750) */
  fadeDuration?: number;
  /** Cell radius affected around the cursor (default: 2) */
  radius?: number;
  /** Additional CSS classes for canvas wrapper */
  className?: string;
}

interface AmbientCell {
  col: number;
  row: number;
  progress: number;
  speed: number;
  maxOpacity: number;
}

function parseColor(color: string): { r: number; g: number; b: number } {
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
  cellSize = 44,
  lineColor = 'rgba(0, 0, 0, 0.06)',
  activeColor = 'rgba(24, 21, 17, 1)',
  fadeDuration = 750,
  radius = 2,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Active color RGB breakdown
    const activeRgb = parseColor(activeColor);

    // Dimensions & DPR handling
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    let cols = Math.ceil(width / cellSize) + 1;
    let rows = Math.ceil(height / cellSize) + 1;

    // Offscreen Canvas for caching static faint grid
    let offscreenCanvas: HTMLCanvasElement | null = document.createElement('canvas');
    let offscreenCtx = offscreenCanvas.getContext('2d');

    const updateOffscreenGrid = () => {
      if (!offscreenCanvas || !offscreenCtx) return;
      offscreenCanvas.width = Math.floor(width * dpr);
      offscreenCanvas.height = Math.floor(height * dpr);
      offscreenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offscreenCtx.clearRect(0, 0, width, height);

      offscreenCtx.strokeStyle = lineColor;
      offscreenCtx.lineWidth = 1;
      offscreenCtx.beginPath();

      // Draw vertical grid lines
      for (let x = 0; x <= width + cellSize; x += cellSize) {
        const px = Math.floor(x) + 0.5;
        offscreenCtx.moveTo(px, 0);
        offscreenCtx.lineTo(px, height);
      }

      // Draw horizontal grid lines
      for (let y = 0; y <= height + cellSize; y += cellSize) {
        const py = Math.floor(y) + 0.5;
        offscreenCtx.moveTo(0, py);
        offscreenCtx.lineTo(width, py);
      }

      offscreenCtx.stroke();
    };

    // Intensity map for active cells
    let intensities = new Float32Array(cols * rows);
    const activeIndices = new Set<number>();

    // Ambient pulses on idle (2 subtle cells breathing softly)
    const ambientCells: AmbientCell[] = [
      {
        col: Math.floor(cols * 0.25),
        row: Math.floor(rows * 0.3),
        progress: 0.1,
        speed: 0.005,
        maxOpacity: 0.18,
      },
      {
        col: Math.floor(cols * 0.75),
        row: Math.floor(rows * 0.65),
        progress: 0.6,
        speed: 0.004,
        maxOpacity: 0.16,
      },
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateOffscreenGrid();

      // Reallocate intensity array and preserve existing where possible
      const newIntensities = new Float32Array(cols * rows);
      newIntensities.set(intensities.subarray(0, Math.min(intensities.length, newIntensities.length)));
      intensities = newIntensities;
    };

    resize();

    // Activate cells around client coordinates forming a plus/cluster shape
    const activateClusterAt = (clientX: number, clientY: number) => {
      if (prefersReducedMotion) return;

      const centerCol = Math.floor(clientX / cellSize);
      const centerRow = Math.floor(clientY / cellSize);

      for (let dc = -radius; dc <= radius; dc++) {
        for (let dr = -radius; dr <= radius; dr++) {
          const c = centerCol + dc;
          const r = centerRow + dr;
          if (c < 0 || c >= cols || r < 0 || r >= rows) continue;

          const dist = Math.sqrt(dc * dc + dr * dr);
          if (dist > radius + 0.1) continue;

          // Distance falloff: center is 1.0, orthogonal neighbors are 0.65 (plus arms), diagonals are 0.35
          let weight = 0;
          if (dc === 0 && dr === 0) {
            weight = 1.0;
          } else if (Math.abs(dc) + Math.abs(dr) === 1) {
            weight = 0.65;
          } else if (Math.abs(dc) === 1 && Math.abs(dr) === 1) {
            weight = 0.35;
          } else if (dist <= 2.1) {
            weight = 0.20;
          } else {
            weight = 0.10;
          }

          const idx = r * cols + c;
          intensities[idx] = Math.max(intensities[idx], weight);
          activeIndices.add(idx);
        }
      }
    };

    // Window-level mouse listener: works over cards, buttons, nav, portrait & margins
    const handleMouseMove = (e: MouseEvent) => {
      activateClusterAt(e.clientX, e.clientY);
    };

    // Touch support for touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        activateClusterAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    // 60FPS RAF Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (now: number) => {
      const deltaTime = Math.min(100, now - lastTime);
      lastTime = now;

      // 1. Blit cached static faint grid from offscreen canvas
      if (offscreenCanvas) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreenCanvas, 0, 0);
        ctx.restore();
      }

      if (!prefersReducedMotion) {
        // 2. Render ambient subtle pulse on idle
        for (let i = 0; i < ambientCells.length; i++) {
          const amb = ambientCells[i];
          amb.progress += amb.speed * (deltaTime / 16.67);
          if (amb.progress >= 1) {
            amb.col = Math.floor(Math.random() * cols);
            amb.row = Math.floor(Math.random() * rows);
            amb.progress = 0;
            amb.speed = 0.003 + Math.random() * 0.004;
            amb.maxOpacity = 0.14 + Math.random() * 0.1;
          }

          const pulseAlpha = Math.sin(amb.progress * Math.PI) * amb.maxOpacity;
          if (pulseAlpha > 0.01) {
            const ax = amb.col * cellSize;
            const ay = amb.row * cellSize;

            ctx.fillStyle = `rgba(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b}, ${pulseAlpha * 0.08})`;
            ctx.fillRect(ax, ay, cellSize, cellSize);

            ctx.strokeStyle = `rgba(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b}, ${0.06 + pulseAlpha * 0.25})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(ax + 0.5, ay + 0.5, cellSize, cellSize);
          }
        }

        // 3. Update & render active cluster cells
        const decayAmount = deltaTime / fadeDuration;
        const toDelete: number[] = [];

        activeIndices.forEach((idx) => {
          intensities[idx] -= decayAmount;

          if (intensities[idx] <= 0) {
            intensities[idx] = 0;
            toDelete.push(idx);
            return;
          }

          const intensity = intensities[idx];
          const c = idx % cols;
          const r = Math.floor(idx / cols);
          const x = c * cellSize;
          const y = r * cellSize;

          // Soft tinted fill
          ctx.fillStyle = `rgba(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b}, ${intensity * 0.12})`;
          ctx.fillRect(x, y, cellSize, cellSize);

          // Darker border with distance falloff
          ctx.strokeStyle = `rgba(${activeRgb.r}, ${activeRgb.g}, ${activeRgb.b}, ${Math.min(1, 0.06 + intensity * 0.70)})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cellSize, cellSize);
        });

        for (let i = 0; i < toDelete.length; i++) {
          activeIndices.delete(toDelete[i]);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('resize', resize);
      offscreenCanvas = null;
      offscreenCtx = null;
    };
  }, [cellSize, lineColor, activeColor, fadeDuration, radius]);

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
