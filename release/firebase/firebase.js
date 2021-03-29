(function(root) {

	/** Detect free variables */
	var smartTwitchTVFirebaseGlobal = typeof global === 'object' && global;
	if (
		smartTwitchTVFirebaseGlobal.global === smartTwitchTVFirebaseGlobal ||
		smartTwitchTVFirebaseGlobal.window === smartTwitchTVFirebaseGlobal ||
		smartTwitchTVFirebaseGlobal.self === smartTwitchTVFirebaseGlobal
	) {
		root = smartTwitchTVFirebaseGlobal;
	}
	var smartTwitchTVFirebase;

	window.dataLayer = window.dataLayer || [];
	function gtag() {

		try {

			dataLayer.push(arguments);

		} catch (e) {

			console.log("gtag e " + e);

		}
	}

	function Firebase_Startfirebase() {

		Firebase_setTimeout(Firebase_firebaseInitializeApp);

	}

	function Firebase_firebaseInitializeApp() {

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
			console.log("Firebase_Startfirebase start");

			firebase.initializeApp(firebaseConfig);
			firebase.analytics();

			gtag('js', new Date());

			Firebase_setTimeout(Firebase_firebaseEvent);

		} catch (e) {

			console.log("Firebase_Startfirebase e " + e);

		}

	}

	function Firebase_firebaseEvent() {

		try {

			console.log("send event");

			firebase.analytics().logEvent('app_load');

		} catch (e) {

			console.log("end event fail e " + e);

		}
	}

	function Firebase_setTimeout(fun) {
		window.setTimeout(fun, 10000);
	}

	function Firebase_Start() {

		Firebase_setTimeout(Firebase_Startfirebase);

	}

	/**
	 * Define the public API
	 * and all function need to be called outiside the API
	 * smartTwitchTVFirebase + all functions called by java
	 */
	smartTwitchTVFirebase = {
		'firestart': Firebase_Start,
	};

	/** Expose `smartTwitchTVFirebase` */
	root.smartTwitchTVFirebase = smartTwitchTVFirebase;
}(this));

smartTwitchTVFirebase.firestart();

