<?php

if (isset($_FILES["file"]) && $_FILES["file"]["error"] == UPLOAD_ERR_OK) {

    //########### Edit settings ##############
    $upload_dir = './uploads/'; //specify upload directory ends with / (slash)
    //#########################################

    /*
    Note : You will run into errors or blank page if "memory_limit" or "upload_max_filesize" is set to low in "php.ini".
    Open "php.ini" file, and search for "memory_limit" or "upload_max_filesize" limit
    and set them adequately, also check "post_max_size".
    */

    // check if this is an ajax request
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        die();
    }

    // Is file size is less than allowed size.
    if ($_FILES["file"]["size"] > 26214400) {
        die("<div class=\"notifications alert\"><p>File size is too big!</p></div>");
    }

    // allowed file type Server side check
    switch (strtolower($_FILES['file']['type'])) {
        //allowed file types
        case 'image/png':
        case 'image/gif':
        case 'image/jpeg':
        case 'image/pjpeg':
        case 'text/plain':
        case 'text/html': //html file
        case 'application/x-zip-compressed':
        case 'application/pdf':
        case 'application/msword':
        case 'application/vnd.ms-excel':
        case 'video/mp4':
            break;
        default:
            die('Unsupported File!'); //output error
    }

    $file_name = strtolower($_FILES['file']['name']);
    $file_ext  = substr($file_name, strrpos($file_name, '.')); //get file extention

    if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_dir . $file_name)) {
        die('<div class="notifications success"><p>Success! File Uploaded.</p></div>');
    } else {
        die('<div class="notifications alert"><p>error uploading File!</p></div>');
    }

} else {
    die('<div class="notifications alert"><p>Something wrong with upload! Is "upload_max_filesize" set correctly?</p></div>');
}
