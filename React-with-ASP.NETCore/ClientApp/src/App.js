// import React from 'react';

// import React, { useState, useEffect } from 'react';
// import DashboardListing from './DashboardListing/DashboardListing';
// import "../src/App.css"
// import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

// const App = () => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);

//     // var instance = BoldBI.getInstance('dashboard');
//     // instance.adjustWidthOnResize();
//     // instance.resizeDashboard();
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       const instance = BoldBI.getInstance('dashboard');
//       if (instance) {
//         instance.adjustWidthOnResize();
//         // instance.resizeDashboard(); // Uncomment if you need this as well
//       }
//     }, 300); // Use a short delay to allow the DOM to update
//   }, [isExpanded]);

//   // useEffect(() => {
//   //   const instance = BoldBI.getInstance('dashboard');
//   //   if (instance) {
//   //     instance.adjustWidthOnResize();
//   //     // instance.resizeDashboard(); // Uncomment if you need this as well
//   //   }
//   // }, [isExpanded]);



//   return (
//     <div className="app">
//       <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
//         <button onClick={toggleSidebar}>
//           {isExpanded ? 'Collapse' : 'Expand'}
//         </button>
//         {/* Sidebar content */}
//       </div>
//       <div className="dashboard">
//        <div> <DashboardListing/></div>
//       </div>
//     </div>
//   );
// };

// export default App;


// one case affecting:

// import React, { useState, useEffect } from 'react';
// import DashboardListing from './DashboardListing/DashboardListing';
// import "../src/App.css";
// import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

// const App = () => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const adjustDashboard = () => {
//     const instance = BoldBI.getInstance('dashboard');
//     if (instance) {
//       instance.adjustWidthOnResize();
//       // instance.resizeDashboard(); // Uncomment if you need this as well
//     }
//   };

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };

//   useEffect(() => {
//     // Call adjustDashboard after the sidebar state changes
//     adjustDashboard();
//   }, [isExpanded]);

//   useEffect(() => {
//     // Call adjustDashboard on window resize
//     const handleResize = () => {
//       adjustDashboard();
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="app">
//       <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
//         <button onClick={toggleSidebar}>
//           {isExpanded ? 'Collapse' : 'Expand'}
//         </button>
//         {/* Sidebar content */}
//       </div>
//       <div className="dashboard" id="dashboard">
//         <DashboardListing />
//       </div>
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import DashboardListing from './DashboardListing/DashboardListing';
import "../src/App.css";
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

const App = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // const adjustDashboard = () => {
  //   // Ensure DOM updates are completed before adjusting
  //   requestAnimationFrame(() => {
  //     const instance = BoldBI.getInstance('dashboard');
  //     if (instance) {
  //       instance.adjustWidthOnResize();
  //       // instance.resizeDashboard(); // Uncomment if needed
  //     }
  //   });
  // };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // useEffect(() => {
  //   // Call adjustDashboard after the sidebar state changes
  //   adjustDashboard();
  // }, [isExpanded]);

  // useEffect(() => {
  //   // Call adjustDashboard on window resize
  //   const handleResize = () => {
  //     adjustDashboard();
  //   };

  //   window.addEventListener('resize', handleResize);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <div className="app">
      <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <button onClick={toggleSidebar}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
        {/* Sidebar content */}
      </div>
      <div id='viewer-section1'>
      <div id='viewer-section'>
      <div className="dashboard" id="dashboard">
        <DashboardListing />
      </div>
      </div>
      </div>
    {/* </div> */}
    </div>
  );
};

export default App;





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


