class Puerta {
  constructor(imagen, estado, resultado, idImg, idPrr, idBtn) {
    this.imagen = imagen;
    this.estado = estado;
    this.resultado = resultado;
    this.idImg = idImg;
    this.idPrr = idPrr;
    this.idBtn = idBtn;
  }
  set setEstado(es) {
    this.estado = es;
  }

  set setResultado(res) {
    this.resultado = res;
  }

  set setImagen(img){
    this.imagen = img;
  }
}

const imagenes = [
  "../assets/imagenes/puerta2.png",
  "../assets/imagenes/puerta-cabra.png",
  "../assets/imagenes/puerta-carro.png",
];

function presentarIntentos(obj, id = "") {
  alert(
    "Los intentos van " +
      obj.nroIntentos +
      ", la puerta uno es " +
      obj.PuertaUno.imagen
  );
  obj.nroIntentos++;
}

function cambiarImagen(id = "", imagen = "") {
  document.getElementById(id).setAttribute("src", imagen);
}

function cambiarEstado(id = "", estado = "") {
  document.getElementById(id).innerHTML = estado;
}

function cambiarEstadoBoton(id = "", modo = "", valor = "") {
  let estado = "#6c757d";
  // event = "none";
  if (modo == "activar" || modo == "") {
    estado = "#0d6efd";
    // event = "all";
  }
  document.getElementById(id).style.backgroundColor = estado;
  if (valor != "") {
    document.getElementById(id).innerHTML = valor;
  }
  // document.getElementById(id).style.pointerEvents = event;
}

function puertasEscojidas(obj) {
  let cont = 0;
  const Puertas = [obj.PuertaUno, obj.PuertaDos, obj.PuertaTres];
  Puertas.forEach((p) => {
    if (p.resultado == "seleccionado") {
      cont++;
    }
  });
  return cont;
}

function termino(obj) {
  let cont = 0;
  const Puertas = [obj.PuertaUno, obj.PuertaDos, obj.PuertaTres];
  Puertas.forEach((p) => {
    if (p.imagen != imagenes[0]) {
      cont++;
    }
  });
  return cont == 3;
}

function actualizarComentario(comentario = "") {
  document.getElementById("coment").innerHTML = comentario;
}

function dondeEstaLaCabra(p1, p2) {
  if (p1.estado == "Cabra") {
    cambiarImagen(p1.idImg, imagenes[1]);
    cambiarEstado(p1.idPrr, p1.estado);
    p1.resultado = "seleccionado";
    p1.setImagen = imagenes[1];
    cambiarEstadoBoton(p1.idBtn, "desactivo", "Puerta Abierta");
  } else {
    cambiarImagen(p2.idImg, imagenes[1]);
    cambiarEstado(p2.idPrr, p2.estado);
    p2.resultado = "seleccionado";
    p2.setImagen = imagenes[1];
    cambiarEstadoBoton(p2.idBtn, "desactivo", "Puerta Abierta");
  }
}

function mostrarCabra(btn, obj) {
  if (btn == "btn1") {
    dondeEstaLaCabra(obj.PuertaDos, obj.PuertaTres);
  } else if (btn == "btn2") {
    dondeEstaLaCabra(obj.PuertaUno, obj.PuertaTres);
  } else if (btn == "btn3") {
    dondeEstaLaCabra(obj.PuertaUno, obj.PuertaDos);
  }
}

function mostrarCarro(obj,btn) {
  let puertas = [obj.PuertaUno, obj.PuertaDos, obj.PuertaTres];
  puertas.forEach((p) => {
    if (p.estado == "Cabra") {
      cambiarImagen(p.idImg, imagenes[1]);
      p.setImagen = imagenes[1];
    } else {
      cambiarImagen(p.idImg, imagenes[2]);
      p.setImagen = imagenes[2];
      if (btn == p.idBtn) {
        actualizarComentario("Felicidades, Acabas de ganar un auto 0km :D");
        obj.ganados+=1;
        tipoAlert(1);
        // alert('Ganaste');
      }else{
        actualizarComentario(":( Perdiste, pero, si quieres te puedes llevar la cabra");
        obj.perdidos+=1;
        tipoAlert(2);
        // alert('Perdiste');
      }
      obj.nroIntentos = obj.ganados+obj.perdidos;
      obj.probabilidad = ((obj.ganados/obj.nroIntentos)*100).toFixed(2) +"%";
    }
    
    cambiarEstado(p.idPrr, p.estado);
    cambiarEstadoBoton(p.idBtn, "desactivo", "Puerta Abierta");
    actualizarDatos(obj);
  });
}

function tipoAlert(t=0){
  let tipo = "alert alert-primary";
  if (t==0) {
    document.getElementById("alert").className = tipo;
  }else{
    
  if (t==1) {
    tipo = ' alert-success';
  } else if(t==2){
    tipo = ' alert-danger';
  }

  document.getElementById("alert").className =
  document.getElementById("alert").className
    .replace(new RegExp('(?:^|\\s)'+ 'alert-primary' + '(?:\\s|$)'), tipo);
  }
}

function actualizarDatos(obj) {
  document.getElementById('nroI').innerHTML = obj.nroIntentos;
  document.getElementById('nroG').innerHTML = obj.ganados;
  document.getElementById('nroP').innerHTML = obj.perdidos;
  document.getElementById('proba').innerHTML = obj.probabilidad;
}

function presentarEstados(obj) {
  console.log(obj.PuertaUno.estado);
  console.log(obj.PuertaDos.estado);
  console.log(obj.PuertaTres.estado);
}

function jugar(obj, img, prr, btn) {
  if (btn == "btn1") {
    obj.PuertaUno.setResultado = "seleccionado";
  } else if (btn == "btn2") {
    obj.PuertaDos.resultado = "seleccionado";
  } else if (btn == "btn3") {
    obj.PuertaTres.resultado = "seleccionado";
  }
  let nroSeleccionados = puertasEscojidas(obj);
  presentarEstados(obj);
  // alert("Puertas Escojidas " + nroSeleccionados);
  if (termino(obj)) {
    resetearJuego(obj);
  } else {
    if (nroSeleccionados == 1) {
      cambiarEstado(prr, "Escogiste Esta ^");
      mostrarCabra(btn, obj);
      actualizarComentario(
        "Te quedas con la puerta que elejiste? o decides cambiarla?"
      );
    } else if (
      nroSeleccionados >= 2 &&
      document.getElementById(prr).value != "Escogiste Esta ^"
    ) {
      mostrarCarro(obj,btn);
    }
  }
}

function asignarCarro(obj) {
  const car = Math.floor(Math.random() * (4 - 1)) + 1;
  //   alert("numero aleatorio "+car);
  switch (car) {
    case 1:
      obj.PuertaUno.setEstado = "Carro";
      break;
    case 2:
      obj.PuertaDos.setEstado = "Carro";
      break;
    case 3:
      obj.PuertaTres.setEstado = "Carro";
      break;

    default:
      console.log(
        "El número aleatorio está fuera del rango [1-3] en asignarCarro()"
      );
      break;
  }
}

function resetearJuego(obj) {
  // alert("se reseteo");
  obj.comentario = "Escoje Una Puerta!!!";
  obj.termino = false;
  actualizarComentario(obj.comentario);
  cambiarImagen("img1", imagenes[0]);
  cambiarImagen("img2", imagenes[0]);
  cambiarImagen("img3", imagenes[0]);
  cambiarEstado("prr1", "Puerta Cerrada");
  cambiarEstado("prr2", "Puerta Cerrada");
  cambiarEstado("prr3", "Puerta Cerrada");
  cambiarEstadoBoton("btn1", "activar");
  cambiarEstadoBoton("btn2", "activar");
  cambiarEstadoBoton("btn3", "activar");
  obj.PuertaUno = new Puerta(
    imagenes[0],
    "Cabra",
    "excluido",
    "img1",
    "prr1",
    "btn1"
  );
  obj.PuertaDos = new Puerta(
    imagenes[0],
    "Cabra",
    "excluido",
    "img2",
    "prr2",
    "btn2"
  );
  obj.PuertaTres = new Puerta(
    imagenes[0],
    "Cabra",
    "excluido",
    "img3",
    "prr3",
    "btn3"
  );
  asignarCarro(obj);
  actualizarDatos(obj);
  tipoAlert(0);
}

function iniciarJuego() {
  let juego = {
    nroIntentos: 0,
    ganados: 0,
    perdidos: 0,
    comentario: "",
    termino: false,
    probabilidad: "0%",
    PuertaUno: new Puerta(
      imagenes[0],
      "Cabra",
      "excluido",
      "img1",
      "prr1",
      "btn1"
    ),
    PuertaDos: new Puerta(
      imagenes[0],
      "Cabra",
      "excluido",
      "img2",
      "prr2",
      "btn2"
    ),
    PuertaTres: new Puerta(
      imagenes[0],
      "Cabra",
      "excluido",
      "img3",
      "prr3",
      "btn3"
    ),
  };
  resetearJuego(juego);
  return juego;
}
