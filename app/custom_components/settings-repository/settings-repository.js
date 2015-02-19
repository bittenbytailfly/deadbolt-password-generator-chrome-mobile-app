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
 
var deadboltSettingsRepository = (function() {
     return {
         load: function(callback) {
            chrome.storage.local.get('deadboltSettings', function (r) {
                var savedSettings = r.deadboltSettings;
                callback(savedSettings);
            });
        },
        save: function(deadboltSettings, callback){
            chrome.storage.local.set({ 'deadboltSettings': deadboltSettings }, function () {
                if (callback != null) {
                    callback();
                }
            });
        }
     }
 })();