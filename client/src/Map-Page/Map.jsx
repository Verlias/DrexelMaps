import React from "react";
import Header from "../Components/Header.jsx"
import MapMain from "./Map-Main.jsx"
import InputMain from "./MapInput/Input.jsx"


function Map(){

    return(
        <>
            <Header></Header>
            <MapMain></MapMain>
            <InputMain></InputMain>
        </>
    )
}

export default Map;