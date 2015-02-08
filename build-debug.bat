call vulcanize -o app/build.htm app/deadbolt.htm --csp
cd deadbolt

call cca prepare

cd platforms/android/cordova

call build --debug

cd ../../../../
