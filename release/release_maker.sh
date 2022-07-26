#!/bin/bash
#code compressor using uglifyjs, jshint, sed and cancrass, this .sh runs on linux shell base system

#instalation of uglifyjs and jshint has more then one step
#1# Donwload npm/node and https://nodejs.org/en/
# extract the download file then do the bellow on the terminal

# sudo mkdir /usr/lib/nodejs
# sudo mv /path_of_extracted_node_version /usr/lib/nodejs/node

# after OK on the terminal commands export the variable past the below at the end of yours .bashrc file (remove the #)
# export NODEJS_HOME=/usr/lib/nodejs/node
# export PATH=$NODEJS_HOME/bin:$PATH

# now install uglifyjs via terminal
# npm install uglify-js jshint cancrass -g


#exec this file or drag this .sh file to terminal to generate a released

# add html files here, master.css here is a temp file generate by this .sh it has the css content of index.html
temp_maker_folder="release/temp_maker/";
html_file=("$temp_maker_folder""config.xml" "$temp_maker_folder""index.html" "$temp_maker_folder""master.css" "release/index.html");

# add js folders here
js_folders=("app/languages/" "app/general/" "app/specific/" "app/thirdparty/");

# no changes needed to be done bellow this line

#timer counter
START=$(date +%s.%N);
#colors
txtbld=$(tput bold) # Bold
bldred=${txtbld}$(tput setaf 1) # red
bldgrn=${txtbld}$(tput setaf 2) # green
bldyel=${txtbld}$(tput setaf 3) # yellow
bldblu=${txtbld}$(tput setaf 4) # blue
bldcya=${txtbld}$(tput setaf 6) # cyan

# Exit if sed is not available
if ! which 'sed' >/dev/null  ; then
	echo -e "\\n${bldred}can't run sed it's not installed";
	echo -e "${bldred}Install using command:";
	echo -e "${bldred}sudo apt-get install sed\\n";
	echo -e "${bldred}Release maker aborted"
	exit;
fi;

# Exit if uglifyjs is not available
canjshint=0;
if which 'jshint' >/dev/null  ; then
	# call this .sh and 1 "this.sh 1" to update uglify-js
	if [ "$1" == 1 ]; then
		npm install jshint -g
	fi;
	canjshint=1;
else
	echo -e "\\n${bldred}can't run jshint, as it's not installed";
	echo -e "${bldred}To install jshint read the release maker notes on the top\\n";
	echo -e "${bldred}Release maker aborted\\n"
	exit;
fi;

# Exit if uglifyjs is not available
canuglifyjs=0;
if which 'uglifyjs' >/dev/null  ; then
	# call this .sh and 1 "this.sh 1" to update uglify-js
	if [ "$1" == 1 ]; then
		npm install uglify-js -g
	fi;
	canuglifyjs=1;
else
	echo -e "\\n${bldred}can't run uglifyjs, as it's not installed";
	echo -e "${bldred}To install uglifyjs read the release maker notes on the top\\n";
	echo -e "${bldred}Release maker aborted\\n"
	exit;
fi;

# Check crass
cancrass=0;
if which 'crass' >/dev/null  ; then
	# call this .sh and 1 "this.sh 1" to update uglify-js
	if [ "$1" == 1 ]; then
		npm install crass -g
	fi;
	cancrass=1;
else
	echo -e "\\n${bldred}can't run cancrass, as it's not installed";
	echo -e "${bldred}To install cancrass read the release maker notes on the top\\n";
	echo -e "${bldred}Release wil work but it can be more compressed using crass"
fi;

# this .sh folder used for cd back and for
mainfolder="$(dirname ""$(dirname "$0")"")";

cd "$mainfolder" || exit

# sed_comp cleans/compress up html/xml related files
sed_comp() {
	array=( "$@" );
	for i in "${array[@]}"; do
		echo -e "${bldblu}	sed compressing $i";
		sed -i -e :a -re 's/<!--.*?-->//g;/<!--/N;//ba' "$i";
		sed -i "/\\/\\*.*\\*\\//d;/\\/\\*/,/\\*\\// d" "$i";
		sed -i '/^\(\s*\)\/\//d' "$i";
		sed -i 's/^[ \t]*//g; s/[ \t]*$//g' "$i";
		sed -i ':a;N;$!ba;s/\n/ /g' "$i";
		sed -i 's/\s*:/:/g' "$i";
		sed -i 's/; \+/;/g' "$i";
		sed -i 's/: \+/:/g' "$i";
		sed -i 's/> \+/>/g' "$i";
		sed -i 's/\s*</</g' "$i";
		sed -i 's/} \+/}/g' "$i";
		sed -i 's/{ \+/{/g' "$i";
		sed -i 's/\s*{/{/g' "$i";
		sed -i 's/\s*}/}/g' "$i";
#		sed -i 's/" \+/"/g' "$i";
	done
	echo -e "";
}

# uglifyjs cleans/compress js related files
js_comp_ugf() {
	array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			echo -e "${bldblu}	Including compresed version of $x to master.js";
			uglifyjs "$x" -c -o "$mainfolder"/"$temp_maker_folder""$x";
			cat "$mainfolder"/"$temp_maker_folder""$x" >> "$mainfolder"/release/master.js;
		done
		cd - &> /dev/null || exit;
	done
}

js_jshint() {
	array=( "$@" );
	for i in "${array[@]}"; do
		cd "$i" || exit;
		for x in *.js; do
			cat "$x" >> "$mainfolder"/release/master.js
		done
		cd - &> /dev/null || exit;
	done

	echo "$master_end" >> "$mainfolder"/release/master.js;

	jsh_check="$(jshint "$mainfolder"/release/master.js)";
	if [ ! -z "$jsh_check" ]; then
		echo -e "${bldred}	JSHint erros or warnings found:\\n"
		echo -e "${bldred}	$jsh_check"
		echo -e "\\n${bldred}	Fix the problems and try the release maker again\\n"
		exit;
	else
		echo -e "${bldblu}	JSHint Test finished no errors or warnings found"
		cp -rf "$mainfolder"/release/master.js "$mainfolder"/release/githubio/js/master_uncompressed.js;
		js-beautify -q "$mainfolder"/release/githubio/js/master_uncompressed.js -o "$mainfolder"/release/githubio/js/master_uncompressed.js
	fi;
}

master_start=$(echo "$a" | sed '/APISTART/,/APIMID/!d;/APIMID/d;/APISTART/d' release/api.js);
master_end=$(echo "$a" | sed '/APICENTER/,/APIEND/!d;/APIEND/d;/APICENTER/d' release/api.js);

echo -e "\\n${bldred}####################################\\n#				   #";
echo -e "#				   #\\n#	${bldcya}Starting Release maker${bldred}	   #\\n#				   #";
echo -e "#				   #\\n####################################\\n";

if [ "$canjshint" == 1 ]; then
	echo -e "${bldgrn}JSHint Test started...\\n";
	echo -e '/* jshint undef: true, unused: true, node: true, laxbreak: true, browser: true */\n/*globals tizen, webapis, STR_BODY, punycode, smartTwitchTV */' > "$mainfolder"/release/master.js;
	echo "$master_start" >> "$mainfolder"/release/master.js;
	js_jshint "${js_folders[@]}";
fi;

# Prepare the release folder copy files to correct place and make new temp files
sed -i 's/Main_isReleased = false/Main_isReleased = true/g' app/specific/Main.js;

mkdir -p "$temp_maker_folder"

cp -rf app/index.html "$temp_maker_folder"master.css
cp -rf app/index.html "$temp_maker_folder"index.html
cp -rf app/config.xml "$temp_maker_folder"config.xml
sed -i 's/flbtxFhd64/UHdbzowRXA/g' "$temp_maker_folder"config.xml
cp -rf release/index.html release/index_release.html

sed -i -n '/bodystart/,/bodyend/p' "$temp_maker_folder"index.html
sed -i -n '/cssstart/,/cssend/p' "$temp_maker_folder"master.css

cp -rf app/widget.info release/widget.info
cp -rf app/.project release/.project
cp -rf app/.tproject release/.tproject

echo -e "\\n${bldgrn}Compressing Start\\n";

# run the cleans/compress tools
sed_comp "${html_file[@]}";

# Include STR_BODY to release/master, STR_BODY has the content of index.html body
cp -rf "$temp_maker_folder"config.xml release/config.xml
echo "$master_start" > release/master.js;
echo "var STR_BODY='""$(cat "$temp_maker_folder"index.html)""';" >> release/master.js;

if [ "$canuglifyjs" == 1 ]; then
	js_comp_ugf "${js_folders[@]}";
fi;

#Make a zip
cd release/ || exit
rm -rf *.zip
zip -qr9 release ./ -x *.sh master.* html_body.js index_release.html api.js master.js \*githubio\* \*temp_maker\*

# Clean up release/ folder temp files and stash all over git changes
rm -rf config.xml
rm -rf widget.info
rm -rf .project
rm -rf .tproject

cd - &> /dev/null || exit;

# Compress using cleancss
if [ "$cancrass" == 1 ]; then
	crass "$temp_maker_folder"master.css > "$temp_maker_folder"2master.css
	crass release/githubio/css/icons.css > release/githubio/css/icons.min.css
	cp -rf release/githubio/css/icons.min.css release/githubio/css/font-awesome.min.css
fi;
# Copy master.css to its place, it's the css content of index.html
cp -rf "$temp_maker_folder"2master.css release/githubio/css/master.css

cp -rf release/index_release.html release/index.html 
rm -rf release/index_release.html
cd release/ || exit

# Run uglifyjs one more time with "toplevel" enable, only here as if run before js files don't work, the result is around 10% compression improve
if [ "$canuglifyjs" == 1 ]; then
	echo "$master_end" >> master.js;
	echo -e "${bldblu}	uglifyjs  master.js";
	uglifyjs master.js -c -m toplevel -o master.js;
fi;

echo -e "\\n${bldgrn}Compression done\\n";

# copy master.js temp files to githubio/js/
cp -rf master.js githubio/js/master.js;
cd - &> /dev/null || exit;
rm -rf "$temp_maker_folder"
sed -i 's/Main_isReleased = true/Main_isReleased = false/g' app/specific/Main.js;

# Warn if a change was detected to master.js or master.css file
git_check="$(git status | grep modified)";
if [ ! -z "$git_check" ]; then
	echo -e "${bldgrn}Is necessary to update githubio as below files are modify:\\n"
	echo -e "${bldred}	$git_check"
fi;


echo -e "\\n${bldred}##################################################################################################\\n#												 #";
echo -e "#												 #\\n#	${bldcya}Release done, zip generated at $mainfolder/release/release.zip${bldred}		 #\\n#												 #";
echo -e "#												 #\\n${bldred}##################################################################################################\\n";

END=$(date +%s.%N);
echo -e "${bldgrn}Total elapsed time of the script: ${bldred}$(echo "($END - $START) / 60"|bc ):$(echo "(($END - $START) - (($END - $START) / 60) * 60)"|bc ) ${bldyel}(minutes:seconds).\n";
exit;
