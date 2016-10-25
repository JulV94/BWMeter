<?php
    // start db config
    $host="localhost";
    $username="root";
    $password="rootpw";
    $db_name="bw_meter";
    $table_name="measurements";
    // end db config

    $decNbr=3;

    $conn = new mysqli($host, $username, $password, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $options = array('time' => array(), 'ping' => array(), 'down' => array(), 'up' => array());
    $result = $conn->query("select * from measurements WHERE measurement_time BETWEEN '" . $_POST['startTime'] . "' AND '" . $_POST['endTime'] . "'");
    while($data = mysqli_fetch_array($result)){
       $options['time'][] =  $data['measurement_time'];
       $options['ping'][] =  $data['ping'];
       $options['down'][] =  $data['down'];
       $options['up'][] =  $data['up'];
    }
    $result = $conn->query("SELECT MIN(ping), AVG(ping), MAX(ping), STD(ping), MIN(down), AVG(down), MAX(down)
        , STD(down), MIN(up), AVG(up), MAX(up), STD(up) FROM measurements WHERE measurement_time BETWEEN '"
        . $_POST['startTime'] . "' AND '" . $_POST['endTime'] . "'"); // fetch stats
    $data = mysqli_fetch_array($result);
    $options['ping_stats'][] = round($data[0], $decNbr); // min
    $options['ping_stats'][] = round($data[1], $decNbr); // avg
    $options['ping_stats'][] = round($data[2], $decNbr); // max
    $options['ping_stats'][] = round($data[3], $decNbr); // std
    $options['ping_stats'][] = round(100*$data[3]/$data[1], $decNbr); // % of std
    $options['down_stats'][] = round($data[4], $decNbr);
    $options['down_stats'][] = round($data[5], $decNbr);
    $options['down_stats'][] = round($data[6], $decNbr);
    $options['down_stats'][] = round($data[7], $decNbr);
    $options['down_stats'][] = round(100*$data[7]/$data[5], $decNbr);
    $options['up_stats'][] = round($data[8], $decNbr);
    $options['up_stats'][] = round($data[9], $decNbr);
    $options['up_stats'][] = round($data[10], $decNbr);
    $options['up_stats'][] = round($data[11], $decNbr);
    $options['up_stats'][] = round(100*$data[11]/$data[9], $decNbr);
    $conn->close();
    echo json_encode($options);
?>