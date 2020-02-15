import { Document } from 'mongoose';

export interface Story extends Document {
    point: number;
    status: string;
    content: string;
}
