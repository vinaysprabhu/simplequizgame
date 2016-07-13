<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class clogin extends CI_Controller {

	public function index()
	{
		$this->load->view('vlogin');
	}

	public function login()
	{
		//$this->load->view('vlogin');
		$username=$this->input->post("username");
		$cpassword=$this->input->post("password");
		$errFlag=0;
		$arrData=array();
		if($username == '')
		{
			$arrData = array("szMessage" => "No username entered");
			$errFlag++;
		}

		if($cpassword == '')
		{
			$arrData = array("szMessage" => "No password entered");
			$errFlag++;
		}

		if($errFlag == 0)
		{
			$this->load->model("mlogin");
			$szRes=$this->mlogin->login($username,$cpassword);
			//print_r($szRes);die();
			if(is_array($szRes))
			{
				if(is_array($szRes))
				{
					$szRes['username']=$username;
					$this->session->set_userdata('username',$szRes['username']);
					$this->session->set_userdata('name',$szRes['email']);
					$this->session->set_userdata('userid',$szRes['nuserid']);
					$arrData = array("szMessage" => "Success");
				}
			}
			else
			{
				$arrData = array("szMessage" => "Invalid username or password.");
			}
						
		}//end of if($errFlag == 0)
		echo json_encode($arrData);
	}
	public function success()
	{
		$this->chkloginuser();
		$this->load->model('mlevel');
		$levels =$this->mlevel->chklevel();
		//print_r($levels);
		$this->load->view('vlevel',array('levels'=>$levels));
	}//end of success()

	public function levelOne()
	{
		$this->chkloginuser();
		$this->load->view('vproductstore');
	}//end of success()

	public function levelTwo()
	{
		$this->chkloginuser();
		$this->load->view('vlevel2');
	}//end of success()
	public function levelThree()
	{
		$this->chkloginuser();
		$this->load->view('vlevel3');
	}//end of success()

	public function logout()
	{
		//echo "Logout";
		$this->session->unset_userdata('username');
		$this->session->sess_destroy();
		 //unset($this->session->userdata);  
		//redirect('/index');
		header("location:".constant('BASE_DIR')."index.php");
		//die();
	}

}