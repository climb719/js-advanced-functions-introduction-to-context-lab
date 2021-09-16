function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData) {
    //map each element of array through createEmployeeRecord
    // return an array of objects 
    return employeeData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, date){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === date
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, date){
    let wage = hoursWorkedOnDate(employee, date)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}


let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(record){
      return record.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, record){
          return memo + allWagesFor(record)
      }, 0)
  }










