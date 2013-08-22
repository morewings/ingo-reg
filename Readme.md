# InGo Registration Popup

Plugin working with jquery version >= 1.4.2.

It is jquery plugin to install it on sites of our parthers.

To install:

1. Add plugin styles in `<head>`:

```html
<link rel="stylesheet" href="//ingo.production.static.s3.amazonaws.com/registration-popup/css/main.min.css">
```

2. Add jquery and plugin scripts: at the bottom of your page:

```html

....    
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="//ingo.production.static.s3.amazonaws.com/registration-popup/js/jquery.ingo.min.js"></script>
    
<script>
      $(function() {
          $('.button').ingo({ ingoId: 'INSERT INGO_ID HERE'});
      });
</script>
```

Supported options:

`linkedin` (true|false, default - true) - enable linkedin button

`facebook` (true|false, default - true) - enable facebook button

`google` (true|false, default - false) - enable google button

`manual` (string, default - false) - this should be a url of registration page

`ingoId` (string, __requred__ and no default) - it is id of conference in InGo, it is __required__ to make plugin working!

