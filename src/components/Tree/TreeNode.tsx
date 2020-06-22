import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { usePrevious } from './helpers';
import { useMeasure } from 'react-use';
import cn from 'classnames';
import * as Icons from './icons';
import './TreeNode.scss';

interface TreeProps {
  name: React.ReactNode;
  children?: any;
  style?: React.CSSProperties;
  open?: boolean;
  active?: boolean;
  fontSize?: number | string;
}

export function TreeNode(props: TreeProps) {
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
    <div className={cn('TreeNode', { 'TreeNode--active': props.active })}>
      <div style={{ fontSize: props.fontSize }} className={'TreeNode__title'}>
        <span className={'TreeNode__toggle'} onClick={() => setOpen(!isOpen)}>
          <Icon className={'TreeNode__icon'} style={{ opacity: children ? 1 : 0.3 }} />
        </span>
        <span style={{ verticalAlign: 'middle', ...style }}>{name}</span>
      </div>
      <animated.div
        className={'TreeNode__content'}
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
      </animated.div>
    </div>
  );
}
