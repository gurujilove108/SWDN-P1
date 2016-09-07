# SWDN-P1
Senior Web Developer Nanodegree Project 1

1. This is a google app engine application so in order to run it locally on your machine, you need to download the python google app engine sdk for your machine. 
2. Whether your running a windows, mac or linux box the same commands should work.
3. Once you've got the google python app engine sdk installed go ahead and git clone this repo or download the zip file and extract it
4. Open up a terminal, powershell on windows, terminal on mac and linux, navigate into this repo and run the command dev_appserver . (the period means the current directory you're in) or you can run dev_appserver.py app.yaml. 
4.5 Then open up another terminal and make sure you're into the root of this git repo and run the command gulp watch, this will make sure any file saves will reload your changes in the browser
5. If you're unfamiliar with google app engine applications, app.yaml is the configuration file so when you run dev_appserver.py app.yaml, that will launch a server running on default port of 8080
6. You can also see it running online @ https://eventsandppl.appspot.com 
7. run npm i or npm install inside the root directory where the package.json file is located to install all the gulp dependencies in package.json 
8. Notice we have two app.yaml files, one for production and one for development
9. the app is currently running in devlopment mode so to run the project in production mode, rename app.yaml to app-development.yaml and rename app-production.yaml to app.yaml
10. then in your terminal simply restart the server by pressing ctrl c
11. then relaunch the server using dev_appserver.py app.yaml except this time its running in production mode and using the compressed files, it is the same as the final version running online so gulp watch will not work in this case
12. If you did want to make come code changes, obviously make the changes in the code files in the static folder, then run gulp build:process and reload the application to see your changes.
