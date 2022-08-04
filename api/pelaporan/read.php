<?php
  include "../module.php";
  
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $type = post("type");
    $begin = post("begin");
    $end = post("end");
    
    if (!is_string($begin) || !is_string($end)) {
      return fail("kesalahan format waktu");
    }
    
    $begin = strtotime($begin);
    $end = strtotime($end);
    
    if ($begin > $end) {
      return fail("kesalahan rentang waktu");
    }
    
    $list = load($type);
    $data = Array();
    $config = load("../config/$type");
    
    for ($i = 0; $i < count($list); $i++) {
      if ($list[$i] < $begin || $list[$i] > $end) {
        continue;
      }
      
      $tmp = load("$type/$i");
      $tmp["id"] = $i+1;
      
      foreach ($config["isian"] as $key => $val) {
        if ($val === "time") {
          $tmp[$key] = date("Y-m-d", $tmp[$key]);
        }
      }
      
      array_push($data, $tmp);
    }
    
    $res["data"] = $data;
    return success($res);
  }
  
  return fail("kesalahan jaringan");
?>
