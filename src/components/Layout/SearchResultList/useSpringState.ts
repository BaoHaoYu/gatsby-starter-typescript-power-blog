import { UseSpringProps } from 'react-spring/web';
import { CSSProperties, useEffect, useState } from 'react';
import { useSpring } from 'react-spring';

type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & B;

type State = 'entering' | 'entered' | 'exiting' | 'exited';

export default function useSpringState<DS extends object>(
  start: boolean,
  springProps: UseSpringProps<Merge<DS, CSSProperties>>,
) {
  const [state, setState] = useState<State>('exited');

  useEffect(() => {
    if (start) {
      setState('entering');
    } else {
      setState('exiting');
    }
  }, [start]);

  const spring = useSpring({
    ...springProps,
    onRest(ds) {
      if (start) {
        setState('entered');
      } else {
        setState('exited');
      }
      if (springProps.onRest) {
        springProps.onRest(ds);
      }
    },
  });

  return {
    spring,
    state,
  };
}
