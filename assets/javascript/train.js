

//==============SetUp===========//
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBt7KxovD5eJyaFhTPhlBPCTbRaBiwk3fo",
    authDomain: "train-schedule-76173.firebaseapp.com",
    databaseURL: "https://train-schedule-76173.firebaseio.com",
    projectId: "train-schedule-76173",
    storageBucket: "train-schedule-76173.appspot.com",
    messagingSenderId: "599460454226"
};
firebase.initializeApp(config);
console.log(firebase)
var data = firebase.database();
//var ref = database.ref()





//============EventListener=========//
$("#submit-button").click(function (event) {
    event.preventDefault();
    $('tbody').empty()
    var name = $("#name").val();
    var destination = $("#destination").val();
    var timeStart = $("#timeStart").val();
    var frequency = $("#frequency").val();

    var scheduleData = {
        name, destination, timeStart, frequency
    }
    data.ref().push(scheduleData);
})

data.ref().on("value", function (snapshot) {
    var schedule = snapshot.val()
    for (const values in schedule) {
        var { name, destination, timeStart, frequency } = schedule[values]
        var tableRow = $('<tr>')
        var tdName = $('<td>').text(name);
        var tdDestination = $('<td>').text(destination);
        var tdFrequency = $('<td>').text(frequency);



        var firstTimeConverted = moment(timeStart, "HH:mm").subtract(1, "years");
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // Time apart (remainder)
        var tRemainder = diffTime % frequency;

        var tMinutesTillTrain = frequency - tRemainder;
        var tdArrival = $('<td>').text(tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var arrival = moment(nextTrain).format("hh:mm")
        var tdTimeStart = $('<td>').text(arrival);

        tableRow.append(tdName, tdDestination, tdFrequency, tdTimeStart, tdArrival)

        $("tbody").append(tableRow);
    }
})