import React from "react";
import { DiagramProps } from "./types";
import { Building, Lift, Floor, Shaft, FloorBtns } from "./styles";

export default class Diagram extends React.Component<DiagramProps> {
  render() {
    return (
      <Building>
        <Shaft>
          <Lift
            move={this.props.currentFloor}
            bgSide={this.props.moving}
          ></Lift>
        </Shaft>
        {this.props.floors.map((floor, index) => {
          if (index == 0) {
            return (
              <Floor key={index}>
                <FloorBtns>
                  <button onClick={() => this.props.callAndGo(index, false)}>
                    Decrease
                  </button>
                </FloorBtns>
              </Floor>
            );
          }

          if (index == this.props.floors.length - 1) {
            return (
              <Floor key={index}>
                <FloorBtns>
                  <button onClick={() => this.props.callAndGo(index, true)}>
                    Increase
                  </button>
                </FloorBtns>
              </Floor>
            );
          }

          return (
            <Floor key={index}>
              <FloorBtns>
                <button onClick={() => this.props.callAndGo(index, true)}>
                  Increase
                </button>
                <button onClick={() => this.props.callAndGo(index, false)}>
                  Decrease
                </button>
              </FloorBtns>
            </Floor>
          );
        })}
      </Building>
    );
  }
}
