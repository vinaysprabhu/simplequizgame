  function checkSquare(e){
      console.log(e);
      var check = $(e).attr("check");
      /*alert(check);*/
      if(check == "true"){
        return false;
       
      }
      else{
        /*alert($(e).attr("id"));*/
        
        $(e).attr("check","true");
        if($(e).attr("id")=="rect" || $(e).attr("id")=="circle" ||$(e).attr("id")=="triangle" ){
       //   alert("imside");
       //console.log($(e).attr("id"));
          $(e).css('background-image','url("/sugoi/images/wrong.png")');
          obj.wrong++;
          //var wrng = wrong;
          //alert(obj.wrong);
        }
        else{
          $(e).css('background-image','url("/sugoi/images/correct.png")');
          obj.correct++;
          //var crt = correct;
         // alert(obj.correct);
        }
        

      }


     

    }

    
function level1(){
    //localStorage.clear();
  console.log(obj);
  var timeset=document.getElementById('divCounter').innerHTML; //alert(timeset);
 var strUrl = '/sugoi/index.php/clevel/level1';
      $.ajax({
      url: strUrl,
      type: "post",
      data:{ data:obj,timeset:timeset},
      // callback handler that will be called on success
      success: function(response, textStatus, jqXHR){
        var res = JSON.parse(response);
        if(res.msg=='Record successfully Inserted')
        {
          var score = res.score;
          alert('Level1 completed.'+'your score is: ' + score);
          window.location.href='/sugoi/index.php/clogin/success';

        }
      },
      // callback handler that will be called on error
      error: function(jqXHR, textStatus, errorThrown){
      }
    });

 }
