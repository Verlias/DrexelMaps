import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Korman1 from '../Svgs/Korman1.jsx';

const SvgComponent = ({ id, building, floor }) => {
    const [prevId, setPrevId] = useState('');

    const jQuerycode = () => {
        if (prevId !== '') {
            $(`#${prevId}`).css({ fill: '#000080' });
            $(`#${prevId}L1`).css({ fill: '#ffffff' });
        }

        if (id != '') {
            $(`#${id}`).css({ fill: "#FFC600" });
            $(`#${id}L1`).css({ fill: "#000000" });
            setPrevId(id);
        }
    };

    useEffect(() => {
        jQuerycode();
     }, [id]); 



     return (
         <div>
             {building.toLowerCase() === "korman center" && floor === "1" && <Korman1 />}
        </div>
    );
}

export default SvgComponent;