import * as mongoose from 'mongoose';
import {StorySchema} from './story.schema';
export const SessionSchema = new mongoose.Schema({
    name: String,
    numberOfVoters: Number,
    storyList: [StorySchema],
});
