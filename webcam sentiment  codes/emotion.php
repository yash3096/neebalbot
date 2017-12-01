<?php
if(isset($_COOKIE["imgpath"]))
	$path=$_COOKIE["imgpath"];
?>
<!DOCTYPE html>
<html>
<head>
    <title>JSSample</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
</head>
<body>
hello to all this is emotion page

<script type="text/javascript">
    $(function() {
        var params = {
            // Request parameters
             "url": "<?= '$path'?>" 
        };

      
        $.ajax({

            url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers

                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","802ff96641e5405b86ffd26b42694742");
            },
            type: "POST",
            // Request body
            data: '{"url": "<?= '$path'?>"}',
        })
        .done(function(data) {
			alert("success");
			alert(data[0].scores.disgust);
			alert(data);
			alert(data[0].faceRectangle.left);
			//alert(data[0].scores.);
            console.log(data);
        })
        .fail(function() {
            alert("error");
        });
    });
</script>
</body>
</html>