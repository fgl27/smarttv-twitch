window.dataLayer = window.dataLayer || [];
function gtag() {
	try {

		dataLayer.push(arguments);

	} catch (e) {
		console.log("gtag e " + e);
	}
}

function Main_Startfirebase() {

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

		firebase.initializeApp(firebaseConfig);
		firebase.analytics();

		gtag('js', new Date());

	} catch (e) {

		console.log("Main_Startfirebase e " + e);

	}
}

Main_Start();

function Main_Start() {

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", function() {
			Main_Startfirebase();
		});
	} else { // `DOMContentLoaded` already fired
		Main_Startfirebase();
	}
}