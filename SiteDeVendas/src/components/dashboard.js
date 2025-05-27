import React from "react";
import Menu from "./menu";
const Dashboard = () =>{
    return(
        <div>
            <Menu /> {/* Toolbar ADMIN visível em todas as páginas */}
            <h1>Principal</h1>
        </div>
    )
}

export default Dashboard