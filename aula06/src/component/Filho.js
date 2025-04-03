import React from "react";

const Filho = ({ valor, cor, callback }) =>{
    const Clique = () => {
        callback(valor)
    }
    return(
        <div style={{
            backgroundColor: cor,
            borderRadius: "50px",
            width:"100px",
            height: "100px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center" ,
            fontSize:"30px",
            color:"black",
        }}onClick={( ) => Clique()}> 
            {valor}
        </div>
    );
};
export default Filho;