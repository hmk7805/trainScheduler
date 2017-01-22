$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAwu9dJyL3D6_WYIbmbyyj1BeNe-jm47HE",
    authDomain: "trainscheduled.firebaseapp.com",
    databaseURL: "https://trainscheduled.firebaseio.com",
    storageBucket: "trainscheduled.appspot.com",
    messagingSenderId: "430629517927"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();

  $('#addTrain').on('click', function(){
  	var newTrainObj = {
      name: $('#trainName').val().trim(),
    	destination: $('#trainDest').val().trim(),
    	firstTime: $('#trainTime').val().trim(),
    	frequency: $('#trainFreq').val().trim()
    }
    console.log('obj: ' + newTrainObj);
    console.log('DB train obj: ' + newTrainObj.trainDBObj);
    //first time converted from military time
    var firstTimeConverted=moment(newTrainObj.firstTime, 'HH:mm');
    //current time in seconds
    var currentTime = moment();
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    //remainder give the amount of minutes that have passed since last train
    var remainder = diffTime % newTrainObj.frequency;
    //freq less remainder gives minutes until next train
    var minutesAway = newTrainObj.frequency - remainder;
    //next train time calculation
    var nextTrain = moment().add(minutesAway, "minutes");
    //time formatting for DOM
    var arrivalTime = moment(nextTrain).format("hh:mm");
    //train object to store in DB
    var trainDBObj = {
      name: newTrainObj.name,
      destination: newTrainObj.destination,
      frequency: newTrainObj.frequency,
      arrivalTime: arrivalTime,
      minutesAway: minutesAway
    };
    
    //push to firebase
    database.ref().push(trainDBObj)
 	  dataRef.ref().on("child_added", function(snapshot) {
    var snap = snapshot.val()
    var newTrain = $('<tr><td>' + snap.name + '</td><td>' + snap.destination + '</td><td>' + snap.frequency +'</td><td>' + snap.arrivalTime + '</td><td>' + snap.minutesAway + '</td></tr>')
    $('tbody').append(newTrain)
    })
    // var snap = snap.val()
    // var newTrain = $('<tr><td>' + snap.name + '</td><td>' + snap.destination + '</td><td>' + snap.frequency +'</td><td>' + snap.arrivalTime + '</td><td>' + snap.minutesAway + '</td></tr>')
    // $('tbody').append(newTrain)
  })
  database.ref().on("child_added", function(snapshot) {
    var snap = snapshot.val();
    console.log (snap)
    var snapArr = Object.keys(snap);
    console.log(snapArr);
    // Finding the last user's key
   // for (i = 0, i<snapArr.length)
    var lastIndex = snapArr.length - 1;
    var lastKey = snapArr[lastIndex];
    var newTrain = $('<tr><td>' + snap.name + '</td><td>' + snap.destination + '</td><td>' + snap.frequency +'</td><td>' + snap.arrivalTime + '</td><td>' + snap.minutesAway + '</td></tr>')
    $('tbody').append(newTrain)
    

    // Using the last user's key to access the last added user object
    var lastObj = snap[lastKey]

    // Console.loging the last user's data
    console.log(lastObj);
    // console.log(lastObj.name);
    // console.log(lastObj.destination);
    // console.log(lastObj.frequency);
    // console.log(lastObj.arrivalTime);
    // console.log(lastObj.minutesAway);
    // Change the HTML to reflect
    // $("#name-display").html(lastObj.name);
    // $("#email-display").html(lastObj.email);
    // $("#age-display").html(lastObj.age);
    // $("#comment-display").html(lastObj.comment);
    // Handle the errors
    }), function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    };

 	
  return false;
});
 