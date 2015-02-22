# Deadbolt Password Generator Chrome Extension

This is the Chrome Mobile App for Deadbolt Password Generator
<http://www.deadboltpasswordgenerator.com/>

  * Turns a memorable phrase into a strong password.
  * Never stores passwords or phrases.
  * Entirely client side, no secure information is transmitted.

# License

Copyright 2012, 2014 Ed Carter
GNU GENERAL PUBLIC LICENSE Version 3 - <http://www.gnu.org/licenses/>

# Dependencies

This project relies heavily on Polymer libraries. To install
you will need NodeJs, and will then need to run the following
command to install Bower:

`npm install -g bower`

You then need to use Bower to pull down the Polymer repositories.
Run the following command in the 'app' directory of this project:

`bower update`

Finally, to build the app in a way that is friendly to Chrome apps
and the CSP policy, you'll need to install Vulcanize:

`npm install -g vulcanize`

Once installed run the following command:

`vulcanize -o build.htm deadbolt.htm --csp`

This will create a Chrome App, which can in turn be converted into
a mobile app using Cordova (instructions coming soon).

# Packaging for Mobile

You will need Phonegap, Cordova and CCA in order to make use of the plugins:

```
npm install -g phonegap
npm install -g cordova
npm install -g cca
```

First, you need to create the mobile app - navigate to the root folder
and run the following command:

`cca create deadbolt --link-to=app/manifest.json`

Then we need to install the required plugins:

```
cca plugins add https://github.com/VersoSolutions/CordovaClipboard
cca plugins add https://github.com/wildabeast/BarcodeScanner.git
```

To build the application firstly prepare the app by running the following command
in the newly created 'deadbolt' folder:

`cca prepare`

Then, copy contents of the 'android-app-resources' folder into the newly created 
'deadbolt' folder (overwriting where necessary).

Now, from there navigate to /platforms/android/cordova and run:

`build --debug`