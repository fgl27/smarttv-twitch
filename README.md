smarttv-twitch
==============

This is an application for Samsung Smart TVs, allowing a user to watch Twitch.tv broadcasts. An official Twitch.tv app is not available for most countries, which is why this project exists.

The application fully supports all 4k and 1080p Samsung TVs released in 2016 or later. The app also support TVs released in 2015 or earlier that have Tizen version 2.3 or newer, however for some old TV even running Tizen 2.3 may there be some minor FW issues that affect the app most of those have be fixed, so is expected that they all work if doesn't for you open a issue.

[Installation instructions](https://github.com/fgl27/smarttv-twitch#installation-instructions)

In doubt [open a issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose)

Android TV version
===============

An Android version of this is available here:
[SmartTwitchTV](https://github.com/fgl27/SmartTwitchTV)<br>
The Android version is a full web-based app and can be used to port this project to any other OS, so check that in case you want to port this for a web-based OS.

Contributing instructions
==============

Any Help is welcome you can use a github PR, [issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose) or send a [email](mailto:fglfgl27@gmail.com).

About this fork
===============

I initially fork this from https://github.com/CazuzaCzz/SmartTwitchTV/commits/tizen
The original fork is https://github.com/nikitakatchik/SmartTwitchTV

I have started this project because the above Repos of the app did not fully support my TV model and don't have all possible Twitch featuring.

I start this new repo keep the original name and commit history, work a long time writing this a new application basically from scratch focusing on performance and all available Twitch featuring, with the help of some users reporting bugs and features request, I add many features and work to resolve all the bugs, today the application is very complete, can be easily used to watch all available Twitch content and give the user a lot of extra options, but is know that the application can be always improved, new featuring and improves are always in the works, mostly to give a better experience and more options to the user, but that process is slow.

Project Web Dependencies
==============

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

Twitch.TV authentication key
===============

![Add_key](https://fgl27.github.io/smarttv-twitch/screenshot/Add_key.png)
![Add_key](https://fgl27.github.io/smarttv-twitch/screenshot/Add_key2.png)

The user can add a authentication key if you have the twitch password for that user (aka you are it).
That key will be used to access twitch content for that account, when accessing twitch authentication site it will show:

	Samsung TV app
	wants to access your account

	Clicking Authorize below will allow Samsung TV app to:
	* Manage your followed channels
	* View your email address
	* View your paid subscriptions

It of the permission has a reason:

**Manage your followed channels:**

* follow or unfollow streamers or games for that user.<br>

**View your email address:**

* Email will not be read, this permission has other uses, it allows to access user live channels in a faster way, the app can load user live without this but it can be really lag if you follow too many streamers.
* Let twitch know you are watching a stream/video (allows you to received a free sub in a random gifted sub for example) and show some target content as in featuring screen you will see the order in relation to yours twitch follow content.<br>

**View your paid subscriptions:**

* Allows to access subscribed only past broadcast and highlight (vod) for the user that you have added the key, as some streamers block those content for subscribers only this is needed.<br>

The key is generated on the page below. The page receives a key after you use it to request one with the official Twitch.TV web site. The link below is the same that you would see on the application screen.

## [Twitch.TV app for Samsung TV authorization request page](http://tiny.cc/twitchkeycode)

Controls
==============
![control](https://fgl27.github.io/smarttv-twitch/screenshot/controler.png)

The Application is tested with the above remotes (Any Samsung remote that has those same key/function must control the app even if the remote looks a little different)

The key **INFO** is also mapped in the app with the same functions as the **GUIDE** key, as some remotes may not have one of those.

## Below are the on-screen controls
### To access the controls from any screen press key A or on smart remote press the 4 color buttons (color) after Directional pad up for red A key and chose controls. If you are playing a stream, use the C yellow key to directly open the controls


## Controls
![Main](https://fgl27.github.io/smarttv-twitch/screenshot/controls.png)
==============

Installation instructions:
==============

Installation guide **Tizen Studio for TVs with Tizen 2.3 or newer** (tested on Linux Ubuntu 16 and up, windows 10 64 bits and macOS Mojave 10.14.4)
==============

##


## Help and workarounds

There is a issue section on this github page [smarttv-twitch/issues](https://github.com/fgl27/smarttv-twitch/issues) on this there is a few already open issues if you have a problem with the bellow steps check there to see if any of the already opened issues have the proper help for you, if not [open a new issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose)

## Account and Downloads

* Create a Samsung account if you don't have one, and set it up as a developer account [SAMSUNG DEVELOPERS](http://developer.samsung.com/home.do)

* [Download **Tizen Studio with IDE Installer**](https://developer.tizen.org/development/tizen-studio/download)


## Set your TV to developer mode

* Login to your Samsung TV with the Developer Account you just setup
* Open the **"APPS"** application
* Press the key sequence 12345 on your remote
* On the new window that appears Click **"On"** to enable the **developer mode**
* In the IP Address Field enter the local IP address of the computer you have downloaded Tizen Studio
* Reboot the device to enable (on some TV holding the power key will reboot for others is necessary to remove the power from the wall)

*If you don't know how to get the local IP of your computer go to the link here* [How to get your IP](https://github.com/fgl27/smarttv-twitch#how-to-get-the-ip)

## Installing Tizen Studio and Java SDK on Windows 10

Before installing Tizen Studio you need to have Java 8 SDK installed
You can install OpenJava JDK 8 with chocolately package manager or download and install the .exe from [Java SE Development Kit 8 Downloads
](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

### Via chocolately
Open Windows Powershell as Admin and run the following command to setup chocolately package manager

	Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

Close and Re-Open Windows Powershell once the installer is complete and then run the following command

	choco install openjdk12

Run the web-ide_Tizen_Studio_X.X_windows-64.exe installer file you downloaded previously with the default options selected

## Installing Tizen Studio and Java SDK on Ubunutu

* I used the **Tizen Studio 2.4 with IDE installer** (Any version above that must work well), download the 32/64 bit according to your CPU architecture.  On Linux, the file is an executable binary 480Mb in size. To run it, first give the file permission to execute - properties >  permission > Execute... mark, then just drag the file to a terminal window and click enter, **On Linux it may ask you to use apt-get to install missing dependencies below are the one asked by Tizen Studio 2.4 last time I installed it**
#

	sudo apt-get install libwebkitgtk-1.0-0 rpm2cpio cpio expect python2.7 ruby libcanberra-gtk-module libcanberra-gtk3-module gettext

**If you get a error** "Package libwebkitgtk-1 is not available... etc..." do the bellow, if no error skip to **"Install Java SDK"**

	wget http://archive.ubuntu.com/ubuntu/pool/main/i/icu/libicu60_60.2-3ubuntu3_amd64.deb; sudo dpkg -i libicu60_60.2-3ubuntu3_amd64.deb; sudo apt install -fy

	wget http://mirrors.edge.kernel.org/ubuntu/pool/universe/w/webkitgtk/libjavascriptcoregtk-1.0-0_2.4.11-4_amd64.deb; sudo dpkg -i libjavascriptcoregtk-1.0-0_2.4.11-4_amd64.deb; sudo apt install -fy

	wget http://mirrors.edge.kernel.org/ubuntu/pool/universe/w/webkitgtk/libwebkitgtk-1.0-0_2.4.11-4_amd64.deb; sudo dpkg -i libwebkitgtk-1.0-0_2.4.11-4_amd64.deb; sudo apt install -fy


	sudo apt-get install rpm2cpio cpio expect python2.7 ruby gettext bridge-utils

#
* Install Java SDK, I install this app with **Open JDK java 8**
" (last know tested was "jdk-8u152-windows-x64.exe" any above that must work always try the latest version **but make sure is Java 8**), on Linux terminal commands below
#

	sudo add-apt-repository ppa:openjdk-r/ppa
	sudo apt-get update
	sudo apt-get install openjdk-8-jdk

#
* Press enter and Click OK/YES and accept all the requests from java installer on the terminal

## Tizen Package Manager(Installing the tools)

* Open **Tizen Package Manager** to start installing the bellow (some may already be installed by default)
* Main tab **(Main SDK)** Install **Tizen SDK tools**,  **(on Linux it may request you to use apt-get to install missing dependencies)**

![mainsdk](https://fgl27.github.io/smarttv-twitch/screenshot/install/sdk_2.png)
* Second tab **(Extension SDK)** under **TV Extensions-5.X** (or wherever X.X TV version there is) install **Web app. Development**, install **Samsung Certificate Extension** and under **TV Extension Tools** install **Web app. Tools** (on Linux it may request you to use apt-get to install missing dependencies)

![extensionsdk](https://fgl27.github.io/smarttv-twitch/screenshot/install/sdk_4.png)

*Tizen is always changing the packages that are available some packages may became deprecated and not show anymore, proceed with the installation process even if packages aren't available for you, report a issue if the application doesn't install but make sure you go to all steps at least once again after a problem just revise it all before reporting.*
* After everything finishes installing as you close the package manager it will ask if you want to open the **Tizen Studio** - click YES to open it. On windows it may ask you to give firewall permission for Tizen.

## Setting up the build environment:

* Open **Tizen Studio**, then start the device manager by clicking on the drop-down menu that has the default option **"No target"** and select **"Launch remote device manager"**. If you don't find the device manager on the studio, just open it as a separate app - it must be installed just like the studio.
* On the device manager, click **Scan** and it will find your TV if it is set up is ok and on the same network. If it doesn't find it, try to add it manually by clicking on the  **+** option and add your TV IP address. Don't change the **Port**. To get the address, go to the main menu > network > Network status... wait a moment extra options will be loaded, click on **IP Settings** read your TV's IP Address

![device_manager](https://fgl27.github.io/smarttv-twitch/screenshot/install/device_manager.png)
* After having the TV IP showing in the screen, click in to connect, when connect you see something like the bellow
![device_manager](https://fgl27.github.io/smarttv-twitch/screenshot/install/device_manager2.png)

If you have a problem on connecting refer back to **[Account and Downloads:](https://github.com/fgl27/smarttv-twitch#account-and-downloads)**, without properly enabling **developer mode** on the TV this will fail.


## Generate a certificate:

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


## Setup the application:

* **[Download and extract the release_4_0_1_V5.zip file Click here, this is the application recipe file](https://github.com/fgl27/smarttv-twitch/releases/download/4.0.1_V5/release_4_0_1_V5.zip)**

* Making the app, Top menu > File > New > Tizen Project > click twice in **Template** > click twice in **TV** > click twice in **Web Application** > click twice in **Empty** > chose a project name "anyname" (avoid special character and spaces) ....click finish

![install_app2](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app2.png)
![install_app3](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app3.png)
![install_app4](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app4.png)
![install_app5](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app5.png)
![install_app6](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app6.png)

* Wait for it to load
* Back on **Tizen Studio**, left click on the folder symbol with **AnyName-X.0** on the left corner under project explorer, just to select the folder (**AnyName-X.0** is the default name given when you created a project in the last step; if you used a different name, click on that)
* Top menu > **File** > Import > General > File System ... next > Browse.. to find the extracted folder from the release_X_X_X.zip ... > click Select All, mark Overwrite existing ... > Finish
* Wait for it to load
* The name of the folder **AnyName-X.0** changes to **AnyName-tv-samsung-X.0**

![install_app8_1](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app8_1.png)
![install_app8_2](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app8_2.png)
![install_app8_3](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app8_3.png)
![install_app9](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app9.png)

## Install the application:

* Click on that folder **AnyName-tv-samsung-X.0** left click, then right click > Run as > **1 Tizen Web Application**, the installation will start
* If everything goes OK, the app will be opened in a few seconds on the TV, and you can start using it

![install_app10](https://fgl27.github.io/smarttv-twitch/screenshot/install/install_app10.png)

* If it fails during the installation, make sure you don't have any other Twitch.TV applications installed on the TV. To uninstall the app manually, just open the **"apps"** application, find all Twitch.TV apps you have installed in **"my app"** tab, hold down the enter/select key on the top of the app and choose delete. After you have deleted all Twitch.TV apps, try to install again.
* This app can update itself 99% of the time, so this installation process will only have to be redone after a major update where the changes cannot be done by the app itself. The app will warn the user if there is a need to update it manually by performing the installation steps again.

## In doubt [open a issue](https://github.com/fgl27/smarttv-twitch/issues/new/choose)

Donations
==============

![Main](https://fgl27.github.io/SmartTwitchTV/screenshot/paypal.png) **Paypal email link (clickable):** [fglfgl27@gmail.com](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=fglfgl27@gmail.com&lc=US&no_note=0&item_name=Donate+to+thanks+for+the+Twitch+app&cn=&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted)
#
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
