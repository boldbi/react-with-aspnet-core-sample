import React from 'react';
import DashboardListing from './DashboardListing/DashboardListing';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfc3RdRGdZUEJ1Xko=');

class App extends React.Component {
render() {
   return (
     <div>
     <DashboardListing/>
     </div>
     );
    }
}

export default App;