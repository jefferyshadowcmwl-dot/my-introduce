import { isValidElement, useEffect, useId, useMemo, useRef, useState } from 'react';
import GridMotion from './GridMotion.jsx';
import ChromaGallery from './ChromaGallery.jsx';
import '../components/drift-gallery/drift-gallery.css';

const Photo = ({ item, drifting = false }) => (
  <button
    type="button"
    className="drift-gallery__photo"
    tabIndex={drifting ? -1 : 0}
    aria-label={`查看大图：${item.caption || item.alt || item.imgId}`}
    onClick={() => window.openLightbox(item.imgId, item.caption || item.alt || '')}
  >
    <img src={item.src} alt={item.alt || item.caption || ''} loading="lazy" decoding="async" draggable={false} />
    {!drifting && item.caption && <span className="drift-gallery__caption">{item.caption}</span>}
  </button>
);

const DriftGallery = ({ items = [], className = '', ...options }) => {
  const [expanded, setExpanded] = useState(false);
  const [catalog, setCatalog] = useState(() => window.LZY_CHROMA_ITEMS || items);
  const toggleRef = useRef(null);
  const panelId = useId();
  useEffect(() => {
    const update = event => setCatalog(event.detail?.items || window.LZY_CHROMA_ITEMS || items);
    setCatalog(window.LZY_CHROMA_ITEMS || items);
    window.addEventListener('lzy:chroma-ready', update);
    return () => window.removeEventListener('lzy:chroma-ready', update);
  }, [items]);
  const tiles = useMemo(() => items.map((item, index) => (
    !isValidElement(item) && item && typeof item === 'object' && typeof item.src === 'string'
      ? <Photo key={item.imgId ?? index} item={item} drifting />
      : item
  )), [items]);

  return (
    <div className={`drift-gallery${className ? ` ${className}` : ''}`}>
      <div className="drift-gallery__wall" role="group" aria-label="漂移照片墙，完整键盘浏览请使用下方相册">
        <GridMotion
          rows={4}
          angle={-7}
          tilt={0}
          dim={0}
          grayscale={false}
          spotlight={0}
          fade={0.12}
          tileColor="transparent"
          {...options}
          items={tiles}
        />
      </div>
      <section className="drift-gallery__browse" aria-label="完整相册" onKeyDown={event => {
        if (event.key === 'Escape' && expanded) {
          event.preventDefault();
          event.stopPropagation();
          setExpanded(false);
          toggleRef.current?.focus();
        }
      }}>
        <button ref={toggleRef} className="drift-gallery__browse-toggle" type="button" aria-expanded={expanded} aria-controls={panelId}
          onClick={() => setExpanded(open => !open)}>
          <span>{expanded ? '收起全部照片' : '查看全部照片'}<small>{catalog.length} 张履历影像</small></span>
          <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
        <div id={panelId} hidden={!expanded}>
          {expanded && <ChromaGallery items={catalog} />}
        </div>
      </section>
    </div>
  );
};

export default DriftGallery;
