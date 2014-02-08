sap.ui.controller("fileuploadert.main", {

	_mainController:"",
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fileuploadert.main
*/
	onInit: function() {
		_mainController = this;
		
		var serviceUrl = "http://saperp65.s.creetion.com:8000/sap/opu/odata/sap/ZCOURSE_001_SRV/";
		var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true); 
		oModel.setCountSupported(false);  
		oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		sap.ui.getCore().setModel(oModel);
		
		oModel.refreshSecurityToken(function(a, b){
			debugger;
			_mainController.header_xcsrf_token = b.headers['x-csrf-token'];
		}, function(a, b){
			alert("System Error");//TODO
		}, false);

	},
	
	setPO : function(evt){
		var dd = sap.ui.getCore().byId( "polist" );
		var key = dd.getProperty("value");
		
		var fu = sap.ui.getCore().byId( "uploader");
		fu.setSlug(key);
		
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fileuploadert.main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fileuploadert.main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fileuploadert.main
*/
//	onExit: function() {
//
//	}

});