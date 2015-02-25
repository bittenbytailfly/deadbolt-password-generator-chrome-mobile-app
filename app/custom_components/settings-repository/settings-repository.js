//    Copyright 2015 Ed Carter
//
//    This file is part of Deadbolt Password Generator.
//
//    Deadbolt Password Generator is free software: you can redistribute 
//    it and/or modify it under the terms of the GNU General Public 
//    License as published by the Free Software Foundation, either 
//    version 3 of the License, or (at your option) any later version.
//
//    Deadbolt Password Generator is distributed in the hope that it 
//    will be useful, but WITHOUT ANY WARRANTY; without even the implied 
//    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
//    See the GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with Deadbolt Password Generator.  If not, see 
//    <http://www.gnu.org/licenses/>.

var deadboltSettingsRepository = (function () {
    return {
        load: function (callback) {
            chrome.storage.local.get('deadboltSettings', function (r) {
                var savedSettings = r.deadboltSettings;
                if (savedSettings !== undefined) {
                    callback(savedSettings);
                }
            });
        },
        save: function (deadboltSettings, callback) {
            console.log(deadboltSettings);
            chrome.storage.local.set({ 'deadboltSettings': deadboltSettings }, function () {
                if (callback != null) {
                    callback(deadboltSettings);
                }
            });
        },
        importProfiles: function (profileScan) {
            console.log(profileScan);
            var profileLines = profileScan.split('|');
            var defaultProfileIndex = profileLines[0];

            var profiles = new Array();

            for (var i = 1; i < profileLines.length; i++) {
                var profileSettings = profileLines[i].substr(profileLines[i].lastIndexOf(' ') + 1).split('');
                var profileName = profileLines[i].substr(0, profileLines[i].lastIndexOf(' '));

                var includeSymbols = profileSettings[0] == 1;
                var caseSensitive = profileSettings[1] == 1;
                var passwordLength = (profileSettings[2] + '' + profileSettings[3]) * 1;
                var usePin = false;
                var pinNumber = '0000';

                if (profileSettings.length > 4) {
                    usePin = true;
                    pinNumber = profileSettings[4].concat(profileSettings[5], profileSettings[6], profileSettings[7]);
                }
                else {
                    pinNumber = '0000';
                }

                profiles.push({
                    name: profileName,
                    includeSymbols: includeSymbols,
                    caseSensitive: caseSensitive,
                    passwordLength: passwordLength,
                    usePin: usePin,
                    pinNumber: pinNumber
                });
            }

            var deadboltSettings = {
                defaultProfileIndex: defaultProfileIndex,
                profiles: profiles
            };

            return deadboltSettings;
        }
    }
})();