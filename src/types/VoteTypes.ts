export interface VoteData {
  title: string;
  desc: string;
  items: VoteItems;
  max: number;
  disabled: boolean;
}

export interface VoteDatas {
  [id: number]: VoteData;
}

export interface VoteItems {
  [index: number]: string;
}

export interface VoteResultsData {
  [id: number]: VoteResultData;
}

export interface VoteResultData {
  [item: number]: number;
}