import { useEffect, useRef } from 'react';
import Lightfall from '../../react-src/Lightfall.jsx';
import './DetailAtmosphere.css';

export const GALLERY_ASCII_OPTIONS = {
  colors: ['#0B0F12', '#173238', '#78CFC5', '#C8B285'],
  shape: 'horizon',
  characters: ' =+xX0S8#@',
  cellSize: 20,
  density: 0.46,
  glyphOpacity: 0.34,
  gradientOpacity: 0.2,
  glow: 0.08,
  depthOfField: 0.38,
  flicker: 0.08,
  softness: 0.72,
  scale: 1.08,
  flow: 0.32,
  speed: 0.18,
  grain: 0.025,
  variation: 3,
  mouseInteraction: false,
  clickEffect: 'none',
  intro: true,
  lightMode: false,
  fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
};

export const AWARDS_LIGHTFALL_PROPS = {
  colors: ['#78CFC5', '#C8B285'],
  backgroundColor: '#78CFC5',
  speed: 0.22,
  streakCount: 2,
  streakWidth: 0.58,
  streakLength: 0.82,
  glow: 0.55,
  density: 0.48,
  twinkle: 0.16,
  zoom: 3.4,
  backgroundGlow: 0.055,
  headGlow: 0.22,
  depth: 0.78,
  bloom: 0.16,
  opacity: 0.42,
  mouseInteraction: true,
  mouseStrength: 0.12,
  mouseRadius: 0.38,
  mouseDampening: 0.24,
  lens: 0.18,
  holdToWarp: false,
  intro: true,
  fade: 0.72,
  lightMode: false,
  paused: false
};

const useAtmosphereHost = (ref, variant) => {
  useEffect(() => {
    const host = ref.current?.closest('section') || ref.current?.parentElement;
    if (!host) return undefined;
    host.classList.add('da-atmosphere-host', `da-${variant}-host`);
    return () => {
      host.classList.remove('da-atmosphere-host', `da-${variant}-host`);
    };
  }, [ref, variant]);
};

export const GalleryAtmosphere = ({
  options = GALLERY_ASCII_OPTIONS,
  paused = false,
  className = '',
  style
}) => {
  const rootRef = useRef(null);
  const effectRef = useRef(null);
  const asciiRef = useRef(null);
  const settingsRef = useRef(null);
  settingsRef.current = {
    ...options,
    speed: paused ? 0 : options.speed,
    mouseInteraction: paused ? false : options.mouseInteraction
  };
  useAtmosphereHost(rootRef, 'gallery');

  useEffect(() => {
    const element = effectRef.current;
    const api = window.LZY?.Comp?.GradientASCII;
    if (!element || !api?.init) {
      if (element) element.dataset.effect = 'unavailable';
      console.warn('[DetailAtmosphere] GradientASCII 未加载，#gallery 保留原始背景。');
      return undefined;
    }
    asciiRef.current = api.init(element, settingsRef.current);
    element.dataset.effect = element.querySelector('.cz-ascii__canvas') ? 'ready' : 'unavailable';
    return () => {
      asciiRef.current?.destroy();
      asciiRef.current = null;
      delete element.dataset.effect;
    };
  }, []);

  useEffect(() => {
    asciiRef.current?.setOptions(settingsRef.current);
  });

  return (
    <div
      ref={rootRef}
      className={`da-atmosphere da-gallery-atmosphere${className ? ` ${className}` : ''}`}
      style={style}
      aria-hidden="true"
    >
      <div ref={effectRef} className="da-effect" />
      <div className="da-text-mask" />
    </div>
  );
};

export const AwardsAtmosphere = ({
  lightfallProps = AWARDS_LIGHTFALL_PROPS,
  paused = false,
  className = '',
  style
}) => {
  const rootRef = useRef(null);
  useAtmosphereHost(rootRef, 'awards');

  return (
    <div
      ref={rootRef}
      className={`da-atmosphere da-awards-atmosphere${className ? ` ${className}` : ''}`}
      style={style}
      aria-hidden="true"
    >
      <div className="da-effect">
        <Lightfall {...lightfallProps} paused={paused || lightfallProps.paused} />
      </div>
      <div className="da-text-mask" />
    </div>
  );
};

const DetailAtmosphere = ({ variant = 'gallery', ...props }) =>
  variant === 'awards' ? <AwardsAtmosphere {...props} /> : <GalleryAtmosphere {...props} />;

export default DetailAtmosphere;
