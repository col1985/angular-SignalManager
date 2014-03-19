/*  
 *  Author: Colum Bennett < colum.bennett@feedhenry.com >
 *
 *
 */

'use strict'

angular.module('SignalManager', []).service('SignalManager', function($rootScope) {

    /*
     *  switch on device debugging.
     *  @onDeviceDebug : prints network connection / signal to screen using alert box
     *  @onDeviceDebug  : default to 'false', printing debug message to console
     */

    var onDeviceDebug = false;

    /*
     *  fn check is device is online
     *  if if device is online addEventListener to detect network connection.
     *  if bool = false, print message to console
     */

    // not sure about this part!

    function isDeviceOnline() {
        if (navigator.onLine) {
            document.addEventistener("deviceReady", onDeviceReady, false);
        } else {
            console.debug("Device is not online: " + new Date().toISOString());
        }
    }

    /*
     *  On deviceReady event try calling
     *  if bool = true, display message to screen using alert box for on device debugging
     *  if bool = false, print message to console
     */

    function onDeviceReady() {
        try {
            var signal = this.detectDeviceSignal();

            switch (signal) {
                case 1:
                    signal = "Wifi Connection";
                    var enableNetworkTraffic = true;

                    if (signal && enableNetworkTraffic) {
                        this.broadcastNetworkSignal(signal, enableNetworkTraffic);
                    }

                    break;
                case 2:
                    signal = "Cell 3G Connection";
                    var enableNetworkTraffic = true;

                    if (signal && enableNetworkTraffic) {
                        this.broadcastNetworkSignal(signal, enableNetworkTraffic);
                    }
                    break;
                case 3:
                    signal = "Cell 4G Connection";
                    var enableNetworkTraffic = true;

                    if (signal && enableNetworkTraffic) {
                        this.broadcastNetworkSignal(signal, enableNetworkTraffic);
                    }
                    break;
                default:
                    var enableNetworkTraffic = false;

                    if (signal && enableNetworkTraffic) {
                        console.debug("Bad Network Connection detected : " + signal);
                        this.broadcastNetworkSignal(signal, enableNetworkTraffic);
                    }
            }
        } catch (e) {
            console.error("SIGNAL SERVICE : " + e.message + " : " + e.number + " : " + e.name);
        }
    }

    /*
     *  fn to return device Carrier Network connection type
     *  Using phonegap api v2.9
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

        reportSignal();

        return signalType[deviceSignal];
    }

    /*
     *  fn to report connection type
     *  if bool = true, display message to screen using alert box for on device debugging
     *  if bool = false, print message to console
     */

    function getOnDeviceDebug(onDeviceDebug) {
        if (onDeviceDebug !== null || undefined) {
            return onDeviceDebug;
        } else {
            console.error("Something went wrong here!!");
        }
    }

    /*
     *  fn to set OnDeviceDebug value
     *  if bool = true, display message to screen using alert box for on device debugging
     *  if bool = false, print message to console
     */

    function setOnDeviceDebug(bool) {
        return onDeviceDebug === bool;
    }

    /*
     *  fn to report connection type
     *  if bool = true, display message to screen using alert box for on device debugging
     *  if bool = false, print message to console
     */

    function reportSignal() {
        if (onDeviceDebug) {
            alert("Connection Type detected: " + signalType[deviceSignal] + "\n Detected on: " + new Date().toISOString());
        } else {
            console.debug("Connection Type detected: " + signalType[deviceSignal] + "\n Detected on: " + new Date().toISOString());
        }
    }

    /*
     *  fn to report connection type
     *  if bool = true, display message to screen using alert box for on device debugging
     *  if bool = false, print message to console
     */

    function broadcastNetworkSignal(signal, enableNetworkTraffic) {
        var networkStatus = {
            "connectionType": signal,
            "allowTraffic": enableNetworkTraffic
        };

        $rootScope.$broadcast('SignalManager.networkSignalChange', networkStatus);
    }

    return {
        onDeviceDebug: setOnDeviceDebug,
        isDebugActive: getOnDeviceDebug,
        isDeviceOnline: isDeviceOnline
    };
});
