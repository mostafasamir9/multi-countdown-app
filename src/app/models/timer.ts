export interface Timer{
    id: number;
    description: string;
    endTime: Date;
    paused: boolean;
    remainingTime: number;
    originalTime: number;
}