import React, { useEffect, useRef, useState } from 'react';

interface PixelDinoSceneProps {
  className?: string;
  width?: number;
  height?: number;
}

// ---------------------------------------------------------------------------
// Monochrome Pixel-Art Bitmaps (1 = dark pixel '#', 0 = transparent '.')
// ---------------------------------------------------------------------------

// 1. T-Rex Dinosaur (Facing RIGHT, 20 wide x 23 high)
const DINO_RUN_F0 = [
  '...........########.',
  '...........#########',
  '...........#.#.#####',
  '...........#########',
  '...........#########',
  '...........#######..',
  '...........#########',
  '.#.........####.....',
  '.##........#####....',
  '.###......######....',
  '.####....######.....',
  '.######.#######.....',
  '.##############.....',
  '..############......',
  '...##########.......',
  '....########........',
  '.....######.........',
  '.....#####..........',
  '.....####...........',
  '.....#..#...........',
  '.....#..#...........',
  '.....#..##..........',
  '.....##.............',
];

const DINO_RUN_F1 = [
  '...........########.',
  '...........#########',
  '...........#.#.#####',
  '...........#########',
  '...........#########',
  '...........#######..',
  '...........#########',
  '.#.........####.....',
  '.##........#####....',
  '.###......######....',
  '.####....######.....',
  '.######.#######.....',
  '.##############.....',
  '..############......',
  '...##########.......',
  '....########........',
  '.....######.........',
  '.....#####..........',
  '.....####...........',
  '.....#..#...........',
  '.....#..#...........',
  '.....#..#...........',
  '.....##.##..........',
];

const DINO_RUN_F2 = [
  '...........########.',
  '...........#########',
  '...........#.#.#####',
  '...........#########',
  '...........#########',
  '...........#######..',
  '...........#########',
  '.#.........####.....',
  '.##........#####....',
  '.###......######....',
  '.####....######.....',
  '.######.#######.....',
  '.##############.....',
  '..############......',
  '...##########.......',
  '....########........',
  '.....######.........',
  '.....#####..........',
  '.....####...........',
  '.....#..#...........',
  '.....#..#...........',
  '.....##.#...........',
  '........##..........',
];

// Curious glance (subtle eye perk for hover interaction)
const DINO_CURIOUS = [
  '............########',
  '............########',
  '............#.#.####',
  '............########',
  '............########',
  '............#######.',
  '............########',
  '.#..........####....',
  '.##.........#####...',
  '.###.......######...',
  '.####.....######....',
  '.######..#######....',
  '.###############....',
  '..#############.....',
  '...##########.......',
  '....########........',
  '.....######.........',
  '.....#####..........',
  '.....####...........',
  '.....#..#...........',
  '.....#..#...........',
  '.....#..#...........',
  '.....##.##..........',
];

// 2. Cacti Outlines (as in reference Image 2)
const CACTUS_SINGLE = [
  '..###..',
  '..#.#..',
  '#.###.#',
  '#.#.#.#',
  '#.#.#.#',
  '###.###',
  '..###..',
  '..#.#..',
  '..#.#..',
  '..#.#..',
  '..#.#..',
  '..###..',
];

const CACTUS_DOUBLE = [
  '..###.......###..',
  '..#.#.......#.#..',
  '#.###.#...#.###.#',
  '#.#.#.#...#.#.#.#',
  '#.#.#.#...#.#.#.#',
  '###.###...###.###',
  '..###.......###..',
  '..#.#.......#.#..',
  '..#.#.......#.#..',
  '..#.#.......#.#..',
  '..#.#.......#.#..',
  '..###.......###..',
];

// 3. Desert Rock / Boulder (as in reference Image 2)
const ROCK_BITMAP = [
  '....######....',
  '..##......##..',
  '.#..........#.',
  '##############',
];

// 4. Pixel Clouds with Thin Dark Outline (as in reference Image 2)
const CLOUD_BITMAP = [
  '..........######..........',
  '........##......##........',
  '..######..........######..',
  '.#......................#.',
  '#........................#',
  '##########################',
];

// 5. Pixel Birds (Pterodactyl, 2 frames)
const BIRD_F0 = [
  '....#.......',
  '...###......',
  '..#####.....',
  '.#######....',
  '###.#####.##',
  '..#########.',
  '....#####...',
  '.....###....',
];

const BIRD_F1 = [
  '.....###....',
  '....#####...',
  '..#########.',
  '###.#####.##',
  '.#######....',
  '..#####.....',
  '...###......',
  '....#.......',
];

// 6. Muted Yellow Pixel Sun (as in reference Image 2)
const SUN_BITMAP = [
  '....########....',
  '..############..',
  '.##############.',
  '.##############.',
  '################',
  '################',
  '################',
  '################',
  '.##############.',
  '.##############.',
  '..############..',
  '....########....',
];

export const PixelDinoScene: React.FC<PixelDinoSceneProps> = ({
  className = '',
  width: customWidth,
  height: customHeight = 210,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const PIXEL_SCALE = 2; // Crisp 2x2 physical pixel scale
    const COLOR_INK = '#181511'; // Portfolio dark ink
    const COLOR_SUN = '#F7C948'; // Muted portfolio yellow accent
    const COLOR_MOUNTAIN = 'rgba(24, 21, 17, 0.055)'; // Very subtle distant mountain grey
    const COLOR_CLOUD_FILL = 'rgba(252, 251, 248, 0.9)'; // Off-white cloud interior
    const COLOR_GROUND = 'rgba(24, 21, 17, 0.35)'; // Subtle ground line
    const COLOR_DUST = 'rgba(24, 21, 17, 0.3)'; // Dust puff particles

    let width = customWidth || container.clientWidth || 780;
    const height = customHeight;
    let dpr = window.devicePixelRatio || 1;

    // Helper: Create offscreen canvas for a 2-tone pixel bitmap
    const createOffscreen = (
      bitmap: string[],
      strokeColor: string,
      fillColor: string | null = null
    ): HTMLCanvasElement => {
      const oc = document.createElement('canvas');
      const rows = bitmap.length;
      const cols = bitmap[0].length;
      oc.width = cols * PIXEL_SCALE;
      oc.height = rows * PIXEL_SCALE;
      const octx = oc.getContext('2d');
      if (octx) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const ch = bitmap[r][c];
            if (ch === '#') {
              octx.fillStyle = strokeColor;
              octx.fillRect(c * PIXEL_SCALE, r * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
            } else if (ch === ' ' && fillColor) {
              octx.fillStyle = fillColor;
              octx.fillRect(c * PIXEL_SCALE, r * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
            }
          }
        }
      }
      return oc;
    };

    // Pre-render sprite sheets
    const dinoSprites = [
      createOffscreen(DINO_RUN_F0, COLOR_INK),
      createOffscreen(DINO_RUN_F1, COLOR_INK),
      createOffscreen(DINO_RUN_F2, COLOR_INK),
      createOffscreen(DINO_CURIOUS, COLOR_INK),
    ];

    const cactusSingle = createOffscreen(CACTUS_SINGLE, COLOR_INK);
    const cactusDouble = createOffscreen(CACTUS_DOUBLE, COLOR_INK);
    const rockSprite = createOffscreen(ROCK_BITMAP, COLOR_INK);
    const sunSprite = createOffscreen(SUN_BITMAP, COLOR_SUN);
    const birdSprites = [
      createOffscreen(BIRD_F0, COLOR_INK),
      createOffscreen(BIRD_F1, COLOR_INK),
    ];

    // Pre-render cloud with filled interior
    const cloudSprite = (() => {
      const oc = document.createElement('canvas');
      const rows = CLOUD_BITMAP.length;
      const cols = CLOUD_BITMAP[0].length;
      oc.width = cols * PIXEL_SCALE;
      oc.height = rows * PIXEL_SCALE;
      const octx = oc.getContext('2d');
      if (octx) {
        // First fill inside with cloud fill
        octx.fillStyle = COLOR_CLOUD_FILL;
        octx.fillRect(
          2 * PIXEL_SCALE,
          2 * PIXEL_SCALE,
          (cols - 4) * PIXEL_SCALE,
          (rows - 3) * PIXEL_SCALE
        );
        // Then draw outline
        octx.fillStyle = COLOR_INK;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (CLOUD_BITMAP[r][c] === '#') {
              octx.fillRect(c * PIXEL_SCALE, r * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
            }
          }
        }
      }
      return oc;
    })();

    // Ground line position
    const groundY = height - 28;

    // Distant mountain coordinates relative to width
    const mountainPeaks = [
      { xPct: 0.48, height: 28 },
      { xPct: 0.64, height: 48 }, // Tallest pyramid peak near the sun
      { xPct: 0.78, height: 24 },
      { xPct: 0.90, height: 16 },
    ];

    // Clouds array (drift slowly across sky)
    const clouds = [
      { x: width * 0.12, y: 35, speed: 5 },
      { x: width * 0.40, y: 55, speed: 8 },
      { x: width * 0.76, y: 38, speed: 6 },
      { x: width * 0.94, y: 52, speed: 7 },
    ];

    // Ground obstacles: 2 Cacti & 1 Rock (as in reference Image 2)
    const groundObjects = [
      { x: width * 0.42, type: 'cactus_single', sprite: cactusSingle },
      { x: width * 0.58, type: 'rock', sprite: rockSprite },
      { x: width * 0.86, type: 'cactus_double', sprite: cactusDouble },
    ];

    // Occasional bird
    const bird = {
      active: true,
      x: width * 0.28,
      y: 58,
      speed: 26,
      flapFrame: 0,
      flapTimer: 0,
    };

    // Running dust particles
    interface DustParticle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      vx: number;
      vy: number;
    }
    const dustParticles: DustParticle[] = [];
    let dustTimer = 0;

    // Ground broken line segments
    const groundSegments = Array.from({ length: 32 }, (_, i) => ({
      x: (i * (width + 100)) / 32,
      len: 12 + Math.random() * 20,
      gap: 3 + Math.random() * 6,
      dotX: Math.random() > 0.4 ? Math.random() * 15 : null,
    }));

    const handleResize = () => {
      if (!container) return;
      width = customWidth || container.clientWidth || 780;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation state
    let animationFrameId: number;
    let lastTime = performance.now();
    let walkTimer = 0;
    let walkFrameIndex = 0;
    let isVisible = true;

    // Pause animation when scrolled out of viewport (0% CPU)
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // -------------------------------------------------------------------------
    // Main 60fps Ambient Render Loop
    // -------------------------------------------------------------------------
    const render = (now: number) => {
      const dt = Math.min(100, now - lastTime) / 1000;
      lastTime = now;

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Parallax mouse interaction
      const mouseParallax = isHovered ? (mousePosRef.current.x / width - 0.5) * 8 : 0;

      // 1. Draw Distant Subtle Mountains
      ctx.fillStyle = COLOR_MOUNTAIN;
      ctx.beginPath();
      ctx.moveTo(width * 0.38 + mouseParallax * 0.4, groundY);
      mountainPeaks.forEach((p) => {
        const peakX = width * p.xPct + mouseParallax * 0.4;
        const peakY = groundY - p.height;
        ctx.lineTo(peakX - 16, groundY - p.height * 0.4);
        ctx.lineTo(peakX, peakY);
        ctx.lineTo(peakX + 16, groundY - p.height * 0.4);
      });
      ctx.lineTo(width * 0.98 + mouseParallax * 0.4, groundY);
      ctx.closePath();
      ctx.fill();

      // 2. Draw Muted Yellow Pixel Sun (as in Image 2, above the peak on right)
      const sunX = Math.round(width * 0.74 + mouseParallax * 0.6);
      const sunY = 40;
      ctx.drawImage(sunSprite, sunX, sunY);

      // 3. Draw Pixel Clouds (Drifting slowly across sky)
      clouds.forEach((cloud) => {
        if (!prefersReducedMotion) {
          cloud.x -= cloud.speed * dt;
          if (cloud.x < -cloudSprite.width) {
            cloud.x = width + 20 + Math.random() * 50;
            cloud.y = 25 + Math.random() * 45;
          }
        }
        ctx.drawImage(
          cloudSprite,
          Math.round(cloud.x + mouseParallax * 0.8),
          Math.round(cloud.y)
        );
      });

      // 4. Draw Subtle Pixel Bird
      if (bird.active) {
        if (!prefersReducedMotion) {
          bird.x -= bird.speed * dt;
          bird.flapTimer += dt;
          if (bird.flapTimer > 0.24) {
            bird.flapFrame = (bird.flapFrame + 1) % 2;
            bird.flapTimer = 0;
          }
          if (bird.x < -40) {
            bird.x = width + 60 + Math.random() * 120;
            bird.y = 35 + Math.random() * 35;
          }
        }
        const bSprite = birdSprites[bird.flapFrame];
        ctx.drawImage(bSprite, Math.round(bird.x + mouseParallax), Math.round(bird.y));
      }

      // 5. Draw Ground Line & Scrolling Broken Segments
      const scrollSpeed = 24; // px/sec
      ctx.strokeStyle = COLOR_GROUND;
      ctx.lineWidth = 1;

      groundSegments.forEach((seg) => {
        if (!prefersReducedMotion) {
          seg.x -= scrollSpeed * dt;
          if (seg.x + seg.len < -20) {
            seg.x = width + Math.random() * 15;
          }
        }
        // Segment line
        const sx = Math.round(seg.x);
        ctx.beginPath();
        ctx.moveTo(sx, groundY + 0.5);
        ctx.lineTo(sx + seg.len, groundY + 0.5);
        ctx.stroke();

        // Occasional tiny ground dot beneath line
        if (seg.dotX !== null) {
          ctx.fillStyle = COLOR_GROUND;
          ctx.fillRect(sx + seg.dotX, groundY + 4, PIXEL_SCALE, PIXEL_SCALE);
        }
      });

      // 6. Draw Ground Obstacles (Cacti & Rock)
      groundObjects.forEach((obj) => {
        if (!prefersReducedMotion) {
          obj.x -= scrollSpeed * dt;
          if (obj.x < -obj.sprite.width - 20) {
            // Respawn from right to maintain continuous ambient desert cycle
            obj.x = width + 60 + Math.random() * 200;
          }
        }
        const ox = Math.round(obj.x);
        const oy = Math.round(groundY - obj.sprite.height);
        ctx.drawImage(obj.sprite, ox, oy);
      });

      // 7. Draw Running Dust Particles Behind Dino Feet
      if (!prefersReducedMotion) {
        dustTimer += dt;
        if (dustTimer > 0.09) {
          dustTimer = 0;
          // Spawn tiny dust puff behind Dino's trailing foot
          dustParticles.push({
            x: width * 0.22 - 6,
            y: groundY - 2,
            size: Math.random() > 0.5 ? 2 : 1,
            opacity: 0.5,
            vx: -(12 + Math.random() * 10),
            vy: -(4 + Math.random() * 6),
          });
        }

        for (let i = dustParticles.length - 1; i >= 0; i--) {
          const p = dustParticles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.opacity -= dt * 1.8;
          if (p.opacity <= 0) {
            dustParticles.splice(i, 1);
            continue;
          }
          ctx.fillStyle = `rgba(24, 21, 17, ${p.opacity * 0.4})`;
          ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size * PIXEL_SCALE, p.size * PIXEL_SCALE);
        }
      }

      // 8. Draw T-Rex Dinosaur (Facing RIGHT, as in Image 2)
      const dinoX = Math.round(width * 0.22); // Positioned nicely on the left-middle
      let activeDinoSprite: HTMLCanvasElement;

      if (prefersReducedMotion) {
        activeDinoSprite = dinoSprites[1]; // Standing neutral
      } else if (isHovered) {
        // Curious perk when mouse hovers over scene
        activeDinoSprite = dinoSprites[3];
      } else {
        walkTimer += dt;
        if (walkTimer > 0.12) {
          // Rapid, cute running legs: 0 -> 1 -> 2 -> 1
          walkFrameIndex = (walkFrameIndex + 1) % 4;
          walkTimer = 0;
        }
        const frameMap = [0, 1, 2, 1];
        activeDinoSprite = dinoSprites[frameMap[walkFrameIndex]];
      }

      const dinoY = groundY - activeDinoSprite.height;
      ctx.drawImage(activeDinoSprite, dinoX, dinoY);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [customWidth, customHeight, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative select-none pointer-events-auto overflow-hidden ${className}`}
      style={{
        height: `${customHeight}px`,
        imageRendering: 'pixelated',
      }}
      aria-label="Decorative animated pixel-art dinosaur landscape"
      role="img"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full bg-transparent"
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default PixelDinoScene;
