import {Link} from "react-router-dom";

import LineStyleIcon from '@material-ui/icons/LineStyle';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import "./sidebar.scss";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <div className="sidebarTitle">Dashboard</div>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyleIcon className="sidebarIcon"/> 
                            Home
                        </li>
                        <li className="sidebarListItem">
                            <ShowChartIcon className="sidebarIcon"/>
                            Gráficos
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUpIcon className="sidebarIcon"/>
                            Ventas
                        </li>
                    </ul>
                    <div className="sidebarTitle">Menu rápido</div>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyleIcon className="sidebarIcon"/> 
                            Inventario
                        </li>
                        <li className="sidebarListItem">
                            <AccountBoxIcon className="sidebarIcon"/>
                            <Link className="link" to="/clientes">Clientes</Link>
                        </li>
                        <li className="sidebarListItem" onClick={()=>console.log("Clickeado")}>
                            <LocalMallIcon className="sidebarIcon"/>
                            Pedidos
                        </li>
                    </ul>
                    
                    
                    
                    
                    
                </div>
            </div>
            
        </div>
    )
}
