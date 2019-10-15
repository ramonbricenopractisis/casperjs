phantom.casperPath = 'node_modules/casperjs';
phantom.injectJs('node_modules/casperjs/bin/bootstrap.js');

var casper = require('casper').create({verbose: true, logLevel:'debug'});
var mouse = require("mouse").create(casper);
var page = require('webpage').create();
var fs = require('fs');
var x = require('casper').selectXPath;
casper.userAgent('User-Agent:Chrome/37.0.2062.120');

var fs = require("fs");

fs.write("mylogfile.log", "", "w"); // overwrite log file
casper.on("log", function(entry){
    fs.write("mylogfile.log", entry.message + "\n", "a");
});
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
		casper.then(function () {
			casper.thenOpen('https://srienlinea.sri.gob.ec/tuportal-internet/menusFavoritos.jspa?redireccion=57&idGrupo=55', function () {
        this.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
        var sendCa = '';
        var random = Math.floor((Math.random() * 1000) + 1);
				casper.then(function () {
          casper.capture('captures/captchaprobando.png');
          // casper.then(function () {
          //   this.captureSelector('captures/captcha'+random+'.png', '#elemento-captcha');
          //   casper.then(function () {
          //     url = 'https://www.practisis.net/casper.image.php?idemp='+casper.cli.args[2]+'&imagen='+random+'.png&error=false';
          //     casper.echo(url)
          //   	sendCa = casper.evaluate(function(url, imagen) {
          //           return __utils__.sendAJAX(url, 'POST', {imagen:imagen}, false);
          //       }, {url:url, imagen:'captcha'+random+'.png'});
          //       casper.echo(sendCa+'sendCa');
          //   })
          //   casper.then(function () {
          //     casper.wait(20000, function () {
          //       if (sendCa != 'ERROR') {
          //         casper.then(function () {
          //           url = 'https://www.practisis.net/casper.captcha.php?idemp='+casper.cli.args[2]+'&sendXa='+sendCa+'&error=false';
          //           casper.echo(url)
          //         	sendCa = casper.evaluate(function(url, idemp) {
          //                 return __utils__.sendAJAX(url, 'POST', {idemp:idemp}, false);
          //             }, {url:url, idemp:casper.cli.args[2]});
          //             casper.echo(sendCa+'sendCa');
          //         })
          //       }
          //     })
          //   })
          // })
          casper.then(function () {
            if (casper.exists('#frmPrincipal')) {
  						if (casper.exists('form[name="frmPrincipal"][action="/comprobantes-electronicos-internet/pages/consultas/recibidos/comprobantesRecibidos.jsf"]')) {
  							casper.echo('VENGA4')
  							var dc = ''+casper.cli.args[3]+'';
  								casper.fill('form[name="frmPrincipal"][action="/comprobantes-electronicos-internet/pages/consultas/recibidos/comprobantesRecibidos.jsf"]', {
  									'frmPrincipal:mes': dc,
  									'frmPrincipal:dia':'Todos',
  									'frmPrincipal:ano':'2019',
  									'frmPrincipal:opciones':'ruc',
  									'frmPrincipal:txtParametro':rucEmpresa,
  									'frmPrincipal:cmbTipoComprobante':'1'
  								});
                  sendCa = 1;
                  if (sendCa != '' && sendCa > 0 && sendCa != null) {
                    // sendCa = sendCa - 1;
                    // casper.then(function () {
                    //   	casper.click('#visualCaptcha-img-'+sendCa+'');
                    // })btnRecaptcha
                    casper.thenClick(x('//*[@id="frmPrincipal:btnBuscar"]'), function () {
                  		casper.echo('Sending...'+rucEmpresa);
                  	})
                    // casper.thenClick(x('//*[@id="btnRecaptcha"]'), function () {
                  	// 	casper.echo('Sending...'+rucEmpresa);
                  	// })
                    casper.wait(4000, function () {
                      casper.capture('imagesprueba/image.png');
                    })
                    casper.wait(2000, function () {
                      if (casper.exists('.ui-messages-warn')) {
                  			casper.echo('ERROR');
                				var errorCaptcha, errurl = 'http://165.227.110.138/sriservice/errors.php';
                				casper.then(function () {
                			        errorCaptcha = casper.evaluate(function(errurl, companyId, companyRuc, sriPassword) {
                				        return __utils__.sendAJAX(errurl, 'POST', {error:5, companyId:companyId, companyRuc:companyRuc, sriPassword:sriPassword}, false);
                				    }, {errurl: errurl, companyId:casper.cli.args[2], companyRuc:rucEmpresa, sriPassword:casper.cli.args[1]});
                			    });
                			    casper.then(function () {
                			    	casper.echo(errorCaptcha+'PRINTED');
                			    })
                  		}else{
                        casper.echo('PASO')
                  			var pagination = casper.evaluate(function () {
                  		 		var a = $(document.getElementsByClassName('ui-paginator-current'));
                  		 	 	if (a) {
                  		 	 	    var text = a.text();
                  		 	 		var pagesString = '';
                  		 	 		if(text.length == 9){
                  		 	 			pagesString = text.substring(6,8);
                  		 	 		}else{
                  		 	 			pagesString = text.substring(6,7)
                  		 	 		}
                  		 	 	    var pagesInt = parseInt(pagesString);
                  		 	 	}
                  		 	 	return [pagesInt, pagesString];
                  	 		})
                        var respuesta = casper.evaluate(function() {
                  	 	 		$('select.ui-paginator-rpp-options').val(75).change();
                  		 		var a = $(document.getElementsByTagName('tr'));
                  			 	var typeDefine = '';
                  			 	var dataIs = '';
                  			 	var arrCa = [];
                  			 	var arrDate = [];
                  			 	var counter = 0;
                  			 	var idEmpresaCompra = '';
                  		 		$(a).each(function () {
                		 		    var t = $(this).attr('data-ri');
                		 		    if(t){
                		 		    	counter++;
              		 		        var text = $(this).text();
              		 		        if(counter >= 10){
                  		 					idEmpresaCompra = text.substring(2, 15);
                  		 				}else if(counter >= 100){
                  		 					idEmpresaCompra = text.substring(3, 16)
                  		 				}else if(counter >= 1000){
                  		 					idEmpresaCompra = text.substring(4, 17);
                  		 				}else{
                  		 					idEmpresaCompra = text.substring(1, 14);
                  		 				}
              		 		        var last = text.lastIndexOf('CA:');
              		 		        var last1 = text.lastIndexOf('NA:');
              		 		        var dataIs = text.substring(last+3).substring(0,10).slice(-1);
              		 		        if (dataIs == 1) {
            		 		            typeDefine = 'F';
              		 		        }else if(dataIs == 4){
              		 		        	typeDefine = 'N';
              		 		        }
              		 		        else if(dataIs == 5){
              		 		        	typeDefine = 'D';
              		 		        }
              		 		        else if(dataIs == 7){
            		 		            typeDefine = 'C';
              		 		        }
              		 		        var date = text.substring(last+3).substring(128,138);
              		 		        var dinamycDate = text.substring(last1+3).substring(43,48);
                  		 				if(dinamycDate == 2017){
                  		 					date = text.substring(last1+3).substring(37,47);
                  		 				}
                		 		      arrCa.push('"'+text.substring(last+3).substring(0,49)+'"'+typeDefine+date+idEmpresaCompra);
                		 		    }
                  		 		});
                  			 	return [arrCa, arrDate];
                  			})
                        casper.then(function () {
                          casper.echo(respuesta[0]+'DDDDDDDDD')
                  				casper.echo(pagination[0]);
                          if (pagination[0] == 1) {
                  					casper.each(respuesta[0], function (cas, value) {
                  						var sendCa, url = 'http://165.227.110.138/sriservice/sri.php';
                  						var originalText = value;
                  						litDate = JSON.stringify(value).substring(55, 65);
                  						var idEmpCompra = value.substring(62, 78);
                  						dateSriBad = '"'+litDate+'"';
                  						var stringFormat = dateSriBad.replace("-","/");
                  						dateSri = stringFormat.split("/").reverse().join("-");
                  						var correctDate = "'"+dateSri.replace(/"/g , "")+"'";
                  						var ind = originalText.charAt(51);
                  						var typeComprobante = '';
                  						if (ind == 'F') {
                  							typeComprobante = 1;
                  						}else if (ind == 'C') {
                  							typeComprobante = 7;
                  						}else if(ind == 'D'){
                  							typeComprobante = 5;
                  						}else if(ind == 'N'){
                  							typeComprobante = 4;
                  						}
                  						var modifiedText = originalText.substring(0,50).replace('"','');
                  						var rucSri = rucEmpresa
                  						var idSri = idEmpresa;
                  						var dateCompany = casper.cli.args[3];
                  						dateCompany = "'"+dateCompany+"'";
                							casper.then(function () {
                								casper.then(function () {
                									sendCa = casper.evaluate(function(url, ca, tipoComprobante, ruc, companyId, date) {
                								        return __utils__.sendAJAX(url, 'POST', {ca:ca, tipoComprobante:tipoComprobante, ruc:ruc, companyId:companyId, date:date}, false);
                								    }, {url: url, ca:modifiedText, tipoComprobante:typeComprobante, ruc:rucSri, companyId:idEmpCompra, date:correctDate});
                								    casper.echo(sendCa+'sendCa');
                								})
                							})
                  					})
                  				}else{
                            for (var i = 0; i < pagination[0]; i++) {
                              casper.echo(i+'CONTADOR DE PAGINAS')
                              casper.thenClick('.ui-icon.ui-icon-seek-next');
                              casper.capture('paginas/capture'+i+'.png');
                  						casper.then(function(){
                                var totalCa = casper.evaluate(function (pushCa) {
                    							var tr = $(document.getElementsByTagName('tr'));
                    							var typeDefine1 = '';
                    							var dataIs1 = '';
                    							var arrCa1 = [];
                    							var arrDate1 = [];
                    							var counter1 = 0;
                    							var idEmpresaCompra1 = '';
                    							$(tr).each(function () {
                    							    var data_ri = $(this).attr('data-ri');
                    							    if(data_ri){
                    							    	counter1++;
                    							        var text1 = $(this).text();
                    							        if(counter1 >= 10){
                    										idEmpresaCompra1 = text1.substring(3, 23);
                    									}else{
                    										idEmpresaCompra1 = text1.substring(2, 22);
                    									}
                							        var last1 = text1.lastIndexOf('CA:');
                							        var last2 = text1.lastIndexOf('NA:');
                							        var dataIs1 = text1.substring(last1+3).substring(0,10).slice(-1);
                							        if (dataIs1 == 1) {
                							            typeDefine1 = 'F';
                							        }else if(dataIs1 == 4){
                							        	typeDefine1 = 'N';
                							        }
                							        else if(dataIs1 == 5){
                							        	typeDefine1 = 'D';
                							        }
                							        else if(dataIs1 == 7){
                							            typeDefine1 = 'C';
                							        }
                							        var date1 = text1.substring(last1+3).substring(128,138);
                							        var dinamycDate1 = text1.substring(last2+3).substring(43,48);
                    									if(dinamycDate1 == 2017){
                    										date1 = text1.substring(last2+3).substring(37,47);
                    									}
                    							      pushCa.push('"'+text1.substring(last1+3).substring(0,49)+'"'+typeDefine1+date1+idEmpresaCompra1);
                    							    }
                    							});
                    							return pushCa;
                    						}, {pushCa:respuesta[0]})
                    						var sendCa, url = 'http://165.227.110.138/sriservice/sri.php';
                    						casper.each(totalCa, function (cas, value) {
                    							var originalText = value;
                    							litDate = JSON.stringify(value).substring(55, 65);
                    							var idEmpCompra = value.substring(62, 78);
                    							dateSriBad = '"'+litDate+'"';
                    							var stringFormat = dateSriBad.replace("-","/");
                    							dateSri = stringFormat.split("/").reverse().join("-");
                    							var correctDate = "'"+dateSri.replace(/"/g , "")+"'";
                    							var ind = originalText.charAt(51);
                    							var typeComprobante = '';
                    							if (ind == 'F') {
                    								typeComprobante = 1;
                    							}else if (ind == 'C') {
                    								typeComprobante = 7;
                    							}else if(ind == 'D'){
                    								typeComprobante = 5;
                    							}else if(ind == 'N'){
                    								typeComprobante = 4;
                    							}
                    							var modifiedText = originalText.substring(0,50).replace('"','');
                    							var rucSri = rucEmpresa;
                    							var idSri = idEmpresa;
                    							var dateCompany = casper.cli.args[3];
                    							dateCompany = "'"+dateCompany+"'";
                                  casper.then(function () {
                                    sendCa = casper.evaluate(function(url, ca, tipoComprobante, ruc, companyId, date) {
                    							        return __utils__.sendAJAX(url, 'POST', {ca:ca, tipoComprobante:tipoComprobante, ruc:ruc, companyId:companyId, date:date}, false);
                    							    }, {url: url, ca:modifiedText, tipoComprobante:typeComprobante, ruc:rucSri, companyId:idEmpCompra, date:correctDate});
                    							    casper.echo(sendCa+'AXXXXXXXXXXXXXX')
                                  })
                    						})
                              })
                  					}
                          }
                        })
                      }
                    })
                  }else{
                    casper.then(function () {
                      casper.echo('ERRORRR SENDINGGG')
                      casper.wait(2000, function () {
                        casper.capture('captures/captcha'+random+'error.png')
                        casper.then(function () {
                          casper.then(function () {
                            url = 'https://www.practisis.net/casper.image.php?idemp='+casper.cli.args[2]+'&imagen='+random+'error.png&error=error';
                            casper.echo(url)
                          	sendCa = casper.evaluate(function(url, imagen) {
                                  return __utils__.sendAJAX(url, 'POST', {imagen:imagen}, false);
                              }, {url:url, imagen:'captcha'+random+'error.png'});
                              casper.echo(sendCa+'sendCa');
                          })
                          casper.then(function () {
                            casper.wait(20000, function () {
                              if (sendCa != 'ERROR') {
                                casper.then(function () {
                                  url = 'https://www.practisis.net/casper.captcha.php?idemp='+casper.cli.args[2]+'&sendXa='+sendCa+'&error=error';
                                  casper.echo(url)
                                	sendCa = casper.evaluate(function(url, idemp) {
                                        return __utils__.sendAJAX(url, 'POST', {idemp:idemp}, false);
                                    }, {url:url, idemp:casper.cli.args[2]});
                                    casper.echo(sendCa+'sendCa');
                                })
                              }
                            })
                          })
                        })
                      })
                    })
                  }
  						}else{
  							var data, wsurl = 'http://165.227.110.138/sriservice/errors.php';
  							casper.then(function () {
  						        data = casper.evaluate(function(wsurl, companyId, companyRuc, sriPassword) {
  							        return __utils__.sendAJAX(wsurl, 'POST', {error:1, companyId:companyId, companyRuc:companyRuc, sriPassword:sriPassword}, false);
  							    }, {wsurl: wsurl, companyId:casper.cli.args[2], companyRuc:rucEmpresa, sriPassword:casper.cli.args[1]});
  						    });
  						    casper.then(function () {
  						    	casper.echo(data+'PRINTED');
  						    })
  						}
  					}else if (casper.exists('form[name="seleccionarPreguntasForm"]')){
  						var err, wurl = 'http://165.227.110.138/sriservice/errors.php';
  						casper.then(function () {
  							casper.echo('ERROR 2')
  					        err = casper.evaluate(function(wurl, companyId, companyRuc, sriPassword) {
  						        return __utils__.sendAJAX(wurl, 'POST', {error:2, companyId:companyId, companyRuc:companyRuc, sriPassword:sriPassword}, false);
  						    }, {wurl: wurl, companyId:casper.cli.args[2], companyRuc:rucEmpresa, sriPassword:casper.cli.args[1]});
  					    });
  					    casper.then(function () {
  					    	casper.echo(err+'PRINTED');
  					    })
  					}else{
  						var err, wurl = 'http://165.227.110.138/sriservice/errors.php';
  						casper.then(function () {
  							casper.echo('ERROR 3')
  					        err = casper.evaluate(function(wurl, companyId, companyRuc, sriPassword) {
  						        return __utils__.sendAJAX(wurl, 'POST', {error:3, companyId:companyId, companyRuc:companyRuc, sriPassword:sriPassword}, false);
  						    }, {wurl: wurl, companyId:casper.cli.args[2], companyRuc:rucEmpresa, sriPassword:casper.cli.args[1]});
  					    });
  					    casper.then(function () {
  					    	casper.echo(err+'PRINTED');
  					    })
  					}
          })
				})
			})
		})
	}else{
		var errorLogin, url = 'http://165.227.110.138/sriservice/errors.php';
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
