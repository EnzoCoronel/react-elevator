import React from "react";
import { IPadButtonProps } from "./types";
import { Pannel } from "./styles";

export default class PadBtn extends React.Component<IPadButtonProps> {
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
