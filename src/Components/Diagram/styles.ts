import { Transform } from './types';
import styled from "styled-components";

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

export const Shaft = styled.div`
  background-color: yellow;
  position: absolute;
  left: 10%;
  height: 100%;
  width: 40%;
`;

export const Lift = styled.div<Transform>`
  background-color: gray;
  height: 20%;
  transform: translate(0, ${(props:Transform) => 400 - props.move*100}%);
`;
