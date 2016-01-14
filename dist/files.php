<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Jason Raimondi">
    <title>Jason Raimondi</title>
    <link rel="stylesheet" href="./assets/css/style.css">
  </head>

  <body>

    <header>
        <img src="./assets/images/cloud-w.svg" class="cloud" alt="">
    </header>

    <main class="center">
      <div class="box">

        <header>
          <ul class="box-menu">
            <li><a href="/">Upload</a></li>
            <li class="active"><a href="/files.php">My Files</a></li>
          </ul>
        </header>

        <section class="box-body">

            <article>
              <h2 class="page-title">My Files</h2>
            </article>
            <article class="files">
              <ul class="file-list">

              <!-- ./barf -->
              <?php if ($handle = opendir('./uploads')) {?>
                  <?php while (false !== ($file = readdir($handle))) {?>
                      <?php if ($file != '.' && $file != '..') {?>

                            <li>
                              <div class="file-info">
                                  <span class="file-name"><?php echo $file;?></span>
                                  <span class="upload-time"><?php echo date('F d Y H:i:s.', filemtime('./uploads/'.$file));?></span>
                              </div>
                              <div class="download">
                                  <a href="./uploads/<?php echo $file;?>" class="button small" target="_blank"><i class="icon icon-download"></i> Download</a>
                              </div>
                              <div class="delete">
                                  <form action="delete.php" method="post">
                                      <input type="hidden" name="file" value="./uploads/<?php echo $file;?>">
                                      <button class="button small alert"><i class="icon icon-trash"></i> Delete</button>
                                  </form>
                              </div>
                            </li>

                      <?php
                    }
                  }
                closedir($handle);
              } ?>

              </ul>

            </article>

        </section>

        </div>
    </main>

    <footer>
        <p class="footer">
            <small>
                <strong>Jason &hearts; Event Farm</strong>
            </small>
        </p>
    </footer>
  </body>

  <script src="./assets/js/vendor.js"></script>
  <script src="./assets/js/app.js"></script>

</html>
