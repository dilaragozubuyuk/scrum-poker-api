import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
    point: Number,
    status: String,
    content: String,
});
