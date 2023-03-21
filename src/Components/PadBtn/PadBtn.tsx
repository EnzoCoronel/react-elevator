import React from "react";
import { MyProps } from "./types";
import { Pannel } from "./styles";

export default class PadBtn extends React.Component<MyProps> {
  render() {
    return (
      <Pannel>
        {this.props.floors.map((floor, index) => {
          return (
            <button onClick={() => this.props.choseFloor(index)}>
              {floor}
            </button>
          );
        })}
        {this.props.currentFloor}
      </Pannel>
    );
  }
}
