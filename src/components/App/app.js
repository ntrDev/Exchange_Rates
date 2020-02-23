import React from 'react';
// import InputData from '../InputData/inputData';
import GetCurrents from '../GetCurrents/getCurrents';
import Charts from '../Charts/charts';

const App = () => {
  return (
    <div className="App">
      	{/* <InputData /> */}
        <GetCurrents />
        <Charts/>
    </div>
  );
}

export default App;
