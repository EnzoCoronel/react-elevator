export interface DiagramProps {
    currentFloor: number;
    floors: string[];
    moving: string;
    callAndGo: (btnFloor: number, goUp: boolean) => void;
}

export interface Transform{
    move: number;
    bgSide: string;
}