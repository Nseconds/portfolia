import React, { useEffect, useRef } from 'react';

interface AmbientCluster {
  id: number;
  worldX: number; // Document X position
  worldY: number; // Document Y position
  size: number; // 3 (3x3), 4 (4x4), or 5 (5x5)
  maxOpacity: number;
  currentOpacity: number;
  phase: 'fade_in' | 'visible' | 'fade_out' | 'dead';
  phaseStartTime: number;
  fadeInDuration: number;
  visibleDuration: number;
  fadeOutDuration: number;
  driftSpeed: number;
  driftAngle: number;
  driftDistance: number;
}

interface AmbientGridProps {
  /** Size of each square cell in pixels (default: 28px, matching notebook ruling) */
  cellSize?: number;
  /** Max concurrent clusters visible on desktop (default: 5) */
  maxClusters?: number;
}

export const AmbientGrid: React.FC<AmbientGridProps> = ({
  cellSize = 28,
  maxClusters = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect mobile / touch device
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches);

    // Mobile uses fewer clusters and lower opacity
    const targetClusterCount = isTouch ? 2 : maxClusters;

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

    let scrollX = window.scrollX || 0;
    let scrollY = window.scrollY || 0;

    const handleScroll = () => {
      scrollX = window.scrollX || 0;
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cluster ID incrementor
    let clusterCounter = 0;
    const clusters: AmbientCluster[] = [];

    // Safe Zone Generator: generates coordinates in clean margins, gutters, and empty spaces
    const generateClusterPosition = (clusterPixelSize: number) => {
      const scrollCurrY = window.scrollY || 0;
      const zoneType = Math.random();

      let x = 0;
      let y = 0;

      // Safe zone 1 (40% probability): Left gutter / margin (outside main content)
      if (zoneType < 0.4) {
        const leftMarginMax = Math.max(40, (width - 1100) / 2 - clusterPixelSize - 20);
        x = Math.max(16, Math.random() * leftMarginMax);
        y = scrollCurrY + 80 + Math.random() * (height - 160);
      }
      // Safe zone 2 (40% probability): Right gutter / margin (outside main content)
      else if (zoneType < 0.8) {
        const rightMarginMin = Math.min(width - clusterPixelSize - 40, (width + 1100) / 2 + 20);
        x = rightMarginMin + Math.random() * Math.max(20, width - rightMarginMin - clusterPixelSize - 16);
        y = scrollCurrY + 80 + Math.random() * (height - 160);
      }
      // Safe zone 3 (20% probability): Upper / Lower section gaps
      else {
        x = Math.random() < 0.5 ? width * 0.12 : width * 0.82;
        y = scrollCurrY + 60 + Math.random() * (height - 120);
      }

      // Snap world position to cell grid so cluster borders align with paper lines
      const col = Math.round(x / cellSize);
      const row = Math.round(y / cellSize);

      return {
        worldX: col * cellSize,
        worldY: row * cellSize,
      };
    };

    const createCluster = (now: number): AmbientCluster => {
      clusterCounter++;
      // Choose cluster size: 3x3 (50%), 4x4 (30%), or 5x5 (20%)
      const randSize = Math.random();
      const size = randSize < 0.5 ? 3 : randSize < 0.8 ? 4 : 5;
      const clusterPixelSize = size * cellSize;

      const pos = generateClusterPosition(clusterPixelSize);

      // Opacity: majority (75%) subtle (0.09 - 0.16), some (25%) slightly stronger (0.20 - 0.26)
      const isStronger = Math.random() < 0.25;
      const baseOpacity = isStronger
        ? 0.20 + Math.random() * 0.06
        : 0.09 + Math.random() * 0.07;

      const maxOpacity = isTouch ? baseOpacity * 0.65 : baseOpacity;

      // Durations (slow, subtle, organic lifecycle)
      const fadeInDuration = 1800 + Math.random() * 1200; // 1.8s - 3.0s
      const visibleDuration = 3200 + Math.random() * 2800; // 3.2s - 6.0s
      const fadeOutDuration = 1800 + Math.random() * 1200; // 1.8s - 3.0s

      return {
        id: clusterCounter,
        worldX: pos.worldX,
        worldY: pos.worldY,
        size,
        maxOpacity,
        currentOpacity: 0,
        phase: 'fade_in',
        phaseStartTime: now,
        fadeInDuration,
        visibleDuration,
        fadeOutDuration,
        driftSpeed: 0.0006 + Math.random() * 0.0006,
        driftAngle: Math.random() * Math.PI * 2,
        driftDistance: 2 + Math.random() * 3, // Very tiny 2-5px subtle breathing
      };
    };

    // Initialize initial clusters staggered over time
    const initialNow = performance.now();
    for (let i = 0; i < targetClusterCount; i++) {
      const cluster = createCluster(initialNow);
      // Stagger start phases so they don't all appear at once
      cluster.phaseStartTime = initialNow - i * 1500;
      clusters.push(cluster);
    }

    let animationFrameId: number;

    const render = () => {
      const now = performance.now();

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Update and Draw Ambient Clusters
      for (let i = clusters.length - 1; i >= 0; i--) {
        const c = clusters[i];
        const elapsed = now - c.phaseStartTime;

        // 1. Lifecycle Phase Management
        if (c.phase === 'fade_in') {
          const progress = Math.min(1, elapsed / c.fadeInDuration);
          c.currentOpacity = c.maxOpacity * progress;
          if (progress >= 1) {
            c.phase = 'visible';
            c.phaseStartTime = now;
          }
        } else if (c.phase === 'visible') {
          // Subtle breathing / pulsing while visible
          const breathe = Math.sin(now * c.driftSpeed) * 0.02;
          c.currentOpacity = Math.max(0.04, c.maxOpacity + breathe);

          if (elapsed >= c.visibleDuration) {
            c.phase = 'fade_out';
            c.phaseStartTime = now;
          }
        } else if (c.phase === 'fade_out') {
          const progress = Math.min(1, elapsed / c.fadeOutDuration);
          c.currentOpacity = c.maxOpacity * (1 - progress);
          if (progress >= 1) {
            c.phase = 'dead';
          }
        }

        // If dead, remove and queue a new cluster
        if (c.phase === 'dead') {
          clusters.splice(i, 1);
          // Spawn new cluster at a fresh position
          clusters.push(createCluster(now));
          continue;
        }

        // 2. Compute Screen Position with Subtle Micro-Drift
        const driftX = Math.cos(now * c.driftSpeed + c.driftAngle) * c.driftDistance;
        const driftY = Math.sin(now * c.driftSpeed + c.driftAngle) * c.driftDistance;

        const screenX = c.worldX - scrollX + driftX;
        const screenY = c.worldY - scrollY + driftY;
        const totalSize = c.size * cellSize;

        // Viewport Culling: Skip if entirely outside visible screen
        if (
          screenX + totalSize < -20 ||
          screenX > width + 20 ||
          screenY + totalSize < -20 ||
          screenY > height + 20
        ) {
          continue;
        }

        // 3. Draw Ambient Square Grid Cluster
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(24, 21, 17, ${c.currentOpacity})`;

        // Very faint brutalist ink shadow
        ctx.shadowColor = `rgba(24, 21, 17, ${c.currentOpacity * 0.15})`;
        ctx.shadowBlur = 1;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        // Transparent / warm ink interior wash
        ctx.fillStyle = `rgba(24, 21, 17, ${c.currentOpacity * 0.02})`;
        ctx.fillRect(Math.floor(screenX), Math.floor(screenY), totalSize, totalSize);

        // Draw horizontal grid lines
        for (let r = 0; r <= c.size; r++) {
          const y = Math.floor(screenY + r * cellSize) + 0.5; // Sharp 1px stroke
          ctx.beginPath();
          ctx.moveTo(Math.floor(screenX), y);
          ctx.lineTo(Math.floor(screenX + totalSize), y);
          ctx.stroke();
        }

        // Draw vertical grid lines
        for (let col = 0; col <= c.size; col++) {
          const x = Math.floor(screenX + col * cellSize) + 0.5; // Sharp 1px stroke
          ctx.beginPath();
          ctx.moveTo(x, Math.floor(screenY));
          ctx.lineTo(x, Math.floor(screenY + totalSize));
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cellSize, maxClusters]);

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
