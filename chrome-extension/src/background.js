import { db } from './models/db'

let preference = { execute_title: true, execute_url: true, ages: [], categories: [], starting_time: '00:00', end_time: '23:59', url_blocked: [], key_blocked: [] }
let idsEmpty = []



/* chrome.tabs.onUpdated.addListener((tabid, change, tab) => {
  //const currentUrl = new URL(String(tab.url));
  //var currentTitle = tab.title;


}) */

function reloadRules() {
  db.preference
    .get(1)
    .then((data) => {
      preference = data
      let ids = []
      if (!(preference.url_blocked.length > 0)) {
        ids = idsEmpty
      }
      const rules = preference.url_blocked.map((c, index) => {
        ids.push(index + 2)
        return {
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
            redirect: { extensionPath: "/blocked.html" }
          },
          condition: {
            urlFilter: c,
            resourceTypes: [
              chrome.declarativeNetRequest.ResourceType.CSP_REPORT,
              chrome.declarativeNetRequest.ResourceType.FONT,
              chrome.declarativeNetRequest.ResourceType.IMAGE,
              chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
              chrome.declarativeNetRequest.ResourceType.MEDIA,
              chrome.declarativeNetRequest.ResourceType.OBJECT,
              chrome.declarativeNetRequest.ResourceType.OTHER,
              chrome.declarativeNetRequest.ResourceType.PING,
              chrome.declarativeNetRequest.ResourceType.SCRIPT,
              chrome.declarativeNetRequest.ResourceType.STYLESHEET,
              chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
              chrome.declarativeNetRequest.ResourceType.WEBSOCKET,
              chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST
            ]
          },
          id: index + 2,
          priority: 1,
        }
      }
      )

      chrome.declarativeNetRequest.updateDynamicRules(
        {
          addRules: rules,
          removeRuleIds: ids, // this removes old rule if any 
        },
        () => {
          console.log("block rule added")
        }
      )

    })
}

chrome.runtime.onMessage.addListener(function (message, callback) {
  if (message == "ReloadRules") {
    console.log("Reload Rules")
    //reloadRules()
  }
});

for (let i = 1; i <= 2000; i++) {
  idsEmpty.push(i)
}

//reloadRules()

export { }

/* const adblockRuleID = 2; // give any id to indetify the rule but must be greater than 1
+
+chrome.declarativeNetRequest.updateDynamicRules(
+  {
+    addRules: [
+      {
+        action: {
+          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
+          redirect: { extensionPath: "/blocked.html" }
+        },
+        condition: {
+          urlFilter: 'pornohub.com',
+          //regexFilter: '(^|^[^:]+:\/\/|[^\.]+\.)pornohub\.com/',
+          resourceTypes: [
+            chrome.declarativeNetRequest.ResourceType.CSP_REPORT,
+            chrome.declarativeNetRequest.ResourceType.FONT,
+            chrome.declarativeNetRequest.ResourceType.IMAGE,
+            chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
+            chrome.declarativeNetRequest.ResourceType.MEDIA,
+            chrome.declarativeNetRequest.ResourceType.OBJECT,
+            chrome.declarativeNetRequest.ResourceType.OTHER,
+            chrome.declarativeNetRequest.ResourceType.PING,
+            chrome.declarativeNetRequest.ResourceType.SCRIPT,
+            chrome.declarativeNetRequest.ResourceType.STYLESHEET,
+            chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
+            chrome.declarativeNetRequest.ResourceType.WEBSOCKET,
+            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST
+          ]
+        },
+        id: adblockRuleID,
+        priority: 1,
+      },
+    ],
+    removeRuleIds: [adblockRuleID], // this removes old rule if any
+  },
+  () => {
+    console.log("block rule added");
+  }
+); */


