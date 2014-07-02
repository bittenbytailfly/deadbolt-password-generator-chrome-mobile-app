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