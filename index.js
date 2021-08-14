let createEmployeeRecord = function(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(e){
    return e.map(function(info){
        return createEmployeeRecord(info)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: Number(hour)
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: Number(hour)
    })
    return employee
}

let hoursWorkedOnDate = function(employee, clockedDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === clockedDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === clockedDate
    })
    return (outEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(employee, clockedDate){
    let wage = hoursWorkedOnDate(employee, clockedDate) * employee.payPerHour
    return wage //toString?
}

const allWagesFor = function (employee) {
    let eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    },0)
    return payable
}  

let findEmployeeByFirstName = function(collection, firstName) {
    return collection.find(function(e){
        return e.firstName === firstName
    })
}

let calculatePayroll = function(paycheck) {
    return paycheck.reduce(function(memo, e){
        return memo + allWagesFor(e)
    },0)
}