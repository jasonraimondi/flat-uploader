<?php
unlink($_POST['file']);

header( "Location: ./files.php" );
