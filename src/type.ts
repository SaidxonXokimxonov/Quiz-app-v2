export type Data = {
    score: number,
    currentLevel: number,
    correctAnswers: number,
    idxes: Number[],
    levels: any[]
};

export type HistoryItem = {
    currentPlayer: string;
    hisData: any[];
    hisCurrentCase: any;
};  