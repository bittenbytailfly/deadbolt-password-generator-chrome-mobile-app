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
            chrome.storage.local.set({ 'deadboltSettings': deadboltSettings }, function () {
                if (callback != null) {
                    callback(deadboltSettings);
                }
            });
        },
        importProfiles: function (profileScan) {
            try
            {
                var includeSymbolsIndex;
                var importVersion = 1
                var caseSensitiveIndex;
                var passwordLengthIndex;
                var pinNumberIndex;
                var engineIdIndex;
                var defaultProfileIndex;

                var profileLines = profileScan.split('|');
                var topLevelSettings = profileLines[0].split('');
                
                if (topLevelSettings[0] == 'a') {
                    // We're using v2 of the Deadbolt import
                    engineIdIndex = 0;
                    defaultProfileIndex = parseInt(topLevelSettings[1]);
                    includeSymbolsIndex = 1;
                    caseSensitiveIndex = 2;
                    passwordLengthIndex = 3;
                    pinNumberIndex = 5;
                    importVersion = 2;
                }
                else {
                    // Fall back to the original for backward compatibility
                    defaultProfileIndex = parseInt(topLevelSettings[0]);
                    includeSymbolsIndex = 0;
                    caseSensitiveIndex = 1;
                    passwordLengthIndex = 2;
                    pinNumberIndex = 4;
                }

                var profiles = new Array();

                for (var i = 1; i < profileLines.length; i++) {
                    var profileSettingsString = profileLines[i].substr(profileLines[i].lastIndexOf(' ') + 1);
                    var profileSettings = profileSettingsString.split('');
                    var profileName = profileLines[i].substr(0, profileLines[i].lastIndexOf(' '));

                    var engineId = 0;
                    if (importVersion == 2) {
                        engineId = parseInt(profileSettings[engineIdIndex]);
                    }
                    var includeSymbols = profileSettings[includeSymbolsIndex] == 1;
                    var caseSensitive = profileSettings[caseSensitiveIndex] == 1;
                    var passwordLength = (profileSettingsString.substr(passwordLengthIndex, 2)) * 1;
                    var usePin = false;
                    var pinNumber = '0000';

                    if (profileSettings.length > pinNumberIndex) {
                        usePin = true;
                        pinNumber = profileSettingsString.substr(pinNumberIndex, 4);
                    }

                    profiles.push({
                        name: profileName,
                        engineId: engineId,
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

                if (isNaN(deadboltSettings.defaultProfileIndex) || deadboltSettings.profiles.length == 0) {
                    throw "Failed to import";
                }

                return deadboltSettings;
            }
            catch(err) {
                return null;
            }
        }
    }
})();