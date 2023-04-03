import React from "react";
import { IPadButtonProps } from "./types";
import { Pannel, FloorDisplay, PannelBtn } from "./styles";

export default class PadBtn extends React.Component<IPadButtonProps> {
  render() {
    return (
      <Pannel>
        <FloorDisplay>
          {this.props.direction === true ? "↑ " : "↓ "}
          {this.props.currentFloor === 0 ? "G" : this.props.currentFloor}
        </FloorDisplay>
        {this.props.floors.map((floor, index) => {
          return (
            <PannelBtn
              onClick={() => this.props.choseFloor(index)}
              active={this.props.pressedBtns.find(
                (element) => element === index
              )}
            >
              {floor}
            </PannelBtn>
          );
        })}
        <PannelBtn onClick={() => this.props.closeDoor(1)}>{`>|<`}</PannelBtn>
      </Pannel>
    );
  }
}
