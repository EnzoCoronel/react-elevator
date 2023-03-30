export interface DiagramProps {
    currentFloor: number;
    floors: string[];
    moving: string;
    callElevator: (btnFloor: number, goUp: boolean) => void;
    handleTransitionEnd: () => void;
}

export interface Transform{
    move: number;
    bgSide: string;
}