import React, { useEffect } from 'react';
import $ from 'jquery';
//import { ReactComponent as TestSvg } from '../assets/floor_layouts/korman_floor1.svg';

function SvgComponent() {

  const jQuerycode = () => {
    $('#112').css({ fill: "#ff0000" }); 
  };

  useEffect(() => {
    jQuerycode();
  }, []); 

  return (
    <div>
      {/* TestSvg is now a React component */}
          {/*<TestSvg />*/}
    </div>
  );
}

export default SvgComponent;