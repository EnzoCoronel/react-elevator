import React, { Component } from "react";
import Diagram from "../Components/Diagram/Diagram";
import PadBtn from "../Components/PadBtn/PadBtn";
import { Grid } from "../styles";

interface IProps {}

interface queue {
  newCount: number;
  isGoingUp: boolean;
}
interface IState {
  count: number;
  newCount: number;
  floors: string[];
  moving: string;
  isGoingUp: boolean;
  idle: boolean;
  queue: queue[];
  stage: number;
}

class Elevator extends React.Component<IProps, IState> {
  constructor(props: IState) {
    super(props);

    this.state = {
      count: 0,
      newCount: 0,
      floors: ["G", "1", "2", "3", "4"],
      moving: "right",
      isGoingUp: true,
      idle: true,
      queue: [],
      stage: 1,
    };
  }

  //changeDirection
  //reverseQueue
  
  addToQueue = (newFloor: number, newDirection: boolean) => {
    const newRequest = { count: newFloor, isGoingUp: newDirection };
    this.setState(() => ({
      queue: [
        ...this.state.queue,
        { newCount: newFloor, isGoingUp: newDirection },
      ],
    }));
    if (!this.state.queue[0])
      this.setState(() => ({
        moving: "left",
        newCount: newFloor,
        isGoingUp: newDirection,
      }));
    console.log(this.state);
  };

  nextInQueue = () => {
    if (!this.state.queue[1]) {
      this.setState(() => ({
        moving: "left",
        newCount: 0,
        isGoingUp: false,
      }))
    } else {
      this.setState(() => ({
        moving: "left",
        newCount: this.state.queue[1].newCount,
        isGoingUp: this.state.queue[1].isGoingUp,
        queue: this.state.queue.slice(1),
      }));
    }
  };

  onTransitionEnd = () => {
    console.log(this.state.stage);
    if (this.state.stage === 1) {
      this.setState(() => ({
        count: this.state.newCount,
        stage: this.state.stage + 1,
      }));
    }
    if (this.state.stage === 2) {
      this.setState(() => ({
        moving: "right",
        stage: this.state.stage + 1,
      }));
    }
    if (this.state.stage === 3) {
      if (this.state.queue.length) this.nextInQueue();
      this.setState(() => ({
        stage: 1,
      }));
    }
  };

  callElevator = (btnFloor: number, goUp: boolean) => {
    this.addToQueue(btnFloor, goUp);
    if (this.state.queue.length === 1) this.nextInQueue();
    // this.setState(() => ({
    //   newCount: this.state.floors.length - btnFloor - 1,
    //   moving: "left",
    //   isGoingUp: goUp,
    // }));
  };

  choseFloor = (newFloor: number) => {
    this.addToQueue(newFloor, this.state.isGoingUp);
  };

  render() {
    return (
      <Grid>
        <link
          rel="stylesheet"
          media="screen"
          href="https://fontlibrary.org//face/segment7"
          type="text/css"
        />

        <PadBtn
          currentFloor={this.state.count}
          floors={this.state.floors}
          choseFloor={this.choseFloor}
        />
        <Diagram
          currentFloor={this.state.count}
          floors={this.state.floors}
          moving={this.state.moving}
          callElevator={this.callElevator}
          handleTransitionEnd={this.onTransitionEnd}
        />
      </Grid>
    );
  }
}

export default Elevator;
