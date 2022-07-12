<?php
  $path = "../config/";
  $dir = scandir($path);
  array_splice($dir, array_search(".", $dir), 1);
  array_splice($dir, array_search("..", $dir), 1);
  
  $res["data"] = array();
  foreach ($dir as $file) {
    $data = json_decode(file_get_contents($path.$file), true);
    array_push($res["data"], $data);
  }
  
  $res["success"] = true;
  echo json_encode($res);
  return;
?>
