import React, { useEffect, useRef, useState } from 'react';

interface PixelDinoSceneProps {
  className?: string;
  width?: number;
  height?: number;
}

// ---------------------------------------------------------------------------
// Monochrome Pixel-Art Bitmaps (1 = dark pixel, 0 = transparent)
// ---------------------------------------------------------------------------

const DINO_FRAMES = [
  // Frame 0: Left leg step
  [
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
  ],
  // Frame 1: Standing / Neutral
  [
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
  ],
  // Frame 2: Right leg step
  [
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
  ],
];

// Curious look frame (head tilted up slightly for subtle hover reaction)
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

const CACTUS_VARIATIONS = [
  // Small single cactus
  [
    '..###..',
    '..###..',
    '#.###.#',
    '#.###.#',
    '#.###.#',
    '#####.#',
    '..#####',
    '..###..',
    '..###..',
    '..###..',
    '..###..',
    '..###..',
  ],
  // Double cactus
  [
    '..###.......###..',
    '..###.......###..',
    '#.###.#...#.###.#',
    '#.###.#...#.###.#',
    '#.###.#...#.###.#',
    '#####.#...#####.#',
    '..#####.....#####',
    '..###.........###',
    '..###.........###',
    '..###.........###',
    '..###.........###',
    '..###.........###',
    '..###.........###',
  ],
  // Tall cactus
  [
    '..###........',
    '..###........',
    '#.###.#......',
    '#.###.#.###..',
    '#.###.#.###..',
    '#####.#.###.#',
    '..#####.###.#',
    '..###...#####',
    '..###.....###',
    '..###.....###',
    '..###.....###',
    '..###.....###',
    '..###.....###',
    '..###.....###',
  ],
];

const CLOUD_BITMAP = [
  '......#####.....',
  '....#########...',
  '..#############.',
  '.###############',
  '################',
  '################',
];

const BIRD_FRAMES = [
  // Wing up
  [
    '....#.......',
    '...###......',
    '..#####.....',
    '.#######....',
    '###.#####.##',
    '..#########.',
    '....#####...',
    '.....###....',
  ],
  // Wing down
  [
    '.....###....',
    '....#####...',
    '..#########.',
    '###.#####.##',
    '.#######....',
    '..#####.....',
    '...###......',
    '....#.......',
  ],
];

export const PixelDinoScene: React.FC<PixelDinoSceneProps> = ({
  className = '',
  width: customWidth,
  height: customHeight = 140,
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

    const PIXEL_SCALE = 2; // Each sprite pixel = 2x2 physical pixels
    const COLOR_PRIMARY = '#181511'; // Portfolio ink black
    const COLOR_SECONDARY = 'rgba(24, 21, 17, 0.28)'; // Soft cloud grey
    const COLOR_GROUND = 'rgba(24, 21, 17, 0.45)'; // Ground line charcoal

    let width = customWidth || container.clientWidth || 440;
    const height = customHeight;
    let dpr = window.devicePixelRatio || 1;

    // Helper: Create offscreen canvas for a sprite bitmap
    const createOffscreen = (bitmap: string[], color: string): HTMLCanvasElement => {
      const oc = document.createElement('canvas');
      const rows = bitmap.length;
      const cols = bitmap[0].length;
      oc.width = cols * PIXEL_SCALE;
      oc.height = rows * PIXEL_SCALE;
      const octx = oc.getContext('2d');
      if (octx) {
        octx.fillStyle = color;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (bitmap[r][c] === '#') {
              octx.fillRect(c * PIXEL_SCALE, r * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
            }
          }
        }
      }
      return oc;
    };

    // Pre-render sprite sheets once
    const dinoSprites = [
      createOffscreen(DINO_FRAMES[0], COLOR_PRIMARY),
      createOffscreen(DINO_FRAMES[1], COLOR_PRIMARY),
      createOffscreen(DINO_FRAMES[2], COLOR_PRIMARY),
      createOffscreen(DINO_CURIOUS, COLOR_PRIMARY),
    ];

    const cactusSprites = CACTUS_VARIATIONS.map((c) => createOffscreen(c, COLOR_PRIMARY));
    const cloudSprite = createOffscreen(CLOUD_BITMAP, COLOR_SECONDARY);
    const birdSprites = BIRD_FRAMES.map((b) => createOffscreen(b, COLOR_PRIMARY));

    // Ground position
    const groundY = height - 22;

    // Desert state objects
    const groundMarks = Array.from({ length: 18 }, (_, i) => ({
      x: (i * (width + 60)) / 18 + Math.random() * 10,
      width: Math.random() > 0.5 ? 4 : 2,
    }));

    const clouds = [
      { x: 30, y: 18, speed: 7 },
      { x: 210, y: 32, speed: 10 },
      { x: 380, y: 14, speed: 6 },
    ];

    const cacti = [
      { x: width + 60, type: 0 },
      { x: width + 320, type: 1 },
    ];

    // Rare bird flyer
    const bird = {
      active: false,
      x: width + 50,
      y: 28,
      speed: 36,
      flapFrame: 0,
      nextSpawnTime: performance.now() + 6000,
    };

    const handleResize = () => {
      if (!container) return;
      width = customWidth || container.clientWidth || 440;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop Variables
    let animationFrameId: number;
    let lastTime = performance.now();
    let walkTimer = 0;
    let walkFrameIndex = 0;
    let birdFlapTimer = 0;
    let isVisible = true;

    // Viewport IntersectionObserver to pause loop when scrolled away (0% CPU)
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // -------------------------------------------------------------------------
    // Render Frame Function
    // -------------------------------------------------------------------------
    const render = (now: number) => {
      const dt = Math.min(100, now - lastTime) / 1000; // Delta time in seconds
      lastTime = now;

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Speed of desert movement (calm, slow leisurely stroll: 22 px/sec)
      const scrollSpeed = 22;

      // 1. Update Clouds (gentle slow parallax)
      const parallaxShift = isHovered ? (mousePosRef.current.x / width - 0.5) * 6 : 0;
      clouds.forEach((cloud) => {
        if (!prefersReducedMotion) {
          cloud.x -= cloud.speed * dt;
          if (cloud.x < -cloudSprite.width) {
            cloud.x = width + Math.random() * 40;
            cloud.y = 12 + Math.random() * 24;
          }
        }
        ctx.drawImage(cloudSprite, Math.round(cloud.x + parallaxShift), Math.round(cloud.y));
      });

      // 2. Draw Ground Line & Imperfections
      ctx.strokeStyle = COLOR_GROUND;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 0.5);
      ctx.lineTo(width, groundY + 0.5);
      ctx.stroke();

      // Scrolling ground marks (tiny pixel pebbles / dashes)
      ctx.fillStyle = COLOR_GROUND;
      groundMarks.forEach((mark) => {
        if (!prefersReducedMotion) {
          mark.x -= scrollSpeed * dt;
          if (mark.x < -10) {
            mark.x = width + Math.random() * 20;
          }
        }
        ctx.fillRect(Math.round(mark.x), groundY + 3, mark.width * PIXEL_SCALE, PIXEL_SCALE);
      });

      // 3. Update & Draw Cacti
      cacti.forEach((cactus) => {
        const sprite = cactusSprites[cactus.type % cactusSprites.length];
        if (!prefersReducedMotion) {
          cactus.x -= scrollSpeed * dt;
          if (cactus.x < -sprite.width) {
            // Respawn with generous spacing so desert remains empty and calm
            cactus.x = width + 140 + Math.random() * 240;
            cactus.type = Math.floor(Math.random() * cactusSprites.length);
          }
        }
        ctx.drawImage(sprite, Math.round(cactus.x), Math.round(groundY - sprite.height));
      });

      // 4. Update & Draw Bird (Occasional ambient visitor)
      if (!prefersReducedMotion) {
        if (!bird.active && now > bird.nextSpawnTime) {
          bird.active = true;
          bird.x = width + 30;
          bird.y = 20 + Math.random() * 25;
        }

        if (bird.active) {
          bird.x -= bird.speed * dt;
          birdFlapTimer += dt;
          if (birdFlapTimer > 0.22) {
            bird.flapFrame = (bird.flapFrame + 1) % 2;
            birdFlapTimer = 0;
          }

          const birdSprite = birdSprites[bird.flapFrame];
          ctx.drawImage(birdSprite, Math.round(bird.x), Math.round(bird.y));

          if (bird.x < -40) {
            bird.active = false;
            bird.nextSpawnTime = now + 16000 + Math.random() * 14000; // Next bird in 16–30s
          }
        }
      }

      // 5. Draw Dinosaur
      // Dino stands at fixed horizontal position (x = 36px)
      const dinoX = 36;
      let activeDinoSprite: HTMLCanvasElement;

      if (prefersReducedMotion) {
        activeDinoSprite = dinoSprites[1]; // Standing
      } else if (isHovered) {
        // Curious head-up posture when user hovers near
        activeDinoSprite = dinoSprites[3];
      } else {
        walkTimer += dt;
        if (walkTimer > 0.18) {
          // Walking cycle: Frame 0 -> Frame 1 -> Frame 2 -> Frame 1
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

    // Initial render
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
      aria-label="Decorative animated pixel-art dinosaur illustration"
      role="img"
    >
      <canvas
        ref={canvasRef}
        className="block bg-transparent"
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default PixelDinoScene;
