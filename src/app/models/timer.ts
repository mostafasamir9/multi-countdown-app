export interface Timer{
    id: number;
    descriptiom: string;
    endTime: Date;
    paused: boolean;
    remainingTime: number;
}