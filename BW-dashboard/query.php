<?php
    // start db config
    $host="localhost";
    $username="root";
    $password="rootpw";
    $db_name="bw_meter";
    $table_name="measurements";
    // end db config

    $conn = new mysqli($host, $username, $password, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $result = $conn->query("select * from measurements");
    $options = array('time' => array(), 'ping' => array(), 'down' => array(), 'up' => array());
    while($data = mysqli_fetch_array($result)){
       $options['time'][] =  $data['measurement_time'];
       $options['ping'][] =  $data['ping'];
       $options['down'][] =  $data['down'];
       $options['up'][] =  $data['up'];
    }
    $conn->close();
    echo json_encode($options);
?>