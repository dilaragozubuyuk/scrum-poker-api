import { AddStoryListDto } from './add-story-list.dto';

export class UpdateSessionDTO {
    readonly _id: string;
    readonly name: string;
    readonly numberOfVoters: number;
    readonly storyList: AddStoryListDto [];
}
