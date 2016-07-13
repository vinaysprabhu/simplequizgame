<?php
class msignup extends CI_Model
{

	private $salt = '12312esdf@#$#%%fghfgh5fd1dfg543&%@%&*#$$#fsdf';
	public function signup($arr)
	{
		//echo "hellllo";die();
		$userData=array();
		$query="SELECT * FROM users WHERE lower(email)='".strtolower($arr['cemail'])."' OR mobile='".$arr['cmobile_no']."' ";

		//echo "query:".$query."<br/>";
		$res=$this->db->query($query);
		if($res->num_rows() >= 1)
		{

			$arrStatus['status'] ='ERR';$arrStatus['msg']='Record Already Exist';
		}
		else
		{
			$encyptpass=md5($this->salt.$arr['cpassword']);
			/*$res1=$this->db->insert('users',$arr);
			$res=$this->db->query("Select LAST_INSERT_ID() as signupId from users");
			$row=$res->row();*/
			$query1="INSERT into users(name,email,mobile,password)VALUES('".$arr['cname']."','".$arr['cemail']."','".$arr['cmobile_no']."','".$encyptpass."')";
			//echo $query1;
			$res1=$this->db->query($query1);

			$arrStatus['status'] ='ok';$arrStatus['msg']='Record successfully Inserted';
		}
		return $arrStatus;
	}
}
?>
