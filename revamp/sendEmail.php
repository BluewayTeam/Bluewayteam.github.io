<?php 
//--------------------------------------------------------------给页面utf-8
define('_root',$_SERVER['DOCUMENT_ROOT']);
require_once(_root.'/common/function.php');
require_once(_root.'/common/class.phpmailer.php');
$post=$_POST;
$finalPost=array();
$langID=$sessData['langID'];
$finalPost['job']=$post['job'];
$finalPost['whereToKnow']=$post['whereToKnow'];
$finalPost['salary']=$post['salary'];
$finalPost['gender']=$post['gender'];
$finalPost['surnameEng']=$post['surnameEng'];
$finalPost['otherNameEng']=$post['otherNameEng'];
$finalPost['surnameChi']=$post['surnameChi'];
$finalPost['otherNameChi']=$post['otherNameChi'];
$finalPost['dayOfBirthday']=modifyTo2Dig_fun($post[bdYear]).modifyTo2Dig_fun($post[bdMonth]).modifyTo2Dig_fun($post[bdDay]);
$finalPost['tel']=$post['tel'];
$finalPost['phone']=$post['phone'];
$finalPost['email']=$post['email'];
$finalPost['status']=1;
$finalPost['applyDate']=getCurTime_fun();
$applicantName=incFindPullDownName_fun(_dbPrefix.'_a4_gender',$finalPost['gender'],'displayName_1');
if (trim($finalPost['surnameEng'])!=''){
	$applicantName.= ' '.$finalPost['surnameEng'].' '.$finalPost['otherNameEng'];
}else{
	$applicantName.= ' '.$finalPost['surnameChi'].' '.$finalPost['otherNameChi'];
}
$mailContent='';
$mailContent.='<p>From:'.$finalPost['email'].'</p>';
$mailContent.='<p>Name:'.$applicantName.'</p>';
$mailContent.='<p>Position:'.incFindPullDownName_fun(_dbPrefix.'_nav2Lv',$finalPost['job'],'name_2').'</p>';
$mailContent.='<p>Telephone:'.$finalPost['phone'].'</p>';
$mailContent.='<p>Email:'.$finalPost['email'].'</p>';
$mailContent.='<p>Submit at:'.$finalPost['applyDate'].'</p>';
if (incSendEmail_fun($mailContent)=='success'){
	$temp['result']='success';
}else{
	$temp['result']=incSendEmail_fun($mailContent);
}
echo json_encode($temp); 
//-----------------------------------------------------------------------------------
function incSendEmail_fun($mailContent){
	/*$adminEmail="lawrence@bluewaytech.com";
	$adminPass="hs111772";*/
	$adminEmail="HR@bluewaytech.com";
	$adminPass="hrblueway";
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Mailer = "smtp";
	$mail->Host = "ssl://smtp.gmail.com";
	$mail->Port = 465;
	$mail->SMTPAuth = true;
	$mail->Username = $adminEmail;
	$mail->Password = $adminPass; 
	$body = $mail->getFile('emailContent.html');
	$body = eregi_replace("[\]",'',$body);
	$subject = eregi_replace("[\]",'',$subject);
	$body = str_replace('emailContent',$mailContent,$body);
	$mail->From = _adminEmail;
	$mail->FromName = "Administrator";
	$mail->Subject = "Apply Job";
	$mail->CharSet = 'UTF-8';
	$mail->AltBody = "To view the message, please use an HTML compatible email viewer!";
	$mail->MsgHTML($body);
	$mail->AddAddress($adminEmail, "Administrator");
	if(!$mail->Send()) {
		return("cannot send to HR");
	}else{
		return(incSendMemEmail_fun());
	}
}
//-------------------------------------------------------------------------------
function incSendMemEmail_fun(){
	global $applicantName,$finalPost;
	/*$adminEmail="lawrence@bluewaytech.com";
	$adminPass="hs111772";*/
	$adminEmail="HR@bluewaytech.com";
	$adminPass="hrblueway";
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Mailer = "smtp";
	$mail->Host = "ssl://smtp.gmail.com";
	$mail->Port = 465;
	$mail->SMTPAuth = true;
	$mail->Username = $adminEmail;
	$mail->Password = $adminPass; 
	$body = $mail->getFile('applyEmailContent.html');
	$body = eregi_replace("[\]",'',$body);
	$subject = eregi_replace("[\]",'',$subject);
	$body = str_replace('<<willBeReplacedByMemberName>>',$applicantName,$body);
	$mail->From = _adminEmail;		
	$mail->FromName = "Blue Way Technology";
	$mail->Subject = "Job Application";
	$mail->CharSet = 'UTF-8';
	$mail->AltBody = "To view the message, please use an HTML compatible email viewer!";
	$mail->MsgHTML($body);
	$mail->AddAddress($finalPost['email'], "Administrator");
	if(!$mail->Send()) {
		return("Cannot send to applicant");
	}else{
		return("success");
	}
}
//----------------------------------------------------------------------------------
function incFindPullDownName_fun($dbTable,$id,$name){
	$getData=get1Fm1Row_fun($dbTable,'id',$id);
	return($getData[$name]);
}
?> 