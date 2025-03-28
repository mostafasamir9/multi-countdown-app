export interface Timer{
    id: number;
    description: string;
    endTime: Date|null;
    paused: boolean|null;
    remainingTime: number|null;
    originalTime: number|null;
    notified: boolean;
    type: string;
    color: string;
    
}

