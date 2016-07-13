<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class clevel extends CI_Controller {

	public function level1()
	{
		$correct = $this->input->post('data');
		$timeset = $this->input->post('timeset');
		$this->load->model('mlevel');
		$arr = $this->mlevel->level1($correct,$timeset);
		//print_r($arrStatus);
		echo json_encode($arr);
	}
	public function level2()
	{
		$correct = $this->input->post('data');
		$timeset = $this->input->post('timeset');
		$this->load->model('mlevel');
		$arrlevel2 = $this->mlevel->level2($correct,$timeset);
		//print_r($correct);
		echo json_encode($arrlevel2);
	}

	public function level3()
	{
		$correct = $this->input->post('data');
		$timeset = $this->input->post('timeset');
		$this->load->model('mlevel');
		$arrStatus = $this->mlevel->level3($correct,$timeset);
		//print_r($correct);
		echo json_encode($arrStatus);
	}
}