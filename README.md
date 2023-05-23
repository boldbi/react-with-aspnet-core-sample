# BoldBI Embedded Sample in React with ASP.NET Core

This project was generated using ASP.NET Core version 6.0 or a later version that is installed on your system before it was compiled. This Bold BI React with ASP.NET Core sample contains the Dashboard embedding samples. In this sample,React application act as the front-end, and ASP.NET Core acts as the back-end application. This sample demonstrates the dashboard rendering with the list of dashboards available in your Bold BI server.

## Dashboard view

![Dashboard View](https://github.com/boldbi/aspnet-core-sample/assets/91586758/4af68f49-ffc0-400a-a323-55a3f3600a1d)

 ## Requirements/Prerequisites
 
 * [.NET Core 6.0](https://dotnet.microsoft.com/en-us/download/dotnet-core)
 * [Node.js](https://nodejs.org/en/)

 ### Help link

 * https://help.boldbi.com/embedded-bi/faq/where-can-i-find-the-product-version/

 ### Supported browsers
  
  * Google Chrome, Microsoft Edge, Mozilla Firefox.

 ## Configuration

  * Ensure that you have enabled embed authentication on the embed settings [page](https://github.com/boldbi/aspnet-core-sample/assets/91586758/68695d1a-ebd0-4577-a6bb-d37e89e98379). If it is not enabled, enable it. Please refer to the following image.
   ![Embed Settings](https://github.com/boldbi/aspnet-core-sample/assets/91586758/b3a81978-9eb4-42b2-92bb-d1e2735ab007)

  * Download the embedConfig.json file by referring to this [link](https://help.boldbi.com/embedded-bi/site-administration/embed-settings/#get-embed-configuration-file). Please refer to the following image.
  
    ![Embed Settings Download](https://github.com/boldbi/aspnet-core-sample/assets/91586758/d27d4cfc-6a3e-4c34-975e-f5f22dea6172)
    ![EmbedConfig Properties](https://github.com/boldbi/aspnet-core-sample/assets/91586758/d6ce925a-0d4c-45d2-817e-24d6d59e0d63)

  * Copy the downloaded embedConfig.json file and place it into the following [location](https://github.com/boldbi/aspnet-core-sample/tree/master/BoldBI.Embed.Sample) of the application. Please refer to the following image.
    
    ![EmbedConfig image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/bdb83a3e-02e4-4e99-ad57-717438e5ec5c)


## How to run sample using command prompt 
    
  #### ASP.NET Core sample: 

  1. Open command prompt in this file [location](https://github.com/boldbi/react-with-aspnet-core-sample/tree/master/ASP.NET%20Core/BoldBI.Embed.Sample) of the back-end ASP.NET Core sample.

  2. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been restored, use the `dotnet build` command to build the project.
  
  3. Run the application using the command `dotnet run`.

  #### React sample:

  1. Open command prompt in this file [location](https://github.com/boldbi/react-with-aspnet-core-sample/tree/master/React) of the React sample.

  2. To install all dependent packages, use the following command `npm install`. To install the Bold BI Embedded SDK package using the following command `npm install -save @boldbi/boldbi-embedded-sdk`.

  3. To run the samples, use the following command `npm start`.

 ## Developer IDE

  * Visual studio code(https://code.visualstudio.com/download)

  ### How to run sample using visual studio code

  #### ASP.NET Core sample: 

  1. Open the Visual Studio code in this file [location](https://github.com/boldbi/react-with-aspnet-core-sample/tree/master/ASP.NET%20Core/BoldBI.Embed.Sample) of the back-end ASP.NET Core sample.

  2. Open the terminal in Visual Studio Code. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been restored, use the `dotnet build` command to build the project.
  
  3. Run the application using the command `dotnet run`. After executing the command, the application will automatically launch in the default browser, accessible at the specific port number (https://localhost:5001/api/boldbiembed). Please refer to the following image.
    
      ![dashboard image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/ce4e53c0-d4c4-406b-82bd-13dc77427f2e)

  #### React sample:

  1. Open the Visual Studio in this file [location](https://github.com/boldbi/react-with-aspnet-core-sample/tree/master/React) of the React sample.

  2. To install all dependent packages, use the following command `npm install`. To install the Bold BI Embedded SDK package using the following command `npm install -save @boldbi/boldbi-embedded-sdk`.

  3. To run the samples, use the following command `npm start`. After executing the command, the application will automatically launch in the default browser, accessible at the specific port number (http://localhost:3000). Please refer to the following image.

     ![dashboard view](https://github.com/boldbi/aspnet-core-sample/assets/91586758/7a9786ba-6dc1-4661-b8bb-3bad3d6dcc9a)

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

```bash
npm test
```

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

```bash
npm run build
```

Please refer to the [help documentation](https://help.boldbi.com/embedded-bi/javascript-based/samples/v3.3.40-or-later/react-core/#how-to-run-the-sample) to know how to run the sample.

## Important notes

It is recommended to not store passwords and sensitive information in configuration files for security reasons, in a real-world application. Instead, you should consider using a secure application, such as Key Vault, to safeguard your credentials.

## Online demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed).


## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/).
