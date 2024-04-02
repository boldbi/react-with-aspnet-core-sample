import React from 'react';
import './DashboardListing.css';
import '../index.css';
import '../index';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

//ASP.NET Core application would be run on https://localhost:5001; http://localhost:5000, which needs to be set as `apiHost`
const apiHost = "http://localhost:5000";

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
      dashboardId: data.DashboardId,
      embedContainerId: "dashboard",
      embedType: data.EmbedType,
      environment: data.Environment,
      mode: BoldBI.Mode.View,
      width: "100%",
      height: window.innerHeight + 'px',
      expirationTime: 100000,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmluaS5yYW1lc2hAc3luY2Z1c2lvbi5jb20iLCJ1cG4iOiJoYXJpbmkucmFtZXNoQHN5bmNmdXNpb24uY29tIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYWU4NDU0ZmUtYzZlYy00Njg0LWJkYmEtMjM2NWUyNjU1MzBlIiwiSVAiOiI6OjEiLCJpc3N1ZWRfZGF0ZSI6IjE3MTE1NDI2MjMiLCJuYmYiOjE3MTE1NDI2MjMsImV4cCI6MTcxMjE0NzQyMywiaWF0IjoxNzExNTQyNjIzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ5OTk0L2JpL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQ5OTk0L2JpL3NpdGUvc2l0ZTEifQ.JXhdSyRkFIwug7eQR0ZPLNhUkhy9ddoidiqlE915obE",//This should be your user access token
    });

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
      this.setState({ embedConfig: transformedEmbedConfigData });
      const embedConfig = this.state.embedConfig;
      this.renderDashboard(embedConfig);
    } catch (error) {
      console.log(error);
      this.setState({ toke: "error", items: "error" });
    }
  }
}
export default DashboardListing;
