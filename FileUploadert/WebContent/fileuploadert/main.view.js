sap.ui.jsview("fileuploadert.main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fileuploadert.main
	*/ 
	getControllerName : function() {
		return "fileuploadert.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fileuploadert.main
	*/ 
	createContent : function(oController) {

		var oItemTemplate = new sap.ui.core.ListItem({text:"{PurchaseOrderID}"});
		var oComboBox = new sap.ui.commons.ComboBox("polist",{
			change: oController.setPO
		});
		oComboBox.bindItems("/PurchaseOrderCollection", oItemTemplate);


		var oFileUploader = new com.creetion.FileUploader("uploader", {
			width: "250px",
			path: "/FileUpload", 
			modal: true,
			uploadOnChange: true ,    
			uploadComplete: function (oEvent) {
				var sResponse = oEvent.getParameter("response");
				if (sResponse) {		
					var oModel = new sap.ui.model.xml.XMLModel(sResponse);
					var text = oModel.getProperty('/m:properties/d:MESSAGE')
					sap.ui.commons.MessageBox.show(text);
				};
			},
		});
		oFileUploader.setModel(sap.ui.getCore().getModel());
		

		var oLayout = new sap.ui.commons.layout.VerticalLayout("layoutUploadert", {
			width: "100%",
			content: [oComboBox, oFileUploader]
		});
		return oLayout;


	}

});
