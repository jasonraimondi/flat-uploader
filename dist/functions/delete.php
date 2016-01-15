<?php

if (isset($_POST['filename']) && file_exists ($_POST['filename'])) {
  unlink($_POST['filename']);
  echo '<div class="notifications success"><p>Success! The File has been deleted.</p></div>';
} else {
  echo '<div class="notifications alert"><p>I can\'t find the file you wan\'t to delete. Please try again.</p></div>';
}

header("Location: ../#myfiles");
