import styled from "styled-components";
import { Transform } from "./types";

export const Pannel = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  margin: 1rem;
`;

export const FloorDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-start: 1;
  grid-column-end: 3;
  background-color: black;
  color: red;
  font-size: 64px;
  font-family: "Segment7Standard";
  font-weight: normal;
  font-style: italic;
`;

export const PannelBtn = styled.button<Transform>`
  font-size: 32px;
  border-radius: 50%;
  ${({ active }) => active && `
  color: red;
  `}
`;
