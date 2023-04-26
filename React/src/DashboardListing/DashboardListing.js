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

var embedConfig = "";


//For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
const siteIdentifier = "site/site1";
//let siteIdentifier = embedConfig.SiteIdentifier;
//Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `onpremise`)
//let environment = this.state.environment;
const environment = "onpremise";

//ASP.NET Core application would be run on http://localhost:61377/, which needs to be set as `apiHost`
const apiHost="http://localhost:61377"

//Bold BI Server URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
const rootUrl = "http://localhost:53150/bi";
// const rootUrl = embedSettings.ServerUrl;

//Url of the GetDetails action in ValuesController of the ASP.NET Core application
const authorizationUrl="/api/boldbiembed/getdetails";

//Enter your BoldBI credentials here
const userEmail= "nithya.gopal@syncfusion.com";
const userPassword= "nithya@531"; 
// const userEmail= embedSettings.UserEmail;
// const userPassword= embedSettings.UserPassword;
var BoldBiObj;
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

   renderDashboard(data, embedConfig) {
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
              {this.state.items.map((el, e2) => 
                <button className="dashboard-item" attr-name ={el.Name} attr-id = {el.Id} value={el} onClick={((e) => this.renderDashboard(el, e2))} >
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

 ChildComponent(props) {
          {/* <div>
        <ChildComponent embedConfig = {this.state.embedConfig} />
      </div> */}
    // Use the embedConfig prop to render something
    return <p>{props.embedConfig.SiteIdentifier}</p>;
  }
  doSomethingWithData(embedConfig)
  {
    console.log(embedConfig.Environment);
    this.setState({ environment: embedConfig.Environment });
    this.setState({ siteIdentifier: embedConfig.SiteIdentifier});
    this.setState({ embedConfig});
  }
   
  componentDidMount() {
       fetch(apiHost + '/api/boldbiembed/GetData')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ embedConfig: data });
        this.doSomethingWithData(embedConfig);
      })
      .catch(error => {
        console.log(error);
      });
    
    var dashboard = undefined;
    var querystring = require('querystring');
    var token = "";
    fetch(rootUrl+'/api/'+ siteIdentifier +'/get-user-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: querystring.stringify({
        UserId: userEmail,
        Password: userPassword
      })
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      token = JSON.parse(data.Token).access_token;
      this.setState({ toke: token });
      //Get Dashboards
      fetch(rootUrl+'/api/'+ siteIdentifier +'/v2.0/items?ItemType=2', {
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
