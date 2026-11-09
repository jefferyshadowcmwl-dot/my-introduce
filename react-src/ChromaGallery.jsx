'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import BranchedMenu from './BranchedMenu.jsx';
import './ChromaGallery.css';

const THEMES = {
  dark: {
    '--chroma-frame': 'rgba(17, 24, 28, 0.66)',
    '--chroma-frame-edge': 'rgba(255, 255, 255, 0.08)',
    '--chroma-frame-highlight': 'rgba(255, 255, 255, 0.07)',
    '--chroma-frame-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
    '--chroma-tile': 'linear-gradient(180deg, #1d292d 0%, #131b20 100%)',
    '--chroma-tile-edge': 'rgba(255, 255, 255, 0.07)',
    '--chroma-tile-highlight': 'rgba(255, 255, 255, 0.12)',
    '--chroma-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.7)',
    '--chroma-media-edge': 'rgba(255, 255, 255, 0.06)',
    '--chroma-well': 'rgba(255, 255, 255, 0.08)',
    '--chroma-ink': '#f4f4f5',
    '--chroma-muted': 'rgba(244, 244, 245, 0.55)',
    '--chroma-hover': 'brightness(1.12)',
    '--chroma-press': 'brightness(0.85)'
  },
  light: {
    '--chroma-frame': 'rgba(240, 240, 243, 0.8)',
    '--chroma-frame-edge': 'rgba(24, 24, 27, 0.07)',
    '--chroma-frame-highlight': 'rgba(255, 255, 255, 0.95)',
    '--chroma-frame-shadow': '0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)',
    '--chroma-tile': 'linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)',
    '--chroma-tile-edge': 'rgba(24, 24, 27, 0.08)',
    '--chroma-tile-highlight': 'rgba(255, 255, 255, 1)',
    '--chroma-tile-shadow': '0 4px 10px -5px rgba(24, 24, 27, 0.25)',
    '--chroma-media-edge': 'rgba(24, 24, 27, 0.06)',
    '--chroma-well': 'rgba(24, 24, 27, 0.05)',
    '--chroma-ink': '#27272a',
    '--chroma-muted': 'rgba(39, 39, 42, 0.55)',
    '--chroma-hover': 'brightness(0.97)',
    '--chroma-press': 'brightness(0.92)'
  }
};

const DEFAULT_ITEMS = [];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const falloffStops = softness => {
  const core = clamp(1 - softness, 0, 0.95);
  const stops = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const u = clamp((t - core) / Math.max(0.0001, 1 - core), 0, 1);
    const alpha = 1 - u * u * u * (u * (u * 6 - 15) + 10);
    stops.push(`rgba(0, 0, 0, ${alpha.toFixed(3)}) ${(t * 100).toFixed(1)}%`);
  }
  return stops.join(', ');
};

export const ChromaGrid = ({
  items,
  columns = 3,
  minCardWidth = 180,
  gap = 12,
  radius = 260,
  softness = 0.6,
  damping = 0.45,
  fadeOut = 0.6,
  grayscale = 1,
  dim = 0.12,
  glow = 0.5,
  borderGlow = 1,
  reveal = 'spotlight',
  aspectRatio = '3 / 2',
  cardRadius = 22,
  showInfo = true,
  frame = false,
  theme = 'dark',
  className = '',
  onOpen = item => window.openLightbox(item.imgId || item.id, item.caption || item.title)
}) => {
  const rootRef = useRef(null);
  const settingsRef = useRef(null);
  const placeRef = useRef(null);
  const data = items?.length ? items : DEFAULT_ITEMS;
  settingsRef.current = { damping, fadeOut, spotlight: reveal !== 'card' };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const state = { x: 0, y: 0, tx: 0, ty: 0, power: 0, target: 0, primed: false };
    let raf = 0;
    let last = 0;

    const place = () => {
      const box = root.getBoundingClientRect();
      root.querySelectorAll('[data-chroma-area]').forEach(node => {
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--chroma-ox', `${rect.left - box.left}px`);
        node.style.setProperty('--chroma-oy', `${rect.top - box.top}px`);
      });
    };
    placeRef.current = place;

    const frame = now => {
      raf = 0;
      const s = settingsRef.current;
      if (!s) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const follow = reduce ? 1 : 1 - Math.exp(-dt / Math.max(0.01, s.damping * 0.32));
      state.x += (state.tx - state.x) * follow;
      state.y += (state.ty - state.y) * follow;
      const span = state.target > state.power ? 0.1 : Math.max(0.02, s.fadeOut * 0.35);
      state.power += (state.target - state.power) * (reduce ? 1 : 1 - Math.exp(-dt / span));
      root.style.setProperty('--chroma-x', `${state.x.toFixed(2)}px`);
      root.style.setProperty('--chroma-y', `${state.y.toFixed(2)}px`);
      root.style.setProperty('--chroma-power', state.power.toFixed(4));
      const settled =
        Math.abs(state.tx - state.x) < 0.1 &&
        Math.abs(state.ty - state.y) < 0.1 &&
        Math.abs(state.target - state.power) < 0.002;
      if (settled) {
        state.power = state.target;
        root.style.setProperty('--chroma-power', state.power.toFixed(4));
        last = 0;
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = event => {
      if (!settingsRef.current?.spotlight || event.pointerType === 'touch') return;
      const box = root.getBoundingClientRect();
      state.tx = event.clientX - box.left;
      state.ty = event.clientY - box.top;
      if (!state.primed || state.power < 0.02) {
        state.x = state.tx;
        state.y = state.ty;
        state.primed = true;
      }
      state.target = 1;
      wake();
    };

    const onLeave = () => {
      state.target = 0;
      wake();
    };

    const resizeObserver = new ResizeObserver(place);
    resizeObserver.observe(root);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerdown', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointercancel', onLeave);
    place();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerdown', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointercancel', onLeave);
      placeRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    placeRef.current?.();
  });

  const rootStyle = {
    ...(THEMES[theme] ?? THEMES.dark),
    '--chroma-cols': Math.max(1, Math.round(columns)),
    '--chroma-min': `${Math.max(80, minCardWidth)}px`,
    '--chroma-gap': `${Math.max(0, gap)}px`,
    '--chroma-r': `${Math.max(20, radius)}px`,
    '--chroma-stops': falloffStops(clamp(softness, 0, 1)),
    '--chroma-gray': clamp(grayscale, 0, 1),
    '--chroma-dim': clamp(dim, 0, 0.9),
    '--chroma-glow': clamp(glow, 0, 1),
    '--chroma-border': clamp(borderGlow, 0, 1),
    '--chroma-fade': `${Math.max(0, fadeOut)}s`,
    '--chroma-ratio': aspectRatio,
    '--chroma-radius': `${Math.max(0, cardRadius)}px`
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid${frame ? ' has-frame' : ''}${className ? ` ${className}` : ''}`}
      data-reveal={reveal === 'card' ? 'card' : 'spotlight'}
      style={rootStyle}
    >
      <div className="chroma-grid-inner">
        {data.map((item, index) => {
          const accent = item.accent ?? item.borderColor ?? '#ffffff';
          const key = item.imgId || item.id || `${item.title}-${index}`;
          const cardStyle = { '--chroma-accent': accent };
          const body = (
            <>
              <span className="chroma-wash" aria-hidden="true" />
              <div className="chroma-media" data-chroma-area="">
                <img className="chroma-mono" src={item.image || item.src} alt={item.alt ?? item.title ?? ''} loading="lazy" />
                <img className="chroma-color" src={item.image || item.src} alt="" aria-hidden="true" loading="lazy" />
                <span className="chroma-media-rim" aria-hidden="true" />
              </div>
              {showInfo && (item.title || item.subtitle) && (
                <div className="chroma-info">
                  {item.title && <span className="chroma-title">{item.no && <b className="chroma-number">{item.no} · </b>}{item.title}</span>}
                  {item.subtitle && <span className="chroma-subtitle">{item.subtitle}</span>}
                </div>
              )}
              <span className="chroma-card-rim" aria-hidden="true" />
              <span className="chroma-card-glow" aria-hidden="true" />
            </>
          );
          return item.url ? (
            <a
              key={key}
              className="chroma-card"
              data-chroma-area=""
              style={cardStyle}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {body}
            </a>
          ) : (
            <button type="button" key={key} className="chroma-card" data-chroma-area="" data-img-id={item.imgId || item.id} style={cardStyle} title={item.caption || item.title} aria-label={`查看完整原图：${item.caption || item.title}`} aria-haspopup="dialog" onClick={() => onOpen(item)}>
              {body}
            </button>
          );
        })}
      </div>
      {frame && <span className="chroma-frame-rim" aria-hidden="true" />}
    </div>
  );
};

export const ChromaGallery = ({ items = [], onOpen, ...options }) => {
  const [category, setCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const filterRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = useId();
  const categories = [...new Map(items.map(item => [item.category || 'other', item.categoryLabel || item.category || '其他'])).entries()];
  const shown = category === 'all' ? items : items.filter(item => (item.category || 'other') === category);
  const label = category === 'all' ? '完整相册' : categories.find(([key]) => key === category)?.[1];
  const closeMenu = () => {
    setMenuOpen(false);
    filterRef.current?.focus();
  };
  useEffect(() => {
    if (menuOpen) menuRef.current?.querySelector('button')?.focus();
  }, [menuOpen]);
  return <section className="chroma-gallery" aria-label="全部履历照片">
    <div className="chroma-gallery-toolbar">
      <p className="chroma-gallery-count" role="status">{label} · {shown.length} / {items.length} 张</p>
      <button ref={filterRef} className="chroma-gallery-filter-toggle" type="button" aria-haspopup="menu" aria-expanded={menuOpen} aria-controls={menuId}
        onClick={() => setMenuOpen(open => !open)} onKeyDown={event => {
          if (event.key === 'ArrowDown') { event.preventDefault(); setMenuOpen(true); }
          if (event.key === 'Escape' && menuOpen) { event.preventDefault(); event.stopPropagation(); closeMenu(); }
        }}>分类筛选<span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
    </div>
    {menuOpen && <div ref={menuRef} id={menuId} className="chroma-gallery-menu">
      <BranchedMenu active={category} defaultOpen={1} items={[
        { value: 'all', label: `全部照片 · ${items.length}` },
        { label: '履历分类', children: categories.map(([value, label]) => ({ value, label, count: items.filter(item => (item.category || 'other') === value).length })) }
      ]} onSelect={value => setCategory(value)} onEscape={closeMenu} />
      <button type="button" className="chroma-gallery-menu-close" onClick={closeMenu}>收起分类</button>
    </div>}
    <p className="chroma-gallery-hint">点击照片查看完整原图 · 聚光浏览保留原分类色</p>
    <ChromaGrid columns={6} minCardWidth={110} gap={10} cardRadius={8} frame {...options} items={shown} onOpen={onOpen} />
  </section>;
};

export default ChromaGallery;
