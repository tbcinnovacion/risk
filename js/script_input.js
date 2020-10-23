var script_url = "https://script.google.com/macros/s/AKfycbx2VS8MfXPu2pKEtF7JiABFC3MyQp7JRIgIRGostzfZdzt4ZmYl/exec"
var btn_actualizar;
function setup() {
    btn_actualizar = select('#btnBuscar');
    btn_actualizar.mouseClicked(actualizar)

}

function actualizar() {
    btn_actualizar.attribute('disabled','')
    var url = script_url + "?callback=ctrlq&" +
            "&action=update";

    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp",
    });
}

function ctrlq(e) {
    
    if (e.r_metodo == "update") {
        btn_actualizar.removeAttribute('disabled');
        if (e.result == 'error') {
            swal('ERROR', 'You have already updated the table this month', 'error')
        }else{
            swal('SUCCESS', 'Successfully update', 'success')
        }
    }
}