import React from 'react';
import './DashboardListing.css';
import '../index.css';
import '../index';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';

//ASP.NET Core application would be run on https://localhost:5001; http://localhost:5000, which needs to be set as `apiHost`
const apiHost = "https://localhost:5001";

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
      dashboardId: data.Id,
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
          <div className="header-section">
            <div id="grid-title">All Dashboard</div>
          </div>
          <div id="panel">
            {this.state.items.map((el) =>
              <button className="dashboard-item" attr-name={el.Name} attr-id={el.Id} value={el} onClick={((e) => this.renderDashboard(el))} >
                {el.Name}
              </button>
            )}
          </div>
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
      const tokenResponse = await fetch(this.state.embedConfig.ServerUrl + '/api/' + this.state.embedConfig.SiteIdentifier + '/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          grant_type: "embed_secret",
          username: this.state.embedConfig.UserEmail,
          embed_secret: this.state.embedConfig.EmbedSecret
        })
      });
      const tokenData = await tokenResponse.json();
      token = tokenData.access_token;
      this.setState({ toke: token });

      const itemsResponse = await fetch(this.state.embedConfig.ServerUrl + '/api/' + this.state.embedConfig.SiteIdentifier + '/v2.0/items?ItemType=2', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": 'bearer ' + this.state.toke
        }
      });
      const itemsData = await itemsResponse.json();
      var arrayOfObjects = itemsData;
      this.setState({ items: arrayOfObjects });
      this.renderDashboard(arrayOfObjects[0]);
    } catch (error) {
      console.log(error);
      this.setState({ toke: "error", items: "error" });
    }
  }
}
export default DashboardListing;
