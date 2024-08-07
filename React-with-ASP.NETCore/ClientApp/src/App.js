// import React from 'react';
import React, { useState, useEffect } from 'react';
import DashboardListing from './DashboardListing/DashboardListing';
import "../src/App.css"
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

// class App extends React.Component {
// render() {
//    return (
//      <div>
//      <DashboardListing/>
//      </div>
//      );
//     }
// }

// export default App;


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setTimeout(adjustWidthOnResize, 300); // Adjust the delay to match your CSS transition
  };

  const adjustWidthOnResize = () => {
    const embedContainer = document.getElementById('embedContainer'); // Adjust the ID to match your actual container ID
    if (embedContainer?.parentNode) {
      embedContainer.style.width = `${embedContainer.parentNode.clientWidth}px`;
      embedContainer.style.height = embedContainer.parentNode.clientHeight > 0
        ? `${embedContainer.parentNode.clientHeight}px`
        : `${window.innerHeight}px`;
    }
  };

  useEffect(() => {
    adjustWidthOnResize();
    window.addEventListener('resize', adjustWidthOnResize);
    return () => {
      window.removeEventListener('resize', adjustWidthOnResize);
    };
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <h1>My App</h1>
      </nav>
      <div className="containerDash">
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? '←' : '→'}
          </button>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="content">
          <div id="embedContainer" style={{ width: '100%', height: '100%' }}>
            <DashboardListing />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
