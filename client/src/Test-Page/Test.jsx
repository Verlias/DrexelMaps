import React from 'react';
import { ReactComponent as TestSvg } from '../assets/floor_layouts/korman_floor1.svg';

function SvgComponent() {
  return (
    <div>
      {/* MySvg is now a React component */}
      <TestSvg fill="blue" />
    </div>
  );
}

export default SvgComponent;