Verson: 0.2

Plugin working with jquery version >= 1.7.2.

It is JQuery plugin to install it on sites of our parthers.

To install:

1. Add plugin styles in `<head>`:

    ```html
    <link rel="stylesheet" href="http://cdn.ingo.me/css/main.css">
    ```

2. Add jquery and plugin scripts: at the bottom of your page (right before `</body>` tag):

    ```html

    ....
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="http://cdn.ingo.me/js/jquery.ingo.js"></script>

    <script>
          $(function() {
              $('YOUR BUTTON SELECTOR NAME').ingo({
                ingoId: '', //INSERT INGO_ID HERE
                manual: '' //INSERT LINK FOR MANUAL REGISTRATION HERE
              });
          });
    </script>
    ```

Supported options:

`linkedin` (true|false, default - true) - enable linkedin button

`facebook` (true|false, default - true) - enable facebook button

`google` (true|false, default - false) - enable google button

`manual` (string, default - false) - this should be a url of registration page

`headerText` (string, default - 'Speed up registration with') - text for popup header

`smallPopup` (string, default - false) - if 'true' hides top and bottop parts op popup

`ingoId` (string, __requred__ and no default) - it is id of conference in InGo, it is __required__ to make plugin working!

That information can be used to autofill the registration form.
