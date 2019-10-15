phantom.casperPath = 'node_modules/casperjs';
phantom.injectJs('node_modules/casperjs/bin/bootstrap.js');

var casper = require('casper').create({verbose: true, logLevel:'debug'});
var mouse = require("mouse").create(casper);
var page = require('webpage').create();
var fs = require('fs');
var x = require('casper').selectXPath;
casper.userAgent('User-Agent:Chrome/37.0.2062.120');

// var fs = require("fs");
//
// fs.write("mylogfile.log", "", "w"); // overwrite log file
// casper.on("log", function(entry){
//     fs.write("mylogfile.log", entry.message + "\n", "a");
// });
var utils = require('utils');
casper.on('remote.message', function(msg) {
    casper.echo('remote message caught: ' + msg);
});


casper.start('https://srienlinea.sri.gob.ec/tuportal-internet/').page.injectJs('C:/xampp/htdocs/sriservice/jquery.js');
// casper.viewport(30, 30);
casper.options.viewportSize = { width: 10, height: 10 };

var rucEmpresa = String(casper.cli.args[0]);
var passwordEmpresa = casper.cli.args[1];
var idEmpresa = casper.cli.args[2];

if (rucEmpresa.length == 12) {
	rucEmpresa = '0'+rucEmpresa;
}
casper.echo(rucEmpresa+'-'+passwordEmpresa+'-'+idEmpresa);
casper.then(function () {
  if (casper.exists('form[action="j_security_check"]')){
    casper.then(function() {
      if (rucEmpresa == '1792271274001') {
        casper.fill('form[action="j_security_check"]', {
              'j_username': rucEmpresa,
              'j_cedula':'1725759714',
          'j_password': passwordEmpresa
        }, true);
      }else{
        casper.fill('form[action="j_security_check"]', {
              'j_username': rucEmpresa,
          'j_password': passwordEmpresa
        }, true);
      }
    });
    casper.then(function () {
      casper.thenOpen('https://srienlinea.sri.gob.ec/tuportal-internet/menusFavoritos.jspa?redireccion=57&idGrupo=55', function () {
        this.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
        this.captureSelector('capturesprobando/captcha1.png', '#elemento-captcha');
        // casper.then(function () {
        //   casper.then(function () {
        //     casper.capture('capturesprobando/captcha.png')
        //   })
        // })
      })
    })

    // casper.then(function () {
    //   casper.thenOpen('https://srienlinea.sri.gob.ec/tuportal-internet/menusFavoritos.jspa?redireccion=310&idGrupo=201', function () {
    //     this.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
    //     casper.then(function () {
    //       casper.fill('form[name="frmFlujoDeclaracion"][action="/sri-declaraciones-web-internet/pages/recepcion/recibirDeclaracion.jsf"]', {
    //       'frmFlujoDeclaracion:somObligacion_input':'2011 - DECLARACIÓN MENSUAL DE IVA',
    //       });
    //     })
    //     casper.then(function () {
    //       casper.wait(5000, function () {
    //         casper.fill('form[name="frmFlujoDeclaracion"][action="/sri-declaraciones-web-internet/pages/recepcion/recibirDeclaracion.jsf"]', {
    //         // 'frmFlujoDeclaracion:somObligacion_input':'2011 - DECLARACIÓN MENSUAL DE IVA',
    //         'frmFlujoDeclaracion:calPeriodo':'01/2019'
    //         });
    //       })
    //     })
    //     // casper.thenClick(x('//*[@id="frmFlujoDeclaracion:btnObligacionSiguiente"]'), function () {
    //     //
		// 		// 	           casper.echo('*********************************************');
    //     //
		// 		// 	           casper.echo('HICISTE CLICK EN EL BOTON TOMEMOS OTRA FOTO PA VEH');
    //     //
		// 		// 	           casper.echo('*********************************************');
    //     //
    //     //
    //     //
    //     //
    //     //
		// 	 	// 		casper.then(function () { /* .then 3  */
    //     //
    //     //
    //     //
		// 	  //               casper.wait(2000, function () { /* ESPEREMOS UN RATITO 1 */
    //     //
		// 	  //                   casper.then(function () { /* .then BOTON  */
    //     //
		// 		//             		casper.evaluate(function() {
    //     //
		// 		//                 		$('button:contains("Siguiente")').click();
    //     //
		// 		//         			})
    //     //
    //     //
    //     //
		// 		// 				}); /* .then BOTON  */
    //     //
		// 	  //               })/* ESPEREMOS UN RATITO */
    //     //
		// 		// 		 }); /* .then 3  */
    //     //
    //     //
    //     //
    //     //
    //     //
		// 		// 	           casper.wait(3000, function () { /* ESPEREMOS UN RATITO 1 */
    //     //
		// 		// 	               casper.then(function () {
    //     //
		// 		// 	                   casper.capture('captures/captcha-BOTON-ULTIMA.png')
    //     //
		// 		// 	               })
    //     //
		// 		// 	          })/* ESPEREMOS UN RATITO */
    //     //
    //     //           	})
    //     // casper.then(function () {
    //     //   casper.wait(8000, function () {
    //     //     casper.capture('captures/here2.png')
    //     //   })
    //     // })
    //   })
    // })
  }else{
    casper.echo('NO FORM')
  }
})

casper.run();
