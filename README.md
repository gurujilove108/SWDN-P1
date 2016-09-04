# SWDN-P1
Senior Web Developer Nanodegree Project 1

1. This is a google app engine application so in order to run it locally on your machine, you need to download the python google app engine sdk for your machine. 
2. Whether your running a windows, mac or linux box the same commands should work.
3. Once you've got the google python app engine sdk installed go ahead and git clone this repo or download the zip file and extract it
4. Open up a terminal, powershell on windows, terminal on mac and linux, navigate into this repo and run the command dev_appserver . (the period means the current directory you're in) or you can run dev_appserver.py app.yaml. 
5. If you're unfamiliar with google app engine applications, app.yaml is the configuration file so when you run dev_appserver.py app.yaml, that will launch a server running on default port of 8080
6. You can also see it running online @ https://eventsandppl.appspot.com 
7. In order to run the gulp tasks which are specified in gulpfile.js, you need to download the dependencies in package.json by running npm i or npm install in the root section of this repo
8. Once you have the server running on 8080, go ahead and open up another terminal and run gulp 