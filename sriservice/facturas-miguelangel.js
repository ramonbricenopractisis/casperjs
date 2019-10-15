phantom.casperPath = 'node_modules/casperjs';
phantom.injectJs('node_modules/casperjs/bin/bootstrap.js');

var casper = require('casper').create({verbose: true, logLevel:'debug'});
var mouse = require("mouse").create(casper);
var page = require('webpage').create();

var x = require('casper').selectXPath;
casper.userAgent('User-Agent:Chrome/37.0.2062.120');


var utils = require('utils');
casper.on('remote.message', function(msg) {
    casper.echo('remote message caught: ' + msg);
});


casper.start('https://srienlinea.sri.gob.ec/tuportal-internet/').page.injectJs('C:/xampp/htdocs/sriservice/jquery.js');
casper.viewport(1280, 1024);

var rucEmpresa = String(casper.cli.args[0]);
var passwordEmpresa = casper.cli.args[1];
var idEmpresa = casper.cli.args[2];

if (rucEmpresa.length == 12) {
	rucEmpresa = '0'+rucEmpresa;
}
casper.echo(rucEmpresa+'-'+passwordEmpresa+'-'+idEmpresa);

casper.then(function () {
	if (casper.exists('form[action="j_security_check"]')) {
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
		casper.then(function () { /* LLAVA PRINCIPAL DE LA FUNCION */ 
			casper.thenOpen('https://srienlinea.sri.gob.ec/tuportal-internet/menusFavoritos.jspa?redireccion=310&idGrupo=201', function () {
        this.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
        var sendCa = '';
        var random = Math.floor((Math.random() * 100) + 1);
				casper.then(function () {

        /*
          casper.then(function () { 
            casper.capture('captures/captcha-ANTES-DE-LLENAR'+random+'.png')
          }) 
        */ 

          /* CREO QUE AQUI */

		casper.then(function () { /* .then1  */

	 		if (casper.exists('#frmFlujoDeclaracion')) { /* IF.exist 1*/

	 			if (casper.exists('form[name="frmFlujoDeclaracion"][action="/sri-declaraciones-web-internet/pages/recepcion/recibirDeclaracion.jsf"]')) { /* IF.exist 2 */

		 				///*** PASO 1 ***///
		 				/* LE ASIGNO UN VALOR AL SELECT */

	 					casper.then(function () { /* .then 2  */

	 					
	                    casper.fill('form[name="frmFlujoDeclaracion"][action="/sri-declaraciones-web-internet/pages/recepcion/recibirDeclaracion.jsf"]', { 
                    	'frmFlujoDeclaracion:somObligacion_input':'2011 - DECLARACIÓN MENSUAL DE IVA'
	                  	}); 

	                    /* 

						valor del option -> class ec.gob.sri.adm.catalogo.modelo.ObligacionTributaria@819775801

	                    */

	                  	/* .fill */

	                  	/* EVALUATE // 
							

	                  	var select = casper.evaluate(function () {
							document.getElementById('frmFlujoDeclaracion:somObligacion_input').value = '2011 - DECLARACIÓN MENSUAL DE IVA';
                		})
                		*/

						}); /* .then 2  */

						///*** PASO 1 ***///
	 
						///*** PASO 2 ***///
			 			/* TOMO UNA FOTO CON EL SELECT TENIENDO UN VALOR */

			 			casper.then(function () { /* .then 3  */

			                casper.wait(2000, function () { /* ESPEREMOS UN RATITO 1 */
			                    casper.then(function () { 
			                    	casper.capture('captures/captcha-SELECT'+random+'.png')
			                    }) 

			                })/* ESPEREMOS UN RATITO */ 
						}); /* .then 3  */

						///*** PASO 2 ***///

				 		///*** PASO 3 ***///

				 		/* LLENO EL CAMPO PERIODO */

	                  	// EVALUATE // 
				        casper.wait(2000, function () { /* ESPEREMOS QUE SE GENERE EL CAMPO */
				            casper.then(function () { 
							
			                  	var select = casper.evaluate(function () {
									document.getElementById('frmFlujoDeclaracion:calPeriodo').value = '01/2019';
		                		})
                			}) /* .then */

				        })/*ESPEREMOS QUE SE GENERE EL CAMPO */ 

				 		/* LLENO EL CAMPO PERIODO */

				 		/* hago click en el boton siguiente */
				 		
				 		//casper.then(function () { /* .then 4  */
				        //    casper.evaluate(function() {
				        //        $('button:contains("Siguiente")').click();
				        //	})
						//}); 

						/* hago click en el boton siguiente */

						/* .then 4  */
				 		///*** PASO 3 ***///

				 		///*** PASO 4 ***///

				 		/* hago click en el boton siguiente */

			 			//casper.then(function () { /* .then 3  */

			            //    casper.wait(2000, function () { /* ESPEREMOS UN RATITO 1 */
			            //        casper.then(function () { /* .then BOTON  */
				        //    		casper.evaluate(function() {
				        //        		$('button:contains("Siguiente")').click();
				        //			})
						//		}); /* .then BOTON  */
			            //    })/* ESPEREMOS UN RATITO */ 
						// }); /* .then 3  */
				 		

						/* hago click en el boton siguiente */

				 		///*** PASO 4 ***///

				 		
				 		///*** PASO 5 ***///
				 		/* VUELO A TOMAR UNA FOTO */
				 		casper.then(function () { /* .then 5  */
				            casper.wait(2000, function () { /* ESPEREMOS UN RATITO 1 */
				                casper.then(function () { 
				                    casper.capture('captures/captcha-BOTON'+random+'.png')
				                }) 

				            })/* ESPEREMOS UN RATITO */ 
						}); /* .then 5  */
				 		///*** PASO 5 ***///

				 		///*** PASO 6 ***///
				 		casper.then(function () { /* .then 5  */

				 			/*  ID DEL BOTON

								#frmFlujoDeclaracion:btnObligacionSiguiente

				 			*/

                    casper.thenClick(x('//*[@id="frmFlujoDeclaracion:btnObligacionSiguiente"]'), function () {
					           casper.echo('*********************************************');
					           casper.echo('HICISTE CLICK EN EL BOTON TOMEMOS OTRA FOTO PA VEH');
					           casper.echo('*********************************************');


			 			casper.then(function () { /* .then 3  */

			                casper.wait(2000, function () { /* ESPEREMOS UN RATITO 1 */
			                    casper.then(function () { /* .then BOTON  */
				            		casper.evaluate(function() {
				                		$('button:contains("Siguiente")').click();
				        			})

								}); /* .then BOTON  */
			                })/* ESPEREMOS UN RATITO */ 
						 }); /* .then 3  */


					           casper.wait(3000, function () { /* ESPEREMOS UN RATITO 1 */
					               casper.then(function () { 
					                   casper.capture('captures/captcha-BOTON-ULTIMA'+random+'.png')
					               })
					          })/* ESPEREMOS UN RATITO */ 
                  	})
				 		

						}); /* .then 5  */
				 		///*** PASO 6 ***///


						///*** PASO 7 ***///
			 			/* HACIENDO PRUEBAS DE TODO UN POCO */

			 			casper.then(function () { /* .then 3  */

	 					if (this.clickLabel('Siguiente', 'span')) { /* IF PRUEBA */
					            casper.echo('*********************************************');
					            casper.echo('EL CONDICIONAL ENTRO UPAAAAAAAAAAAA HAGAMOS COSAS PA VEH');
					            casper.echo('*********************************************');
			                    casper.then(function () { /* .then BOTON  */
				            		casper.evaluate(function() {
				                		$('button:contains("Siguiente")').click();
				        			})

								}); /* .then BOTON  */					            


					            casper.wait(2000, function () { /* ESPEREMOS UN RATITO 1 */
					                casper.then(function () { 
					                    casper.capture('captures/captcha-BOTON-CONDICIONAL'+random+'.png')
					                }) 

					           })/* ESPEREMOS UN RATITO */ 

						} else {
					            casper.echo('*********************************************');
					            casper.echo('NO HUBO');
					            casper.echo('*********************************************');							
					
						} /* IF PRUEBA */

						}); /* .then 3  */

						///*** PASO / ***///


	 			} /* IF.exist 2 */


	 		} /* IF.exist 1 */

		}); /* .then1  */

          /* CREO QUE AQUI */
				})
			})
		})  /* LLAVA PRINCIPAL DE LA FUNCION */ 
	}else{
		var errorLogin, url = 'http://165.227.110.138/sriservice/errors_miguelangel.php';
		casper.then(function () {
			casper.echo('ERROR 4')
	        errorLogin = casper.evaluate(function(url, companyId, companyRuc, sriPassword) {
		        return __utils__.sendAJAX(url, 'POST', {error:4, companyId:companyId, companyRuc:companyRuc, sriPassword:sriPassword}, false);
		    }, {url: url, companyId:casper.cli.args[2], companyRuc:rucEmpresa, sriPassword:casper.cli.args[1]});
	    });
	    casper.then(function () {
	    	casper.echo(errorLogin+'PRINTED');
	    })
	}
})
casper.run();
