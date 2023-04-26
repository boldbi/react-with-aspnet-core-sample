import React from 'react';
import './DashboardListing.css';
import '../index.css';
import '../index';
import {BoldBI} from '@boldbi/boldbi-embedded-sdk';

const apiHost="http://localhost:61377";
const authorizationUrl="/api/boldbiembed/getdetails";

//Enter your BoldBI credentials here
const userEmail= "nithya.gopal@syncfusion.com";
const userPassword= "nithya@531";

var BoldBiObj;
var embedConfig;
class DashboardListing extends React.Component {
   constructor(props){
      // super(props);
      // this.state = {toke: undefined, items: []};
     //  this.BoldBiObj = new BoldBI();
      // this.state = { embedConfig: {} };
      super(props);
      this.state = {
        toke: undefined,
        items: [],
        embedConfig: {},
        environment: '',
        siteIdentifier: ''
      };
      this.BoldBiObj = new BoldBI();

   };

   renderDashboard(data) {
    this.dashboard= BoldBI.create({
      serverUrl: this.state.embedConfig.ServerUrl + "/" + this.state.embedConfig.SiteIdentifier,
      dashboardId: data.Id,
      embedContainerId: "dashboard",
      embedType: BoldBI.EmbedType.Component,
      environment: this.state.embedConfig.Environment =="onpremise"? BoldBI.Environment.Enterprise:BoldBI.Environment.Cloud,
      mode:BoldBI.Mode.View,
      width:"100%",
      height: window.innerHeight + 'px',
      expirationTime:100000,
      authorizationServer: {
          url:apiHost + authorizationUrl
      },
  });

  console.log(this.dashboard);
  this.dashboard.loadDashboard();

  }

  render() {
    return (
      //  environment = this.state.environment;
      <React.Fragment>
      <div id="DashboardListing">
          <div id="container">
            <div className="header-section">
              <div id="grid-title">All Dashboard</div>
            </div>
            <div id="panel">
              {this.state.items.map((el) =>
                <button className="dashboard-item" attr-name ={el.Name} attr-id = {el.Id} value={el} onClick={((e) => this.renderDashboard(el))} >
                {el.Name}
                </button>
              )}
            </div>
          </div>
          <div id="viewer-section">
            <div id="dashboard"></div>
          </div>
      </div>
     </React.Fragment>
    );
  }

  // async fetchData() {
  //   try 
  //   {
  //     const response = await fetch(apiHost + '/api/boldbiembed/GetData');
  //     const data = await response.json();
  //     this.setState({ embedConfig: data });
  //     const embedConfig = this.state.embedConfig;
  //     console.log(this.state.embedConfig);
  //   } 
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  async componentDidMount() {
    var dashboard = undefined;
    var querystring = require('querystring');
    var token = "";
    // var userEmail = "";
    // var userPassword = "";
       fetch(apiHost + '/api/boldbiembed/GetData')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ embedConfig: data });
        // embedConfig = {data};
        const embedConfig = this.state.embedConfig;
      })
      .catch(error => {
        console.log(error);
      });


      // try {
      //   const response = await fetch(apiHost + '/api/boldbiembed/GetData');
      //   const data = await response.json();
      //   this.setState({ embedConfig: data });
      //   const embedConfig = this.state.embedConfig;
      //   // do something with embedConfig here
      // } catch (error) {
      //   console.log(error);
      // }

      // try 
      // {
      //   const response = await fetch(apiHost + '/api/boldbiembed/GetData');
      //   const data = await response.json();
      //   this.setState({ embedConfig: data });
      //   const embedConfig = this.state.embedConfig;
      //   console.log(this.state.embedConfig);
      // } 
      // catch (error) {
      //   console.log(error);
      // }

      //this.fetchData();
   
    fetch('http://localhost:53150/bi' +'/api/'+ 'site/site1' +'/get-user-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify({
        UserId: "nithya.gopal@syncfusion.com",
        Password: "Elikutty@531"
      })
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      token = JSON.parse(data.Token).access_token;
      this.setState({ toke: token });
      //Get Dashboards
      fetch('http://localhost:53150/bi' +'/api/'+ 'site/site1' +'/v2.0/items?ItemType=2', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization":'bearer ' + this.state.toke
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        var arrayOfObjects = data;
        this.setState({ items: arrayOfObjects });
        this.renderDashboard(arrayOfObjects[0]);
      })
      .catch(error => {
        this.setState({ items: "error" });
      });
    })
    .catch(error => {
      this.setState({ toke: "error" });
    });
  }
}
export default DashboardListing;
