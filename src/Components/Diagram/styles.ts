import { Transform } from "./types";
import styled from "styled-components";

export const Building = styled.div`
  background-color: blue;
  height: 90vh;
  position: relative;
`;

export const Floor = styled.div`
  display: flex;
  display-direction: column;
  background-color: burlywood;
  width: 100%;
  height: 20%;
  border-bottom: 2px solid black;
  box-sizing: border-box;
`;

export const FloorBtns = styled.div`
  display: grid;
  grid-column-template: 1fr;
  position: absolute;
  left: 55%;
  margin-top: 6vh;
  background-color: lightgray;
`;

export const Shaft = styled.div`
  background-color: #404040;
  position: absolute;
  left: 10%;
  height: 100%;
  width: 40%;
`;

export const Lift = styled.div<Transform>`
  background: linear-gradient(to left, white 50%, silver 50%);
  background-position: ${(props: Transform) => props.bgSide};
  background-size: 200% 100%;
  height: 20%;
  transform: translate(0, ${(props: Transform) => 400 - props.move * 100}%);
  transition: all 2s ease,
    transform 1s linear;
`;
