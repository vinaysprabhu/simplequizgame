<?php
class mlevel extends CI_Model
{	
	public function chklevel()
	{
		$uid = $this->session->userdata['userid'];
		//echo $uid;die();
		$query="SELECT * FROM user_levels WHERE user_id=".$uid." ";
		//echo "query:".$query."<br/>";die();
		$res=$this->db->query($query);
		if($res->num_rows() == 1)
		{
			//echo "inside";die();
			$row=$res->row();
			//print_r($row);
		$levels=$row->levels;
		//echo $levels; die();
	}
	else{
		$levels =0;
	}
	return $levels;

		//echo $res;die();
	} 




	public function level1($correct,$timeset)
	{
		$uid = $this->session->userdata['userid'];

		//print_r($correct);
		//echo $timeset;die();
		//$data = "123_String";    
$seconds = substr($timeset, strpos($timeset, ":") + 1);  
		
//$correctValues= 6;
$wrong = $correct['wrong'];
$correct = $correct['correct'];

//die();
if($seconds >= 50){
	$bonus = 20;

}
else if($seconds > 40 && $seconds <= 49){
	$bonus = 10;	
}
else if($seconds > 30 && $seconds <= 39  ){
	$bonus = 5;
}
else if($seconds < 30){
	$bonus = 1;
} 


$score = $correct * 10;
//echo $score;
$score = $score + $bonus;
//echo $score;
$wrg = $wrong * 3;
$score = $score - $wrg;
//echo $score; 

		
		$query = "INSERT into user_levels(user_id,levels)VALUES(".$uid.",'level1')";

		//echo $query;die();
		$res=$this->db->query($query);
		if($res)
		{
			//echo "inside";die();
			$query1="INSERT into levels(user_id,level,correct,wrong,timer,score)VALUES(".$uid.",'level1',".$correct.",".$wrong.",'".$timeset."',".$score.")";
			//echo $query1;
			$res1=$this->db->query($query1);
			$arrStatus['status'] ='ok';
			$arrStatus['msg']='Record successfully Inserted';
 
			$arrStatus['score'] =$score;
		}
		return $arrStatus;


		//print_r($correct);die();
	}
	public function level2($correct,$timeset)
	{
		//echo $timeset;die();

		$uid = $this->session->userdata['userid'];
		echo $uid;
		
		$seconds = substr($timeset, strpos($timeset, ":") + 1);  
		
//$correctValues= 6;
$wrong = $correct['wrong'];
$correct = $correct['correct'];

//die();
if($seconds >= 40){
	$bonus = 20;

}
else if($seconds >= 35 && $seconds <= 39){
	$bonus = 10;	
}
else if($seconds >= 30 && $seconds <= 34  ){
	$bonus = 5;
}
else if($seconds < 30){
	$bonus = 1;
} 


$score = $correct * 10;
//echo $score;
$score = $score + $bonus;
//echo $score;
$wrg = $wrong * 3;
$score = $score - $wrg;
//echo $score; 


		$query = "UPDATE user_levels SET levels='level2' where user_id =".$uid."";

		//echo $query;die();
		$res=$this->db->query($query);
		if($res)
		{
			//echo "inside";die();
			$query1="INSERT into levels(user_id,level,correct,wrong,timer,score)VALUES(".$uid.",'level2',".$correct.",".$wrong.",'".$timeset."',".$score.")";
			//echo $query1;
			$res1=$this->db->query($query1);

			$arrStatus['status'] ='ok';$arrStatus['msg']='Record successfully Inserted';
			$arrStatus['score'] =$score;

		}
		
		return $arrStatus;


		//print_r($correct);die();
	}

	public function level3($correct,$timeset)
	{
		//echo $timeset;die();

		$uid = $this->session->userdata['userid'];
		echo $uid;
		

		$seconds = substr($timeset, strpos($timeset, ":") + 1);  
		
//$correctValues= 6;
$wrong = $correct['wrong'];
$correct = $correct['correct'];

//die();
if($seconds >= 25){
	$bonus = 20;

}
else if($seconds >= 20 && $seconds <= 24){
	$bonus = 10;	
}
else if($seconds >= 15 && $seconds <= 19  ){
	$bonus = 5;
}
else if($seconds < 15){
	$bonus = 1;
} 


$score = $correct * 10;
//echo $score;
$score = $score + $bonus;
//echo $score;
$wrg = $wrong * 3;
$score = $score - $wrg;

		$query = "UPDATE user_levels SET levels='level3' where user_id =".$uid."";

		//echo $query;die();
		$res=$this->db->query($query);
		if($res)
		{
			//echo "inside";die();
			$query1="INSERT into levels(user_id,level,correct,wrong,timer,score)VALUES(".$uid.",'level3',".$correct.",".$wrong.",'".$timeset."',".$score.")";
			//echo $query1;
			$res1=$this->db->query($query1);

			$arrStatus['status'] ='ok';$arrStatus['msg']='Record successfully Inserted';

		}
		
		return $arrStatus;


		//print_r($correct);die();
	}
}