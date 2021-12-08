const posibilidades = ["cerrado","cabra","carro"];

const imagenes = ["../assets/imagenes/puerta2.png","../assets/imagenes/puerta-cabra.png","../assets/imagenes/puerta-cabra.png"];

function presentarIntentos(obj,id="") {
    alert('Los intentos van '+obj.nroIntentos+", la puerta uno es "+obj.PuertaUno.imagen);
    obj.nroIntentos++;
}

class Puerta {
    constructor(imagen,estado,resultado){
        this.imagen=imagen;
        this.estado=estado;
        this.resultado=resultado;
    }
}