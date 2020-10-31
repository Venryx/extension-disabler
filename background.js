function resetStates() {
	for (key in localStorage) {
		if (key == "undefined" || typeof (key) == undefined|| key == "firstRun" || key == "disableAll" || localStorage.getItem(key) == null) {
			continue;
		}
		var storedEntry = JSON.parse(localStorage.getItem(key));
		storedEntry.bActivated = false;
		localStorage.setItem(key, JSON.stringify(storedEntry))
	}
}

/*function checkForValidUrl(tab) {
	for (key in localStorage) {
		if (key == "undefined" || typeof (key) == undefined|| key == "firstRun" || localStorage.getItem(key) == null) {
			continue;
		}
		var storedEntry = JSON.parse(localStorage.getItem(key));
		if (storedEntry.bActivated == false) {
			for (q in storedEntry.filterWords) {
				var patt = new RegExp(storedEntry.filterWords[q], 'i');
				if (patt.test(tab.url)) {
					//console.log(tab.url,storedEntry.name)
					storedEntry.bActivated = true;
					localStorage.setItem(key, JSON.stringify(storedEntry))
				}
			}
		}
	}
}*/

function setExt(url) {
	// go through and disable/enable extensions marked for activation
	console.log("Updating extension enablednesses...");
	chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 0]});
	chrome.browserAction.setBadgeText({text: ""});
	Object.keys(localStorage).forEach(function (key) {
		if (!(key == "undefined" || typeof (key) == undefined || key == "firstRun" || key == "disableAll" || localStorage.getItem(key) == null)) {
			var storedEntry = JSON.parse(localStorage.getItem(key));
			chrome.management.get(key, function (ext) {
				console.log('Updating for:' + JSON.stringify(storedEntry));
				let entryMatchesURL = storedEntry.filterWords.filter((urlPattern) => url.includes(urlPattern)).length > 0;

				if (entryMatchesURL) {
					chrome.browserAction.setBadgeBackgroundColor({ color: [100, 250, 100, 120] });
					chrome.browserAction.setBadgeText({ text: 'ON' });
					chrome.management.setEnabled(storedEntry.id, storedEntry.bEnable);
				} else {
					chrome.management.setEnabled(storedEntry.id, !storedEntry.bEnable);
				}
			});
		}
	})
}
/*chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'loading') {
		//Execute script when the page is fully (DOM) ready, otherwise EVENT FIRES TWICE!
		resetStates();
		chrome.windows.getAll({
			"populate": true
		}, function (window) {
			for (w in window) {
				for (t in window[w].tabs) {
					checkForValidUrl(window[w].tabs[t]);
				}
			}
			setExt(window[w].tabs[t].url);
		});
	}
});
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
	resetStates();
	chrome.windows.getAll({
		"populate": true
	}, function (window) {
		for (w in window) {
			for (t in window[w].tabs) {
				checkForValidUrl(window[w].tabs[t]);
			}
		}
		setExt(window[w].tabs[t].url);
	});
});*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status == 'loading') {
		setExt(tab.url);
	}
});
chrome.tabs.onActivated.addListener(info=> {
	let {tabId, windowId} = info;
	chrome.tabs.getSelected(null, function(tab) {
		console.log("Tab changed:" + tab.url);
		setExt(tab.url);
  	});
});

//on init get all
chrome.browserAction.setBadgeText({
	text: ""
});

/*chrome.windows.getAll({
	"populate": true
}, function (window) {
	resetStates();
	/*for (w in window) {
		for (t in window[w].tabs) {
			checkForValidUrl(window[w].tabs[t]);
		}
	}*#/
	setExt(window[w].tabs[t].url);
});*/