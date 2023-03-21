import React, { Component } from "react";
import Diagram from "../Components/Diagram/Diagram";
import PadBtn from "../Components/PadBtn/PadBtn";
import { Grid } from "../styles";

interface IProps {}

interface IState {
  count: number;
  floors: string[];
  moving: string;
}

class Elevator extends React.Component<IProps, IState> {
  constructor(props: IState) {
    super(props);

    this.state = {
      count: 0,
      floors: ["T", "1", "2", "3", "4"],
      moving: "right",
    };
  }

  callAndGo = (btnFloor: number, goUp: boolean) => {
    this.setState(() => ({
      moving: "left",
    }));
    setTimeout(() => {
      this.setState(() => ({
        count: this.state.floors.length - btnFloor - 1,
      }));
    }, 2000);
    setTimeout(() => {
      this.setState(() => ({
        moving: "right",
      }));
    }, 4000);
    setTimeout(() => {
      this.setState(() => ({
        moving: "left",
      }));
    }, 6000);
    setTimeout(() => {
      if (goUp === true) {
        this.setState((state) => ({
          count: state.count + 1,
        }));
      }
      else{
        this.setState((state) => ({
          count: state.count - 1,
        }));
      }
    }, 8000);
    setTimeout(() => {
      this.setState(() => ({
        moving: "right",
      }));
    }, 10000);
  };

  choseFloor = (newFloor: number) => {
    this.setState(() => ({
      moving: "left",
    }));
    setTimeout(() => {
      this.setState(() => ({
        count: newFloor,
      }));
    }, 2000);
    setTimeout(() => {
      this.setState(() => ({
        moving: "right",
      }));
    }, 4000);
  };

  render() {
    return (
      <Grid>
        <PadBtn
          currentFloor={this.state.count}
          floors={this.state.floors}
          choseFloor={this.choseFloor}
        />
        <Diagram
          currentFloor={this.state.count}
          floors={this.state.floors}
          moving={this.state.moving}
          callAndGo={this.callAndGo}
        />
      </Grid>
    );
  }
}

export default Elevator;
