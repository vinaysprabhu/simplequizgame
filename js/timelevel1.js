var minutesleft = 00; //give minutes you wish
var secondsleft = 60; // give seconds you wish
var finishedtext = "Time finished!";
var end1;
if(localStorage.getItem("end1")) {
 end1 = new Date(localStorage.getItem("end1"));
} else {
 end1 = new Date();
 end1.setMinutes(end1.getMinutes()+minutesleft);
 end1.setSeconds(end1.getSeconds()+secondsleft);
}

var obj = {};
obj.wrong = 0;
obj.correct = 0;

var counter = function () {
 var now = new Date();
 var diff = end1 - now;
 diff = new Date(diff);
 var milliseconds = parseInt((diff%1000)/100)
 var sec = parseInt((diff/1000)%60)
 var mins = parseInt((diff/(1000*60))%60)
   if (mins < 10) {
     mins = "0" + mins;
   }
   if (sec < 10) {
     sec = "0" + sec;
   }    
   if(now > end1) {    
     clearTimeout(interval);
  //localStorage.removeItem("end1");
  localStorage.clear();
  document.getElementById('divCounter').innerHTML = finishedtext;
  
  bootbox.alert("Time Up!", function()  {
    $('#level1').click();
 });
} else {
     var value = mins + ":" + sec;
     localStorage.setItem("end1", end1);
     document.getElementById('divCounter').innerHTML = value;
 }
}
var interval = setInterval(counter, 1);