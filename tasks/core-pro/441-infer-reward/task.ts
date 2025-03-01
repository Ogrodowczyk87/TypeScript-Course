
export type RewardRadar<T extends string> =
    T extends `${infer _Pre}[${infer Value}$]${infer Rest}`
    ? Value extends "0"
    ? RewardRadar<Rest>
    : `${Value}$`
    : T extends `${infer _Pre}[${infer _NonReward}]${infer Rest}`
    ? RewardRadar<Rest>
    : null;
