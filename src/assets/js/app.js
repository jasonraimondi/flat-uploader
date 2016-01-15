'use strict';

$(document).ready(function() {

  // set the window location on boot.
  updateWindowLocation();

  /**
   * Click to switch Tabs
   */
  $('ul.box-menu li').on('click touchstart', function() {
    var tab_id = $(this).attr('data-tab');
    console.log(tab_id);
    if (tab_id == 'tab-1') {
      window.location.hash = '#myuploads';
    } else if (tab_id == 'tab-2') {
      window.location.hash = '#myfiles';
    }
    updateWindowLocation();
  });

  /**
   * Hits the JSON listing of the Files in the
   * upload directory and updates the view
   */
  function lookupFileList() {
    var tdata = {}; // JSON data object that feeds the template

    // Initialise page
    var initPage = function() {

      // Retrieve the server data and then initialise the page
      $.getJSON( "functions/get.php", function(data) {
          $.extend(tdata, data);
        }
      )

      // When AJAX calls are complete parse the template
      // replacing mustache tags with vars
      $(document).ajaxStop(function() {
        var template = $('#file-template').html();
        var info = Mustache.to_html(template, tdata);
        $('#js-file-list').html(info);
      });
    }();

  }

  /**
   * Set the tab based on the window hash location
   */
  function updateWindowLocation() {

    if (window.location.hash == '#myuploads') {
      $('ul.box-menu li').removeClass('active');
      $('.tab-content').removeClass('active');
      $('.tab-1').addClass('active');
    } else if (window.location.hash == '#myfiles') {
      $('ul.box-menu li').removeClass('active');
      $('.tab-content').removeClass('active');
      $('.tab-2').addClass('active');
    } else {
      window.location.hash = '#myuploads'
    }

    lookupFileList();
  };

  /**
   * Update elements after a file has been chosen to be uploaded
   */
  $('input:file').change(function() {
    var fileName = $(this).val();
    $('#js-filename').html(fileName); // get the filename for the placeholder
    $('.custom-file-upload').hide(); // hide upload button
    $('#js-title').text('Now go ahead and submit it!');
    $('#js-submit').show();
    $('#js-progressbox').show();
  });

  /**
   * Submit the upload form
   * @return false     always return false to prevent standard browser submit and page navigation
   */
  $('#js-upload-form').submit(function() {
    var uploadOptions = {
      target: '#js-output', // target element(s) to be updated with server response
      beforeSubmit: beforeSubmitUpload,
      success: afterSuccessfulUpload,
      uploadProgress: OnProgressUpload,
      resetForm: true // reset the form after successful submit
    };
    $(this).ajaxSubmit(uploadOptions);
    return false;
  });

  /**
   * After succesful file upload (when server response)
   */
  function afterSuccessfulUpload() {

    $('#js-output').show(); // show notification of success/failure button
    $('#js-progressbox').delay(1000).fadeOut(); // hide progress bar
    $('#js-output').delay(3500).fadeOut(); // hide notification after 3.5 seconds

    $('.custom-file-upload').show(); // show upload button so a person can choose another file
    $('#js-submit').hide(); // hide submit until after a person chooses a file
    $('#js-title').text('Choose a file to upload'); // reset placeholder text
    $('#js-filename').html('<span class="no-file-selected">No File Selected</span>'); // reset placeholder text

    incrementNotificationCount();
    updateWindowLocation();

  }

  /**
   * Check file size before uploading.
   *
   * @return success|failure
   */
  function beforeSubmitUpload() {

    //check whether browser fully supports all File API
    if (window.File && window.FileReader && window.FileList && window.Blob) {

      if (!$('#js-file').val()) //check empty input filed
      {
        ErrorReset('You didn\'t upload anything.');
        return false;
      }

      var fsize = $('#js-file')[0].files[0].size; //get file size
      var ftype = $('#js-file')[0].files[0].type; // get file type

      // Allowed file size is less than 25 MB (1048576)
      if (fsize > 50000) {
        ErrorReset('<b>' + bytesToSize(fsize) + '</b> Too big file! <br />File is too big, it should be less than 50KB.');
        return false;
      }

      $('#js-submit').hide();
      $('#js-output').show().html('');
    } else {
      // js-output error to older unsupported browsers that doesn't support HTML5 File API
      ErrorReset('Please upgrade your browser, because your current browser lacks some new features we need!');
      return false;
    }

  }

  /**
   * Cound the upload progress percentage
   *
   * @param event                 The browser event
   * @param integer  position
   * @param integer  total
   * @param integer  percentComplete
   */
  function OnProgressUpload(event, position, total, percentComplete) {
    // Progress bar
    $('#js-progressbox').show();
    $('#js-progressbar').width(percentComplete + '%'); //update progressbar percent complete
    $('#js-statustxt').html(percentComplete + '%'); //update status text
    if (percentComplete > 50) {
      $('#js-statustxt').css('color', '#000'); //change status text to white after 50%
    }
  }

  /**
   * Alert message when an error occurs
   *
   * @param string  message   Error Message Details
   */
  function ErrorReset(message) {
    $('#js-output').show().html('<div class="notifications alert"><p>' + message + '</p></class>');
    $('#js-title').text('Something went wrong!');
    $('#js-submit').hide(); // hide submit button
    $('#js-reset').show(); // show reset button after
  }

  /**
   * Increment the notification count on file upload
   */
  var notifyCount;

  function incrementNotificationCount() {
    if ($('#js-new-count').is(":visible")) {
      notifyCount++;
      $('#js-new-count').text(notifyCount);
    } else {
      notifyCount = 1;
      $('#js-new-count').show().text(notifyCount);
    }
  }

  /**
   * Function to format bytes to bites
   * see: bit.ly/19yoIPO
   *
   * @param  integer bytes
   * @return integer bites
   */
  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }


});
