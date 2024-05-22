import React, { useEffect } from 'react';
import $ from 'jquery';
import Korman1 from '../Svgs/Korman1.jsx';

function SvgComponent() {

  const jQuerycode = () => {
    $('#118').css({ fill: "#ff0000" }); 
  };

  useEffect(() => {
    jQuerycode();
  }, []); 

  return (
    <div>
      {/* TestSvg is now a React component */}
          {<Korman1 />}
    </div>
  );
}

export default SvgComponent;