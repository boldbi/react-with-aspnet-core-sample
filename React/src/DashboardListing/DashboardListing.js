import React from 'react';
import './DashboardListing.css';
import '../index.css';
import '../index';
import { useState, useEffect } from 'react';
import {BoldBI} from '@boldbi/boldbi-embedded-sdk';
import Axios from 'axios';
// import EmbedConfig from '../embedConfig';
// import DataClass from '../Models/DataClass.cs';
// import embedConfig from '../embedConfig';
// import embedConfig from '../embedConfig';

//For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
// const siteIdentifier = "site/site1";
//let siteIdentifier = embedConfig.SiteIdentifier;
//Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `onpremise`)
//let environment = this.state.environment;
// const environment = "onpremise";

//ASP.NET Core application would be run on http://localhost:61377/, which needs to be set as `apiHost`


//Bold BI Server URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
// const rootUrl = "http://localhost:53150/bi";
// const rootUrl = embedSettings.ServerUrl;

//Url of the GetDetails action in ValuesController of the ASP.NET Core application

const apiHost="http://localhost:61377";
const authorizationUrl="/api/boldbiembed/getdetails";

//Enter your BoldBI credentials here
// const userEmail= "nithya.gopal@syncfusion.com";
// const userPassword= "nithya@531";

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
         <div>
         SiteIdentifier: {this.state.siteIdentifier}
         {/* embedConfig: {this.state.embedConfig} */}
       </div>
     </React.Fragment>
    );
  }

  doSomethingWithData(embedConfig)
  {
    console.log(embedConfig.Environment);
    this.setState({ environment: embedConfig.Environment });
    this.setState({ siteIdentifier: embedConfig.SiteIdentifier});
    this.setState({ embedConfig});
  }

  async fetchData() {
    try 
    {
      const response = await fetch(apiHost + '/api/boldbiembed/GetData');
      const data = await response.json();
      this.setState({ embedConfig: data });
      const embedConfig = this.state.embedConfig;
      console.log(this.state.embedConfig);
    } 
    catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    var dashboard = undefined;
    var querystring = require('querystring');
    var token = "";
    var userEmail = "";
    var userPassword = "";
      //  await fetch(apiHost + '/api/boldbiembed/GetData')
      // .then(response => {
      //   return response.json();
      // })
      // .then(data => {
      //   this.setState({ embedConfig: data });
      //   embedConfig = {data};
      //   const embedConfig = this.state.embedConfig;
      // })
      // .catch(error => {
      //   console.log(error);
      // });

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

      this.fetchData();
   
    fetch(this.state.embedConfig.ServerUrl+'/api/'+ this.state.embedConfig.SiteIdentifier +'/get-user-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify({
        UserId: this.state.embedConfig.userEmail,
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
      fetch(this.state.embedConfig.ServerUrl+'/api/'+ this.state.embedConfig.SiteIdentifier +'/v2.0/items?ItemType=2', {
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
        this.renderDashboard(arrayOfObjects[0], embedConfig);
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
