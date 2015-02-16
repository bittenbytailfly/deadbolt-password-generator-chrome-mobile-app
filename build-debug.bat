call vulcanize -o app/build.htm app/deadbolt.htm --csp
cd deadbolt
call cca prepare
cd ..
xcopy android-app-resources deadbolt /y /a /s
cd deadbolt
cd platforms/android/cordova
call build --debug
cd ../../../../
