import React from 'react';
import '../index';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';
import './DashboardListing.css'; // Import the CSS file

//ASP.NET Core application would be run on https://localhost:5001; http://localhost:5000, which needs to be set as `apiHost`
const apiHost = "http://localhost:5292";

//Url of the AuthorizationServer action in ValuesController of the ASP.NET Core application
const authorizationUrl = "/api/boldbiembed/authorizationserver";

var BoldBiObj;
class DashboardListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toke: undefined,
      items: [],
      embedConfig: {},
    };
    this.BoldBiObj = new BoldBI();
  };

  renderDashboard(data) {
    this.dashboard = BoldBI.create({
      serverUrl: data.ServerUrl + "/" + data.SiteIdentifier,
      // dashboardId: "015e1ce3-2a6a-4fac-ab1e-59b3243d565a",
      //dashboardId: "b2446acf-b80f-4881-aaa1-117283c8c84d", // Multi
      //viewName: "TestJSSimplification",
      // viewName: "Nithya Gopal",
     //dashboardId: "6fecfd2b-d07c-4992-9597-5f02dec00174",
      //datasourceName: "sdfsdsfsfdfssdgfd",
      // dashboardId: data.DashboardId,
        dashboardPaths: ["/Sales/Sales Analysis Dashboard (2)", "/Government/DynamicConnectionStringty"],
      //viewId: "754c76be-3dcb-4f10-a9ca-be3b3279e62a",
      embedContainerId: "dashboard",
      //pinboardName: "Pinboard",
      // embedType: data.EmbedType,
      // environment: data.Environment,
      //mode: BoldBI.Mode.View,
      // mode: BoldBI.Mode.Design,
      //mode: BoldBI.Mode.DataSource,
    //  mode: BoldBI.Mode.Connection,
      // width: "600px",
      // height: "600px",
      width: "100%",
      height: "100vh",
    //   width: "100%",
    //   // height: "100%",
    // // //   // height: "100%",
    // height: window.innerHeight + 'px',
      //expirationTime: 100000,
      authorizationServer: {
        url: apiHost + authorizationUrl
      },

      //     widgetContainerSettings: {
      //       margin: 50,
      //  }

      //       widgetList: [{ widgetName: "Chart2", containerId: "widget1" },
      //  { widgetName: "Chart3", containerId: "widget2" }],
    });

   // this.dashboard.loadDashboardWidget("Chart1");
    //this.dashboard.loadMultipleWidgets();
    this.dashboard.loadMultitabDashboard();
    //this.dashboard.loadView();
    //this.dashboard.loadDashboard();
   // this.dashboard.loadDesigner();
    // this.dashboard.loadPinboard();
    //this.dashboard.loadDatasource();
  }


  toggleSection = () => {
    this.setState((prevState) => ({
      isCollapsed: !prevState.isCollapsed
    }), () => {
      // Use BoldBI SDK to resize the dashboard
      setTimeout(() => {
        if (this.dashboard) {
          this.dashboard.resizeDashboard();
        }
      }, 300);
    });
  }

  render() {
    const sectionClass = this.state.isCollapsed ? 'section collapsed' : 'section';
    const viewerClass = this.state.isCollapsed ? 'viewer-section expanded' : 'viewer-section';

    return (
      <div id="DashboardListing">
        <div id="section" className={sectionClass}>
          <button onClick={this.toggleSection}>
            {this.state.isCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
        <div id="viewer-section" className={viewerClass}>
          <div id="dashboard"></div>
        </div>
      </div>
    );
  }

  // toggleSection = () => {
  //   this.setState((prevState) => ({
  //     isCollapsed: !prevState.isCollapsed
  //   }), () => {
  //     this.adjustLayout();
  //     // Use BoldBI SDK to resize the dashboard
  //     setTimeout(() => {
  //       if (this.dashboard) {
  //         this.dashboard.resizeDashboard();
  //       }
  //     }, 300);
  //   });
  // }

  // adjustLayout() {
  //   const section = document.getElementById('section');
  //   const viewerSection = document.getElementById('viewer-section');

  //   if (section && viewerSection) {
  //     section.style.width = this.state.isCollapsed ? '30%' : '20%';
  //     viewerSection.style.width = this.state.isCollapsed ? '70%' : '80%';
  //   }
  // }

  // render() {
  //   const sidebarStyle = {
  //     width: this.state.isCollapsed ? '30%' : '20%',
  //     height: '100%',
  //     backgroundColor: 'slategrey',
  //     float: 'left',
  //     transition: 'width 0.3s ease',
  //   };

  //   const viewerStyle = {
  //     width: this.state.isCollapsed ? '70%' : '80%',
  //     height: '100%',
  //     float: 'left',
  //     transition: 'width 0.3s ease',
  //   };

  //   return (
  //     <div id="DashboardListing">
  //       <div id="section" style={sidebarStyle}>
  //         <button onClick={this.toggleSection}   style={{ color: 'black', background: 'none', border: 'none', padding: '10px 20px',  cursor: 'pointer' }}>
  //           {this.state.isCollapsed ? 'Expand' : 'Collapse'}
  //         </button>
  //       </div>
  //       <div id="viewer-section" style={viewerStyle}>
  //         <div id="dashboard"></div>
  //       </div>
  //     </div>
  //   );
  // }

  // render() {
  //   return (
  //     <div id="DashboardListing">
  //       <div id="container">
  //       </div>
  //       <div id="viewer-section">
  //         <div id="dashboard"></div>
  //       </div>
  //     </div>
  //   );
  // }

  async componentDidMount() {
    var dashboard = undefined;
    // var querystring = require('querystring');
    var token = "";

    try {
      const response = await fetch(apiHost + '/api/boldbiembed/GetData');
      const data = await response.json();
      // Transform camelCase keys to PascalCase
      const transformedEmbedConfigData = {
        DashboardId: data.dashboardId,
        EmbedType: data.embedType,
        Environment: data.environment,
        ServerUrl: data.serverUrl,
        SiteIdentifier: data.siteIdentifier
      };
      this.setState({ embedConfig: transformedEmbedConfigData }, () => {
        this.renderDashboard(this.state.embedConfig);
      });
    } catch (error) {
      console.log(error);
      this.setState({ toke: "error", items: "error" });
    }
  }
}
export default DashboardListing;
