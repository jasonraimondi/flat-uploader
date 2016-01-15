<?php

class File {
  public $filename = "";
  public $uploaded = "";
}

class FileList {
  public $files = [];
}

$filelist = new FileList();

if ($handle = opendir('../uploads')) {
  while (false !== ($system_filename = readdir($handle))) {
    if ($system_filename != '.' && $system_filename != '..') {

      $file = new File();
      $file->filename = $system_filename;
      $file->uploaded = date('F d Y H:i:s.', filemtime('../uploads/'.$system_filename));
      $filelist->files[] = $file;

    }
  }
  closedir($handle);
}

header('Content-Type: application/json');
echo json_encode($filelist);
