var minutesleft = 00; //give minutes you wish
var secondsleft = 45; // give seconds you wish
var finishedtext = "Time finished!";
var end2;
if(localStorage.getItem("end2")) {
 end2 = new Date(localStorage.getItem("end2"));
} else {
 end2 = new Date();
 end2.setMinutes(end2.getMinutes()+minutesleft);
 end2.setSeconds(end2.getSeconds()+secondsleft);
}

var obj = {};
obj.wrong = 0;
obj.correct = 0;

var counter = function () {
 var now = new Date();
 var diff = end2 - now;
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
   if(now > end2) {    
     clearTimeout(interval);
  //localStorage.removeItem("end1");
 localStorage.clear();
  document.getElementById('divCounter2').innerHTML = finishedtext;
  
  bootbox.alert("Time Up!", function()  {
    $('#level1').click();
 });
} else {
     var value = mins + ":" + sec;
     localStorage.setItem("end2", end2);
     document.getElementById('divCounter2').innerHTML = value;
 }
}
var interval = setInterval(counter, 1);