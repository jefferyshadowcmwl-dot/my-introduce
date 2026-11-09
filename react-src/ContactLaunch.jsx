import { useId, useRef, useState } from 'react';
import FlyingButton from './FlyingButton';
import './ContactLaunch.css';

const PROJECT_URL = 'https://github.com/jefferyshadowcmwl-dot/my-introduce';

export default function ContactLaunch() {
  const panelId = useId();
  const linkRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [motion, setMotion] = useState('checking');
  const [copyState, setCopyState] = useState('');

  const copyLink = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(PROJECT_URL);
      setCopyState('链接已复制，可粘贴到你选择的浏览器。');
    } catch {
      linkRef.current?.focus();
      linkRef.current?.select();
      setCopyState('自动复制失败，链接已选中。请按 Ctrl+C / ⌘C，或长按链接选择复制。');
    }
  };

  return (
    <div className="cz-launch">
      <div className="cz-launch__heading">
        <span className="cz-launch__eyebrow">NEXT SIGNAL / 下一段信号</span>
        <p className="cz-launch__intro">点击起飞，获取公开项目入口</p>
      </div>
      <div className="cz-launch__stage">
        <span className="cz-launch__coordinate" aria-hidden="true">SIGNAL PAD · 0324</span>
        <FlyingButton
          theme="dark"
          size="medium"
          altitude={145}
          hoverTime={1.8}
          jets={2}
          thrusters
          trigger="click"
          carryCursor={false}
          smoke={0.8}
          turbulence={0.8}
          wobble={0.6}
          thrustColor="#78cfc5"
          smokeColor="#c1d5d2"
          buttonColor="#1b292d"
          textColor="#f2f0ea"
          onMotionStatus={setMotion}
          onClick={() => setOpen(true)}
          buttonProps={{ 'aria-expanded': open, 'aria-controls': panelId }}
        >
          让下一段信号起飞
        </FlyingButton>
      </div>
      <p className="cz-launch__motion" role="status">
        {motion === 'unavailable'
          ? '烟雾动效已降级：WebGL2 不可用或渲染失败。按钮与链接复制仍可使用。'
          : motion === 'reduced'
            ? '已遵循减少动态效果偏好，停用起飞与烟雾；公开链接与复制功能正常。'
            : motion === 'ready'
              ? '起飞后可拖动按钮，松手降落。这里只展示公开项目入口，不会自动发送消息。'
              : '正在检查动效支持；点击即可获取公开项目入口。'}
      </p>
      <div id={panelId} className="cz-launch__panel" hidden={!open}>
        <label className="cz-launch__label" htmlFor={`${panelId}-link`}>公开项目入口</label>
        <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer">打开 GitHub 仓库 ↗</a>
        <div className="cz-launch__email-row">
          <input
            ref={linkRef}
            id={`${panelId}-link`}
            className="cz-launch__email"
            value={PROJECT_URL}
            readOnly
            spellCheck={false}
            onFocus={event => event.target.select()}
          />
          <button className="cz-launch__copy" type="button" onClick={copyLink}>复制链接</button>
        </div>
        <p className="cz-launch__feedback" role="status">{copyState || '选择适合你的时机，浏览公开项目。'}</p>
      </div>
    </div>
  );
}
