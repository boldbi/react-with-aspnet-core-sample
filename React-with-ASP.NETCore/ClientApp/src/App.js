// import React from 'react';
import React, { useState, useEffect } from 'react';
import DashboardListing from './DashboardListing/DashboardListing';
// import "../src/App.css"
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


// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//     // var instance = BoldBI.getInstance('dashboard');
//     // instance.adjustWidthOnResize();
//     // setTimeout(adjustWidthOnResize, 300); // Adjust the delay to match your CSS transition
//   };

  // const adjustWidthOnResize = () => {
  //   const embedContainer = document.getElementById('embedContainer'); // Adjust the ID to match your actual container ID
  //   if (embedContainer?.parentNode) {
  //     embedContainer.style.width = `${embedContainer.parentNode.clientWidth}px`;
  //     embedContainer.style.height = embedContainer.parentNode.clientHeight > 0
  //       ? `${embedContainer.parentNode.clientHeight}px`
  //       : `${window.innerHeight}px`;
  //   }
  // };

  // useEffect(() => {
  //   adjustWidthOnResize();
  //   window.addEventListener('resize', adjustWidthOnResize);
  //   return () => {
  //     window.removeEventListener('resize', adjustWidthOnResize);
  //   };
  // }, []);

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <h1>My App</h1>
//       </nav>
//       <div className="containerDash">
//         <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
//           <button className="toggle-btn" onClick={toggleSidebar}>
//             {isSidebarOpen ? '←' : '→'}
//           </button>
//           <ul>
//             <li>Home</li>
//             <li>About</li>
//             <li>Contact</li>
//           </ul>
//         </div>
//         <div className="content">
//           {/* <div id="embedContainer" style={{ width: '100%', height: '100%' }}> */}
//             <DashboardListing />
//           {/* </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  // Inline styles for the sidebar and content
  const sidebarStyle = {
    width: isSidebarOpen ? '15%' : '5%',
    transition: 'width 0.3s',
    backgroundColor: '#f4f4f4',
    position: 'relative'
  };

  const contentStyle = {
    flex: 1,
    backgroundColor: '#fff',
    padding: '20px',
    marginLeft: isSidebarOpen ? '15%' : '5%',
    transition: 'margin-left 0.3s'
  };

  const toggleButtonStyle = {
    position: 'absolute',
    // top: '10px',
    // right: '-30px', // Adjust based on the sidebar width
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    padding: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <nav style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
        <h1>My App</h1>
      </nav>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={sidebarStyle}>
          <button style={toggleButtonStyle} onClick={toggleSidebar}>
            {isSidebarOpen ? '←' : '→'}
          </button>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        {/* <main style={contentStyle}>
          <h2>Main Content Area</h2>
        </main> */}
        <div className="content">
           <DashboardListing />         
           </div>
      </div>
    </div>
  );
};

export default App;
