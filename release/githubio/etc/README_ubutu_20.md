### Ubuntu 20 isn't yet supported by Tizen studio this are the steps to get all working

libwebkitgtk-1.0-0 is not available so Tizen will not install to install libwebkitgtk-1.0-0 do as informed here https://github.com/subgraph/Vega/issues/177

    sudo gedit /etc/apt/sources.list
    
Add to the bottom of the file

    deb http://cz.archive.ubuntu.com/ubuntu bionic main universe

Save the file then

    sudo apt-get update
    sudo apt-get install libwebkitgtk-1.0-0

After the lib is instaled OK remove the line 'deb http://cz.archive.ubuntu.com/ubuntu bionic main universe' from the file and redo the 

    sudo apt-get update

This last step is to avoid change Ubuntu files from old Ubuntu version

After you have all running you will not be able to connect to the TV as the 'sdb' binary will not work to make it work to this...

rename the file home/user/tizen-studio/tools/sdb to home/user/tizen-studio/tools/sdb_old.bin

Now create a new text file name it sdb allow the file to execute and edit the file in a text editor pasting the bellow to it

    #!/bin/bash

    # sdb
    LD_LIBRARY_PATH=$HOME/tizen-studio/tools/lib/ $HOME/tizen-studio/tools/sdb_old.bin "$@"

Now you need to copy two libs from yours system to home/user/tizen-studio/tools/lib/

the libs are **libcrypto.so.0** and **libcrypto.so.1.0.0**, just search for those two file name on the root of yours system and you will find the files, if not open a issue

Once you copy it all you can test to see if sdb will work by executing the file in terminal

    '/home/user/tizen-studio/tools/sdb' 

if you see this

    Smart Development Bridge 4.2.12

    Syntax:
      sdb [target] <command> [parameters]


Is all fine, if not try to solve wherever the error is on the terminal


After all tested OK open tizen studio and all must work, make sure if you do any of the above steps will Tizen studio is open you close it after and reopen to all work
