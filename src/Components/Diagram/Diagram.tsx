import React from "react";
import { DiagramProps } from "./types";
import { Building, Lift, Floor, Shaft, FloorBtns } from "./styles";

export default class Diagram extends React.Component<DiagramProps> {
  destructuring = () => {
    let floorsInBetween = [];
    let lastFloor = (
      <Floor key={this.props.floors.length - 1}>
        <FloorBtns>
          <button
            onClick={() =>
              this.props.callElevator(this.props.floors.length - 1, true)
            }
          >
            ▲
          </button>
        </FloorBtns>
      </Floor>
    );
    let firstFloor = (
      <Floor key={0}>
        <FloorBtns>
          <button onClick={() => this.props.callElevator(0, false)}>▼</button>
        </FloorBtns>
      </Floor>
    );
    for (let index = 1; index < this.props.floors.length - 1; index++) {
      floorsInBetween.push(
        <Floor key={index}>
          <FloorBtns>
            <button onClick={() => this.props.callElevator(index, true)}>
              ▲
            </button>
            <button onClick={() => this.props.callElevator(index, false)}>
              ▼
            </button>
          </FloorBtns>
        </Floor>
      );
    }
    const building: JSX.Element[] = [firstFloor, ...floorsInBetween, lastFloor];
    return building;
  };
  render() {
    return (
      <Building>
        <Shaft>
          <Lift
            onTransitionEnd={this.props.handleTransitionEnd}
            move={this.props.currentFloor}
            bgSide={this.props.moving}
            duration={this.props.diff}
          ></Lift>
        </Shaft>
        {this.destructuring()}
      </Building>
    );
  }
}
