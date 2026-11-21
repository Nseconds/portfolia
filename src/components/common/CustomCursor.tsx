import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export type CursorMode = 'default' | 'hover' | 'view' | 'open' | 'explore';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect if device has touch capability (disable cursor on mobile/touch)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="view"]');
      const actionButton = target.closest('[data-cursor="open"]');
      const imageTarget = target.closest('[data-cursor="explore"]');
      const link = target.closest('a, button, [role="button"]');

      if (projectCard) {
        setCursorMode('view');
      } else if (imageTarget) {
        setCursorMode('explore');
      } else if (actionButton) {
        setCursorMode('open');
      } else if (link) {
        setCursorMode('hover');
      } else {
        setCursorMode('default');
      }
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', checkHoverTarget);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', checkHoverTarget);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isTextMode = cursorMode === 'view' || cursorMode === 'open' || cursorMode === 'explore';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Dynamic Cursor Pill / Circle */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center font-mono font-bold text-xs uppercase"
        animate={{
          x: mousePosition.x - (isTextMode ? 32 : cursorMode === 'hover' ? 18 : 8),
          y: mousePosition.y - (isTextMode ? 32 : cursorMode === 'hover' ? 18 : 8),
          width: isTextMode ? 64 : cursorMode === 'hover' ? 36 : 16,
          height: isTextMode ? 64 : cursorMode === 'hover' ? 36 : 16,
          backgroundColor:
            cursorMode === 'view'
              ? '#f7c948'
              : cursorMode === 'open'
              ? '#ff4d8d'
              : cursorMode === 'explore'
              ? '#9de5c1'
              : cursorMode === 'hover'
              ? 'rgba(24, 21, 17, 0.15)'
              : '#181511',
          color: cursorMode === 'view' || cursorMode === 'explore' ? '#181511' : cursorMode === 'open' ? '#ffffff' : '#181511',
          borderWidth: cursorMode === 'hover' ? 2 : isTextMode ? 2 : 0,
          borderColor: '#181511',
          borderRadius: 9999,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 380,
          mass: 0.25,
        }}
      >
        {cursorMode === 'view' && <span>VIEW</span>}
        {cursorMode === 'open' && <span>OPEN</span>}
        {cursorMode === 'explore' && <span>EXPLORE</span>}
      </motion.div>
    </div>
  );
};

