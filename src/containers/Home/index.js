import React from 'react';
import Helmet from 'react-helmet';
import IntlMessages from '../../components/utility/intlMessages';
const App = () => {
  return (
    <div>
      <Helmet
        title="Home Page"
        meta={[
          {
            name: 'description',
            content: 'A React.js Web Base of Enouvo',
          },
        ]}
      />
      <div className="App">
        <div className="App-header">
          <h2>
            <IntlMessages id="sidebar.dashboard" />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default App;
