import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { usePrevious, useMeasure } from './helpers';
import { Global, Frame, Content, toggle } from './styles';
import * as Icons from './icons';

interface TreeProps {
  name: React.ReactNode;
  children?: any;
  style?: React.CSSProperties;
  open?: boolean;
}

export function Tree(props: TreeProps) {
  const { children, name, style, open } = props;
  const [isOpen, setOpen] = useState(open);
  const prev = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure();

  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    height: isOpen ? viewHeight : 0,
    opacity: isOpen ? 1 : 0,
    transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
  });
  const svgKey = `${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO` as
    | 'PlusSquareO'
    | 'MinusSquareO'
    | 'CloseSquareO';
  const Icon = Icons[svgKey];
  return (
    <Frame>
      <span onClick={() => setOpen(!isOpen)}>
        <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} />
      </span>
      <span style={{ verticalAlign: 'middle', ...style }}>{name}</span>
      <Content
        style={{
          opacity,
          height: height.interpolate((_height: any) =>
            isOpen && prev === isOpen ? 'auto' : _height,
          ),
        }}
      >
        <animated.div ref={ref as any} style={{ transform }}>
          {children}
        </animated.div>
      </Content>
    </Frame>
  );
}

export const App = () => (
  <>
    <Global />
    <Tree name="main" open={true}>
      <Tree name="hello" />
      <Tree name="subtree with children">
        <Tree name="hello" />
        <Tree name="sub-subtree with children">
          <Tree name="child 1" style={{ color: '#37ceff' }} />
          <Tree name="child 2" style={{ color: '#37ceff' }} />
          <Tree name="child 3" style={{ color: '#37ceff' }} />
          <Tree name="custom content">
            <div style={{ position: 'relative', width: '100%', height: 200, padding: 10 }}>
              <div
                style={{ width: '100%', height: '100%', background: 'black', borderRadius: 5 }}
              />
            </div>
          </Tree>
        </Tree>
        <Tree name="hello" />
      </Tree>
      <Tree name="world" />
      <Tree name={<span>🙀 something something</span>} />
    </Tree>
  </>
);
