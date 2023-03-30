import React, { Component } from "react";
import Diagram from "../Components/Diagram/Diagram";
import PadBtn from "../Components/PadBtn/PadBtn";
import { Grid } from "../styles";

interface IProps {}

interface queue {
  newCount: number;
  goUpRequest: boolean;
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

  //show if it is going up row down
  //show pressed btns

  findNextFloor = (direction: boolean) => {
    this.state.queue.sort(function (a, b) {
      return a.newCount - b.newCount;
    }); //create an utils for these

    if (direction === true) {
      return this.state.queue.find(
        (element) => element.newCount > this.state.count
      );
    }

    this.state.queue.sort(function (a, b) {
      return b.newCount - a.newCount;
    }); //create an utils for these

    if (direction === false) {
      return this.state.queue.find(
        (element) => element.newCount < this.state.count
      );
    }
  };

  addToQueue = (newFloor: number, newDirection: boolean) => {
    let alredyPressed = this.state.queue.find(
      (element) => element.newCount === newFloor
    );
    if (alredyPressed) return;
    this.setState(() => ({
      queue: [
        ...this.state.queue,
        { newCount: newFloor, goUpRequest: newDirection },
      ],
    }));

    if (!this.state.queue[0])
      this.setState(() => ({
        moving: "left",
        newCount: newFloor,
        isGoingUp: newDirection,
      }));
    //console.log(this.state);
  };

  nextInQueue = () => {
    let found: queue | undefined;
    let foundIndex: number;

    if (!this.state.queue[1]) {
      this.setState(() => ({
        moving: "left",
        newCount: 0,
        isGoingUp: false,
        queue: this.state.queue.slice(1),
      }));
      return;
    }

    found = this.findNextFloor(this.state.isGoingUp);

    if (!found) {
      let oppositeDirection = this.state.isGoingUp ? false : true;
      found = this.findNextFloor(oppositeDirection);
      this.setState(() => ({
        isGoingUp: oppositeDirection,
      }));
    }

    foundIndex = this.state.queue.findIndex((element) => element === found);

    this.setState(() => ({
      moving: "left",
      newCount: this.state.queue[foundIndex].newCount,
      isGoingUp: this.state.queue[foundIndex].goUpRequest,
      queue: this.state.queue.filter(
        (item) => item.newCount != this.state.count
      ),
    }));
  };

  onTransitionEnd = () => {
    //console.log(this.state.stage);
    console.log(this.state.queue);
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
    this.addToQueue(this.state.floors.length - 1 - btnFloor, goUp);
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
