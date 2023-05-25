# Bold BI Embedded Sample in React with ASP.NET Core

This project was created using ASP.NET Core 6.0. The purpose of this application is to demonstrate how to render the dashboard available on your Bold BI server.

## Dashboard view

![Dashboard View](https://github.com/boldbi/aspnet-core-sample/assets/91586758/4af68f49-ffc0-400a-a323-55a3f3600a1d)

 ## Requirements/Prerequisites
 
 * [.NET Core 6.0](https://dotnet.microsoft.com/en-us/download/dotnet-core)
 * [Node.js](https://nodejs.org/en/)
 
 > **NOTE:** The version of Node.js is 14.16.

 #### Help link

 * https://help.boldbi.com/embedded-bi/faq/where-can-i-find-the-product-version/

 #### Supported browsers
  
  * Google Chrome, Microsoft Edge, Mozilla Firefox, and Safari.

 ## Configuration

  * Please ensure that you have enabled embed authentication on the `embed settings` page. If it is not currently enabled, please refer to the following image or detailed [instructions](https://help.boldbi.com/embedded-bi/site-administration/embed-settings/#get-embed-configuration-file) to enable it.
   ![Embed Settings](https://github.com/boldbi/aspnet-core-sample/assets/91586758/b3a81978-9eb4-42b2-92bb-d1e2735ab007)

  * To download the `embedConfig.json` file, please follow this [link](https://help.boldbi.com/embedded-bi/site-administration/embed-settings/#get-embed-configuration-file) for reference. Additionally, you can refer to the following image for visual guidance.
  
    ![Embed Settings Download](https://github.com/boldbi/aspnet-core-sample/assets/91586758/d27d4cfc-6a3e-4c34-975e-f5f22dea6172)
    ![EmbedConfig Properties](https://github.com/boldbi/aspnet-core-sample/assets/91586758/d6ce925a-0d4c-45d2-817e-24d6d59e0d63)

  * Copy the downloaded embedConfig.json file and paste it into the designated [location](https://github.com/boldbi/react-with-aspnet-core-sample/tree/master/ReactwithASP.NETCore) within the application. Please ensure that you have placed it in the application as shown in the following image.
    
    ![EmbedConfig image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/bdb83a3e-02e4-4e99-ad57-717438e5ec5c)


## Run a Sample Using Command Prompt

  1. Open the command prompt and navigate to the specified file [location](https://github.com/boldbi/react-with-aspnet-core-sample/tree/master/ReactwithASP.NETCore) where the project is located.

  2. To install all dependent packages, use the following command `npm install`.

  3. Execute the command `dotnet restore` to restore the necessary packages. Once the packages have been successfully restored, use the `dotnet build` command to build the project.
  
  4. Finally, run the application using the command `dotnet run`.

 ## Developer IDE

  * Visual studio code(https://code.visualstudio.com/download)

  ### Run a Sample Using Visual Studio Code

  1. Open the React with ASP.NET Core sample in Visual Studio Code.

  2. To install all dependent packages, use the following command `npm install`.

  3. Open the terminal in Visual Studio Code and execute the command `dotnet restore` to restore the required dependencies.
 
  4. Build your .NET project by executing the `dotnet build` command in the terminal.
  
  5. To run the application, use the command `dotnet run` in the terminal. After executing the command, the application will automatically launch in the default browser. You can access it at the specified port number (e.g., https://localhost:5001/).
    
      ![dashboard image](https://github.com/boldbi/aspnet-core-sample/assets/91586758/cc794823-84a3-45cb-92a5-f38991902121)

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
