import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutUs, OurAim, OurVision } from "./pages/AboutUs";
import {
Services,
ServicesOne,
ServicesTwo,
ServicesThree,
} from "./pages/Services";
import { Events, EventsOne, EventsTwo } from "./pages/Events";
import Contact from "./pages/ContactUs";
import Support from "./pages/Support";
import React from "react";

function App() {
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
		fetch("/api")
		  .then((res) => res.json())
		  .then((data) => setData(data.message));
	  }, []);
	
return (
	<Router>
	<Sidebar />
	<Routes>
		{/* <Route path='/about-us' element={<AboutUs/>} /> */}
		{/* <Route path='/about-us/aim' element={<OurAim/>} />*/}
		{/* <Route path='/about-us/vision' element={<OurVision/>} />*/}
		<Route path='/services' element={<Services/>} />
		<Route path='/services/services1' element={<ServicesOne/>} />
		<Route path='/services/services2' element={<ServicesTwo/>} />
		<Route path='/services/services3' element={<ServicesThree/>} />
	</Routes>
	</Router>
);
}

export default App;
