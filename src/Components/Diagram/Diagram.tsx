import React from "react";
import { MyProps } from "./types";
import { Building, Lift, Floor, Shaft } from "./styles";

export default class Diagram extends React.Component<MyProps> {
  render() {
    return (
      <Building>
        <Shaft>
          <Lift move={this.props.currentFloor}></Lift>
        </Shaft>
        {this.props.floors.map((floor, index) => {
          return <Floor key={index} />;
        })}
      </Building>
    );
  }
}
