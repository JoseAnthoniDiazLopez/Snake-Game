var lienzo=document.querySelector("canvas")
var ctx=lienzo.getContext("2d")
var spaceW=document.getElementById("contCanvas").offsetHeight
*0.9
var h2Puntos=document.querySelector("#contPoint>h2")
var btnPlay=document.getElementById('btnCent')
var nCuadros=20
var anchoElem=spaceW/nCuadros
var frame=0
var serpiente
var manzana
var bucle
var perdido=1
lienzo.width=spaceW
lienzo.height=spaceW

function drawRectan(cuadro) {
    ctx.beginPath()
    ctx.fillStyle=cuadro.color
    ctx.fillRect(cuadro.x*anchoElem,cuadro.y*anchoElem,anchoElem,anchoElem)
    ctx.fill()
}

function puntos() {
  h2Puntos.innerHTML="Puntos: "+serpiente.comidas
  serpiente.comidas++
}


function control(n) {
    let act=serpiente.direccionReal
    if (!(n-2==act||n+2==act)) {
        serpiente.direccion=n
    }
}
document.body.onkeydown=(e)=>{
    newDirecc=e.keyCode-36
  if (newDirecc>0&&newDirecc<5) {
    control(newDirecc)
  }
}


function random(min,max) {
  return Math.floor(min+(Math.random()*(max-min)))
}

function main(){
        ctx.clearRect(0,0,spaceW,spaceW)
        serpiente.correr()
        drawRectan(manzana)
        serpiente.draw()
    }

function perdiste() {
clearInterval(bucle)
alert('perdiste')
btnPlay.disabled=''
btnPlay.style.visibility='visible'

}


function play() {
  btnPlay.style.visibility='hidden'
  btnPlay.disabled='true'
 serpiente = {
  cabeza: {
    x: 0,
    y: 0,
    color: "black"
  },
ncolor:0,
  cuerpo: [],
  direccion: 3,
  direccionReal:3,
  comidas: 0,
  draw: function() {
    drawRectan(this.cabeza)
    this.cuerpo.forEach(cuadro => {drawRectan(cuadro)});
  },
  crece: function() {
    var cabezaA = Object.assign({}, this.cabeza)    
    cabezaA.color="white"
    this.cuerpo.unshift(cabezaA)
  },
  correr: function() {

    let newx = this.cabeza.x
    let newy = this.cabeza.y
    switch (this.direccion) {
      case 1:
        newx--
        break;
      case 3:
        newx++
        break;
      case 2:
        newy--
        break;
      case 4:
        newy++
        break;

    }
this.direccionReal=this.direccion
    if (!this.coliciones(newx, newy)) {
      let anteriorC = Object.assign({},this.cabeza)
      for (let i = 0; i < this.cuerpo.length; i++) {
        anteriorC.color=this.cuerpo[i].color
        siguienteC = Object.assign({}, {x:this.cuerpo[i].x,y:this.cuerpo[i].y})
        this.cuerpo[i] = anteriorC
        anteriorC = siguienteC
      }
      this.cabeza.x = newx
      this.cabeza.y = newy
    }else{
      perdiste()
    }

  },

  coliciones: function(newx, newy) {
    x = this.cabeza.x
    y = this.cabeza.y
    let value=0
    if (x == manzana.x && y == manzana.y) {
      this.crece()
      manzana.cambio()
    }
    if (
      newx >= nCuadros ||
      newy >= nCuadros ||
      newx < 0 ||
      newy < 0
    ) {
      value=1
    }
    this.cuerpo.forEach((cuadro)=>{
      if (
        newx==cuadro.x&&
        newy==cuadro.y
      ) {
        value=1
      } 
    })
    return value
  }
}
 manzana = {
  color: 'yellow',
  cambio: function() {
   let inbody
    do {
      inbody=0
      this.x = random(0, nCuadros)
      this.y = random(0, nCuadros)
      if (
        serpiente.cabeza.x==this.x&&
        serpiente.cabeza.y==this.y
      ) {
        inbody=1
      }
      serpiente.cuerpo.forEach(cuadro => {
        if (
        cuadro.x==this.x&&
        cuadro.y==this.y
      ) {
        inbody=1
      }});
    } while (inbody);
    puntos()
  }
}
manzana.cambio()
puntos()
clearInterval(bucle)
bucle=setInterval(main,200)
}