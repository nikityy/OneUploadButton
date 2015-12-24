var window = window || false;

(function ($, window) {	
	var OneUploadButton = function(element, callback) {
		var tests = {
	    		formdata: !!window.FormData,
	    	}; 

		if (typeof element == "undefined") {
			throw Error("Element is not provided");
		};

		callback = callback || false;

		// Should support binding for array of elements
		bind(element);

		function bind(element) {
			if (typeof $ == "undefined") {
				throw Error("jQuery is not defined");
			};

			var fileInput = $("<input type='file' multiple='multiple' />")
				.on('change', function(e) {

					var files = e.srcElement.files;
					var formData = createFormData(files);

					if (callback)
						callback(formData);

					return false;
				});

			element.on("click", function(e){
				e.stopPropagation();
				e.preventDefault();
				fileInput.trigger('click', false);
			});

			element.on("dragover", function(e) {
				e.stopPropagation();
				e.preventDefault();
				element.addClass("hover");
			});

			element.on("dragleave", function(e) {
				e.stopPropagation();
				e.preventDefault();
				element.removeClass("hover");
			});

			// It doesn't work with jQuery native 'on' binder,
			// e.dataTransfer is undefined on there
			element[0].ondrop = function(e) {
				e.stopPropagation();
				e.preventDefault();
				element.removeClass("hover");

				var files = e.dataTransfer.files;
				var formData = createFormData(files);

				if (callback) {
					callback(formData);
				}
			};

			function createFormData(files) {
				if (tests.formdata) {
					var formData = new FormData();
					for (var i = 0; i < files.length; i++) {
						formData.append('file', files[i]);
					}
					return formData;
				} else {
					throw Error("FormData is not supported.");
				}
			}
		};
	}

	// If window object found, act as for browser
	if (window) {
		window.OneUploadButton = OneUploadButton;
	// If not, act as for Node.js
	} else {
		module.exports = OneUploadButton;
	}
})(jQuery, window);