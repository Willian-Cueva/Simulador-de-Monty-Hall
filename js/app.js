class Puerta {
  constructor(imagen, estado, resultado, idImg, idPrr, idBtn) {
    this.imagen = imagen;
    this.estado = estado;
    this.resultado = resultado;
    this.idImg = idImg;
    this.idPrr = idPrr;
    this.idBtn = idBtn;
  }
  set setResultado(res) {
    this.resultado = res;
  }
}
const posibilidades = ["cerrado", "cabra", "carro"];

const imagenes = [
  "../assets/imagenes/puerta2.png",
  "../assets/imagenes/puerta-cabra.png",
  "../assets/imagenes/puerta-carro.png",
];
const PuertaUno = new Puerta(
  imagenes[0],
  "Cabra",
  "excluido",
  "img1",
  "prr1",
  "btn1"
);
const PuertaDos = new Puerta(
  imagenes[0],
  "Cabra",
  "excluido",
  "img2",
  "prr2",
  "btn2"
);
const PuertaTres = new Puerta(
  imagenes[0],
  "Cabra",
  "excluido",
  "img3",
  "prr3",
  "btn3"
);

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

function cambiarEstadoBoton(id = "", modo = "") {
  let estado = "#6c757d";
  // event = "none";
  if (modo == "activar" || modo == "") {
    estado = "#0d6efd";
    // event = "all";
  }
  document.getElementById(id).style.backgroundColor = estado;
  // document.getElementById(id).style.pointerEvents = event;
}

function puertasEscojidas() {
  let cont = 0;
  const Puertas = [PuertaUno, PuertaDos, PuertaTres];
  Puertas.forEach((p) => {
    if (p.resultado == "seleccionado") {
      cont++;
    }
  });
  return cont;
}

function dondeEstaLaCabra(p1, p2, id1, id2) {
  if (p1.estado == "Cabra") {
  } else {
  }
}

function mostrarCabra(btn) {
  if (btn == "btn1") {
    dondeEstaLaCabra(PuertaDos, PuertaTres, "btn2", "btn3");
  } else if (btn == "btn2") {
    dondeEstaLaCabra(PuertaUno, PuertaTres, "btn1", "btn3");
  } else if (btn == "btn3") {
    dondeEstaLaCabra(PuertaUno, PuertaDos, "btn1", "btn2");
  }
}

function jugar(img, prr, btn) {
  if (btn == "btn1") {
    PuertaUno.setResultado = "seleccionado";
  } else if (btn == "btn2") {
    PuertaDos.resultado = "seleccionado";
  } else if (btn == "btn3") {
    PuertaTres.resultado = "seleccionado";
  }
  let nroSeleccionados = puertasEscojidas();
  alert("Puertas Escojidas " + nroSeleccionados);
  console.log(btn);
  console.log(PuertaUno.resultado);
  console.log(PuertaDos.resultado);
  console.log(PuertaTres.resultado);
  switch (nroSeleccionados) {
    case 1:
      cambiarEstado(prr, "Escogiste Esta");
      cambiarEstadoBoton(btn, "desactivo");
      mostrarCabra(btn);
      break;

    default:
      break;
  }
}

function asignarCarro() {
  const car = Math.floor(Math.random() * (4 - 1)) + 1;
  //   alert("numero aleatorio "+car);
  switch (car) {
    case 1:
      PuertaUno.estado = "Carro";
      break;
    case 2:
      PuertaDos.estado = "Carro";
      break;
    case 3:
      PuertaTres.estado = "Carro";
      break;

    default:
      console.log(
        "El número aleatorio está fuera del rango [1-3] en asignarCarro()"
      );
      break;
  }
}

function resetearJuego() {
  cambiarImagen("img1", imagenes[0]);
  cambiarImagen("img2", imagenes[0]);
  cambiarImagen("img3", imagenes[0]);
  cambiarEstado("prr1", "Puesta Cerrada");
  cambiarEstado("prr2", "Puesta Cerrada");
  cambiarEstado("prr3", "Puesta Cerrada");
  cambiarEstadoBoton("btn1", "activar");
  cambiarEstadoBoton("btn2", "activar");
  cambiarEstadoBoton("btn3", "activar");
  asignarCarro();
  PuertaUno = new Puerta(
    imagenes[0],
    "Cabra",
    "excluido",
    "img1",
    "prr1",
    "btn1"
  );
  PuertaDos = new Puerta(
    imagenes[0],
    "Cabra",
    "excluido",
    "img2",
    "prr2",
    "btn2"
  );
  PuertaTres = new Puerta(
    imagenes[0],
    "Cabra",
    "excluido",
    "img3",
    "prr3",
    "btn3"
  );
}

function iniciarJuego() {
  resetearJuego();
  return {
    nroIntentos: 0,
    ganados: 0,
    perdidos: 0,
    probabilidad: "0%",
    PuertaUno,
    PuertaDos,
    PuertaTres,
  };
}
