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

    $options = array('time' => array(), 'ping' => array(), 'down' => array(), 'up' => array(), 'ping_extr' => array(),
        'down_extr' => array(), 'up_extr' => array());
    $result = $conn->query("select * from measurements");
    while($data = mysqli_fetch_array($result)){
       $options['time'][] =  $data['measurement_time'];
       $options['ping'][] =  $data['ping'];
       $options['down'][] =  $data['down'];
       $options['up'][] =  $data['up'];
    }
    $result = $conn->query("SELECT ROUND(MIN(ping),3), ROUND(AVG(ping),3), ROUND(MAX(ping),3), ROUND(MIN(down),3)
        , ROUND(AVG(down),3), ROUND(MAX(down),3), ROUND(MIN(up),3), ROUND(AVG(up),3), ROUND(MAX(up),3)
        FROM measurements"); // fetch min avg max
    $data = mysqli_fetch_array($result);
    $options['ping_extr'][] = $data[0];
    $options['ping_extr'][] = $data[1];
    $options['ping_extr'][] = $data[2];
    $options['down_extr'][] = $data[3];
    $options['down_extr'][] = $data[4];
    $options['down_extr'][] = $data[5];
    $options['up_extr'][] = $data[6];
    $options['up_extr'][] = $data[7];
    $options['up_extr'][] = $data[8];
    $conn->close();
    echo json_encode($options);
?>