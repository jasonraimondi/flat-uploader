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
                <li class="tab-1 tab-link active" data-tab="tab-1">Upload</li>
                <li class="tab-2 tab-link" data-tab="tab-2">My Files <span id="js-new-count" class="notie" style="display:none"></span></li>
            </ul>
        </header>


        <!-- Upload A File Tab -->
        <section id="tab-1" class="tab-1 tab-content active">
            <article class="box-body">

              <div><h2 id="js-title" class="page-title">Please choose a file</h2></div>

              <div class="upload-form">
                  <p id="js-filename">
                      <span class="no-file-selected">No File Selected</span>
                  </p>
                  <form action="./functions/upload.php" method="post" enctype="multipart/form-data" id="js-upload-form">
                      <div id="js-progressbox" style="display:none">
                          <div id="js-progressbar"></div>
                      </div>
                      <label class="custom-file-upload">
                          <input id="js-file" type="file" name="file" />
                          <i class="icon icon-upload large"></i> Choose a File
                      </label>
                      <button id="js-submit" class="button upload" style="display:none" type="submit"><i class="icon icon-upload large"></i> Submit Upload</button>
                      <button id="js-reset" class="button alert" onClick="window.location.reload()" style="display: none"><i class="icon icon-redo large"></i> Retry</button>
                      <p>
                        <small>50K Max</small>
                      </p>
                  </form>
              </div>

              <!-- JS Output notifications -->
              <div id="js-output" style="display:none"></div>

            </article>
        </section>


        <!-- List of My Files Tab -->
        <section id="tab-2" class="tab-2 tab-content">
            <article class="box-body">

              <div><h2 class="page-title">My Files</h2></div>

              <div class="files">
                <ul id="js-file-list" class="file-list">
                  <!-- The Mustache.js File List is Drawn Here -->
                </ul>
              </div>

              <!-- JS Output notifications -->
              <div id="js-output" style="display:none"></div>

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
<script id="file-template" type="text/template">
  {{#files}}
    <li>
      <div class="file-info">
          <span class="file-name">{{filename}}</span>
          <span class="upload-time">{{uploaded}}</span>

      </div>
      <div class="download">
          <a href="./uploads/{{filename}}" download="{{filename}}" class="button small" target="_blank"><i class="icon icon-download"></i> Download</a>
      </div>
      <div class="delete">
        <form action="./functions/delete.php" method="post" id="js-delete-form">
            <input type="hidden" name="filename" value="../uploads/{{filename}}">
            <button id="js-reset" class="button alert" type="submit"><i class="icon icon-trash"></i> Delete</button>
        </form>
        <!-- <button id="js-delete" class="button alert" data-file="../uploads/{{filename}}"><i class="icon icon-trash"></i> Delete</button> -->
      </div>
    </li>
  {{/files}}
</script>

</html>
