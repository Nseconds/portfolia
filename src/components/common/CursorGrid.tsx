import React, { useEffect, useRef } from 'react';

interface CursorGridProps {
  /** Size of each square grid cell in pixels (default: 28px, matching notebook lines) */
  cellSize?: number;
  /** Radius in cells around cursor (default: 3, forming a 7x7 grid with a 5x5 core) */
  radius?: number;
}

interface ActiveCell {
  col: number;
  row: number;
  opacity: number;
  targetOpacity: number;
}

export const CursorGrid: React.FC<CursorGridProps> = ({
  cellSize = 28,
  radius = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Mobile & Touch Device Detection (disable on touch screens)
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

    // 3. Mouse & Activity State
    let mouseX = -1000;
    let mouseY = -1000;
    let isMouseOnPage = false;
    let lastMoveTime = performance.now();
    let scrollX = window.scrollX || 0;
    let scrollY = window.scrollY || 0;

    const activeCells = new Map<string, ActiveCell>();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnPage = true;
      lastMoveTime = performance.now();
    };

    const handleMouseLeave = () => {
      isMouseOnPage = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnPage = true;
      lastMoveTime = performance.now();
    };

    const handleScroll = () => {
      scrollX = window.scrollX || 0;
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 4. Main 60fps Animation Loop
    let animationFrameId: number;

    const render = () => {
      const now = performance.now();

      // Determine resting activity level:
      // When stationary for > 1.2s, gently settle to a calm 40% resting level
      let activityFactor = 1.0;
      if (isMouseOnPage) {
        const stationaryTime = now - lastMoveTime;
        if (stationaryTime > 1200) {
          activityFactor = Math.max(0.4, 1.0 - (stationaryTime - 1200) / 1000);
        }
      } else {
        activityFactor = 0;
      }

      // Calculate scroll offset to anchor grid lines to the paper texture
      const offsetX = -(scrollX % cellSize);
      const offsetY = -(scrollY % cellSize);

      // Current cursor cell in grid coordinates
      const cursorCol = Math.floor((mouseX - offsetX) / cellSize);
      const cursorRow = Math.floor((mouseY - offsetY) / cellSize);

      // Update target opacities for cells within the active window around cursor
      if (isMouseOnPage && activityFactor > 0.01) {
        for (let dc = -radius; dc <= radius; dc++) {
          for (let dr = -radius; dr <= radius; dr++) {
            const c = cursorCol + dc;
            const r = cursorRow + dr;
            // Chebyshev distance for clean square geometry falloff
            const d = Math.max(Math.abs(dc), Math.abs(dr));

            let baseAlpha = 0;
            if (d === 0) {
              baseAlpha = 0.85; // Center cell (darkest black border)
            } else if (d === 1) {
              baseAlpha = 0.60; // 3x3 ring
            } else if (d === 2) {
              baseAlpha = 0.35; // 5x5 ring
            } else if (d === 3) {
              baseAlpha = 0.12; // 7x7 outer perimeter
            }

            const targetOpacity = baseAlpha * activityFactor;
            const key = `${c},${r}`;
            const existing = activeCells.get(key);

            if (existing) {
              existing.targetOpacity = targetOpacity;
            } else if (targetOpacity > 0.01) {
              activeCells.set(key, {
                col: c,
                row: r,
                opacity: 0,
                targetOpacity,
              });
            }
          }
        }
      }

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Update cell opacities with smooth decay & clean up faded cells
      const keysToDelete: string[] = [];
      const cellsToRender: ActiveCell[] = [];

      for (const [key, cell] of activeCells.entries()) {
        const dc = Math.abs(cell.col - cursorCol);
        const dr = Math.abs(cell.row - cursorRow);

        // If cell is outside current cursor window or mouse left, target is 0
        if (!isMouseOnPage || Math.max(dc, dr) > radius) {
          cell.targetOpacity = 0;
        }

        // Smooth interpolation: fast fade-in (~60ms), gentle fade-out (~200ms)
        if (cell.targetOpacity > cell.opacity) {
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.35;
        } else {
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.14;
        }

        if (cell.opacity < 0.005 && cell.targetOpacity === 0) {
          keysToDelete.push(key);
        } else if (cell.opacity > 0.01) {
          cellsToRender.push(cell);
        }
      }

      for (let i = 0; i < keysToDelete.length; i++) {
        activeCells.delete(keysToDelete[i]);
      }

      // If no active cells, continue loop without drawing
      if (cellsToRender.length > 0) {
        // 5. Draw Cell Interiors (very subtle cream/ink wash)
        for (let i = 0; i < cellsToRender.length; i++) {
          const cell = cellsToRender[i];
          const x = cell.col * cellSize + offsetX;
          const y = cell.row * cellSize + offsetY;

          // Only render cells within viewport
          if (x + cellSize < 0 || x > width || y + cellSize < 0 || y > height) {
            continue;
          }

          // Subtle warm ink wash interior
          ctx.fillStyle = `rgba(24, 21, 17, ${cell.opacity * 0.02})`;
          ctx.fillRect(Math.floor(x), Math.floor(y), cellSize, cellSize);
        }

        // 6. Collect Unique Horizontal and Vertical Line Segments
        // This ensures single-stroke 1px lines without overlapping artifacts
        const hSegments = new Map<string, { col: number; row: number; alpha: number }>();
        const vSegments = new Map<string, { col: number; row: number; alpha: number }>();

        for (let i = 0; i < cellsToRender.length; i++) {
          const cell = cellsToRender[i];
          const c = cell.col;
          const r = cell.row;
          const op = cell.opacity;

          // Top edge: (c, r) -> (c + 1, r)
          const topKey = `${c},${r}`;
          const currentTop = hSegments.get(topKey);
          if (!currentTop || currentTop.alpha < op) {
            hSegments.set(topKey, { col: c, row: r, alpha: op });
          }

          // Bottom edge: (c, r + 1) -> (c + 1, r + 1)
          const bottomKey = `${c},${r + 1}`;
          const currentBottom = hSegments.get(bottomKey);
          if (!currentBottom || currentBottom.alpha < op) {
            hSegments.set(bottomKey, { col: c, row: r + 1, alpha: op });
          }

          // Left edge: (c, r) -> (c, r + 1)
          const leftKey = `${c},${r}`;
          const currentLeft = vSegments.get(leftKey);
          if (!currentLeft || currentLeft.alpha < op) {
            vSegments.set(leftKey, { col: c, row: r, alpha: op });
          }

          // Right edge: (c + 1, r) -> (c + 1, r + 1)
          const rightKey = `${c + 1},${r}`;
          const currentRight = vSegments.get(rightKey);
          if (!currentRight || currentRight.alpha < op) {
            vSegments.set(rightKey, { col: c + 1, row: r, alpha: op });
          }
        }

        // 7. Draw Line Segments with Subtle Brutalist Drop Shadow
        ctx.save();
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(24, 21, 17, 0.08)';
        ctx.shadowBlur = 1.5;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        // Draw horizontal line segments
        for (const seg of hSegments.values()) {
          const x1 = seg.col * cellSize + offsetX;
          const x2 = x1 + cellSize;
          const y = Math.floor(seg.row * cellSize + offsetY) + 0.5; // Sharp 1px stroke

          if (x2 < 0 || x1 > width || y < 0 || y > height) continue;

          ctx.strokeStyle = `rgba(24, 21, 17, ${seg.alpha})`;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }

        // Draw vertical line segments
        for (const seg of vSegments.values()) {
          const x = Math.floor(seg.col * cellSize + offsetX) + 0.5; // Sharp 1px stroke
          const y1 = seg.row * cellSize + offsetY;
          const y2 = y1 + cellSize;

          if (x < 0 || x > width || y2 < 0 || y1 > height) continue;

          ctx.strokeStyle = `rgba(24, 21, 17, ${seg.alpha})`;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cellSize, radius]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  );
};
