import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
background: #DBE2EF;
height: 60px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;


// meniu lateral
const SidebarNav = styled.nav`
background: #112D4E;
width: 250px;
height: 60vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 300ms;
z-index: 10;
border-bottom-right-radius: 50px;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const Sidebar = () => {
const [sidebar, setSidebar] = useState(false);
const showSidebar = () => setSidebar(!sidebar);
var temperatura = 25;
var umiditate = 25;
return (
	<>
	<IconContext.Provider value={{ color: "#fff" }}>
		<Nav>
		<NavIcon to="#">


				<IconContext.Provider
			value={{ color: '#112D4E', size: '40px' }}
			>
			<div>
			<FaIcons.FaBars onClick={showSidebar} />
			</div>
			</IconContext.Provider>
		</NavIcon>
		<h1
			style={{ textAlign: "left", 
					marginLeft: '30px', 
					color: "#112D4E",
					size: "2%" }}
		>
			Licență
		</h1>
		</Nav>
		<SidebarNav sidebar={sidebar}>
		<SidebarWrap>
			<NavIcon to="#">
			<AiIcons.AiOutlineClose onClick={showSidebar} />
			</NavIcon>
			{SidebarData.map((item, index) => {
			return <SubMenu item={item} key={index} />;
			})}
		</SidebarWrap>
		</SidebarNav>
	</IconContext.Provider>
	<p>&emsp; Temperatura: {temperatura}°C</p>
	<p>&emsp; Umiditate: {umiditate}%</p>
	</>
);
};

export default Sidebar;
