var selector_fecha_inicial;
var selector_fecha_final;
var selector_zona;
var selector_sucursal;

var txt_nomina;
var btn_buscar;

var promedio;
var suma_temp= 0;

var lbl_promedio;
var lbl_empleados;

var c1 = 'rgba(237,139,0,0.5)';
var c2 = 'rgb(0,60,113)';
var c3 = 'rgba(237,139,0,1)';
var c4 = 'rgb(0,60,113,1)';
var c5 = 'rgb(237,139,0,)';

var tres_colores = [c2, 'rgb(237,139,0)' , 'rgba(255,0,0,1)']


var chart1;
var chart_historico;
var chart_empleados;

var grafica_cubrebocas_valores = [0, 0, 0];
var grafica_cubrebocas_labels = ['CON CUBREBOCAS', 'CON CARETA', 'SIN CUBREBOCAS NI CARETA']

var grafica_meses_labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var meses_valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var grafica_meses_valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var grafica_sucursal_labels = [
    "CORP",'SAN LUIS POTOSI',
    'AGUASCALIENTES',
    'CALPULALPAN',
    'CANCUN',
    'CELAYA',
    'CHIHUAHUA',
    'CIUDAD JUAREZ',
    'COATZACOALCOS',
    'COLIMA',
    'CUERNAVACA',
    'CULIACAN',
    'DISTRITO FEDERAL',
    'DURANGO',
    'GUADALAJARA',
    'HERMOSILLO',
    'IRAPUATO',
    'LA PAZ',
    'LEON',
    'LOS MOCHIS',
    'MERIDA',
    'MEXICO',
    'MONCLOVA',
    'MONTERREY',
    'MORELIA',
    'OAXACA',
    'PUEBLA',
    'QUERETARO',
    'REYNOSA',
    'TAMPICO',
    'TAPACHULA',
    'TEPIC',
    'TIJUANA',
    'TOLUCA',
    'TORREON',
    'TUXTLA GUTIERREZ',
    'VERACRUZ',
    'VILLAHERMOSA',
    'ZACATECAS',
    'ZAMORA',
];

var grafica_sucursal_valores = [0];

var datos_meses;

var script_url = "https://script.google.com/macros/s/AKfycbxgZ4QuDjU4NU3e0kwjprkZLL7B3i4oWwrRAQvZfuI57iRHpl8o/exec";

function preload() {
    ctx = document.getElementById('chart').getContext('2d');
    chart1 = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: grafica_cubrebocas_labels,
            datasets: [{
                label: 'USO DE CUBREBOCAS',
                backgroundColor: ['rgb(0,80,141)', 'rgb(172,0,104)', 'rgb(255,0,0)'],
                data: grafica_cubrebocas_valores,
            }, ],
        },
        options: {
            legend: {
                labels: {
                    fontSize: 12,
                },
            },
        },
    });

    ctx1 = document.getElementById('chart-hist').getContext('2d');
    chart_historico = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: grafica_meses_labels,
            datasets: [{
                label: 'Cantidad por mes',
                backgroundColor: c1,
                borderColor: c2,
                borderWidth: 3,
                data: grafica_meses_valores,
            }, ],
        },
        options: {
            scales: {
                yAxes: [{
                    stacked: true,
                    ticks: {
                        fontSize: 12,
                    },
                }, ],
                xAxes: [{
                    stacked: true,
                    ticks: {
                        fontSize: 12,
                    },
                }, ],
            },
            legend: {
                labels: {
                    fontSize: 12,
                },
            },
        },
    });

    ctx2 = document.getElementById('chart-empleados').getContext('2d');
    chart_empleados = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: grafica_sucursal_labels,
            datasets: [{
                label: 'EMPLEADOS POR SUCURSAL',
                backgroundColor: c1,
                borderColor: c2,
                borderWidth: 3,
                data: grafica_sucursal_valores,
            }, ],
        },
        options: {
            scales: {
                yAxes: [{
                    stacked: true,
                    ticks: {
                        fontSize: 12,
                    },
                }, ],
                xAxes: [{
                    stacked: true,
                    ticks: {
                        fontSize: 12,
                    },
                }, ],
            },
            legend: {
                labels: {
                    fontSize: 12,
                },
            },
        },
    });

}

function setup(){
    selector_fecha_inicial = select('#fechaInicio');
    selector_fecha_final   = select('#fechaFinal');

    selector_zona = select('#selectorZona');
    selector_sucursal = select('#selectorSucursal');

    txt_nomina = select('#nomina');
    btn_buscar = select('#btnBuscar');

    btn_buscar.mouseClicked(buscarTodo);


    lbl_promedio = select('#temp_promedio');
    lbl_empleados = select('#cant_empleados');
    lbl_incidencias_temp = select('#inc_temp');
    lbl_incidencias_vul = select('#inc_vul');


}

function buscarTodo() {

    var zona_busqueda;
    var sucursal_busqueda;
    var nomina;

    if (selector_zona.value() == 0) {
        zona_busqueda = 0;
    }
    else{
        zona_busqueda = selector_zona.value;
    }

    if (selector_sucursal.value() == 0 ) {
        sucursal_busqueda = 0;
    } else {
        sucursal_busqueda = selector_sucursal.value();
    }

    if (txt_nomina.value() == "") {
        nomina = 0;
    } else {
        nomina = txt_nomina.value();
    }

    if (selector_fecha_final.value() != "" && selector_fecha_final.value() != "") {

        var url = script_url + "?callback=ctrlq&" +
            "&zona=" + zona_busqueda +
            "&sucursal=" + sucursal_busqueda +
            "&usuario=" + nomina +
            "&fechaI=" + selector_fecha_inicial.value() +
            "&fechaF=" + selector_fecha_final.value() +
            "&action=buscarTodo";

        var request = jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp",
        });
    }else{
        swal({
            title: "Campos vacíos",
            text: "Verifica los campos de fecha final y fecha inicial.",
            icon: "error",
            button: "De acuerdo",
        });
    }
    btn_buscar.attribute('disabled','')
}

function ctrlq(e) {
    if (e.r_metodo == 'buscarTodo') {
        swal({
            title: "Éxito",
            text: "La busqueda se realizo satisfactoriamente",
            icon: "success",
            button: "De acuerdo",
        });
        btn_buscar.removeAttribute('disabled');

        //Se empieza a calcular el promedio
        suma_temp = 0;
        for (let index = 0; index < e.r_filtroFecha.length; index++) {
            suma_temp = suma_temp + e.r_filtroFecha[index][2];
            
            //console.log(parseado/2);
        }
        promedio = suma_temp / e.r_filtroFecha.length;
        lbl_promedio.html(promedio.toFixed(2)+" °C");

        //se sacan los usuarios registrados
        var lista_temperaturas = e.r_filtroFecha.map(function(r){return r[0];});
        var lista_incidencias_temp = e.r_filtroFecha.map(function(r){return r[2];});
        var lista_uso_cubrebocas = e.r_filtroFecha.map(function(r){return r[3];});

        var uniqs = lista_temperaturas.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        });

        lbl_empleados.html(uniqs.length);

        //Se comienza el proceso para contabilizar la cantidad de incidencias por temperatura
        var contador_incidencias = 0;
        for (let index = 0; index < lista_incidencias_temp.length; index++) {
            
            if (lista_incidencias_temp[index] >= 37.5) {
                contador_incidencias+=1;
                
            }
            
        }
        lbl_incidencias_temp.html(contador_incidencias);
        lbl_incidencias_vul.html("0")

        //Comienza la gráfica de uso de cubrebocas

        var contador_con_cubre = 0;
        var contador_sin_cubre = 0;
        var contador_con_careta= 0;
        for (let index = 0; index < lista_uso_cubrebocas.length; index++) {
            
            if (lista_uso_cubrebocas[index] == 'CON CUBREBOCAS') {
                contador_con_cubre += 1;
            }
            if (lista_uso_cubrebocas[index] == 'SIN CUBREBOCAS NI CARETA') {
                contador_sin_cubre += 1;
            }
            if (lista_uso_cubrebocas[index] == 'CON CARETA') {
                contador_con_careta += 1;
            }
        }
        grafica_cubrebocas_valores[0] = contador_con_cubre;
        grafica_cubrebocas_valores[1] = contador_con_careta;
        grafica_cubrebocas_valores[2] = contador_sin_cubre;

        construyeGrafica(chart1, grafica_cubrebocas_valores, grafica_cubrebocas_labels, 'USO DE CUBREBOCAS', tres_colores);
        
        //Comeinza grafica de historial de temperaturas
        let temp_mes;
        var suma_historico =0;
        var suma_enero = 0;
        var suma_febrero = 0;
        var suma_marzo = 0;
        var suma_abril = 0;
        var suma_mayo = 0;
        var suma_junio = 0;
        var suma_julio = 0;
        var suma_agosto = 0;
        var suma_septiembre = 0;
        var suma_octubre = 0;
        var suma_noviembre = 0;
        var suma_diciembre = 0;
        var promedio_historico = 0;

        var promedio_enero = 0;
        var promedio_febrero = 0;
        var promedio_marzo = 0;
        var promedio_abril = 0;
        var promedio_mayo = 0;
        var promedio_junio = 0;
        var promedio_julio = 0;
        var promedio_agosto = 0;
        var promedio_septiembre = 0;
        var promedio_octubre = 0;
        var promedio_noviembre = 0;
        var promedio_diciembre = 0;
        
        var cantidad_enero = 0;
        var cantidad_febrero = 0;
        var cantidad_marzo = 0;
        var cantidad_abril = 0;
        var cantidad_mayo = 0;
        var cantidad_junio = 0;
        var cantidad_julio = 0;
        var cantidad_agosto = 0;
        var cantidad_septiembre = 0;
        var cantidad_octubre = 0;
        var cantidad_noviembre = 0;
        var cantidad_diciembre = 0;
        
        for (let index = 0; index < meses_valores.length; index++) {
            
            temp_mes = e.r_filtroFecha.filter(function(dataRow) {
                
                var t_mes = split(dataRow[4], '-');
                
                if(t_mes[1] == meses_valores[index]){
                    if (t_mes[1]==1) {
                        suma_enero = suma_historico + dataRow[2];
                        cantidad_enero++;
                        promedio_enero = suma_enero/cantidad_enero;
                    }
                    if (t_mes[1]==2) {
                        suma_febrero = suma_historico + dataRow[2];
                        cantidad_febrero++;
                        promedio_febrero = suma_febrero/cantidad_febrero;
                    }
                    if (t_mes[1]==3) {
                        suma_marzo = suma_marzo + dataRow[2]
                        cantidad_marzo++;
                        promedio_marzo = suma_marzo/cantidad_marzo;
                    }
                    if (t_mes[1]==4) {
                        suma_abril = suma_abril + dataRow[2];
                        cantidad_abril++;
                        promedio_abril = suma_abril/cantidad_abril;
                    }
                    if (t_mes[1]==5) {
                        suma_mayo = suma_mayo + dataRow[2];
                        cantidad_mayo++;
                        promedio_mayo = suma_mayo/cantidad_mayo;
                    }
                    if (t_mes[1]==6) {
                        
                        suma_junio = suma_junio + dataRow[2];
                        cantidad_junio++;
                        promedio_junio = suma_junio/cantidad_junio;
                    }
                    if (t_mes[1]=="07") {
                        suma_julio = suma_julio+ dataRow[2];
                        cantidad_julio++;
                        promedio_julio = suma_julio/cantidad_julio;
                    }
                    if (t_mes[1]=="08") {
                        suma_agosto = suma_agosto + dataRow[2];
                        cantidad_agosto++;
                        promedio_agosto = suma_agosto/cantidad_agosto;
                    }
                    if (t_mes[1]==9) {
                        suma_septiembre = suma_septiembre + dataRow[2];
                        cantidad_septiembre++;
                        promedio_septiembre = suma_septiembre/cantidad_septiembre;

                    }
                    if (t_mes[1]==10) {
                        suma_octubre = suma_historico + dataRow[2]
                    }
                    if (t_mes[1]==11) {
                        suma_noviembre = suma_historico + dataRow[2]
                    }
                    if (t_mes[1]==12) {
                        suma_diciembre = suma_historico + dataRow[2]
                    }
                    
                    
                }
                return t_mes[1] == meses_valores[index];
                
            });

            datos_meses =   [promedio_enero, promedio_febrero, promedio_marzo, promedio_abril, promedio_mayo, promedio_junio, promedio_julio.toFixed(2), 
                promedio_agosto.toFixed(2), promedio_septiembre, promedio_octubre, promedio_noviembre, promedio_diciembre];
            
        }
        construyeGrafica(chart_historico, datos_meses, grafica_meses_labels, 'HISTORICO DE TEMPERATURAS', c1);

        //Comeinza la seccion de empleados por sucursal
        let empleado_suc;
            for (var i12 = 0; i12 < grafica_sucursal_labels.length; i12++) {
                empleado_suc = e.r_filtroFecha.filter(function(dataRow) {
                    
                    return dataRow[1] == grafica_sucursal_labels[i12];
                });
                var lista_sucursal = empleado_suc.map(function(r){return r[0];});
                var uniqs_suc = lista_sucursal.filter(function(item, index, array) {
                    return array.indexOf(item) === index;
                });
                grafica_sucursal_valores[i12] = uniqs_suc.length;
                
            }
            construyeGrafica(chart_empleados, grafica_sucursal_valores , grafica_sucursal_labels, 'EMPLEADOS POR SUCURSAL', c1);
            
            at1 = [];
            for (var t1 = 0; t1 < grafica_sucursal_labels.length; t1++) {
                at1.push([grafica_sucursal_labels[t1], grafica_sucursal_valores[t1]]);
            }
            var ta = at1.sort((a, b) => b[1] - a[1]).slice(0, 10);
            var num_t;
            if (ta.length > 10) {
                num_t = 10;
            } else {
                num_t = ta.length;
            }
            $("#tabla_empleados").html("");
            for (var i = 0; i < num_t; i++) {
                var tr = `<tr>
            <td><i class="fa fa-fw fa-warehouse " style="color: gray; "></i></td>
            <td>` + ta[i][0] + `</td>
            <td>` + ta[i][1] + `</td>
            </tr>`;
                $("#tabla_empleados").append(tr)
            }

            console.log(ta)
    }
    
}

function construyeGrafica(chart, valores, labels, titulo, colores) {
    chart.data = {
        labels: labels,
        datasets: [{
            label: titulo,
            backgroundColor: colores,
            data: valores,
        }, ],
    };
    chart.update();
}

