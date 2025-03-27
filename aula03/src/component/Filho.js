import React from "react";

const Filho = ({ texto, cor }) => {
    return(
        <h1 style={{ backgroundColor: cor }}>{ texto }</h1>

    )
}

export default Filho