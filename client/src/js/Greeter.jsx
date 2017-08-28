import React, { Component } from 'react';
import { Button } from 'antd';
import "../css/Greeter.css";

class Greeter extends Component {
  render() {
    return (
      <div className="Greeter">
        HELLO WX, This is a React Project!
        <Button type="primary">Primary Button Of Ant Design</Button>
      </div>
    );
  }
}

export default Greeter;
