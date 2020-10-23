var grafica_casos_valores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var grafica_meses_labels = ["JANUARY-1", "FEBRUARY-2", "MARCH-3", "APRIL-4", "MAY-5", "JUNE-6", "JULY-7", "AUGUST-8", "SEPTEMBER-9", "OCTOBER-10", "NOVEMBER-11", "DECEMBER-12"];
var meses_valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var grafica_meses_valores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var grafica_datos_risk = [5,6,7,8,1,2,3];
var grafica_labels_risk = ['Operational Audits Results',	'Inventory Count Results', 'Receivables', 'Margin',	'Collection',	'Crimes', 	'Auto theft']
var grafica_colores_risk = ['rgb(85, 211, 38)', 'rgb(34, 51, 145)', 'rgb(223, 91, 248)', 'rgb(163, 188, 245)', 'rgb(239, 220, 131)', 'rgb(5, 152, 223)', 'rgb(162, 10, 2)']
var grafica_meses_valores_risk = [2,2,2, 3, 1, 5, 6, 2, 6, 1, 4, 7];

var c1 = 'rgba(237,139,0,0.5)';
var c2 = 'rgb(0,60,113)';
var c3 = 'rgba(237,139,0,1)';
var c4 = 'rgb(0,60,113,1)';
var c5 = 'rgb(237,139,0,)';

var tres_colores = [c2, 'rgb(237,139,0)' , 'rgba(255,0,0,1)']
var numeros = [];

function setup(){
    cargarMapa();
    var arreglo_colores = [];
    for (let index = 0; index < 8; index++) {
        let num = random(1, 10);
        numeros.push(num)
    }
    console.log(numeros);
    grafica_datos_risk = numeros;
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
    console.log(arreglo_colores)

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
                    legend: {
                        labels: {
                            fontSize: 12,
                        },
                    },
                },
            });
    
}
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

function cargarMapa() {
    console.log('funciona')
    $(function() {
        $(".mapcontainer").mapael({
            map: {
                // Set the name of the map to display
                name: "guatemala",
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
                "GTM1942":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1943":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1944":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1945":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1946":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1947":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1948":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1949":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1950":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1951":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1952":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1953":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1954":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1955":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1956":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1957":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1959":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1960":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1961":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1962":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM1963":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
                "GTM3467":{
                    value: numeros[3],
                    href:"#",
                    tooltip: {content: "<span style=\"font-wight:bold;\">GUATEMALA</span><br/>Risk : " + 0}
                },
            }
        });
    });
}