'use strict';

// media data
let domain, topic, issue, visit_time = [];

// time
let date = new Date();
let start_hour, start_minute, end_hour, end_minute, duration;

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

// request data
let xhr = new XMLHttpRequest();
xhr.open("GET", data_url, true);
xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status === 200) {
    data_pool = JSON.parse(xhr.responseText);
    // console.log(data_pool);
  }
}
xhr.send();

// test
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

// when new tab created
chrome.tabs.onCreated.addListener((tab) => {

  let url;
  let title;
  let platform;

  // get the start time
  start_hour = date.getHours();
  start_minute = date.getMinutes();

  // check the data pool
  if (data_pool == null || data_pool == undefined) {
    return;
  } else {
    console.log("data_pool: ", data_pool.domains);
  }


  for (let i = 0; i < Object.keys(data_pool.domains).length; i++) {
    for (let j = 0; j < data_pool.domains[i].length; j++) {
      if (tab.url.includes(data_pool.domains[i][j])) {
        platform = data_pool.domains[i][0];
        console.log(platform);
      }
    }
  }

  // fetch(data_url)
  //   .then(response => { return response.json(); })
  //   .then(data => {
  //     for (let i = 0; i < Object.keys(data.domains).length; i++) {
  //       for (let j = 0; j < data.domains[i].length; j++) {
  //         if (tab.url.includes(data.domains[i][j])) {
  //           platform = data.domains[i][0];
  //           console.log(platform);
  //           console.log(typeof data);
  //           return platform;
  //         }
  //       }
  //     }
  //   });

  console.log("created", tab.url, tab.title);
});


// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log("on updated", tab);
// });

chrome.tabs.onRemoved.addListener(() => {
  end_hour = date.getHours();
  end_minute = date.getMinutes();


  console.log("removed");
});