import { generateProfile } from '../js/generative-profile-system';
import { getAvgScore, getTotalTime, getReport } from '../js/report';

let bias = "left";
let cred = "low";
let totalNum = 20;
let user = generateProfile(bias, cred, totalNum, 5);
let score = getAvgScore(user);

export { bias, cred, totalNum, user, score };