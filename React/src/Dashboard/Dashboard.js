import React from 'react';
import '../index.css';
import '../index';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

//ASP.NET Core application would be run on https://localhost:5001; http://localhost:5000, which needs to be set as `apiHost`
const apiHost = "http://localhost:5000";

//Url of the TokenGeneration action in BoldBIEmbedController of the ASP.NET Core application
const tokenGenerationUrl = "/api/boldbiembed/tokengeneration";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toke: undefined,
      items: [],
      embedConfig: {},
    };
    this.BoldBiObj = new BoldBI();
  };

  getEmbedToken() {
    return fetch(apiHost + tokenGenerationUrl, { // Backend application URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
      .then(response => {
        if (!response.ok) throw new Error("Token fetch failed");
        return response.text();
      });
  }

  renderDashboard(data) {
    this.getEmbedToken()
      .then(accessToken => {
        const dashboard = BoldBI.create({
          serverUrl: data.ServerUrl + "/" + data.SiteIdentifier,
          dashboardId: data.DashboardId,
          embedContainerId: "dashboard",
          embedToken: accessToken
        });

        dashboard.loadDashboard();
      })
      .catch(err => {
        console.error("Error rendering dashboard:", err);
      });
  };

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
export default Dashboard;