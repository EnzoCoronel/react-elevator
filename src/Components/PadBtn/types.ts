export interface MyProps {
    currentFloor: number;
    floors: string[];
    choseFloor: (newFloor: number) => void;
}