import React from 'react';
import './DashboardListing.css';
import '../index.css';
import '../index';
import { useState, useEffect } from 'react';
import {BoldBI} from '@boldbi/boldbi-embedded-sdk';
import Axios from 'axios';
import EmbedConfig from '../embedConfig';
import DataClass from '../Models/DataClass.cs';
// import embedConfig from '../embedConfig';

//var url;
//For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
//const siteIdentifier = "site/site1";
const siteIdentifier = embedConfig.SiteIdentifier;

//Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `onpremise`)
const environment = "onpremise";
//const environment = embedSettings.Environment;

//ASP.NET Core application would be run on http://localhost:61377/, which needs to be set as `apiHost`
const apiHost="http://localhost:61377"

//Bold BI Server URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
const rootUrl = "http://localhost:53150/bi";
// const rootUrl = embedSettings.ServerUrl;

//Url of the GetDetails action in ValuesController of the ASP.NET Core application
const authorizationUrl="/api/boldbiembed/getdetails";

//Enter your BoldBI credentials here
const userEmail= "nithya.gopal@syncfusion.com";
const userPassword= "Elikutty@531"; 
const userEmail= embedSettings.UserEmail;
const userPassword= embedSettings.UserPassword;
var BoldBiObj;

//var embedConfig;
var embedConfig = {
  SiteIdentifier : ""
  // Environment : "", ServerUrl : "", UserEmail : ""
};

class DashboardListing extends React.Component {
   constructor(props){
       super(props);
       this.state = {toke: undefined, items: []};
       this.stateConfig = {embedConfig: undefined, items: []};
       this.BoldBiObj = new BoldBI();
   };

   renderDashboard(data) {
    this.dashboard= BoldBI.create({
      serverUrl: rootUrl + "/" + siteIdentifier,
      dashboardId: data.Id,
      embedContainerId: "dashboard",
      embedType: BoldBI.EmbedType.Component,
      environment: environment=="onpremise"? BoldBI.Environment.Enterprise:BoldBI.Environment.Cloud,
      mode:BoldBI.Mode.View,
      width:"100%",
      height: window.innerHeight + 'px',
      expirationTime:100000,
      authorizationServer: {
          url:apiHost + authorizationUrl
      },
      //  embedConfig : this.state
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
    );
  }


  componentDidMount() {
    Axios.get(apiHost + '/api/boldbiembed/GetData')
      .then(response => {
        var result = response;
        this.setState({ embedConfig: response.data });
        embedConfig.SiteIdentifier = response.data.SiteIdentifier;
        // myObject = response.data;
        // myObject.Environment = response.data.Environment;
        // DataClass.Environment = response.data.Environment;
        // DataClass.ServerUrl =response.data.ServerUrl;
      })
      .catch(error => {
        console.log(error);
      });
    var dashboard = undefined;
    var querystring = require('querystring');
    var token = "";
    Axios.post(rootUrl+'/api/'+ siteIdentifier +'/get-user-key',
    querystring.stringify({
            UserId: userEmail,
            Password: userPassword
    }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => {
          var result = response;
          token = JSON.parse(result.data.Token).access_token;
          this.setState({ toke: token});
        //  this.state({embedConfig});
          //Get Dashboards
      Axios.get(rootUrl+'/api/'+ siteIdentifier +'/v2.0/items?ItemType=2',
      {
        headers: { 
          "Access-Control-Allow-Origin": "*",
          "Authorization":'bearer ' + this.state.toke
        }
      }).then(res => {
          var arrayOfObjects = res.data;
          this.setState({ items: arrayOfObjects});
         // EmbedConfig.getData();
           //this.GetData();
          // var getEmbedConfig = this.GetData();
          this.renderDashboard(arrayOfObjects[0]);
      },
      error => {
          this.setState({items: "error"});
      });
    },
    error => {
       this.setState({toke: "error"});
    });
  }  
  // GetData(response) {
  //   Axios.get(apiHost + '/api/boldbiembed/GetData')
  //     .then(response => {
  //       this.setState({ embedConfig: response.data });
  //       var result = response;
  //       configValue = JSON.parse(result.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  // }

// embedValue(data)
// {
//     url = data.ServerUrl;
// }
}
export default DashboardListing;
