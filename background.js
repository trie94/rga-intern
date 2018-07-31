'use strict';

// user data
let domain, topic, issue, visit_time = [];
let duration;

let media_intake = {
  "domain": domain,
  "topic": topic,
  "issue": issue,
  "time": visit_time,
  "duration": duration
};

const data_url = chrome.runtime.getURL("src/data/data-pool.json");
let data_pool;

const user_url = chrome.runtime.getURL("src/data/userdata-template.js");
let user_data = [];

// time
let date = new Date();
let start_hour = date.getHours();
let start_minute = date.getMinutes();

let end_hour;
let end_minute;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    // console.log("value is set to", color);
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.history.onVisited.addListener((res) => {

  let url = res.url;
  let platform;

  return fetch(data_url)
    .then(response => { return response.json(); })
    .then(data => {
      for (let i = 0; i < Object.keys(data.domains).length; i++) {
        for (let j = 0; j < data.domains[i].length; j++) {
          if (url.includes(data.domains[i][j])) {
            platform = data.domains[i][0];
            console.log(platform);
            return platform;
          }
        }
      }
    });
});

chrome.history.onVisitRemoved.addListener(() => {
  console.log("exit");
});