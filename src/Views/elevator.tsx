import React, { Component } from "react";
import Diagram from "../Components/Diagram/Diagram";
import PadBtn from "../Components/PadBtn/PadBtn";
import { Grid } from "../styles";

interface IProps {}

interface IState {
  count: number;
  floors: string[];
}

class Elevator extends React.Component<IProps, IState> {
  constructor(props: IState) {
    super(props);

    this.state = {
      count: 0,
      floors: ["T", "1", "2", "3", "4"],
    };
  }

  increaseFloor = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  decreaseFloor = () => {
    this.setState((state) => ({
      count: state.count - 1,
    }));
  };

  choseFloor = (newFloor: number) => {
    this.setState(() => ({
      count: newFloor,
    }));
  };

  render() {
    return (
      <Grid>
        <PadBtn
          currentFloor={this.state.count}
          upFloorFunction={this.increaseFloor}
          downFloorFunction={this.decreaseFloor}
          choseFloorFunction={this.choseFloor}
          floors={this.state.floors}
        />
        <Diagram currentFloor={this.state.count} floors={this.state.floors} />
      </Grid>
    );
  }
}

export default Elevator;
