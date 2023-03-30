export interface DiagramProps {
    currentFloor: number;
    diff: number;
    floors: string[];
    moving: string;
    callElevator: (btnFloor: number, goUp: boolean) => void;
    handleTransitionEnd: () => void;
}

export interface Transform{
    move: number;
    bgSide: string;
    duration: number;
}