var config = {
	host: "localhost",
	prefix: "/",	//this should be the name of the virtual proxy. For example "/nodeexample/"
	port: "4848",	//as of Sense version 2.0 this should be a string not an integer
	isSecure: window.location.protocol === "https:"
};

var appId="Sales Discovery.qvf";
var objectId="CQgDDy";



  require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources"
  } );
	require( ["js/qlik"], function ( qlik ) {
	  qlik.setOnError( function ( error ) {
	    alert( error.message );
	  } );
	  var app = qlik.openApp(appId, config);
	  app.getObject("qv1", objectId);
	  app.getObject('currsel', 'CurrentSelections');

	  var qHyperCubeDef={                
	    qDimensions : [
		    {
		    	qDef : {qFieldDefs : ["Actual Delivery Date"]}
		    }
	    ],
	    qMeasures : [
		    {
				qDef : {qDef : "=Count(City)"}
			}
		],
	    qInitialDataFetch : [{
	        qWidth :2,
	        qHeight : 1500
	    }]
	}
	app.createCube(qHyperCubeDef, function(reply) {
		console.log(reply);
	});


	  // app.visualization.create('barchart', ['Actual Delivery Date', '=Count(City)'], {
	  //   title: 'This is my bar chart'
	  // })
	  // .then(function(barchart) {
	  //   barchart.show('qv1')
	  // });
	} );

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
