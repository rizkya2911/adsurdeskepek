<?php
  $path = "../../data/";
  $_POST = json_decode(file_get_contents("php://input"), true);
  
  function load($name) {
    global $path;
    if (file_exists($path.$name.".json")) {
      return json_decode(file_get_contents($path.$name.".json"), true);
    }
    return null;
  }
  
  function save($name,$data) {
    global $path;
    file_put_contents($path.$name.".json", json_encode($data));
    return true;
  }
  
  function folder($name) {
    global $path;
    $ret = scandir($path.$name);
    array_splice($ret, array_search(".", $ret), 1);
    array_splice($ret, array_search("..", $ret), 1);
    $pos = array_search(".gitkeep", $ret);
    if (is_int($pos)) {
      array_splice($ret, $pos, 1);
    }
    return $ret;
  }
  
  function get($name) {
    if (isset($_GET[$name])) {
      return $_GET[$name];
    }
    return null;
  }
  
  function post($name) {
    global $_POST;
    if (isset($_POST[$name])) {
      return $_POST[$name];
    }
    return null;
  }
  
  function success($res) {
    $res["success"] = true;
    echo json_encode($res);
    return;
  }
  
  function fail($msg) {
    $res["error"] = $msg;
    $res["success"] = false;
    echo json_encode($res);
    return;
  }
?>
