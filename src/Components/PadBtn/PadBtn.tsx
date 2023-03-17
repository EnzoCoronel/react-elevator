import React from "react";
import { MyProps } from "./types";
import { Pannel } from "./styles";

export default class PadBtn extends React.Component<MyProps> {
  render() {
    return (
      <Pannel>
        <button onClick={this.props.upFloorFunction}> Increase </button>
        <button onClick={this.props.downFloorFunction}> Decrease </button>
        {this.props.floors.map((floor, index) => {
          return (
            <button onClick={() => this.props.choseFloorFunction(index)}>
              {floor}
            </button>
          );
        })}
        {this.props.currentFloor}
      </Pannel>
    );
  }
}
