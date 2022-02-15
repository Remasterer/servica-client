import { useScrollTrigger } from '@mui/material';
import { cloneElement, ReactElement } from 'react';

interface ElevationScrollProps {
  window?: () => Window;
  children: ReactElement;
}

export const ElevationScroll = (props: ElevationScrollProps) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    scrollTriggered: !!trigger
  });
};
