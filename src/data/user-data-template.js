import { generateProfile } from '../js/generative-profile-system';

let profiles_template = {
    "p1": {
        "bias": "center",
        "cred": "high",
        "totalNum": 15,
        "avgTime": 10,
        "profile": generateProfile("center", "high", 15, 10)
    },
    "p2": {
        "bias": "left",
        "cred": "mid",
        "totalNum": 5,
        "avgTime": 15,
        "profile": generateProfile("left", "mid", 5, 15)
    },
    "p3": {
        "bias": "far_right",
        "cred": "low",
        "totalNum": 20,
        "avgTime": 10,
        "profile": generateProfile("far_right", "low", 20, 10)
    },
    "p4": {
        "bias": "center",
        "cred": "mid",
        "totalNum": 25,
        "avgTime": 10,
        "profile": generateProfile("center", "mid", 25, 10)
    },
    "p5": {
        "bias": "mid_left",
        "cred": "mid",
        "totalNum": 20,
        "avgTime": 15,
        "profile": generateProfile("mid_left", "mid", 20, 15)
    },
    "p6": {
        "bias": "right",
        "cred": "low",
        "totalNum": 15,
        "avgTime": 5,
        "profile": generateProfile("right", "low", 15, 5)
    }
};

export { profiles_template };