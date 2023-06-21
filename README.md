# PhishingPageOf_facebook
I make Facebook's login page replica(HTML,CSS,NODE.JS),it works with client&lt;->server&lt;->database. there are some errors about "Cannot set headers after they are sent to the client" , If you want to see it, you can read  below.

Privacy and Policy Compliance:

This project is intended for educational purposes only and aims to raise awareness about phishing attacks and online security. While every effort has been made to ensure that the content used in this project respects privacy and policy guidelines, if you believe that any aspect of this project violates those guidelines, please contact us immediately at [edmon.parsamyan3@gmail.com]. We are committed to promptly addressing any concerns and removing or rectifying any content that may infringe upon privacy or policy standards.


For run folders you can folow step by step...

1.OPEN FOLDER in any code editor (e.g. VISUAL CODE STUDIO) 
  1.2. VSCODE installation link --> https://code.visualstudio.com/download
  1.3.Open code Terminal and transfer to folder 'FishingProjectOfFacebook' with command --> cd ./FishingProjectOfFacebook
  1.4.install some modules for running with commands npm: --> 'npm i node_module','npm i express','npm i body-parser','npm i mysql'
  
If you want to run code, you must install any open-source software package that provides a local development environment for web development.(e.g. XAMPP)
XAMPP installation link:--> https://www.apachefriends.org/download.html

2. run XAMPP,
  2.1.  start Apache
  2.2.  start MySql
  2.3.  click Admin on the right side of MySql (in Web Browser it is opened http://localhost/phpmyadmin/ ,
        you can  create data base named 'auth',create table with 2 columns named 'users',
        edit columns names with username, password ... set data types as VARCHAR with length 50)
   
3. Run Executive Code -->
  3.1. from   ./FishingProjectOfFacebook in terminal run command : --> 'npm run dev',
  3.2. Open Browser with http://localhost:4000/ and see Replica Of Facebook login page on screen

For example you can write username and password and click Log In button, the data send to database , Enter the database with http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=auth&table=users and see the data.


