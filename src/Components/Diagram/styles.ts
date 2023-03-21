import { transform } from "typescript";
import { Transform } from "./types";
import styled, { keyframes } from "styled-components";

export const Building = styled.div`
  background-color: blue;
  width: 50vw;
  height: 90vh;
  position: relative;
`;

export const Floor = styled.div`
  display: flex;
  display-direction: column;
  background-color: burlywood;
  width: 100%;
  height: 20%;
`;

export const FloorBtns = styled.div`
  position: absolute;
  right: 0;
`;

export const Shaft = styled.div`
  background-color: yellow;
  position: absolute;
  left: 10%;
  height: 100%;
  width: 40%;
`;

export const Lift = styled.div<Transform>`
  background: linear-gradient(to left, white 50%, gray 50%);
  background-position: ${(props: Transform) => props.bgSide};
  background-size: 200% 100%;
  height: 20%;
  transform: translate(0, ${(props: Transform) => 400 - props.move * 100}%);
  transition: all 2s ease;
`;
