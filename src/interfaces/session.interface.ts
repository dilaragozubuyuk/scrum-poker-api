import { Document } from 'mongoose';
import { Story } from './story.interface';

export interface Session extends Document {
    name: string;
    numberOfVoters: number;
    storyList: Story[];
}
