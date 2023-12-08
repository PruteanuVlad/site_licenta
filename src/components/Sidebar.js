import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import axios from 'axios';
import Plot from 'react-plotly.js';

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
const [temperatura, setTemperatura] = useState(false);
const [umiditate, setUmiditate] = useState(false);
const showSidebar = () => setSidebar(!sidebar);


useEffect(() => {
    // Fetch data from API 1
    const fetchData1 = async () => {
      try {
        const response = await axios.get('https://site-licenta-10aff3814de1.herokuapp.com/temperatura');
        setTemperatura(response.data.temperatura);
      } catch (error) {
        console.error('Error fetching data from API 1:', error);
      }
    };

    fetchData1();
  }, []); // The empty dependencies array means this effect runs only once after the initial render

  useEffect(() => {
    // Fetch data from API 2
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://site-licenta-10aff3814de1.herokuapp.com/umiditate');
        setUmiditate(response.data.umiditate);
      } catch (error) {
        console.error('Error fetching data from API 2:', error);
      }
    };

    fetchData2();
  }, []); // The empty dependencies array means this effect runs only once after the initial render
  // Extract x and y values for the plot
  const xValues = [25.34, 25.82, 26.57, 25.89, 26.12, 25.33, 25.49, 26.18, 26.49, 26.29];
  const yValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Define the layout for the Plotly chart
  const layout = {
    title: 'Grafic temperatură',
    xaxis: {
      title: 'Axul central',
    },
    yaxis: {
      title: 'Temperatură (°C)',
    },
  };

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
	<div>
      {xValues.length > 0 ? (
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={layout}
        />
      ) : (
        <p>Loading temperature data...</p>
      )}
    </div>
	</>
);
};

export default Sidebar;
