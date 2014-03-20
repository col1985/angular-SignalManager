/*  
 *  Author: Colum Bennett < colum.bennett@feedhenry.com >
 *
 *
 */

'use strict'

angular.module('SignalManager', []).service('SignalManager', function($rootScope) {

    /*
     *  @onDeviceDebug : prints network connection / signal to screen using alert box
     *  @disableTrafficObj  : default to 'false', printing debug message to console
     */

    var onDeviceDebug = false;

    var disableTrafficObj = {
        "Unknown Connection": "Unknown Connection",
        "Ethernet Connection": "Ethernet Connection",
        "Cell 2G Connection": "Cell 2G Connection",
        "Cell Connection": "Cell Connection",
        "No Network Connection": "No Network Connection"
    };

    /*
     *  fn check is device is online
     *  if if device is online addEventListener to detect network connection.
     *  if bool = false, print message to console
     */

    function isDeviceOnline() {
        if (navigator.onLine) {
            onDeviceReady();
        } else {
            console.debug("Device is not online: " + new Date().toISOString());
        }
    }

    /*
     *  @signalString
     *  @enableTraffic
     *  @method :
     */

    function onDeviceReady() {
        try {
            var signalString = detectDeviceSignal();

            var enableTaffic = true;

            if (signalString == disableTrafficObj[signalString]) {
                enableTaffic = false;
                broadcastNetworkSignal(signalString, enableTaffic);
            }

            if (signalString != disableTrafficObj[signalString]) {
                enableTaffic = true;
                broadcastNetworkSignal(signalString, enableTaffic);
            }
        } catch (e) {
            console.error("SIGNAL SERVICE : " + e.message + " : " + e.number + " : " + e.name);
        }
    }

    /*
     *  @deviceSignal :
     *  @signalType :
     */

    function detectDeviceSignal() {
        var deviceSignal = navigator.connection.type;
        var signalType = {};

        signalType[Connection.UNKNOWN] = "Unknown Connection";
        signalType[Connection.ETHERNET] = "Ethernet Connection";
        signalType[Connection.WIFI] = "Wifi Connection";
        signalType[Connection.CELL_2G] = "Cell 2G Connection";
        signalType[Connection.CELL_3G] = "Cell 3G Connection";
        signalType[Connection.CELL_4G] = "Cell 4G Connection";
        signalType[Connection.CELL] = "Cell 2G Connection";
        signalType[Connection.NONE] = "No Network Connection";

        reportSignal(signalType[deviceSignal]);

        return signalType[deviceSignal];
    }

    /*
     *  @signalString :
     *  @onDeviceDebug :
     */

    function reportSignal(signalString) {
        if (onDeviceDebug) {
            alert("Connection Type detected: " + signalString + ", Detected on: " + new Date().toISOString());
        } else {
            console.debug("Connection Type detected: " + signalString + ", Detected on: " + new Date().toISOString());
        }
    }

    /*
     *  @networkStatus :
     *  @signal :
     *  @enableNetworkTraffic :
     */

    function broadcastNetworkSignal(signal, enableNetworkTraffic) {
        var networkStatus = {
            "connectionType": signal,
            "allowTraffic": enableNetworkTraffic
        };

        $rootScope.$broadcast('SignalManager.networkSignalChange', networkStatus);
    }

    return {
        isDeviceOnline: isDeviceOnline
    };
});
