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
  queue: queue[];
  stage: number;
  timeId: NodeJS.Timeout | number;
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
      queue: [],
      stage: 1,
      timeId: 0,
    };
  }

  //show if it is going up row down
  //show pressed btns

  findNextRequest = (direction: boolean) => {
    let amount = 0,
      closest!: queue; //the use of "!" is some sort of gambiarra to trick typescript?

    if (direction === true) {
      this.state.queue.forEach((element) => {
        if (element.newCount > this.state.count) {
          amount++;
          if (!closest) closest = element;
          if (
            element.newCount < closest.newCount &&
            element.goUpRequest !== false
          )
            closest = element;
          else if (closest.goUpRequest === false) closest = element;
        }
      });
      if (amount > 0) return closest;
    }

    if (direction === false) {
      this.state.queue.forEach((element) => {
        if (element.newCount < this.state.count) {
          amount++;
          if (!closest) closest = element;
          else if (
            element.newCount > closest.newCount &&
            element.goUpRequest !== true
          )
            closest = element;
          else if (closest.goUpRequest === true) closest = element;
        }
        console.log("element:", element, "closest:", closest);
      });
      if (amount > 0) return closest;
    }
  };

  addToQueue = (newFloor: number, newDirection?: boolean) => {
    let alredyPressed = this.state.queue.find(
      (element) => element.newCount === newFloor
    );
    if (alredyPressed || this.state.count === newFloor) return;
    this.setState(() => ({
      queue: [
        ...this.state.queue,
        { newCount: newFloor, goUpRequest: newDirection },
      ],
    }));

    //there is a bug where if you press a btn to fast after the idle-ground floor animation ends,
    //it will close and be stuck

    if (this.state.isGoingUp === true) {
      if (newFloor < this.state.newCount && newDirection !== false)
        this.setState(() => ({
          newCount: newFloor,
        }));
    }
    if (this.state.isGoingUp === false) {
      if (newFloor > this.state.newCount && newDirection !== true)
        this.setState(() => ({
          newCount: newFloor,
        }));
    }
    if (!this.state.queue[0]) {
      this.setState(() => ({
        moving: "left",
        newCount: newFloor,
        isGoingUp: true,
        stage: 1,
      }));
    }
  };

  nextInQueue = () => {
    let found: queue | undefined;
    let foundIndex: number;

    if (!this.state.queue[1]) {
      this.addToQueue(0, true);
      this.setState(() => ({
        moving: "left",
        newCount: 0,
        isGoingUp: false,
        queue: this.state.queue.filter(
          (item) => item.newCount != this.state.count
        ),
      }));
      return;
    }

    found = this.findNextRequest(this.state.isGoingUp);

    if (!found) {
      let oppositeDirection = this.state.isGoingUp ? false : true;
      found = this.findNextRequest(oppositeDirection);
      this.setState(() => ({
        isGoingUp: oppositeDirection,
      }));
    }

    console.log("found:", found);

    foundIndex = this.state.queue.findIndex((element) => element === found);

    this.setState(() => ({
      moving: "left",
      newCount: this.state.queue[foundIndex].newCount,
      queue: this.state.queue.filter(
        (item) => item.newCount != this.state.count
      ),
    }));
  };

  diff = (a: number, b: number) => (a > b ? a - b : b - a);

  onTransitionEnd = () => {
    let nextFloor = this.state.count;
    if (this.state.stage === 1) {
      if (this.state.newCount > this.state.count) nextFloor++;
      if (this.state.newCount < this.state.count) nextFloor--;
      this.setState(() => ({
        count: nextFloor,
      }));
      if (nextFloor === this.state.newCount) {
        this.setState(() => ({
          stage: this.state.stage + 1,
        }));
      }
    }
    if (this.state.stage === 2) {
      this.setState(() => ({
        moving: "right",
        stage: this.state.stage + 1,
      }));
    }
    if (this.state.stage === 3) {
      this.waitOccupant(0);
    }
  };

  callElevator = (btnFloor: number, goUp: boolean) => {
    this.addToQueue(this.state.floors.length - 1 - btnFloor, goUp);
  };

  choseFloor = (newFloor: number) => {
    this.addToQueue(newFloor);
  };

  waitOccupant = (close: number) => {
    let timeoutId: NodeJS.Timeout;
    if (close === 0) {
      timeoutId = setTimeout(() => {
        if (this.state.queue.length) this.nextInQueue();
        this.setState(() => ({
          stage: 1,
        }));
      }, 5000);
      this.setState(() => ({
        timeId: timeoutId,
      }));
    }
    if (close === 1) {
      if (this.state.timeId) {
        if (this.state.queue.length) this.nextInQueue();
        this.setState(() => ({
          stage: 1,
          timeId: 0,
        }));
      }
      clearTimeout(this.state.timeId);
    }
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
          closeDoor={this.waitOccupant}
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
