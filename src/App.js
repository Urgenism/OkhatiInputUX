import React from 'react';
import ToolBar from './components/ToolBar';
import Form from './components/Form';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <ToolBar />
        <Form />
      </div>
    );
  }
}

export default App;
