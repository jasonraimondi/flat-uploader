'use strict';

$(document).ready(function() {

    var options = {
        target: '#js-output', // target element(s) to be updated with server response
        beforeSubmit: beforeSubmit, // pre-submit callback
        success: afterSuccess, // post-submit callback
        uploadProgress: OnProgress, //upload progress callback
        resetForm: true // reset the form after successful submit
    };

    $('#js-upload-form').submit(function() {
        $(this).ajaxSubmit(options);
        // always return false to prevent standard browser submit and page navigation
        return false;
    });

    // When the user selects the file to be uploaded, update elements to upload state
    $('input:file').change(function() {
        var fileName = $(this).val();
        $('#js-filename').html(fileName); // get the filename for the placeholder
        $('.custom-file-upload').hide(); // hide upload button
        $('#js-title').text('Now go ahead and submit it!');
        $('#js-submit').show(); // add submit after a person chooses a file
        $('#js-progressbox').show(); // show progress
    });

    //function after succesful file upload (when server response)
    function afterSuccess() {

        $('#js-output').show(); // show notification of success/failure button
        // $('#js-submit').show(); // show submit button
        $('#js-progressbox').delay(1000).fadeOut(); //hide progress bar
        $('#js-output').delay(3500).fadeOut(); // hide notification after 3.5 seconds

        $('.custom-file-upload').show(); // show upload button so a person can choose a file
        $('#js-submit').hide(); // hide submit until after a person chooses a file
        $('#js-title').text('Choose a file to upload'); // reset placeholder text
        $('#js-filename').html('<span class="no-file-selected">No File Selected</span>'); // reset placeholder text

    }

    //function to check file size before uploading.
    function beforeSubmit() {
        //check whether browser fully supports all File API
        if (window.File && window.FileReader && window.FileList && window.Blob) {

            if (!$('#js-file').val()) //check empty input filed
            {
                ErrorReset('You didn\'t upload anything.');
                return false;
            }

            var fsize = $('#js-file')[0].files[0].size; //get file size
            var ftype = $('#js-file')[0].files[0].type; // get file type

            //allow file types
            switch (ftype) {
                case 'image/png':
                case 'image/gif':
                case 'image/jpeg':
                case 'image/pjpeg':
                case 'text/plain':
                case 'text/html':
                case 'application/x-zip-compressed':
                case 'application/pdf':
                case 'application/msword':
                case 'application/vnd.ms-excel':
                case 'video/mp4':
                    break;
                default:
                    ErrorReset('<b>' + ftype + '</b> Unsupported file type!');
                    return false;
            }

            // Allowed file size is less than 25 MB (1048576)
            if (fsize > 26214400) {
                ErrorReset('<b>' + bytesToSize(fsize) + '</b> Too big file! <br />File is too big, it should be less than 25 MB.');
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

    // alert message when an error occurs
    function ErrorReset(message) {
        $('#js-output').show().html('<div class="notifications alert"><p>' + message + '</p></class>');
        $('#js-title').text('Something went wrong!');
        $('#js-submit').hide(); // hide submit button
        $('#js-reset').show(); // show reset button after
    }

    // progress bar function
    function OnProgress(event, position, total, percentComplete) {
        // Progress bar
        $('#js-progressbox').show();
        $('#js-progressbar').width(percentComplete + '%'); //update progressbar percent complete
        $('#js-statustxt').html(percentComplete + '%'); //update status text
        if (percentComplete > 50) {
            $('#js-statustxt').css('color', '#000'); //change status text to white after 50%
        }
    }

    //function to format bites bit.ly/19yoIPO
    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Bytes';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

});
