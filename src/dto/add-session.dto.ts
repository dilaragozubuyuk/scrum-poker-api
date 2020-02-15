import { AddStoryListDto } from './add-story-list.dto';

export class AddSessionDTO {
    readonly name: string;
    readonly numberOfVoters: number;
    readonly storyList: AddStoryListDto [];
}
