/* Your Code Here */
function createEmployeeRecord (a){
    const eObj = {
        firstName: a[0],
        familyName: a[1],
        title: a[2],
        payPerHour: a[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return eObj;
}

function createEmployeeRecords(a){
    let aoo = []
    a.forEach(x => aoo.push(createEmployeeRecord(x)))
    return aoo;
}

function createTimeInEvent(d){
    const tObj = {
        type: 'TimeIn',
        date: d.split(' ')[0],
        hour: parseInt(d.split(' ')[1])
    }
    this.timeInEvents.push(tObj)
    return this;
}

function createTimeOutEvent(d) {
    const tObj = {
        type: 'TimeOut',
        date: d.split(' ')[0],
        hour: parseInt(d.split(' ')[1])
    }
    this.timeOutEvents.push(tObj)
    return this;
}

function hoursWorkedOnDate(d) {
    let fIn = Math.floor(this.timeInEvents.find(record => record.date == d).hour / 1e2);
    let fOut = Math.floor(this.timeOutEvents.find(record => record.date == d).hour / 1e2);
    return fOut - fIn;
}

function wagesEarnedOnDate(d){
    let wage = this.payPerHour * hoursWorkedOnDate.call(this, d)
    return wage
}

function calculatePayroll(a){
    //console.log(a)
    let wages = []
    for (let i = 0; i < a.length; i++) {
        wages.push(allWagesFor.call(a[i]))
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let w = wages.reduce(reducer)
    return w;
}

function findEmployeeByFirstName(a, s){
    let obj = a.find(o => o.firstName === s);
    return obj;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    console.log(this)
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}