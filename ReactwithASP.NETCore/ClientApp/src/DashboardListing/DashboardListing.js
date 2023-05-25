import React from 'react';
import '../index';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

//ASP.NET Core application would be run on https://localhost:5001; http://localhost:5000, which needs to be set as `apiHost`
const apiHost = "https://localhost:7156";

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
      serverUrl: this.state.embedConfig.ServerUrl + "/" + this.state.embedConfig.SiteIdentifier,
      dashboardId: data.DashboardId,
      embedContainerId: "dashboard",
      embedType: BoldBI.EmbedType.Component,
      environment: this.state.embedConfig.Environment == "onpremise" ? BoldBI.Environment.Enterprise : BoldBI.Environment.Cloud,
      mode: BoldBI.Mode.View,
      width: "100%",
      height: window.innerHeight + 'px',
      expirationTime: 100000,
      authorizationServer: {
        url: apiHost + authorizationUrl
      },
    });

    console.log(this.dashboard);
    this.dashboard.loadDashboard();
  }

  render() {
    return (
      <div id="DashboardListing">
        <div id="container">
        </div>
        <div id="viewer-section">
          <div id="dashboard"></div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    var dashboard = undefined;
    var querystring = require('querystring');
    var token = "";

    try {
      const response = await fetch(apiHost + '/api/boldbiembed/GetData');
      const data = await response.json();
      this.setState({ embedConfig: data });
      const embedConfig = this.state.embedConfig;
      this.renderDashboard(embedConfig);
    } catch (error) {
      console.log(error);
      this.setState({ toke: "error", items: "error" });
    }
  }
}
export default DashboardListing;
