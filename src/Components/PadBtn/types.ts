export interface MyProps {
    currentFloor: number;
    floors: string[];
    upFloorFunction: () => void;
    downFloorFunction: () => void;
    choseFloorFunction: (newFloor: number) => void;
}