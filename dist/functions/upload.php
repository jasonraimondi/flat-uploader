<?php

if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {

    //########### Edit settings ##############
    $upload_dir = '../uploads/'; //specify upload directory ends with / (slash)
    //#########################################

    /*
    Note : You will run into errors or blank page if 'memory_limit' or 'upload_max_filesize' is set to low in 'php.ini'.
    Open 'php.ini' file, and search for 'memory_limit' or 'upload_max_filesize' limit
    and set them adequately, also check 'post_max_size'.
    */

    // check if this is an ajax request
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        die();
    }

    // Is file size less than allowed size.
    if ($_FILES['file']['size'] > 50000) {
        die('<div class="notifications alert"><p>File size is too big!</p></div>');
    }

    $file_name = strtolower($_FILES['file']['name']);

    if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_dir . $file_name)) {
        die('<div class="notifications success"><p>Success! File Uploaded.</p></div>');
    } else {
        die('<div class="notifications alert"><p>error uploading File!</p></div>');
    }

} else {
    die('<div class="notifications alert"><p>Something wrong with upload! Is \'upload_max_filesize\' set correctly?</p></div>');
}
