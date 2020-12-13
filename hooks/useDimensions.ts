import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

interface UseDimensionsReturn {
  window: ScaledSize;
  screen: ScaledSize;
}

export const useDimensions = (): UseDimensionsReturn => {

  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }: UseDimensionsReturn) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return dimensions;
};