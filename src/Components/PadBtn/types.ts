export interface IPadButtonProps {
    currentFloor: number;
    floors: string[];
    upFloorFunction: () => void;
    downFloorFunction: () => void;
    choseFloorFunction: (newFloor: number) => void;
}