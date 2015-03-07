call vulcanize -o app/build.htm app/deadbolt.htm --csp
xcopy android-app-resources deadbolt /y /a /s
cd deadbolt
call cca prepare
cd ..
cd deadbolt
cd platforms/android/cordova
call build --debug
cd ../../../../
