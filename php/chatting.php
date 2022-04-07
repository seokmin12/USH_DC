<?php
    include 'conn.php';

    $select_sql = "SELECT * FROM chatting";
    $select_result = mysqli_query($conn, $select_sql);

    $data = array();
    while ($chat_row = mysqli_fetch_object($select_result)) {
        array_push($data, $chat_row);
    }
    echo json_encode($data);
?>