<?php
class mlogin extends CI_Model
{	
	private $salt = '12312esdf@#$#%%fghfgh5fd1dfg543&%@%&*#$$#fsdf';
	public function login($username,$cpassword)
	{
		$query="SELECT * FROM users WHERE lower(email)='".strtolower($username)."' ";
		//echo "query:".$query."<br/>";die();
		$res=$this->db->query($query);
		if($res->num_rows() == 1)
		{
			//echo "inside";die();
			$row=$res->row();
			$encyptpass=md5($this->salt.$cpassword);
			
			if(strcmp($encyptpass, $row->password) == 0 )
			{
				$userData=array(
					'username'=>$row->name,
					'email'=>$row->email,
					'nuserid'=>$row->id
				);
				return $userData;
			}
			else
			{
				return -1;
			}
		}
		else
		{
			return -2;
		}
	}

}