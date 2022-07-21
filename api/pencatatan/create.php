<?php
  include "../module.php";
  
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $type = post("type");
    $data = Array();
    $config = load("../config/$type");
    
    foreach ($config["isian"] as $key => $val) {
      $tmp = post($key);
      
      if ($val === "time") {
        if (!is_string($tmp)) {
          return fail("$key salah");
        }
        $tmp = strtotime($tmp);
      }
      else if ($val === "text") {
        if (!is_string($tmp)) {
          return fail("$key salah");
        }
      }
      else if ($val === "number") {
        if (!is_int($tmp)) {
          return fail("$key salah");
        }
      }
      else {
        return fail("konfigurasi salah");
      }
      
      $data[$key] = $tmp;
    }
    
    $list = load($type);
    $id = count($list);
    array_push($list, mktime());
    save("$type/$id", $data);
    save("$type", $list);
    
    $res["id"] = $id+1;
    return success($res);
  }
  
  return fail("kesalahan jaringan");
?>
