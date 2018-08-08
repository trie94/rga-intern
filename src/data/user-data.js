import { generateProfile } from '../js/generative-profile-system';
import { getAvgScore, getTotalTime, getReport } from '../js/report';

let bias = "center";
let cred = "high";
let totalNum = 20;
let user = generateProfile(bias, cred, totalNum, 5);
let score = getAvgScore(user);

export { bias, cred, totalNum, user, score };