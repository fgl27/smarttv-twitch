**smarttv-twitch**

- [About the project](#about-the-project)
- [Android TV version](#android-tv-version)
- [Contributing instructions](#contributing-instructions)
- [About this fork](#about-this-fork)
- [Project Web Dependencies](#project-web-dependencies)
- [How the application looks](#how-the-application-looks)
- [Twitch.TV authentication key](#twitchtv-authentication-key)
	- [Twitch.TV app for Samsung TV authorization request page](#twitchtv-app-for-samsung-tv-authorization-request-page)
	- [when accessing Twitch authorization site after adding yours credential (User and password) you will see the bellow information](#when-accessing-twitch-authorization-site-after-adding-yours-credential-user-and-password-you-will-see-the-bellow-information)
- [Controls](#controls)
	- [Below are the on-screen controls](#below-are-the-on-screen-controls)
	- [To access the controls from any screen press key A or on smart remote press the 4 color buttons (color) after Directional pad up for red A key and chose controls. If you are playing a stream, use the C yellow key to directly open the controls](#to-access-the-controls-from-any-screen-press-key-a-or-on-smart-remote-press-the-4-color-buttons-color-after-directional-pad-up-for-red-a-key-and-chose-controls-if-you-are-playing-a-stream-use-the-c-yellow-key-to-directly-open-the-controls)
	- [In app controls](#in-app-controls)
- [Installation instructions:](#installation-instructions)
	- [Installation guide **Tizen Studio for TVs with Tizen 2.3 or newer** (tested on Linux Ubuntu 16 and up, windows 10 64 bits and macOS Mojave 10.14.4)](#installation-guide-tizen-studio-for-tvs-with-tizen-23-or-newer-tested-on-linux-ubuntu-16-and-up-windows-10-64-bits-and-macos-mojave-10144)
	- [Help and workarounds](#help-and-workarounds)
	- [Account and Downloads](#account-and-downloads)
	- [Set your TV to developer mode](#set-your-tv-to-developer-mode)
	- [Installing Tizen Studio and Java SDK on Windows 10](#installing-tizen-studio-and-java-sdk-on-windows-10)
		- [Via chocolately](#via-chocolately)
	- [Installing Tizen Studio and Java SDK on Ubunutu](#installing-tizen-studio-and-java-sdk-on-ubunutu)
	- [Tizen Package Manager(Installing the tools)](#tizen-package-managerinstalling-the-tools)
	- [Setting up the build environment:](#setting-up-the-build-environment)
	- [Generate a certificate:](#generate-a-certificate)
	- [Setup the application:](#setup-the-application)
	- [Install the application:](#install-the-application)
- [In doubt open a issue](#in-doubt-open-a-issue)
- [Donations](#donations)
- [How to get the IP](#how-to-get-the-ip)


## About the project

This is an web application designed to give access to Twitch features on SmartTV's, a official Twitch app is not available for most devices, that is why this project exist.

The intention of this is to make a web app that works on all modern browser and can be easily ported to any OS that can run a web app.

The application fully supports all 4k and 1080p Samsung TVs released in 2016 or later. The app also support TVs released in 2015 or earlier that have Tizen version 2.3 or newer, however for some old TV even running Tizen 2.3 may there be some minor FW issues that affect the app most of those have be fixed, so is expected that they all work if doesn't for you open a issue.

This app has no affiliation with Twitch, this is a user made app, but is only possible because Twitch provide all the API that allows the app to show Twitch content.

Those API are documented here:

[Twitch Developer Documentation](https://dev.twitch.tv/docs/)

This app has be registered to access Twitch API, that registration process is described here:

[Twitch Registration process](https://dev.twitch.tv/docs/authentication#registration)

This project is the secondary project of two Twitch project I current maintain, originally I start working on this repo, I'm using separated repos to make easier use of github pages and commit history.

This original project runs on Samsung Tizen OS, with is very limited because of that the Android version has become the main project, not all features of the Android project can be ported to the Samsung one, but from time to time I will port the features from the Android version to the Samsung version.

## Android TV version

An Android version of this is available here:
[SmartTwitchTV](https://github.com/fgl27/SmartTwitchTV)<br>
The Android version is a full web-based app and can be used to port this project to any other OS, so check that in case you want to port this for a web-based OS.

## Contributing instructions

Any Help is welcome you can use a github PR, [issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose) or send a [email](mailto:fglfgl27@gmail.com).

## About this fork

I initially fork this from https://github.com/CazuzaCzz/SmartTwitchTV/commits/tizen
The original fork is https://github.com/nikitakatchik/SmartTwitchTV

I have started this project because the above repo's of the app did not fully support my TV model (at the time this was a Samsung Tizen OS only project) and didn't had all possible Twitch featuring.

I keep the original name and commit history but not as a fork simply because I made so may changes that makes no sense to call this a fork, I have made an new application from scratch focusing on performance and all available Twitch featuring, with the help of users and contributors reporting bugs and asking for features the app became what is today, a app that can be easily used to watch all available Twitch content and give the user a lot of extra options, but is know that the application can be improved new featuring and improves are always in the works, mostly to give a better experience and more options to the user, but that process is slow mostly because there is only one person working on the project and that work is done for free on spare time.

## Project Web Dependencies

* [irc-message - Performant, streaming IRC message parser](https://github.com/sigkell/irc-message)
* [punycode - A robust Punycode converter that fully complies to RFC 3492 and RFC 5891](https://github.com/bestiejs/punycode.js)
* [crass - A CSS minification, pretty printing, and general utility library written in JS](https://github.com/mattbasta/crass)
* [UglifyJS - is a JavaScript parser, minifier, compressor and beautifier toolkit](https://github.com/mishoo/UglifyJS2)
* [HTMLMinifier - is a highly configurable, well-tested, JavaScript-based HTML minifier](https://github.com/kangax/html-minifier)
* [JSHint - A Static Code Analysis Tool for JavaScript](https://github.com/jshint/jshint)
* [Twemoji - A simple library that provides standard Unicode emoji support across all platforms](https://github.com/twitter/twemoji)
* [Fontastic - Create your customized icon fonts in seconds](http://app.fontastic.me)
* [Twitch Developer Documentation](https://dev.Twitch/docs/)
* [Samsung WebApi API - this module defines the functionalities that are provides as the Samsung TV for Tizen Platform Product API](http://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/webapi-api)

## [How the application looks](https://github.com/fgl27/smarttv-twitch/tree/master/screenshot)
The application never stops receiving updates so the below images could be outdated
![Live](https://fgl27.github.io/smarttv-twitch/screenshot/animated.gif)

## Twitch.TV authentication key

![Add_key](https://fgl27.github.io/smarttv-twitch/screenshot/Add_key.png)
![Add_key](https://fgl27.github.io/smarttv-twitch/screenshot/Add_key2.png)

The key is generated on the page below. The page receives a key after you use it to request one with the official Twitch.TV web site. The link below is the same that you would see on the application screen.

### [Twitch.TV app for Samsung TV authorization request page](http://tiny.cc/twitchkeycode)

### when accessing Twitch authorization site after adding yours credential (User and password) you will see the bellow information

![logging](https://fgl27.github.io/smarttv-twitch/screenshot/logging.png)

**The app uses the following permission:**

- user_read, user_follows_edit, user_subscriptions, chat:edit, chat:read they are summarized here [authentication twitch-api-v5](https://dev.Twitch/docs/authentication#twitch-api-v5)<br>

**How the app uses it individual permission:**

**Manage your followed channels:**

- The permission used for this is **user_follows_edit** the API used on this is [Follow Channel](https://dev.Twitch/docs/v5/reference/users/#follow-channel)
- Allow to follow or unfollow streamers or games for that user (unfollow a game is current not supported by Twitch for third party app, but follow is).<br>

**Send live Stream Chat and Rooms messages:**

- The permission used for this is **chat:edit** the API used on this is [Connecting to Twitch IRC](https://dev.Twitch/docs/irc/guide/#connecting-to-twitch-irc)
- Allows access so you can use the app to logging in on Twitch chat using yours username to send chat messages.
- Also enable you to receive gifted sub give for user in chat.<br>

**View your email address:**

- The permission used for this is **user_read** the API used on this is [Get Followed Streams](https://dev.Twitch/docs/v5/reference/streams#get-followed-streams)
- Email will not be read! (you can search the source code if you are in doubt no user email is accessed), this permission has many uses, as the above API, it allows to access user live channels list in a faster way, the app can load user live list without this but it can be really slow if you follow too many streamers (100+ you already notice the slow down).<br>

**View your paid subscriptions:**

- The permission used for this is **user_subscriptions** the API's used on this are [Get User Emotes](https://dev.Twitch/docs/v5/reference/users/#get-user-emotes ) and [Check User Subscription by Channel](https://dev.Twitch/docs/v5/reference/users#check-user-subscription-by-channel)
- Allows to get yours emotes list from all subscriptions you have, even if you aren't sub to a channel this is needed to get yours available Twitch emotes, this list will be used on the write to chat implementation.
- Allows to check if you are sub to a particularly channel, that information is used to give a on screen warning when a content is block for Sub-only (a Sub-only chat ROOM (write mode, read will always work) or a VOD for example) and you don't have access because you aren't a sub of a particularly channel (unfortunately twitch has blocked all third party app's to access sub-only VOD's so this warning will let you know that, on the past that wasn't a issue for sub-only VOD's)<br>

**View live Stream Chat and Rooms messages:**

- The permission used for this is **chat:read** the API used on this is [Connecting to Twitch IRC](https://dev.Twitch/docs/irc/guide/#connecting-to-twitch-irc)
- Allows access so you can use the app to logging in on Twitch chat using yours username to read chat messages as yours user (technically the app can read chat without a user but the bellow option will not work on that case as the login is as anonymous).
- Also enable you to receive gifted sub give for user in chat.<br>

## Controls

![control](https://fgl27.github.io/smarttv-twitch/screenshot/controler.png)

The Application is tested with the above remotes (Any Samsung remote that has those same key/function must control the app even if the remote looks a little different)

The key **INFO** is also mapped in the app with the same functions as the **GUIDE** key, as some remotes may not have one of those.

### Below are the on-screen controls
### To access the controls from any screen press key A or on smart remote press the 4 color buttons (color) after Directional pad up for red A key and chose controls. If you are playing a stream, use the C yellow key to directly open the controls


### In app controls
![Main](https://fgl27.github.io/smarttv-twitch/screenshot/controls.png)

## Installation instructions:


### Installation guide **Tizen Studio for TVs with Tizen 2.3 or newer** (tested on Linux Ubuntu 16 and up, windows 10 64 bits and macOS Mojave 10.14.4)

### Help and workarounds

There is a issue section on this github page [smarttv-twitch/issues](https://github.com/fgl27/smarttv-twitch/issues) on this there is a few already open issues if you have a problem with the bellow steps check there to see if any of the already opened issues have the proper help for you, if not [open a new issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose)

### Account and Downloads

* Create a Samsung account if you don't have one, and set it up as a developer account [SAMSUNG DEVELOPERS](http://developer.samsung.com/home.do)

* [Download **Tizen Studio with IDE Installer**](https://developer.tizen.org/development/tizen-studio/download)


### Set your TV to developer mode

* Login to your Samsung TV with the Developer Account you just setup
* Open the **"APPS"** application
* Press the key sequence 12345 on your remote
* On the new window that appears Click **"On"** to enable the **developer mode**
* In the IP Address Field enter the local IP address of the computer you have downloaded Tizen Studio
* Reboot the device to enable (on some TV holding the power key will reboot for others is necessary to remove the power from the wall)

*If you don't know how to get the local IP of your computer go to the link here* [How to get your IP](https://github.com/fgl27/smarttv-twitch#how-to-get-the-ip)

### Installing Tizen Studio and Java SDK on Windows 10

Before installing Tizen Studio you need to have Java 8 SDK installed
You can install OpenJava JDK 8 with chocolately package manager or download and install the .exe from [Java SE Development Kit 8 Downloads
](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

#### Via chocolately
Open Windows Powershell as Admin and run the following command to setup chocolately package manager

```
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

Close and Re-Open Windows Powershell once the installer is complete and then run the following command

```
choco install openjdk12
```

Run the web-ide_Tizen_Studio_X.X_windows-64.exe installer file you downloaded previously with the default options selected

### Installing Tizen Studio and Java SDK on Ubunutu

* I used the **Tizen Studio 3.7 with IDE installer** (Any version above that must work well), download the 32/64 bit according to your CPU architecture.  On Linux, the file is an executable binary 641Mb in size. To run it, first give the file permission to execute - properties >  permission > Execute... mark, then just drag the file to a terminal window and click enter, **On Linux it may ask you to use apt-get to install missing dependencies below are the one asked by Tizen Studio 2.4 last time I installed it**

```
sudo apt-get install libwebkitgtk-1.0-0 rpm2cpio cpio expect python2.7 ruby libcanberra-gtk-module libcanberra-gtk3-module gettext
```

If you are on ubuntu 19 or above 20.4 libwebkitgtk-1.0-0 ins't availeble, in that case check this link [Ubuntu 20 isn't yet supported by Tizen studio this are the steps to get all working](https://github.com/fgl27/smarttv-twitch/blob/master/release/githubio/etc/README_ubutu_20.md)


* Install Java SDK, I install this app with **Open JDK java 8**
" (last know tested was "jdk-8u152-windows-x64.exe" any above that must work always try the latest version **but make sure is Java 8**), on Linux terminal commands below

```
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install openjdk-8-jdk
```

* Press enter and Click OK/YES and accept all the requests from java installer on the terminal

### Tizen Package Manager(Installing the tools)

* Open **Tizen Package Manager** to start installing the bellow (some may already be installed by default)
* Main tab **(Main SDK)** Install **Tizen SDK tools** (Emulator manager not necessary),  **(on Linux it may request you to use apt-get to install missing dependencies)**

![mainsdk](https://fgl27.github.io/smarttv-twitch/screenshot/install/sdk_2.png)

* Second tab **(Extension SDK)** under **TV Extensions-5.X** (or wherever newer/older X.X TV version there is) install **Web app. Development**, install **Samsung Certificate Extension** and under **TV Extension Tools** install **Web app. Tools**

![extensionsdk](https://fgl27.github.io/smarttv-twitch/screenshot/install/sdk_4.png)

* After latest update of Tizen Studio version 4.1 the TV Extensions became unavailable, this is a Tizen studio bug that may already be fixed but if that is still a issue when you are reading this check this... [Missing TV extension on Package Manager](https://github.com/fgl27/smarttv-twitch/issues/157#issuecomment-757519336)
* Tizen is always changing the packages that are available some packages may became deprecated and not show anymore, proceed with the installation process even if packages aren't available for you, report a issue if the application doesn't install but make sure you go to all steps at least once again after a problem just revise it all before reporting.*
* After everything finishes installing as you close the package manager it will ask if you want to open the **Tizen Studio** - click YES to open it. On windows it may ask you to give firewall permission for Tizen.

### Setting up the build environment:

* Open **Tizen Studio**, then start the device manager by clicking on the drop-down menu that has the default option **"No target"** and select **"Launch remote device manager"**. If you don't find the device manager on the studio, just open it as a separate app - it must be installed just like the studio.
* On the device manager, click **Scan** and it will find your TV if it is set up is ok and on the same network. If it doesn't find it, try to add it manually by clicking on the  **+** option and add your TV IP address. Don't change the **Port**. To get the address, go to the main menu > network > Network status... wait a moment extra options will be loaded, click on **IP Settings** read your TV's IP Address

![device_manager](https://fgl27.github.io/smarttv-twitch/screenshot/install/device_manager.png)
* After having the TV IP showing in the screen, click in to connect, when connect you see something like the bellow
![device_manager](https://fgl27.github.io/smarttv-twitch/screenshot/install/device_manager2.png)

If you have a problem on connecting refer back to **[Account and Downloads:](https://github.com/fgl27/smarttv-twitch#account-and-downloads)**, without properly enabling **developer mode** on the TV this will fail.


### Generate a certificate:

* **Tizen Studio** > Tools > Certificate Manager > + > select/click **Tizen** > add a certificate name ... next > create a new author.. next > setup name password etc... next > Use the default Tizen... Finish > **If Success** you see a message **The new certficate profile has been sucesfully created.** click OK
* Select the certificate it must have a check mark ✔️ on the front of it (that means you have selected it) close the Certificate Manager

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate_extra1.png)

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate_extra2.png)

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate_extra3.png)

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate_extra4.png)

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate_extra5.png)

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate_extra6.png)

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate_extra7.png)

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate_extra8.png)

* **If you click on finish and you see the image above, just go to the next step [Setup the application:](https://github.com/fgl27/smarttv-twitch#setup-the-application)**

* if not, read the instructions below in order to address the Tizen issue on creating a certificate that started in late 2018 after some Tizen SDK version update

* If when you click on **Finish** the app just tries and doesn't do anything, it is because it has an issue creating an Author - this is a bug of Tizen. To fix that, generate a certificate using this recommendation [Creating Certificates Samsung site](https://developer.samsung.com/galaxy-watch/develop/getting-certificates/create), but after you finish don't use that certificate because it may not work to install the app, repeat the process of creating a **Tizen** certificate ... Certificate Manager > + > select/click **Tizen** > here use the author created before by choosing "select existing..."

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate2.png)

* Now find the folder that has the name "SamsungCertificate", open the folder inside (it has the name chosen when creating a Samsung profile) and choose the **author.p12 ** file

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate3.png)

* Add the same password used before and click next > Use the default Tizen... Finish > **Success** click OK, it must be finished now

![certificate](https://fgl27.github.io/smarttv-twitch/screenshot/install/certificate4.png)


### Setup the application:

* **[Download and extract the release_4_0_1_V7.zip file Click here, this is the application recipe file](https://github.com/fgl27/smarttv-twitch/releases/download/4.0.1_V7/4.0.1_V7.zip)**

* Making the app, Top menu > File >Import > Tizen > Tizen Project > Click Browser > Select the extraced folder > Click Next > Click Finish
* Wait for it to load

![install_app1](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app1.png)
![install_app2](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app2.png)
![install_app3](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app3.png)
![install_app4](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app4.png)
![install_app5](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app5.png)
![install_app5](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app6.png)

* After latest update of Tizen Studio version 4.1 the TV Extensions became unavailable causing a error on the above step, this is a Tizen studio bug that may already be fixed but if that is still a issue when you are reading this check this... [Missing TV extension on Package Manager](https://github.com/fgl27/smarttv-twitch/issues/157#issuecomment-757519336)

### Install the application:

* If yours device uses square icons on the home screen (only devices running Tizen 5.5 and above need this, most of this devices are 2020 or newer models) as the bellow image shows, before the next step you need to set the proper icon, to do that is very simple, just delete the file **icon.png** and rename the **icon_square.png** to **icon.png** 
* Now the installation, left click on the folder **4.0.1_VX...etc** to select it, then right click > Run as > **1 Tizen Web Application**, the installation will start
* If everything goes OK, the app will be opened in a few seconds on the TV, and you can start using it

![install_app7](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app7.png)
![icon_square](https://fgl27.github.io/smarttv-twitch/screenshot/install/icon_square.png)

* If it fails during the installation, make sure you don't have any other Twitch.TV applications installed on the TV. To uninstall the app manually, just open the **"apps"** application, find all Twitch.TV apps you have installed in **"my app"** tab, hold down the enter/select key on the top of the app and choose delete. After you have deleted all Twitch.TV apps, try to install again.


**This app can update itself 99% of the time, is a very simple process every time you open the app (when it is fully closed not running on the background) it will download the latest version of the app code from the repository, this way the installation process will only have to be redone after a major update where the changes are in the files from the release.zip, the app will warn the user if is needed to update it manually by performing the installation steps again.**

## In doubt [open a issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose)

## Donations


![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/paypal.png) **Paypal email link (clickable):** [fglfgl27@gmail.com](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=fglfgl27@gmail.com&lc=US&no_note=0&item_name=Donate+to+thanks+for+the+Twitch+Tizen+app&cn=&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted)


![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/bitcoin.png)**Bitcoin walet adress (or use bellow QR code):** 1DuhCT6L3VfBtFcS8FNfVXgBzE2rwCPx3x

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/chart.png)

## How to get the IP
Linux terminal command:

	hostname –I

Result
![ip_1](https://fgl27.github.io/smarttv-twitch/screenshot/etc/ubuntu_ip.png)

Windows terminal command:

	ipconfig

Result
![ip_2](https://fgl27.github.io/smarttv-twitch/screenshot/etc/windows_ip.png)

Mac System Preferences > Network.<br>

Result<br>
![ip_3](https://fgl27.github.io/smarttv-twitch/screenshot/etc/mac_ip.jpg)
