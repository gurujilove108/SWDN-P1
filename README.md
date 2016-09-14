# SWDN-P1
Senior Web Developer Nanodegree Project 1

1. This is a google app engine application so in order to run it locally on your machine, you need to download the python google app engine sdk for your machine. 
2. Whether you are running a windows, mac or linux box the same commands should work.
3. Once you've got the google python app engine sdk installed go ahead and git clone this repo or download the zip file and extract it.
4. Open up a terminal, powershell on windows, terminal on mac and linux, navigate into this repo and run the command npm install. This will install all packages in the package.json file.
5. After thats complete, make sure you're in the root of this repo and run the command dev_appserver.py app.yaml.
6. Then open up localhost:8080 in your browser and localhost:8000/datastore to see the databases.
7. If you really want to be cool you can open up another terminal and run the command in the root of the repo, gulp serve:dev, this will make sure any time changes are made and files are saved the browser will reload with the new changes.
8. To go into production mode, run the command gulp backto:production, prdocution mode now works perfectly and whats really cool is that when you're in production mode you can open up another terminal
8.5 And run the command gulp serve:dist  this gulp task re minifies all the files anytime you make changes and save files and then reload with those changes, just like serve:dev does.
9. The only bad thing about doing this often is that if you make, for example, a syntax error, the minification process and will not tell you anything about the error but a cryptic message. This makes development a horrible and slow process, whhich is why its used only for production when everything is working 


If you have any problems or want to learn more about google app engine. Please feel free to email me at my personal email address thenewkid27@gmail.com
