<?php

class File {
  public $filename = "";
  public $uploaded = "";
}

class FileList {
  public $files = [];
}

// create new FileList object to serve as collection of files
$filelist = new FileList();

// if you can find and open the directory
if ($handle = opendir('../uploads')) {

  // loop through the ../uploads directory and generate File objects for
  // each file, then add the file objec to a FileList collection of files
  while (false !== ($system_filename = readdir($handle))) {

    // don't count the current directory and the previous directory
    if ($system_filename != '.' && $system_filename != '..') {
      $file = new File();
      $file->filename = $system_filename;
      $file->uploaded = date('F d Y H:i:s.', filemtime('../uploads/'.$system_filename));
      $filelist->files[] = $file;
    }
  }
  // close out the directory
  closedir($handle);
}

// set the content type to output JSON
header('Content-Type: application/json');
echo json_encode($filelist);
