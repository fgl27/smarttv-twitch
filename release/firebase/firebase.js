window.dataLayer = window.dataLayer || [];
function gtag() {

	try {

		dataLayer.push(arguments);

	} catch (e) {

		console.log("gtag e " + e);

	}
}

function Main_Startfirebase() {

	Main_setTimeout(Main_firebaseInitializeApp);

}

function Main_firebaseInitializeApp() {

	var firebaseConfig = {
		apiKey: "AIzaSyDU1477wMbrpHnLJPgCMohvt2q_LH_tA3c",
		authDomain: "smarttv-twitch-web-samsung.firebaseapp.com",
		databaseURL: "https://smarttv-twitch-web-samsung.firebaseio.com",
		projectId: "smarttv-twitch-web-samsung",
		storageBucket: "smarttv-twitch-web-samsung.appspot.com",
		messagingSenderId: "302068341837",
		appId: "1:302068341837:web:604f8a975842c2e6879004",
		measurementId: "G-9T1TS1E2SC"
	};

	try {
		console.log("Main_Startfirebase start");

		firebase.initializeApp(firebaseConfig);
		firebase.analytics();

		gtag('js', new Date());

		Main_setTimeout(Main_firebaseEvent);

	} catch (e) {

		console.log("Main_Startfirebase e " + e);

	}

}

function Main_firebaseEvent() {

	try {

		console.log("send event");

		firebase.analytics().logEvent('app_load');

	} catch (e) {

		console.log("end event fail e " + e);

	}
}

function Main_setTimeout(fun) {
	window.setTimeout(fun, 15000);
}

Main_Start();

function Main_Start() {

	if (document.readyState === "loading") {

		document.addEventListener("DOMContentLoaded",
			function() {

				Main_Startfirebase();

			}
		);
	} else { // `DOMContentLoaded` already fired

		Main_Startfirebase();

	}

}