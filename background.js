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

// const temp = () => {
//   return fetch(data_url)
//     .then(response => { return response.json(); })
//     .then(data => {
//       data_pool = data;
//       return data_pool;
//     });
// }

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

  // chrome.history.search({ text: 'develop', maxResults: 3 }, (data) => {
  //   let page = data[0];
  //   for (let i = 0; i < data.length; i++) {
  //     media_intake.domain = page.url;
  //     media_intake.topic = page.title;
  //     media_intake.issue = page.title;
  //     media_intake.visit_time = page.lastVisitTime;

  //     user_data[i] = media_intake;
  //   }
  //   // console.log(user_data);
  // });
});

chrome.history.onVisitRemoved.addListener(() => {
  console.log("exit");
});