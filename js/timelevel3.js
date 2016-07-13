var minutesleft = 00; //give minutes you wish
var secondsleft = 30; // give seconds you wish
var finishedtext = "Time finished!";
var end3;
if(localStorage.getItem("end3")) {
 end3 = new Date(localStorage.getItem("end3"));
} else {
 end3 = new Date();
 end3.setMinutes(end3.getMinutes()+minutesleft);
 end3.setSeconds(end3.getSeconds()+secondsleft);
}

var obj = {};
obj.wrong = 0;
obj.correct = 0;

var counter = function () {
 var now = new Date();
 var diff = end3 - now;
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
   if(now > end3) {    
     clearTimeout(interval);
  //localStorage.removeItem("end1");
 // localStorage.clear();
  document.getElementById('divCounter3').innerHTML = finishedtext;
  
  bootbox.alert("Time Up!", function()  {
    $('#level1').click();
 });
} else {
     var value = mins + ":" + sec;
     localStorage.setItem("end3", end3);
     document.getElementById('divCounter3').innerHTML = value;
 }
}
var interval = setInterval(counter, 1);