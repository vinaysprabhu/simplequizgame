<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class cregister extends CI_Controller {
	public function index()
	{
		//echo "hello";
		$this->load->view('vregister');
	}
	public function register()
	{
		$arr=$this->input->post('data');
		 
		$this->load->model('msignup');
		$res=$this->msignup->signup($arr);
		echo json_encode($res);
	}
}