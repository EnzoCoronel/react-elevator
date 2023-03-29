export interface IPadButtonProps {
    direction: boolean;
    currentFloor: number;
    floors: string[];
    pressedBtns: number[];
    choseFloor: (newFloor: number) => void;
}

export interface Transform{
    active: number | undefined;
}