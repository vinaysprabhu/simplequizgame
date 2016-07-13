<?php
class sendsms_helper
{
	private $userid='2000097065';
	private $password='ddpsmsgupshup14';
	
	public function sendtransactionalSMS($msg,$contactno)
	{
		//print_r($msg); die();
		//print_r($contactno); die();
		$params = array();
		$params['method'] = 'SendMessage';
		$params['send_to'] = $contactno;
		$params['msg'] = urlencode($msg);
		$params['overide_dnd'] = TRUE;
		$params['userid'] = $this->userid;
		$params['password'] = $this->password;
		$params['filetype'] = 'text';
		$params['auth_scheme'] = 'PLAIN';
		$params['v'] = '1.1';	
		//$url="http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=9743557536&msg=Welcome%20to%20SMS%20GupShup%20API&msg_type=TEXT&userid=2000097065&auth_scheme=plain&password=jTlUEl7GS&v=1.1&format=text";		
		$url="http://enterprise.smsgupshup.com/GatewayAPI/rest";	
		$out=$this->actionPost($url, $params, TRUE, CURL_HTTP_VERSION_1_0);
		$retData['out']=$out;
		$retData['msg']=$msg;
		return $retData;
	}

	public function actionPost($url, $params, $multipart = FALSE, $version=CURL_HTTP_VERSION_NONE)
	{
		if(function_exists('curl_init'))
		{
			$ch = curl_init();
			$timeout = 60;
			curl_setopt($ch,CURLOPT_URL,$url);
			curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
			curl_setopt($ch, CURLOPT_HTTP_VERSION, $version);
			curl_setopt($ch, CURLOPT_POST, TRUE);
			if($multipart)
			{
				curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
			}
			else
			{
				curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
			}
			curl_setopt($ch,CURLOPT_TIMEOUT,$timeout);
			$data = curl_exec($ch);
			if($data === FALSE)
			{
				throw new Exception(curl_errno($ch));
			}
			curl_close($ch);
			return $data;
		}
		else
		{
			return FALSE;
		}
	}
}
?>