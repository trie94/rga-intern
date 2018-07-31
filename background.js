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

var xhr = new XMLHttpRequest();
xhr.open("GET", data_url, true);
xhr.onreadystatechange = () => {
  var resp = xhr.responseText;
  console.log(resp);
}
xhr.send();

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

chrome.tabs.onCreated.addListener((tab) => {

  let url;
  let title;
  let platform;

  start_hour = date.getHours();
  start_minute = date.getMinutes();

  fetch(data_url)
    .then(response => { return response.json(); })
    .then(data => {
      for (let i = 0; i < Object.keys(data.domains).length; i++) {
        for (let j = 0; j < data.domains[i].length; j++) {
          if (tab.url.includes(data.domains[i][j])) {
            platform = data.domains[i][0];
            console.log(platform);
            return platform;
          }
        }
      }
    });

  console.log("created", tab.url, tab.title);
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("on updated", tab);
})
chrome.tabs.onRemoved.addListener(() => {
  end_hour = date.getHours();
  end_minute = date.getMinutes();

  
  console.log("removed");
});