jQuery.sap.declare("com.creetion.FileUploader");
jQuery.sap.require("sap.ui.commons.FileUploader");

sap.ui.commons.FileUploader.extend("com.creetion.FileUploader", {
	metadata : {
		properties : {
			"slug"				: "string",
			"path"              : "string",
		}
	},

	upload : function() {
		var thisID = jQuery.sap.domById(this.getId() + "-fu");
		var file = thisID.files[0];

		try {
			if (file) {
				this._bUploading = true;
				var that = this;
				var oModel = this.getModel();
				var path = this.getPath();
				var myUrl =  oModel.sServiceUrl + path; 
				var oRequest = oModel._createRequest();

				var oHeaders = {
						"x-csrf-token": oRequest.headers['x-csrf-token'],
						"slug": this.getSlug(),
						"content-disposition" : file.name, 
				}; 

				jQuery.ajax({
					type: 'POST',
					url: myUrl, 
					headers: oHeaders,
					cache: false,
					contentType: file.type,
					processData: false,
					data: file,
				})
				.done(function( data ) {
					that.fireUploadComplete({"response": data });
					that._bUploading = false;
				})
				.fail(function( data ) {
					that.fireUploadComplete({"response": data });
					that._bUploading = false;
				});
								
				jQuery.sap.log.info("File uploading to " + myUrl);

			}
		} catch(oException) {
			jQuery.sap.log.error("File upload failed:\n" + oException.message);
		}
	},
	
	renderer : {
	}
});