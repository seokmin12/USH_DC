<?php
    include 'conn.php';

    $page = $_GET['page'];

    $select_sql = "SELECT * FROM (SELECT * FROM chat ORDER BY number DESC LIMIT 0, $page) chat ORDER BY number ASC";

    $select_result = mysqli_query($conn, $select_sql);

    $data = array();
    
    while($chat_row = mysqli_fetch_object($select_result)) {
        array_push($data, $chat_row);
    }
    echo json_encode($data);
?>