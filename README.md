# OneUploadButton

![License MIT](http://img.shields.io/badge/license-mit-orange.svg?style=flat)

This small library will help you to create a simple upload button. Click on bind button to open file selection window (just like `<input type='file' />`) or drag n' drop files right on it! 

## Requirements

`OneUploadButton` at this moment requires jQuery (as a DOM manipulation tool) library and browser should support following technologies: FormData and XHR2.

## Getting Started

If your browser supports all required technologies and you included jQuery and OneUploadButton, define a simple HTML block (it could be of any type):

```html
<div id="one-upload-button">
    Drop Files Here
</div>
```

Next, write a simple script that binds that block with the OneUploadButton:

```js
var button = $("#one-upload-button");
var callback = function(data) {
  console.log("Here's obtained data: %s", data);  
};
var oneUploadButton = new OneUploadButton(element, callback);
```

Yeah, that way simple. OneUploadButton constructor takes only two argument: an element to bind and a callback. When a user has chose a file or drag n' dropped it, an event fires. In this event OneUploadButton receives all files and encapsulates it into `FormData` object. This object is the only argument passing to the defined callback. The primary use of this callback is to send data via POST request. Let's look, how it can be realised:

```js
var callback = function(data) {
  $.ajax({
    url: "<URL ADDRESS>",
    type: "POST",
    data: data,
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false
  }).done(function() {
    console.log("Data sent");
  });  
};
```

So, as you can see, OneUploadButton doesn't depends on which way you will send data, it only collects it and sends encapsulated object to your callback. 