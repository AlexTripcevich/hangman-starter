// python -m http.server
let annotations = [];
document.getElementById("acitivtySelector").addEventListener("click", processData);

let jan = [], feb = [], mar = [], apr = [], may = [], jun = [], jul = [], aug = [], sep = [], oct = [], nov = [], dec = [];
let janTotal = 0, febTotal = 0, marTotal = 0, aprTotal = 0, mayTotal = 0, junTotal = 0, julTotal = 0, augTotal = 0, sepTotal = 0, octTotal = 0, novTotal = 0, decTotal = 0;

let myChart = null;
const ctx = document.getElementById('myChart');

class Activity {
    constructor(distance, time, date) {
        this.distance = distance;
        this.time = time;
        this.date = date;
        this.convert();
        this.extractDate();
    }
    convert() {
        this.hours = this.time / 3600;
        this.miles = this.distance * 0.621371; 
    }
    extractDate() {
        let parts = this.date.split(" ");
        this.month = parts[0];
        this.year = parts[2].slice(0, -1); 
    }
}

function processData() {
    let annotations = [];
    if (myChart instanceof Chart) {
        myChart.destroy();
    }

    resetMonthlyArrays();

    let activities = [];
    let type = document.getElementById("activityType").value;
    let year = document.getElementById("year").value;
    console.log(year);
    console.log(type);

    for (let i = 0; i < data.length; i++) {
        let activityType = data[i]["Activity Type"];
        if (activityType == type) {
            let activity = new Activity(data[i]["Distance"], data[i]["Moving Time"], data[i]["Activity Date"]);
            console.log(activity.year);
            console.log(year);
            if (activity.year == year) {
                processMonthData(activity);
            }
        }
    }


    calculateMonthlyTotals();

    createChart();
}

function resetMonthlyArrays() {
    jan = [], feb = [], mar = [], apr = [], may = [], jun = [], jul = [], aug = [], sep = [], oct = [], nov = [], dec = [];
    janTotal = febTotal = marTotal = aprTotal = mayTotal = junTotal = julTotal = augTotal = sepTotal = octTotal = novTotal = decTotal = 0;
}

function processMonthData(activity) {
    switch (activity.month) {
        case "Jan": jan.push(activity.miles); break;
        case "Feb": feb.push(activity.miles); break;
        case "Mar": mar.push(activity.miles); break;
        case "Apr": apr.push(activity.miles); break;
        case "May": may.push(activity.miles); break;
        case "Jun": jun.push(activity.miles); break;
        case "Jul": jul.push(activity.miles); break;
        case "Aug": aug.push(activity.miles); break;
        case "Sep": sep.push(activity.miles); break;
        case "Oct": oct.push(activity.miles); break;
        case "Nov": nov.push(activity.miles); break;
        case "Dec": dec.push(activity.miles); break;
    }
}

function calculateMonthlyTotals() {
    janTotal = jan.reduce((sum, miles) => sum + miles, 0);
    febTotal = feb.reduce((sum, miles) => sum + miles, 0);
    marTotal = mar.reduce((sum, miles) => sum + miles, 0);
    aprTotal = apr.reduce((sum, miles) => sum + miles, 0);
    mayTotal = may.reduce((sum, miles) => sum + miles, 0);
    junTotal = jun.reduce((sum, miles) => sum + miles, 0);
    julTotal = jul.reduce((sum, miles) => sum + miles, 0);
    augTotal = aug.reduce((sum, miles) => sum + miles, 0);
    sepTotal = sep.reduce((sum, miles) => sum + miles, 0);
    octTotal = oct.reduce((sum, miles) => sum + miles, 0);
    novTotal = nov.reduce((sum, miles) => sum + miles, 0);
    decTotal = dec.reduce((sum, miles) => sum + miles, 0);
}

function createChart() {
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Avg Miles per Month',
                data: [janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                annotation: {
                    annotations 
                }
            }
        }
    });
}




document.getElementById("reset").addEventListener("click", reset);

function reset() {
    // Clear only the annotations array
    myChart.options.plugins.annotation.annotations = [];

    // Update the chart to reflect the removal of annotations
    myChart.update();
}

document.getElementById("addEvent").addEventListener("click", addAnnotation);
function addAnnotation(event) {
    event.preventDefault(); 

    let month = document.getElementById("eventMonth").value;
    let description = document.getElementById("eventDescription").value;
    let height = document.getElementById("eventHeight").value;

    const annotation = {
        type: 'label',
        xValue: month,  
        yValue: height,  
        backgroundColor: 'rgba(245, 245, 245, 0.8)', 
        content: [description], 
        font: {
            size: 10
        }
    };
annotations.push(annotation)
    myChart.options.plugins.annotation.annotations.push(annotation);


    myChart.update();
}