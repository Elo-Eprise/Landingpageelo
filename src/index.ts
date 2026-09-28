// function Escrevendo() {
//   const texto = document.getElementById("signi") as HTMLElement;
//   const textopuro = texto.innerText;

//   texto.textContent = "";
//   let escrevendo = textopuro.split("");

//   for (let i = 0; i < textopuro.length; i++) {
//     setTimeout(() => {
//       texto.textContent += textopuro[i];
//       console.log(i);
//     }, i * 80);
//   }

//   return texto.textContent;
// }

// window.addEventListener("DOMContentLoaded", Escrevendo);

interface Bolinha {
    x: number
    y: number
    xOriginal: number
    yOriginal: number
    raio: number
}

function Bolas() {
    const bolas = document.getElementById("bolas") as HTMLCanvasElement
    const pincel = bolas.getContext("2d")
    if (!pincel) {
        return
    }
    const secao = bolas.parentElement
    if (!secao) {
        return
    }

    bolas.width = secao.offsetWidth
    bolas.height = secao.offsetHeight

    const espacamento = 40
    const alcance = 120
    const alcance2 = alcance * alcance
    const intensidade = 6
    const retorno = 0.08
    const cor = "rgba(244, 246, 251, 0.6)"

    const lista: Bolinha[] = []
    for (let x = 0; x < bolas.width; x += espacamento) {
        for (let y = 0; y < bolas.height; y += espacamento) {
            lista.push({ x, y, xOriginal: x, yOriginal: y, raio: 2 })
        }
    }

    const mouse = { x: -9999, y: -9999 }
    let rodando = false

    const animar = () => {
        let movendo = false

        pincel.clearRect(0, 0, bolas.width, bolas.height)
        pincel.fillStyle = cor
        pincel.beginPath()

        for (const b of lista) {
            const dx = b.x - mouse.x
            const dy = b.y - mouse.y
            const d2 = dx * dx + dy * dy

            if (d2 < alcance2 && d2 > 0) {
                const distancia = Math.sqrt(d2)
                const forca = (alcance - distancia) / alcance
                b.x += (dx / distancia) * forca * intensidade
                b.y += (dy / distancia) * forca * intensidade
            }

            b.x += (b.xOriginal - b.x) * retorno
            b.y += (b.yOriginal - b.y) * retorno

            if (Math.abs(b.xOriginal - b.x) > 0.1 || Math.abs(b.yOriginal - b.y) > 0.1) {
                movendo = true
            }

            pincel.moveTo(b.x + b.raio, b.y)
            pincel.arc(b.x, b.y, b.raio, 0, Math.PI * 2)
        }

        pincel.fill()

        if (movendo) {
            requestAnimationFrame(animar)
        } else {
            rodando = false
        }
    }

    const iniciar = () => {
        if (rodando) {
            return
        }
        rodando = true
        requestAnimationFrame(animar)
    }

    secao.addEventListener("mousemove", (e) => {
        const area = bolas.getBoundingClientRect()
        mouse.x = e.clientX - area.left
        mouse.y = e.clientY - area.top
        iniciar()
    })

    secao.addEventListener("mouseleave", () => {
        mouse.x = -9999
        mouse.y = -9999
        iniciar()
    })

    iniciar()
}

window.addEventListener("DOMContentLoaded", Bolas)
