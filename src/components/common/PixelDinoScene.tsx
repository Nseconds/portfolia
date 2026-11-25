import React, { useEffect, useRef, useState } from 'react';

interface PixelDinoSceneProps {
  className?: string;
  height?: number;
}

// ---------------------------------------------------------------------------
// Monochrome Pixel-Art Bitmaps (1 = colored pixel, 0 = transparent)
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

// Curious look frame (head slightly tilted up on hover interaction)
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

// Cacti variations
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
  // Tall / branched cactus
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

// Outline cloud (classic Chrome offline cloud silhouette with transparent interior)
const CLOUD_OUTLINE = [
  '.......######.......',
  '.....##......##.....',
  '...##..........##...',
  '..#..............#..',
  '.#................#.',
  '#..................#',
  '####################',
];

// Yellow pixel sun (matching reference screenshot)
const PIXEL_SUN = [
  '..####..',
  '.######.',
  '########',
  '########',
  '########',
  '########',
  '.######.',
  '..####..',
];

// Distant low mountain / hill silhouettes on horizon
const PIXEL_HILLS = [
  [
    '.......#.......',
    '......###......',
    '.....#####.....',
    '....#######....',
    '...#########...',
    '..###########..',
    '.#############.',
    '###############',
  ],
  [
    '.......#...............',
    '......###.........#....',
    '.....#####.......###...',
    '....#######.....#####..',
    '...#########...#######.',
    '..###########.#########',
    '.######################',
    '#######################',
  ],
];

// Pixel bird (Pterodactyl) flapping frames
const BIRD_FRAMES = [
  // Wings up
  [
    '.....#......',
    '....###.....',
    '...#####....',
    '..#######...',
    '.#########..',
    '##.######.##',
    '...######...',
    '.....##.....',
  ],
  // Wings down
  [
    '.....##.....',
    '...######...',
    '##.######.##',
    '.#########..',
    '..#######...',
    '...#####....',
    '....###.....',
    '.....#......',
  ],
];

export const PixelDinoScene: React.FC<PixelDinoSceneProps> = ({
  className = '',
  height = 160,
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

    const PIXEL_SCALE = 2; // 2x2 physical pixels per sprite pixel
    const COLOR_INK = '#181511'; // Portfolio ink black
    const COLOR_CLOUD = 'rgba(24, 21, 17, 0.55)'; // Charcoal outline cloud
    const COLOR_SUN = '#F7C948'; // Portfolio yellow accent
    const COLOR_HILL = 'rgba(24, 21, 17, 0.16)'; // Faint horizon hills
    const COLOR_GROUND = 'rgba(24, 21, 17, 0.45)'; // Ground line

    let width = container.clientWidth || 550;
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

    // Pre-render sprite sheets once for 60fps performance
    const dinoSprites = [
      createOffscreen(DINO_FRAMES[0], COLOR_INK),
      createOffscreen(DINO_FRAMES[1], COLOR_INK),
      createOffscreen(DINO_FRAMES[2], COLOR_INK),
      createOffscreen(DINO_CURIOUS, COLOR_INK),
    ];

    const cactusSprites = CACTUS_VARIATIONS.map((c) => createOffscreen(c, COLOR_INK));
    const cloudSprite = createOffscreen(CLOUD_OUTLINE, COLOR_CLOUD);
    const sunSprite = createOffscreen(PIXEL_SUN, COLOR_SUN);
    const hillSprites = PIXEL_HILLS.map((h) => createOffscreen(h, COLOR_HILL));
    const birdSprites = BIRD_FRAMES.map((b) => createOffscreen(b, COLOR_INK));

    // Ground position near the bottom of the visual
    const groundY = height - 20;

    // Dino X position (more breathing room on desktop, compact on mobile)
    const dinoX = width > 640 ? 110 : 44;

    // Desert state objects
    const groundMarks = Array.from({ length: 24 }, (_, i) => ({
      x: (i * (width + 100)) / 24 + Math.random() * 12,
      width: Math.random() > 0.5 ? 4 : 2,
    }));

    // Clouds drifting across the wide canvas
    const clouds = [
      { x: 20, y: 12, speed: 7 },
      { x: 170, y: 32, speed: 10 },
      { x: 340, y: 14, speed: 6 },
      { x: 490, y: 26, speed: 8 },
    ];

    // Distant horizon hills
    const hills = [
      { x: width * 0.42, type: 0, speed: 5 },
      { x: width * 0.74, type: 1, speed: 5 },
    ];

    // Cacti passing on ground (initial positions match reference visual composition)
    const cacti = [
      { x: dinoX - 26, type: 0 },
      { x: width * 0.58, type: 1 },
    ];

    // Pterodactyl flying across sky (initially active matching reference)
    const bird = {
      active: true,
      x: 160,
      y: 24,
      speed: 30,
      flapFrame: 0,
      nextSpawnTime: 0,
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 550;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop State
    let animationFrameId: number;
    let lastTime = performance.now();
    let walkTimer = 0;
    let walkFrameIndex = 0;
    let birdFlapTimer = 0;
    let isVisible = true;

    // Viewport IntersectionObserver: pause when off-screen (0% CPU)
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

      // Slow, calm stroll speed: 22 px/sec
      const scrollSpeed = 22;

      // 1. Draw Sun in the upper-right area
      const sunX = Math.round(width - 70);
      const sunY = 14;
      ctx.drawImage(sunSprite, sunX, sunY);

      // 2. Update & Draw Clouds (subtle parallax shift on hover)
      const parallaxShift = isHovered ? (mousePosRef.current.x / width - 0.5) * 8 : 0;
      clouds.forEach((cloud) => {
        if (!prefersReducedMotion) {
          cloud.x -= cloud.speed * dt;
          if (cloud.x < -cloudSprite.width) {
            cloud.x = width + Math.random() * 50;
            cloud.y = 12 + Math.random() * 26;
          }
        }
        ctx.drawImage(cloudSprite, Math.round(cloud.x + parallaxShift), Math.round(cloud.y));
      });

      // 3. Draw Distant Horizon Hills
      hills.forEach((hill) => {
        const sprite = hillSprites[hill.type % hillSprites.length];
        if (!prefersReducedMotion) {
          hill.x -= hill.speed * dt;
          if (hill.x < -sprite.width) {
            hill.x = width + Math.random() * 80;
          }
        }
        ctx.drawImage(sprite, Math.round(hill.x), Math.round(groundY - sprite.height + 1));
      });

      // 4. Draw Ground Line
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
            mark.x = width + Math.random() * 25;
          }
        }
        ctx.fillRect(Math.round(mark.x), groundY + 3, mark.width * PIXEL_SCALE, PIXEL_SCALE);
      });

      // 5. Update & Draw Cacti
      cacti.forEach((cactus) => {
        const sprite = cactusSprites[cactus.type % cactusSprites.length];
        if (!prefersReducedMotion) {
          cactus.x -= scrollSpeed * dt;
          if (cactus.x < -sprite.width) {
            cactus.x = width + 120 + Math.random() * 260;
            cactus.type = Math.floor(Math.random() * cactusSprites.length);
          }
        }
        ctx.drawImage(sprite, Math.round(cactus.x), Math.round(groundY - sprite.height));
      });

      // 6. Update & Draw Bird
      if (!prefersReducedMotion) {
        if (!bird.active && now > bird.nextSpawnTime) {
          bird.active = true;
          bird.x = width + 40;
          bird.y = 22 + Math.random() * 20;
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
            bird.nextSpawnTime = now + 15000 + Math.random() * 15000;
          }
        }
      }

      // 7. Draw Dinosaur
      // Positioned with breathing room from the heading on desktop, compact on mobile
      const dinoDrawX = width > 640 ? 110 : 44;
      let activeDinoSprite: HTMLCanvasElement;

      if (prefersReducedMotion) {
        activeDinoSprite = dinoSprites[1]; // Standing static
      } else if (isHovered) {
        activeDinoSprite = dinoSprites[3]; // Curious head up on hover
      } else {
        walkTimer += dt;
        if (walkTimer > 0.18) {
          walkFrameIndex = (walkFrameIndex + 1) % 4;
          walkTimer = 0;
        }
        const frameMap = [0, 1, 2, 1];
        activeDinoSprite = dinoSprites[frameMap[walkFrameIndex]];
      }

      const dinoY = groundY - activeDinoSprite.height;
      ctx.drawImage(activeDinoSprite, dinoDrawX, dinoY);

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
  }, [height, isHovered]);

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
        height: `${height}px`,
        imageRendering: 'pixelated',
      }}
      aria-label="Decorative animated pixel-art desert scene"
      role="img"
    >
      <canvas
        ref={canvasRef}
        className="block bg-transparent w-full"
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default PixelDinoScene;
