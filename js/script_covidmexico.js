function preload() {
    
}

function setup() {
    consulta();

}

function consulta() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&facet=fecha_actualizacion&facet=sexo&facet=entidad_nac&facet=entidad_res&facet=fecha_ingreso&facet=fecha_def&facet=edad&facet=nacionalidad&facet=rango_edad&facet=positivo&refine.entidad_um=SAN+LUIS+POTOS%C3%8D", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}