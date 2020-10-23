var c1 = 'rgba(237,139,0,0.5)';
var c2 = 'rgb(0,60,113)';
var c3 = 'rgba(237,139,0,1)';
var c4 = 'rgb(0,60,113,1)';
var c5 = 'rgb(237,139,0,)';

var tres_colores = [c2, 'rgb(237,139,0)' , 'rgba(255,0,0,1)']

var lbl_casos_totales;
var lbl_mayor_sucursal;

var lbl_higher_risk, lbl_higher_amount, total_amount;
var datos_meses;

var chart_casos;
var chart_meses;
var ctx5;

var numeros = [];

var script_url = "https://script.google.com/macros/s/AKfycbx2VS8MfXPu2pKEtF7JiABFC3MyQp7JRIgIRGostzfZdzt4ZmYl/exec"

var grafica_sucursales_labels = ['SLP', 'AGS', 'CALP', 'CUN', 'CEL', 'CEN', 'CHH',
                                'CDJ', 'COA', 'COL',  'CUE', 'CUL', 'CDF',
                                'DGO', 'GDL', 'HER',  'IRA', 'LPZ', 'LEN', 
                                'LMC', 'MER', 'CDM',  'MCL', 'MTY', 'MOR', 
                                'OAX', 'PUE', 'QRO',  'RSA', 
                                'TAM', 'TPC', 'TEP',  'TJN', 'TOL', 'TOR', 'TUX',
                                'VER', 'VHS', 'ZAC',  'ZAM'];

var grafica_casos_valores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var grafica_meses_labels = ["JANUARY-1", "FEBRUARY-2", "MARCH-3", "APRIL-4", "MAY-5", "JUNE-6", "JULY-7", "AUGUST-8", "SEPTEMBER-9", "OCTOBER-10", "NOVEMBER-11", "DECEMBER-12"];
var meses_valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var grafica_meses_valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var grafica_datos_risk = [5,6,7,8,1,2,3];
var grafica_labels_risk = ['Operational Audits Results',	'Inventory Count Results', 'Receivables', 'Margin',	'Collection',	'Crimes', 	'Auto theft']
var grafica_colores_risk = ['rgb(85, 211, 38)', 'rgb(34, 51, 145)', 'rgb(223, 91, 248)', 'rgb(163, 188, 245)', 'rgb(239, 220, 131)', 'rgb(5, 152, 223)', 'rgb(162, 10, 2)']
var grafica_meses_valores_risk = [2,2,2, 3, 1, 5, 6, 2, 6, 1, 4, 7];

var risk_area, warehouse, month, year;

//junio 22 -- julio 31 -- agosto 10 
function preload() {
    ctx2 = document.getElementById('chart-pendiente').getContext('2d');
    chart_pendiente = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: grafica_meses_labels,
            datasets: [{
                label: 'RISK',
                backgroundColor: c1,
                borderColor: c1,
                fill: false,
                borderWidth: 3,
                data: grafica_meses_valores_risk,
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

    ctx3 = document.getElementById('chart-historico').getContext('2d');
    chart_pendiente = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: grafica_meses_labels,
            datasets: [{
                label: 'RISK',
                borderColor: c1,
                backgroundColor: grafica_colores_risk,
                fill: false,
                borderWidth: 3,
                data: grafica_meses_valores_risk,
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

    lbl_casos_totales = select('#casos_totales');
    lbl_mayor_sucursal= select('#sucursal_mayor');

    lbl_higher_risk   = select('#higher_risk')
    lbl_higher_amount = select('#higher_amount')
    lbl_total_risk    = select('#total_risk')

    risk_area = select('#selectArea');
    warehouse = select('#selectWarehouse');
    month = select('#selectMonth');
    year  = select('#selectYear');

    btn_buscar = select('#btnBuscar');
    btn_buscar.mouseClicked(search)
    // buscarCasos();
    // buscarTodosCasos();
    //cargarMapa();
    cargar_numeros();

    for (let index = 0; index < grafica_sucursales_labels.length; index++) {
        warehouse.option(grafica_sucursales_labels[index]);
    }
    for (let index = 0; index < grafica_meses_labels.length; index++) {
        month.option(grafica_meses_labels[index]);   
    }
    for (let index = 2020; index < 2031; index++) {
        year.option(index);
    }
    busquedaInicio();

}

function busquedaInicio() {    
    var url = script_url + "?callback=ctrlq&" +
            "&action=search";

    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp",
    });
}

function ctrlq(e) {

    if(e.r_metodo == 'top_ten'){
        console.log(e.r_ordenados)
        var higher_split = e.r_ordenados[0][0];
        lbl_higher_risk.html(higher_split);
        lbl_higher_amount.html(e.r_ordenados[0][1].toFixed(2))
        console.log(e.r_totalesFinal)
        lbl_total_risk.html(e.r_totalesFinal[0][7].toFixed(2));
        var num_t = e.r_ordenados.length;
        $("#t_rank_risk").html("");
            
            for (var i = 0; i < num_t; i++) {
                var tr = `<tr>
            <td>` + e.r_ordenados[i][0] + `</td>
            <td>` + e.r_ordenados[i][1].toFixed(2) + `</td>
            </tr>`;
                $("#t_rank_risk").append(tr)
            }
            
            //var cantidad_split = e.r_listaTotales[0].split(',');
            var num_t1 = grafica_labels_risk.length;
            $("#t_rank_risk1").html("");
            
            for (var i = 0; i < num_t1; i++) {
                var tr = `<tr>
            <td>` + grafica_labels_risk[i] + `</td>
            <td>` +  e.r_listaTotales[0][i].toFixed(2)+ `</td>
            </tr>`;
                $("#t_rank_risk1").append(tr)
            }

            grafica_datos_risk = e.r_listaTotales[0];
            console.log(e.r_listaTotalesMain)

            var arreglo_colores = [];
            for (let i = 0; i < grafica_datos_risk.length; i++) {
                console.log(grafica_datos_risk[i])
                if (grafica_datos_risk[i] >= 1 && grafica_datos_risk[i] < 2) {
                    arreglo_colores.push('rgb(0, 176, 80)');
                }
                if (grafica_datos_risk[i] >= 2 && grafica_datos_risk[i] < 3) {
                    arreglo_colores.push('rgb(56, 193, 63)');
                }
                if (grafica_datos_risk[i] >= 3 && grafica_datos_risk[i] < 4) {
                    arreglo_colores.push('rgb(113, 211, 45)');
                }
                if (grafica_datos_risk[i] >= 4 && grafica_datos_risk[i] < 5) {
                    arreglo_colores.push('rgb(226, 246, 9)');
                }
                if (grafica_datos_risk[i] >= 5 && grafica_datos_risk[i] < 6) {
                    arreglo_colores.push('rgb(245, 227, 3)');
                }
                if (grafica_datos_risk[i] >= 6 && grafica_datos_risk[i] < 7) {
                    arreglo_colores.push('rgb(226, 171, 10)');
                }
                if (grafica_datos_risk[i] >= 7 && grafica_datos_risk[i] < 8) {
                    arreglo_colores.push('rgb(205, 114, 18)');
                }
                if (grafica_datos_risk[i] >= 8 && grafica_datos_risk[i] < 9) {
                    arreglo_colores.push('rgb(186, 57, 25)');
                }
                if (grafica_datos_risk[i] >= 9 && grafica_datos_risk[i] < 10) {
                    arreglo_colores.push('rgb(165, 0, 33)');
                }
                if (grafica_datos_risk[i] >= 10 && grafica_datos_risk[i] < 11) {
                    arreglo_colores.push('rgb(117, 0, 23)');
                }
            }
            grafica_colores_risk = arreglo_colores;
            ctx1 = document.getElementById('chart-mes').getContext('2d');
            chart_meses = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: grafica_labels_risk,
                    datasets: [{
                        label: 'RISK DATA',
                        backgroundColor: grafica_colores_risk,
                        borderWidth: 1,
                        data: grafica_datos_risk,
                    }, ],
                },
                options: {
                    // scales: {
                    //     yAxes: [{
                    //         stacked: true,
                    //         ticks: {
                    //             fontSize: 12,
                    //         },
                    //     }, ],
                    //     xAxes: [{
                    //         stacked: true,
                    //         ticks: {
                    //             fontSize: 12,
                    //         },
                    //     }, ],
                    // },
                    legend: {
                        labels: {
                            fontSize: 12,
                        },
                    },
                },
            });
            
    numeros = e.r_listaTotalesMain;
    console.log(numeros)

    cargarMapa();
        
    }

    if (e.r_metodo == 'buscarMesAnio') {
        console.log(e.r_MesAnio);
        swal('Success!','','success')
        var temporal = [];
        var num_t = e.r_ordenadosMes.length;
        $("#t_rank_risk").html("");
            
        for (var i = 0; i < num_t; i++) {
            var tr = `<tr>
            <td>` + e.r_ordenadosMes[i][0] + `</td>
            <td>` + e.r_ordenadosMes[i][1].toFixed(2) + `</td>
            </tr>`;
            $("#t_rank_risk").append(tr)
        }

        for (let i = 0; i < e.r_MesAnio.length; i++) {
            temporal.push(e.r_MesAnio[i][10])
            
        }
        numeros = temporal;
        var num_t1 = grafica_labels_risk.length;
        $("#t_rank_risk1").html("");
        for (var i = 0; i < num_t1; i++) {
                var tr = `<tr>
            <td>` + grafica_labels_risk[i] + `</td>
            <td>` + e.r_totalesMes[0][i].toFixed(2)+ `</td>
            </tr>`;
            $("#t_rank_risk1").append(tr)
        }
        lbl_total_risk.html(e.r_totalesMes[0][7].toFixed(2));
        lbl_higher_risk.html(e.r_ordenadosMes[0][0])
        lbl_higher_amount.html(e.r_ordenadosMes[0][1].toFixed(2))
        
        var arreglo_sin_fecha=[];
        
        for (let i = 0; i < 7; i++) {
            arreglo_sin_fecha.push(e.r_totalesMes[0][i])
        }
        console.log(arreglo_sin_fecha)
        grafica_datos_risk = arreglo_sin_fecha;
        ctx1 = document.getElementById('chart-mes').getContext('2d');
            chart_meses = new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: grafica_labels_risk,
                    datasets: [{
                        label: 'RISK DATA',
                        backgroundColor: grafica_colores_risk,
                        borderWidth: 1,
                        data: grafica_datos_risk,
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
        
        cargarMapa()
    }
    if (e.r_metodo == 'buscarMesAnioWare') {
        console.log(e.r_MesAnioWare);
        swal('Success!','','success');
        var temporal = [];
        var num_t = e.r_MesAnioWare.length;
        $("#t_rank_risk").html("");
            
        for (var i = 0; i < num_t; i++) {
            var tr = `<tr>
            <td>` + e.r_MesAnioWare[i][0] + `</td>
            <td>` + e.r_MesAnioWare[i][10].toFixed(2) + `</td>
            </tr>`;
            $("#t_rank_risk").append(tr)
        }

        var arreglo_sin_fecha1=[];
        
        for (let i = 1; i < 8; i++) {
            arreglo_sin_fecha1.push(e.r_MesAnioWare[0][i])
        }
        console.log(arreglo_sin_fecha1);

        var num_t1 = grafica_labels_risk.length;
        $("#t_rank_risk1").html("");
        for (var i = 0; i < num_t1; i++) {
                var tr = `<tr>
            <td>` + grafica_labels_risk[i] + `</td>
            <td>` + arreglo_sin_fecha1[i]+ `</td>
            </tr>`;
            $("#t_rank_risk1").append(tr)
        }
        grafica_datos_risk = []
        grafica_datos_risk = arreglo_sin_fecha1;
        lbl_total_risk.html(e.r_MesAnioWare[0][10].toFixed(2));
        lbl_higher_risk.html(e.r_MesAnioWare[0][0])
        lbl_higher_amount.html(e.r_MesAnioWare[0][10].toFixed(2))//Preguntar a Edgar
        var arreglo_colores_MesAnioWare = [];
        for (let i = 0; i < arreglo_sin_fecha1.length; i++) {
            
            if (arreglo_sin_fecha1[i] >= 1 && arreglo_sin_fecha1[i] < 2) {
                arreglo_colores_MesAnioWare.push('rgb(0, 176, 80)');
            }
            if (arreglo_sin_fecha1[i] >= 2 && arreglo_sin_fecha1[i] < 3) {
                arreglo_colores_MesAnioWare.push('rgb(56, 193, 63)');
            }
            if (arreglo_sin_fecha1[i] >= 3 && arreglo_sin_fecha1[i] < 4) {
                arreglo_colores_MesAnioWare.push('rgb(113, 211, 45)');
            }
            if (arreglo_sin_fecha1[i] >= 4 && arreglo_sin_fecha1[i] < 5) {
                arreglo_colores_MesAnioWare.push('rgb(226, 246, 9)');
            }
            if (arreglo_sin_fecha1[i] >= 5 && arreglo_sin_fecha1[i] < 6) {
                arreglo_colores_MesAnioWare.push('rgb(245, 227, 3)');
            }
            if (arreglo_sin_fecha1[i] >= 6 && arreglo_sin_fecha1[i] < 7) {
                arreglo_colores_MesAnioWare.push('rgb(226, 171, 10)');
            }
            if (arreglo_sin_fecha1[i] >= 7 && arreglo_sin_fecha1[i] < 8) {
                arreglo_colores_MesAnioWare.push('rgb(205, 114, 18)');
            }
            if (arreglo_sin_fecha1[i] >= 8 && arreglo_sin_fecha1[i] < 9) {
                arreglo_colores_MesAnioWare.push('rgb(186, 57, 25)');
            }
            if (arreglo_sin_fecha1[i] >= 9 && arreglo_sin_fecha1[i] < 10) {
                arreglo_colores_MesAnioWare.push('rgb(165, 0, 33)');
            }
            if (arreglo_sin_fecha1[i] >= 10 && arreglo_sin_fecha1[i] < 11) {
                arreglo_colores_MesAnioWare.push('rgb(117, 0, 23)');
            }
        }
        console.log(arreglo_colores_MesAnioWare)
        grafica_colores_risk = arreglo_colores_MesAnioWare;
        construyeGrafica(chart_meses, arreglo_sin_fecha1, grafica_labels_risk, 'RISK DATA', grafica_colores_risk)

        var nuevosValoresMapa = [];
        for (let k = 0; k < grafica_sucursales_labels.length; k++) {
            if (warehouse.value() == grafica_sucursales_labels[k]) {
                nuevosValoresMapa.push(e.r_MesAnioWare[0][10].toFixed(2))
            }else{
                nuevosValoresMapa.push(-1);
            }
            
        }

        if (warehouse.value() == 'LEN' || warehouse.value() == 'IRA'||warehouse.value() == 'CEL') {
            nuevosValoresMapa[4] = parseFloat(e.r_MesAnioWare[0][10].toFixed(2));
            nuevosValoresMapa[18] = parseFloat(e.r_MesAnioWare[0][10].toFixed(2));
            nuevosValoresMapa[16] = parseFloat(e.r_MesAnioWare[0][10].toFixed(2));
        }

        if (warehouse.value() == 'CDM' || warehouse.value() == 'CDF') {
            nuevosValoresMapa[12] = parseFloat(e.r_MesAnioWare[0][10].toFixed(2));
            nuevosValoresMapa[21] = parseFloat(e.r_MesAnioWare[0][10].toFixed(2));
        }

        if (warehouse.value() == 'SLP' || warehouse.value() == 'CEN') {
            nuevosValoresMapa[0] = parseFloat(e.r_MesAnioWare[0][10].toFixed(2));
            nuevosValoresMapa[5] = parseFloat(e.r_MesAnioWare[0][10].toFixed(2));
        }


        console.log(nuevosValoresMapa)
        numeros = nuevosValoresMapa;
        cargarMapa()
        console.log(nuevosValoresMapa);
    }
    if (e.r_metodo == 'buscarMesAnioArea') {
        console.log(e.r_MesAnioArea);
        var at1 = [];
        for (var t1 = 0; t1 < grafica_sucursales_labels.length; t1++) {
            at1.push([grafica_sucursales_labels[t1], e.r_MesAnioArea[t1]]);
        }
        var ta1 = at1.sort((a, b) => b[1] - a[1]).slice(0, 10);
        console.log(e.r_MesAnioArea)
        swal('Success!','','success');
        var temporal = [];
        var num_t = ta1.length;
        $("#t_rank_risk").html("");
        console.log(ta1[0][0])
        for (var j = 0; j < num_t; j++) {
            var tr = `<tr>
            <td>` + ta1[j][0] + `</td>
            <td>` + ta1[j][1].toFixed(2) + `</td>
            </tr>`;
            $("#t_rank_risk").append(tr)
        }
        numeros = e.r_MesAnioArea;
        var num_t1 = 1;
        console.log(e.r_datosTotal)
        var tot = e.r_datosTotal;

        $("#t_rank_risk1").html("");
        for (var i = 0; i < num_t1; i++) {
                var tr = `<tr>
            <td>` + risk_area.value() + `</td>
            <td>` + tot.toFixed(2) + `</td>
            </tr>`;
            $("#t_rank_risk1").append(tr)
        }
        var arreglo_con_etiqueta =[risk_area.value()]
        var arreglo_con_datos = [tot.toFixed(2)]
        lbl_total_risk.html(tot.toFixed(2));
        lbl_higher_risk.html(ta1[0][0])
        lbl_higher_amount.html(ta1[0][1].toFixed(2));//Preguntar a Edgar

        var arreglo_colores_MesAnioArea = [];
        for (let i = 0; i < arreglo_con_datos.length; i++) {
            
            if (arreglo_con_datos[i] >= 1 && arreglo_con_datos[i] < 2) {
                arreglo_colores_MesAnioArea.push('rgb(0, 176, 80)');
            }
            if (arreglo_con_datos[i] >= 2 && arreglo_con_datos[i] < 3) {
                arreglo_colores_MesAnioArea.push('rgb(56, 193, 63)');
            }
            if (arreglo_con_datos[i] >= 3 && arreglo_con_datos[i] < 4) {
                arreglo_colores_MesAnioArea.push('rgb(113, 211, 45)');
            }
            if (arreglo_con_datos[i] >= 4 && arreglo_con_datos[i] < 5) {
                arreglo_colores_MesAnioArea.push('rgb(226, 246, 9)');
            }
            if (arreglo_con_datos[i] >= 5 && arreglo_con_datos[i] < 6) {
                arreglo_colores_MesAnioArea.push('rgb(245, 227, 3)');
            }
            if (arreglo_con_datos[i] >= 6 && arreglo_con_datos[i] < 7) {
                arreglo_colores_MesAnioArea.push('rgb(226, 171, 10)');
            }
            if (arreglo_con_datos[i] >= 7 && arreglo_con_datos[i] < 8) {
                arreglo_colores_MesAnioArea.push('rgb(205, 114, 18)');
            }
            if (arreglo_con_datos[i] >= 8 && arreglo_con_datos[i] < 9) {
                arreglo_colores_MesAnioArea.push('rgb(186, 57, 25)');
            }
            if (arreglo_con_datos[i] >= 9 && arreglo_con_datos[i] < 10) {
                arreglo_colores_MesAnioArea.push('rgb(165, 0, 33)');
            }
            if (arreglo_con_datos[i] >= 10 && arreglo_con_datos[i] < 11) {
                arreglo_colores_MesAnioArea.push('rgb(117, 0, 23)');
            }
        }
        
        grafica_colores_risk = arreglo_colores_MesAnioArea;
        construyeGrafica(chart_meses, arreglo_con_datos ,arreglo_con_etiqueta, 'RISK DATA', grafica_colores_risk)
        cargarMapa()
        
    }
    if (e.r_metodo == 'buscarMesAnioWareArea') {
        console.log(e.r_MesAnioAreaWare);
        swal('Success!','','success');
        var opt = 0;
        if( risk_area.value() == 'OPERATIONAL AUDITS RESULTS'){
            opt = 1;
        }
        if( risk_area.value() == 'INVENTORY COUNT RESULTS'){
            opt = 2;
        }
        if( risk_area.value() == 'RECEIVABLES'){
            opt = 3;
        }
        if( risk_area.value() == 'MARGIN'){
            opt = 4;
        }
        if( risk_area.value() == 'COLLECTION'){
            opt = 5;
        }
        if( risk_area.value() == 'CRIMES'){
            opt = 6;
        }
        if( risk_area.value() == 'AUTO THEFT'){
            opt = 7;
        }

        var num_t1 = 1;

        var num_t = 1;
        $("#t_rank_risk").html("");
        for (var j = 0; j < num_t; j++) {
            var tr = `<tr>
            <td>` + e.r_MesAnioAreaWare[0][0] + `</td>
            <td>` + e.r_MesAnioAreaWare[0][opt].toFixed(2) + `</td>
            </tr>`;
            $("#t_rank_risk").append(tr)
        }
        var arr_label = [risk_area.value()];
        var arr_datos = [e.r_MesAnioAreaWare[0][opt]]
        $("#t_rank_risk1").html("");
        for (var i = 0; i < num_t1; i++) {
                var tr = `<tr>
            <td>` + risk_area.value() + `</td>
            <td>` + e.r_MesAnioAreaWare[0][opt] + `</td>
            </tr>`;
            $("#t_rank_risk1").append(tr)
        }

        lbl_total_risk.html(e.r_MesAnioAreaWare[0][opt].toFixed(2));
        lbl_higher_risk.html(e.r_MesAnioAreaWare[0][0])
        lbl_higher_amount.html(e.r_MesAnioAreaWare[0][opt].toFixed(2))//Preguntar a Edgar

        var arreglo_colores = [];
        for (let i = 0; i < arr_datos.length; i++) {
            if (arr_datos[i] >= 1 && arr_datos[i] < 2) {
                arreglo_colores.push('rgb(0, 176, 80)');
            }
            if (arr_datos[i] >= 2 && arr_datos[i] < 3) {
                arreglo_colores.push('rgb(56, 193, 63)');
            }
            if (arr_datos[i] >= 3 && arr_datos[i] < 4) {
                arreglo_colores.push('rgb(113, 211, 45)');
            }
            if (arr_datos[i] >= 4 && arr_datos[i] < 5) {
                arreglo_colores.push('rgb(226, 246, 9)');
            }
            if (arr_datos[i] >= 5 && arr_datos[i] < 6) {
                arreglo_colores.push('rgb(245, 227, 3)');
            }
            if (arr_datos[i] >= 6 && arr_datos[i] < 7) {
                arreglo_colores.push('rgb(226, 171, 10)');
            }
            if (arr_datos[i] >= 7 && arr_datos[i] < 8) {
                arreglo_colores.push('rgb(205, 114, 18)');
            }
            if (arr_datos[i] >= 8 && arr_datos[i] < 9) {
                arreglo_colores.push('rgb(186, 57, 25)');
            }
            if (arr_datos[i] >= 9 && arr_datos[i] < 10) {
                arreglo_colores.push('rgb(165, 0, 33)');
            }
            if (arr_datos[i] >= 10 && arr_datos[i] < 11) {
                arreglo_colores.push('rgb(117, 0, 23)');
            }
        }
        grafica_colores_risk = arreglo_colores;
        console.log(arreglo_colores)
        construyeGrafica(chart_meses,arr_datos , arr_label, 'RISK DATA', grafica_colores_risk);

        var nuevosValoresMapa = [];
        for (let k = 0; k < grafica_sucursales_labels.length; k++) {
            if (warehouse.value()== grafica_sucursales_labels[k]) {
                nuevosValoresMapa.push(e.r_MesAnioAreaWare[0][opt].toFixed(2))
            }else{
                nuevosValoresMapa.push(-1);
            }
            
        }
        numeros = nuevosValoresMapa;
        cargarMapa()

    }

    btn_buscar.removeAttribute('disabled');
        
}

function cargarMapa() {

        let numero = round(random(0, 10)) ;
        console.log(numeros[1])
        $(function() {
            $(".mapcontainer").mapael({
                map: {
                    // Set the name of the map to display
                    name: "mexico",
                    defaultArea: {
                        attrs: {
                            stroke: "#fff",
                            "stroke-width": 5
                        },
                        attrsHover: {
                            "stroke-width": 1
                        }
                    }
                },
                legend: {
                    area: {
                        title: "SCALE RISK",
                        slices: [
                            {   //
                                min: 11,
                                max: 10,
                                attrs: {
                                    fill: "#750017"
                                },
                                label: "10"
                            },
                            {
                                min: 9,
                                max: 10,
                                attrs: {
                                    fill: "#A50021"
                                },
                                label: "9"
                            },
                            {
                                min: 8,
                                max: 9,
                                attrs: {
                                    fill: "#BA3919"
                                },
                                label: "8"
                            },
                            {   
                                min: 7,
                                max: 8,
                                attrs: {
                                    fill: "#CD7212"
                                },
                                label: "7"
                            },
                            {
                                min: 6,
                                max: 7,
                                attrs: {
                                    fill: "#E2AB0A"
                                },
                                label: "6"
                            },
                            {
                                min: 5,
                                max: 6,
                                attrs: {
                                    fill: "#F5E303"
                                },
                                label: "5"
                            },
                            {
                                min: 4,
                                max: 5,
                                attrs: {
                                    fill: "#E2F609"
                                },
                                label: "4"
                            },
                            {   
                                min: 3,
                                max: 4,
                                attrs: {
                                    fill: "#71D32D"
                                },
                                label: "3"
                            },
                            {
                                min: 2,
                                max: 3,
                                attrs: {
                                    fill: "#38C13F"
                                },
                                label: "2"
                            },
                            {
                                min: 1,
                                max: 2,
                                attrs: {
                                    fill: "#00B050"
                                },
                                label: "1"
                            },

                        ]
                    }
                },
                areas: {
                    "quintana roo": {
                        value: numeros[3],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">Quintana Roo</span><br />Risk : "+numeros[3]}
                    },
                    "yucatan": {
                        value: numeros[20],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">Yucatan</span><br />Risk : "+ numeros[20]}
                    },
                    "campeche": {
                        value: -1,
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">Campeche</span><br />Risk : " + -1}
                    },
                    "tabasco": {
                        value: numeros[37],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">Tabasco</span><br />Risk : " + numeros[37]}
                    },
                    "chiapas": {
                        value:  numeros[35],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">Chiapas</span><br />Risk : " + numeros[35]}
                    },
                    "oaxaca": {
                        value: numeros[25],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">Oaxaca</span><br />Risk : " + numeros[25]}
                    },
                    "tlaxcala": {
                        value: numeros[2],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">tlaxcala</span><br />Risk : " + numeros[2]}
                    },
                    "tamaulipas": {
                        value: numeros[29],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">tamaulipas</span><br />Risk : " + numeros[27]}
                    },
                    "veracruz": {
                        value: numeros[8],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">veracruz</span><br />Risk : " + numeros[8]}
                    },
                    "puebla": {
                        value: numeros[26],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">puebla</span><br />Risk : " + numeros[26]}
                    },
                    "hidalgo": {
                        value: -1,
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">hidalgo</span><br />Risk : " + '-1'}
                    },
                    "nuevo leon": {
                        value: numeros[23],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">nuevo leon</span><br />Risk : " + numeros[23]}
                    },
                    //morelos
                    "morelia": {
                        value: numeros[10],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">morelos</span><br />Risk : " + numeros[10]}
                    },
                    "ciudad de mexico": {
                        value: (numeros[12] + numeros[21])/2,
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">ciudad de mexico</span><br />Risk : " + (numeros[12] + numeros[21])/2}
                    },
                    "estado de mexico": {
                        value: numeros[33],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">estado de mexico</span><br />Risk : " +numeros[33]}
                    },
                    "guanajuato": {
                        value: parseFloat((numeros[4] + numeros[18]+numeros[16])/3),
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">guanajuato</span><br />Risk : " + (numeros[4] + numeros[18]+numeros[16])/3}
                    },
                    "guerrero": {
                        value: -1,
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">guerrero</span><br />Risk : " + "-1"}
                    },
                    "queretaro": {
                        value: numeros[27],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">queretaro</span><br />Risk : " + numeros[27]}
                    },
                    "san luis potosi": {
                        value: (numeros[0] + numeros[5])/2,
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">San Luis Potosi</span><br />Risk : " + (numeros[0] + numeros[5])/2}
                    },
                    "zacatecas": {
                        value: numeros[38],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">zacatecas</span><br />Risk : " + numeros[38]}
                    },
                    "aguascalientes": {
                        value: numeros[1],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">aguascalientes</span><br />Risk : " + numeros[1]}
                    },
                    "coahuila": {
                        value: numeros[22],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">coahuila</span><br />Risk : " + numeros[22]}
                    },
                    "michoacan": {
                        value: numeros[24],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">michoacan</span><br />Risk : " + numeros[24]}
                    },
                    "durango": {
                        value: numeros[13],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">durango</span><br />Risk : " + numeros[13]}
                    },
                    "nayarit": {
                        value: numeros[30],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">nayarit</span><br />Risk : " + numeros[30]}
                    },
                    "colima": {
                        value: numeros[9],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">colima</span><br />Risk : " + numeros[9]}
                    },
                    "jalisco": {
                        value: numeros[14],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">jalisco</span><br />Risk : " + numeros[14]}
                    },
                    "chihuahua": {
                        value: numeros[6],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">chihuahua</span><br />Risk : " + numeros[6]}
                    },
                    "sinaloa": {
                        value: numeros[11],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">sinaloa</span><br />Risk : " + numeros[11]}
                    },
                    "sonora": {
                        value: numeros[15],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">sonora</span><br />Risk : " + numeros[15]}
                    },
                    "baja california sur": {
                        value: numeros[17],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">baja california sur</span><br />Risk : " + numeros[31]}
                    },
                    "baja california": {
                        value: numeros[32],
                        href: "#",
                        tooltip: {content: "<span style=\"font-weight:bold;\">baja california</span><br />Risk : " + numeros[32]}
                    },
                }
            });
        });
}

function cargar_numeros(params) {
    let numero;
    for (let index = 0; index < 33; index++) {
        numero = round(random(0, 10));
        numeros.push(numero);
    }
    console.log(numeros)
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

function search() {
    var month_temp = month.value().split('-');
    console.log(month.value())
    if (year.value() != 0 || year.value() != '0') {
        if (month.value() != 0 || month.value() != '0') {

            if (warehouse.value() == 0 && risk_area.value() ==0 ) {
                var url = script_url + "?callback=ctrlq&" +
                // "area="+ risk_area.value() +
                // "warehouse="+ warehouse.value()+
                "&month="+ month_temp[1]+
                "&year="+ year.value() +
                "&action=buscarMesAnio";
        
                var request = jQuery.ajax({
                    crossDomain: true,
                    url: url,
                    method: "GET",
                    dataType: "jsonp",
                });
            }
    
            if (warehouse.value() == 0 && risk_area.value() !=0 ) {
                var url = script_url + "?callback=ctrlq&" +
                "&area="+ risk_area.value() +
                // "warehouse="+ warehouse.value()+
                "&month="+ month_temp[1]+
                "&year="+ year.value() +
                "&action=buscarMesAnioArea";
        
                var request = jQuery.ajax({
                    crossDomain: true,
                    url: url,
                    method: "GET",
                    dataType: "jsonp",
                });

                console.log(url)
            }

            if (warehouse.value() != 0 && risk_area.value() ==0 ) {
                var url = script_url + "?callback=ctrlq&" +
                //"area="+ risk_area.value() +
                "&ware="+ warehouse.value()+
                "&month="+ month_temp[1]+
                "&year="+ year.value() +
                "&action=buscarMesAnioWare";
        
                var request = jQuery.ajax({
                    crossDomain: true,
                    url: url,
                    method: "GET",
                    dataType: "jsonp",
                });
                console.log
            }

            if (warehouse.value() != 0 && risk_area.value() !=0 ) {
                var url = script_url + "?callback=ctrlq&" +
                "&area="+ risk_area.value() +
                "&warehouse="+ warehouse.value()+
                "&month="+ month_temp[1]+
                "&year="+ year.value() +
                "&action=buscarMesAnioWareArea";
        
                var request = jQuery.ajax({
                    crossDomain: true,
                    url: url,
                    method: "GET",
                    dataType: "jsonp",
                });
            }
            
            btn_buscar.attribute('disabled','');
        } else {
            
            swal('Error', 'Please select a month', 'error');
        }
        
    }
    else{
        swal('Error', 'Please select a year ', 'error');
    }
}


