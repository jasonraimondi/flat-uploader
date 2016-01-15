<?php

// Make sure the filename post var is set and make sure that file actually exists
if (isset($_POST['filename']) && file_exists($_POST['filename'])) {

  // if it does exist, delete it
  unlink($_POST['filename']);
  echo '<div class="notifications success"><p>Success! The File has been deleted.</p></div>';

} else {

  // if it doesn't exist, yell at the user.
  echo '<div class="notifications alert"><p>I can\'t find the file you wan\'t to delete. Please try again.</p></div>';

}

header("Location: ../#myfiles");
