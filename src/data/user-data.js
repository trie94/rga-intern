import { generateProfile } from '../js/generative-profile-system';
import { getAvgScore, getTotalTime, getReport } from '../js/report';

let bias = "left";
let user = generateProfile(bias, "low", 20, 5);
let score = getAvgScore(user);

export { bias, user, score };