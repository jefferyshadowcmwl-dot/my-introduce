'use client';

import { useId, useLayoutEffect, useRef, useState } from 'react';
import './BranchedMenu.css';

const PAD = 6;
const MARK = 16;
const toSet = open => new Set(Array.isArray(open) ? open : open >= 0 ? [open] : []);

export default function BranchedMenu({
  items = [], defaultOpen = 0, active = '', onSelect, onEscape,
  color = 'var(--ink, #f2f0ea)', accentColor = 'var(--cyan, #78cfc5)',
  lineColor = 'var(--line, #454549)', width = 320, rowHeight = 44,
  indent = 40, trunk = 14, radius = 10, lineWidth = 1.5,
  drawDuration = 400, foldDuration = 300, className = ''
}) {
  const [open, setOpen] = useState(() => toSet(defaultOpen));
  const id = useId();
  const navRef = useRef(null);
  const heads = useRef([]);
  const markerRef = useRef(null);
  const activeSection = items.findIndex(item => item.children?.some(kid => kid.value === active));
  const markerShown = activeSection >= 0 && open.has(activeSection);

  useLayoutEffect(() => {
    const place = () => {
      const marker = markerRef.current;
      const head = heads.current[activeSection];
      if (!marker) return;
      if (markerShown && head) marker.style.top = `${head.offsetTop + (head.offsetHeight - MARK) / 2}px`;
      marker.toggleAttribute('data-on', Boolean(markerShown && head));
    };
    place();
    const observer = new ResizeObserver(place);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [activeSection, markerShown, items]);

  const toggle = index => setOpen(previous => {
    const next = new Set(previous);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    return next;
  });
  const onKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onEscape?.();
      return;
    }
    const buttons = [...navRef.current.querySelectorAll('button')].filter(button => button.tabIndex >= 0);
    const index = buttons.indexOf(document.activeElement);
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % buttons.length;
    if (event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = buttons.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      buttons[next]?.focus();
    }
    const section = event.target.closest('[data-section]');
    if (!section) return;
    const sectionIndex = Number(section.dataset.section);
    if (event.key === 'ArrowLeft' && open.has(sectionIndex)) {
      event.preventDefault();
      toggle(sectionIndex);
      heads.current[sectionIndex]?.focus();
    }
    if (event.key === 'ArrowRight' && items[sectionIndex].children) {
      event.preventDefault();
      if (!open.has(sectionIndex)) toggle(sectionIndex);
      else section.querySelector('.branched-menu__item')?.focus();
    }
  };
  const r = Math.min(radius, rowHeight / 2 - 2);
  const endX = indent - 8;
  const rowY = k => PAD + k * rowHeight + rowHeight / 2;
  const branch = k => `M ${trunk} ${rowY(k) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(k)} H ${endX}`;
  const reach = k => `M ${trunk} 0 V ${rowY(k) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(k)} H ${endX}`;
  const length = k => rowY(k) - r + Math.PI * r / 2 + endX - trunk - r;

  return <nav ref={navRef} className={`branched-menu ${className}`} role="menu" aria-label="按照片分类筛选" onKeyDown={onKeyDown} style={{
    '--bm-w': `${width}px`, '--bm-ink': color, '--bm-accent': accentColor,
    '--bm-line': lineColor, '--bm-row': `${rowHeight}px`, '--bm-indent': `${indent}px`,
    '--bm-line-w': lineWidth, '--bm-draw': `${drawDuration}ms`, '--bm-fold': `${foldDuration}ms`
  }}>
    <span ref={markerRef} className="branched-menu__marker" aria-hidden="true" />
    {items.map((item, i) => {
      const kids = item.children;
      const isOpen = Boolean(kids && open.has(i));
      const bodyH = kids ? PAD * 2 + kids.length * rowHeight : 0;
      return <div key={item.value ?? item.label} role="none" data-section={i} className="branched-menu__section" data-open={isOpen ? '' : undefined}>
        <button ref={el => { heads.current[i] = el; }} type="button" className="branched-menu__head"
          role={kids ? 'menuitem' : 'menuitemradio'} aria-expanded={kids ? isOpen : undefined}
          aria-controls={kids ? `${id}-${i}` : undefined} aria-checked={kids ? undefined : item.value === active}
          data-active={!kids && item.value === active ? '' : undefined}
          onClick={() => kids ? toggle(i) : onSelect?.(item.value, item)}>
          <span>{item.label}</span><span aria-hidden="true">{kids ? isOpen ? '−' : '+' : item.value === active ? '✓' : ''}</span>
        </button>
        {kids && <div id={`${id}-${i}`} className="branched-menu__body" aria-hidden={!isOpen} inert={!isOpen}>
          <div className="branched-menu__fold">
            <div className="branched-menu__tree" role="group" aria-label={item.label} style={{ height: bodyH }}>
              <svg className="branched-menu__lines" width={indent} height={bodyH} aria-hidden="true">
                <path className="branched-menu__base" d={`M ${trunk} 0 V ${rowY(kids.length - 1) - r}`} />
                {kids.map((kid, k) => <path key={kid.value} className="branched-menu__base" d={branch(k)} />)}
                {kids.map((kid, k) => <path key={kid.value} className="branched-menu__reach" d={reach(k)} style={{ strokeDasharray: length(k), strokeDashoffset: kid.value === active ? 0 : length(k) }} />)}
              </svg>
              {kids.map(kid => <button key={kid.value} type="button" role="menuitemradio" aria-checked={kid.value === active}
                className="branched-menu__item" data-active={kid.value === active ? '' : undefined} tabIndex={isOpen ? 0 : -1}
                onClick={() => onSelect?.(kid.value, kid)}>
                <span className="branched-menu__label">{kid.label}</span><span className="branched-menu__count">{kid.count}</span>
              </button>)}
            </div>
          </div>
        </div>}
      </div>;
    })}
  </nav>;
}
