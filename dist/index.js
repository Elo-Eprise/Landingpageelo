function Escrevendo() {
    const texto = document.getElementById("signi");
    const textopuro = texto.innerText;
    texto.textContent = '';
    let escrevendo = textopuro.split("");
    for (let i = 0; i < textopuro.length; i++) {
        setTimeout(() => {
            texto.textContent += textopuro[i];
            console.log(i);
        }, i * 80);
    }
    return (texto.textContent);
}
window.addEventListener("DOMContentLoaded", Escrevendo);

//# sourceMappingURL=index.js.map