import React from "react";
import "../index";
import { BoldBI } from "@boldbi/boldbi-embedded-sdk";
import "./widget.css";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";

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
    this.channelsData = [
      "Retail",
      "Corporate",
      "Distributor",
      "Online",
      "Dealer",
    ];

    //this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    var instance = BoldBI.getInstance("dashboard"); // "dashboard" -> embed container id.
    var multiselectContainer = document.getElementById("mtselement");
    var getlistObj =
      multiselectContainer.ej2_instances &&
      multiselectContainer.ej2_instances[0];
    //console.log(getlistObj, getlistObj.tempValues);
    var selectedValuesList = getlistObj.tempValues;
    if (selectedValuesList && selectedValuesList.length !== 0) {
      document.getElementById("error-text").style.display = "none";
      var selectedValuesString = selectedValuesList.join(",");
      //console.log(selectedValuesString);
      var updatefiltersValue = "Channel=" + selectedValuesString;
      instance.updateFilters(updatefiltersValue);
    }
    else {
      document.getElementById("error-text").style.display = "block";
    }
  }

  renderDashboard(data) {
    this.dashboard = BoldBI.create({
      serverUrl: data.ServerUrl + "/" + data.SiteIdentifier,
      dashboardId: data.DashboardId,
      embedContainerId: "dashboard",
      embedType: data.EmbedType,
      environment: data.Environment,
      mode: BoldBI.Mode.View,
      width: "100%",
      height: window.innerHeight + "px",
      expirationTime: 100000,
      authorizationServer: {
        url: apiHost + authorizationUrl,
      },
    });

    this.dashboard.loadDashboardWidget("Sales by Channel");
  }

  render() {
    return (
      <div id="DashboardListing">
        {/* <div id="container"></div> */}
        <div id="viewer-section">
          <div id="dashboard"></div>
        </div>
        <div id="property">
          <div className="property-header">
            <h4>Properties</h4>
            <div className="separator"></div>
          </div>
          
          {/* <MultiSelectComponent
            id="mtselement"
            dataSource={this.channelsData}
            placeholder="Select Channels"
          /> */}

          <div className="dimension-filter">
        <span><b>Widget-based Filter</b></span><br/>
        <div id="heading-content">
        <p>Here, we are utilizing the <b>Sales by Channel</b> widget from the sample dashboard of the <b>Sales Analysis Dashboard</b>.</p></div>
        <div className="dimension-initial">
            <span>In the <b>Initial Rendered</b> view, you can see all the below values in the Sales by Channel widget.</span>
            <ul>
              <li>Retail</li>
              <li>Corporate</li>
              <li>Distributor</li>
              <li>Online</li>
              <li>Dealer</li>
            </ul>
        </div>
        <div className="dimension-ondemand">
            <span>For <b>On-demand Action</b>, you need to select the options from the dropdown list below and click the <b>"Update filters to Widget"</b> button to see the selected filter values in the Sales by Channel widget.</span>
            <br/>
            <MultiSelectComponent
            id="mtselement"
            dataSource={this.channelsData}
            placeholder="Select Channels"
          />
          <div id="error-text">Please select atleast one channel</div>
            <div className="filter-button"><button onClick={this.handleButtonClick}>Update filters to Widget</button></div>
        </div>
    </div>
          
          {/* <div className="filter-button">
            <button onClick={this.handleButtonClick}>Click Me</button>
          </div> */}

          
        </div>
      </div>
    );
  }

  async componentDidMount() {
    var dashboard = undefined;
    // var querystring = require('querystring');
    var token = "";

    try {
      const response = await fetch(apiHost + "/api/boldbiembed/GetData");
      const data = await response.json();
      // Transform camelCase keys to PascalCase
      const transformedEmbedConfigData = {
        DashboardId: data.dashboardId,
        EmbedType: data.embedType,
        Environment: data.environment,
        ServerUrl: data.serverUrl,
        SiteIdentifier: data.siteIdentifier,
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
