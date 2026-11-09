import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import GhostFibers from './GhostFibers.jsx';
import LightTunnel from './LightTunnel.jsx';
import GridMotion from './GridMotion.jsx';
import DriftGallery from './DriftGallery.jsx';
import ContactLaunch from './ContactLaunch.jsx';
import DetailAtmosphere from '../components/detail-atmosphere/DetailAtmosphere.jsx';

const lanyardDefaults = {
  frontImage: 'assets/liuzhiyuan.jpg',
  backImage: 'assets/lzy-badge-back.png',
  finish: 'glossy',
  metal: 'gold',
  strapColor: '#20282a',
  anchor: 'center'
};

const ghostFibersDefaults = {
  glowColor: '#78CFC5',
  secondaryColor: '#C8B285',
  layers: 3,
  fiberStyle: 'lines',
  depthOfField: 0.85,
  particles: 0.35
};

const mountComponent = (Component, defaults, el, options = {}) => {
  if (!el || el.nodeType !== 1) throw new TypeError('A DOM element is required.');
  const root = createRoot(el);
  let currentOptions = { ...defaults, ...options };
  let mounted = true;
  const render = () => {
    if (mounted) root.render(<Component {...currentOptions} />);
  };
  const handle = {
    setOptions(nextOptions = {}) {
      currentOptions = { ...currentOptions, ...nextOptions };
      render();
      return handle;
    },
    unmount() {
      if (!mounted) return;
      mounted = false;
      root.unmount();
    }
  };
  render();
  return handle;
};

export const mountLanyard = (el, options) => mountComponent(Lanyard, lanyardDefaults, el, options);
export const mountGhostFibers = (el, options) =>
  mountComponent(GhostFibers, ghostFibersDefaults, el, options);
export const mountLightTunnel = (el, options = {}) =>
  mountComponent(LightTunnel, {
    cableColor: '#DDF8F3', pulseColor: '#C8B285', tunnelColor: '#78CFC5',
    tunnelOpacity: 0.12, speed: 0.16, flowDirection: 'inward', opacity: 0.72,
    mouseStrength: 0.08, clickSurge: true, intro: true
  }, el, options);
export const mountDetailAtmosphere = (el, variant = 'gallery', options = {}) =>
  mountComponent(DetailAtmosphere, { variant }, el, options);

export const mountGridMotion = (el, options = {}) =>
  mountComponent(GridMotion, {}, el, options);
export const mountDriftGallery = (el, options = {}) =>
  mountComponent(DriftGallery, {}, el, options);

export const mountContactLaunch = (el, options = {}) =>
  mountComponent(ContactLaunch, {}, el, options);

window.LZYReact = Object.assign(window.LZYReact || {}, {
  mountLanyard, mountGhostFibers, mountLightTunnel, mountDetailAtmosphere,
  mountGridMotion, mountDriftGallery, mountContactLaunch
});
