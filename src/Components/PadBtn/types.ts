export interface IPadButtonProps {
    currentFloor: number;
    floors: string[];
    choseFloor: (newFloor: number) => void;
}