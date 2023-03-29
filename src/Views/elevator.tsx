import React, { Component } from "react";
import Diagram from "../Components/Diagram/Diagram";
import PadBtn from "../Components/PadBtn/PadBtn";
import { Grid } from "../styles";

interface IProps {}

interface queue {
  newCount: number;
  goUpRequest?: boolean;
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
    let min = this.state.count,
      max = this.state.count,
      amount = 0,
      closest;

    if (direction === true) {
      this.state.queue.forEach((element) => {
        if (element.newCount > this.state.count) amount++;
        if (element.newCount > max) max = element.newCount;
        if (element.newCount <= max && element.newCount > this.state.count)
          closest = element;
      });
      if (amount > 0) return closest;
    }

    if (direction === false) {
      this.state.queue.forEach((element) => {
        if (element.newCount < this.state.count) amount++;
        if (element.newCount < min) min = element.newCount;
        if (element.newCount >= min && element.newCount < this.state.count)
          closest = element;
      });
      if (amount > 0) return closest;
    }
  };

  addToQueue = (newFloor: number, newDirection?: boolean) => {
    console.log(this.state.queue.map((element) => element.newCount));
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
        isGoingUp: true,
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
          direction={this.state.isGoingUp}
          currentFloor={this.state.count}
          floors={this.state.floors}
          pressedBtns={this.state.queue.map((element) => element.newCount)}
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
