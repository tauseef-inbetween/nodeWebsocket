var Logger = function (className, logMode, worker) {

    var logClass = className;
    var logWorker = worker;

    var getTimeStamp = function () {
        var currentDate = new Date();
        return currentDate.getFullYear() + "-"
            + (currentDate.getMonth() + 1) + "-"
            +currentDate.getDate() + "T"
            + currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":"
            + currentDate.getSeconds() + "."
            + currentDate.getMilliseconds();
    };

    var getLogRecord = function (callerName, description, data, logType) {
        return {
            
            timeStamp: getTimeStamp(),  //Time of logging
            description: description,   //Description of log
            data: data,                 //Actual data for log
            useCase: callerName,        //Close To Function Name from where logging is done
            logClass: logClass,         //Class OR File name from where logging is done
            logType: logType            //Log type [log, error, debug, warn, info]
        }
    };

    var devMode = {
        log: function (callerName, description, data) {
            console.log(getLogRecord(callerName, description, data, 'log'));
        },
        info: function (callerName, description, data) {
            console.log(getLogRecord(callerName, description, data, 'info'));
        },
        error: function (callerName, description, data) {
            console.log(getLogRecord(callerName, description, data, 'error'));
        },
        debug: function (callerName, description, data) {
            console.log(getLogRecord(callerName, description, data, 'debug'));
        },
        warn: function (callerName, description, data) {
            console.log(getLogRecord(callerName, description, data, 'warn'));
        }
    };

    var productionMode = {
        log: function (callerName, description, data) {
            logWorker.postMessage(getLogRecord(callerName, description, data, 'log'));
        },
        info: function (callerName, description, data) {
            logWorker.postMessage(getLogRecord(callerName, description, data, 'info'));
        },
        error: function (callerName, description, data) {
            logWorker.postMessage(getLogRecord(callerName, description, data, 'error'));
        },
        debug: function (callerName, description, data) {
            logWorker.postMessage(getLogRecord(callerName, description, data, 'debug'));
        },
        warn: function (callerName, description, data) {
            logWorker.postMessage(getLogRecord(callerName, description, data, 'warn'));
        }
    };

    return (logMode == 'devMode') ? devMode : productionMode;
};