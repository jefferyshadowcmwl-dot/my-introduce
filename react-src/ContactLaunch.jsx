import { useId, useRef, useState } from 'react';
import FlyingButton from './FlyingButton';
import './ContactLaunch.css';

const EMAIL = '3107190237@qq.com';

export default function ContactLaunch() {
  const panelId = useId();
  const emailRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [motion, setMotion] = useState('checking');
  const [copyState, setCopyState] = useState('');

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(EMAIL);
      setCopyState('邮箱已复制，可粘贴到你选择的邮件应用。');
    } catch {
      emailRef.current?.focus();
      emailRef.current?.select();
      setCopyState('自动复制失败，邮箱已选中。请按 Ctrl+C / ⌘C，或长按邮箱选择复制。');
    }
  };

  return (
    <div className="cz-launch">
      <div className="cz-launch__heading">
        <span className="cz-launch__eyebrow">NEXT SIGNAL / 下一段信号</span>
        <p className="cz-launch__intro">点击起飞，获取联络方式</p>
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
          ? '烟雾动效已降级：WebGL2 不可用或渲染失败。按钮与邮箱复制仍可使用。'
          : motion === 'reduced'
            ? '已遵循减少动态效果偏好，停用起飞与烟雾；联络与复制功能正常。'
            : motion === 'ready'
              ? '起飞后可拖动按钮，松手降落。这里只展示联络方式，不会自动发送消息。'
              : '正在检查动效支持；点击即可获取联络方式。'}
      </p>
      <div id={panelId} className="cz-launch__panel" hidden={!open}>
        <label className="cz-launch__label" htmlFor={`${panelId}-email`}>联络邮箱</label>
        <div className="cz-launch__email-row">
          <input
            ref={emailRef}
            id={`${panelId}-email`}
            className="cz-launch__email"
            value={EMAIL}
            readOnly
            spellCheck={false}
            onFocus={event => event.target.select()}
          />
          <button className="cz-launch__copy" type="button" onClick={copyEmail}>复制邮箱</button>
        </div>
        <p className="cz-launch__feedback" role="status">{copyState || '选择适合你的时机，让对话继续。'}</p>
      </div>
    </div>
  );
}
