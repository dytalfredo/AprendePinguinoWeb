const input = document.getElementById("input");
const boton = document.getElementById("cambiarTexto");

boton.addEventListener("click", () => {
    input.value += "Nuevo texto";
});