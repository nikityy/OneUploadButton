var element = $("#uploadButton");
var progressBar = $("#progressBar");
var sendPhoto = function(data) {
	progressBar.css("opacity", "1");

	$.ajax({
		url: "http://localhost:8000/photo",
		type: "POST",
		data: data,
		enctype: 'multipart/form-data',
		processData: false,
		contentType: false
	})
	.progress(function(e) {
		if (e.lengthComputable) {
			var progress = (e.loaded / e.total) * 100 + "";
			progressBar.val(progress);
		}
	})
	.done(function( data ) {
		progressBar.css("opacity", "0").val("0");
	});
};
var button = new OneUploadButton(element, sendPhoto);