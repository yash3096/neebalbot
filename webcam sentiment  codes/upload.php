<?php 
 
// be aware of file / directory permissions on your server 
$file = md5(time()).rand(383,1000);
$filename = 'uploads/webcam/'.$file.'.jpg';
if(move_uploaded_file($_FILES['webcam']['tmp_name'], $filename))
 echo "";
else
 echo "Unsuccess"; 
 
$img = 'http://djcompsb.esy.es/'.$filename;
echo $img;
/*setcookie("imgpath",$path,time()+60*60*24*1);
header("Location: www.djcompsb.esy.es/public_html/emotion.php");*/
/*
define( 'API_BASE_URL1',     'https://api.projectoxford.ai/emotion/v1.0/recognize' );
define( 'API_PRIMARY_KEY1',      'b8c5c180ffe541a6ad8b16bb7a9fa6f5' );
$img = 'http://djcompsb.esy.es/'.$filename;

$post_string = '{"url":"' . $img . '"}';

$query_params = array(
          'url' => '$img',
);

$params = '';
foreach( $query_params as $key => $value ) {
    $params .= $key . '=' . $value . '&';
}
$params .= 'subscription-key=' . API_PRIMARY_KEY1;

$post_url = API_BASE_URL1 . $params;

$ch = curl_init();
    curl_setopt( $ch, CURLOPT_HTTPHEADER, array(                                                                          
        'Content-Type: application/json',                                                                                
        'Content-Length: ' . strlen($post_string))
    );    

    curl_setopt( $ch, CURLOPT_URL, $post_url );
    curl_setopt( $ch, CURLOPT_POST, true );
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $post_string );
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    $response1 = curl_exec( $ch );
curl_close( $ch );
print_r( $img);

*/			
//echo "Gender: ".$serres[0]->gender;
//unlink($filename);
?>
	