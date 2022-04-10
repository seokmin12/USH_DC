<?php
    include 'conn.php';
    date_default_timezone_set('Asia/Seoul');

    $content = $_GET['content'];
    $user_name = $_GET['user_name'];
    
    $time = date("Y-m-d H:i:s");

    $insert_sql = "INSERT INTO chat (user_name, content, time) VALUES ('$user_name', '$content', '$time')";

    $insert_result = mysqli_query($conn, $insert_sql);
    if ($insert_result == false) {
        echo "fail";
    } else {
        echo "success";
    }
?>