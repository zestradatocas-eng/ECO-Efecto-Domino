
const especies = {
    tiburones: {
        nombre: "Tiburones",
        titulo: "¿Qué ocurre si desaparecen los tiburones?",
        efectos: [
            "Algunas poblaciones de sus presas podrían aumentar.",
            "Ese aumento podría modificar la cantidad de organismos de niveles inferiores.",
            "Los cambios podrían alterar el equilibrio de ciertas redes alimentarias."
        ],
        nota: "El efecto depende de la especie de tiburón, sus presas y el ecosistema. No todos los tiburones cumplen la misma función."
    },
    rayas: {
        nombre: "Rayas",
        titulo: "¿Qué ocurre si desaparecen las rayas?",
        efectos: [
            "Algunas de sus presas, como ciertos moluscos o crustáceos, podrían cambiar en abundancia.",
            "Otros depredadores podrían verse afectados al perder una fuente de alimento.",
            "Las relaciones entre especies podrían reorganizarse."
        ],
        nota: "Las rayas tienen dietas y funciones distintas; estos efectos son posibilidades, no resultados garantizados."
    },
    moluscos: {
        nombre: "Moluscos",
        titulo: "¿Qué ocurre si desaparecen algunos moluscos?",
        efectos: [
            "Los animales que se alimentan de esos moluscos podrían tener menos alimento.",
            "Algunos organismos de los que se alimentaban los moluscos podrían aumentar.",
            "El cambio podría propagarse por la red alimentaria."
        ],
        nota: "Los moluscos son un grupo muy diverso. El resultado dependerá de cuáles desaparezcan y del lugar."
    },
    pastos: {
        nombre: "Pastos marinos",
        titulo: "¿Qué ocurre si desaparecen los pastos marinos?",
        efectos: [
            "Los animales que los consumen podrían perder una fuente de alimento.",
            "Se perdería parte del hábitat y refugio de muchos organismos pequeños.",
            "El ecosistema podría almacenar menos carbono y perder parte de su protección del fondo marino."
        ],
        nota: "Los efectos varían según la extensión de los pastos marinos y las especies que dependen de ellos."
    }
};

let especieSeleccionada = null;

const botonesEspecies = document.querySelectorAll(".especie");
const botonSimular = document.getElementById("simular");
const tituloResultado = document.getElementById("titulo-resultado");
const textoResultado = document.getElementById("texto-resultado");
const resultado = document.getElementById("resultado");

botonesEspecies.forEach((boton) => {
    boton.addEventListener("click", () => {
        especieSeleccionada = boton.dataset.especie;

        botonesEspecies.forEach((otroBoton) => {
            otroBoton.classList.remove("seleccionada");
        });

        boton.classList.add("seleccionada");

        tituloResultado.textContent =
            `Has seleccionado: ${especies[especieSeleccionada].nombre}`;

        textoResultado.textContent =
            "Ahora puedes simular qué cambios podrían ocurrir en el ecosistema.";

        resultado.innerHTML = "";
    });
});

botonSimular.addEventListener("click", () => {
    if (!especieSeleccionada) {
        tituloResultado.textContent = "¡Primero elige una especie!";
        textoResultado.textContent =
            "Selecciona uno de los organismos para comenzar la simulación.";
        return;
    }

    const especie = especies[especieSeleccionada];

    tituloResultado.textContent = especie.titulo;
    textoResultado.textContent =
        "Explora algunas consecuencias posibles de su desaparición.";

    resultado.innerHTML = `
        <article class="tarjeta-resultado">
            <h3>El efecto dominó</h3>
            <p>Si desaparecen los ${especie.nombre.toLowerCase()}, podrían ocurrir cambios como estos:</p>
            <ul>
                ${especie.efectos.map(efecto => `<li>${efecto}</li>`).join("")}
            </ul>
            <p><strong>Importante:</strong> ${especie.nota}</p>
            <p>Esta es una simulación educativa simplificada, no una predicción exacta.</p>
        </article>
    `;

    resultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Base de respuestas para las preguntas frecuentes.
const respuestas = [
    {
        palabras: ["red alimentaria", "red trófica", "red alimenticia"],
        respuesta: "Una red alimentaria conecta varias cadenas alimentarias. Muestra cómo diferentes organismos pueden alimentarse de más de una especie y cómo la energía pasa por el ecosistema."
    },
    {
        palabras: ["cadena alimentaria", "cadena trófica"],
        respuesta: "Una cadena alimentaria representa una ruta de transferencia de energía: por ejemplo, una planta puede ser comida por un herbívoro y este por un depredador."
    },
    {
        palabras: ["especie clave"],
        respuesta: "Una especie clave tiene un efecto importante en la estructura de su ecosistema en relación con su abundancia. Si desaparece, puede provocar cambios amplios, aunque el efecto depende del lugar."
    },
    {
        palabras: ["depredador", "depredadores", "malos"],
        respuesta: "No. Los depredadores cumplen funciones ecológicas, como influir en las poblaciones de sus presas. Son parte de las relaciones naturales del ecosistema."
    },
    {
        palabras: ["efecto dominó", "desaparece", "extinción"],
        respuesta: "Cuando desaparece una especie, otras pueden perder alimento, aumentar en número o cambiar su comportamiento. Estos efectos indirectos se conocen como cascadas tróficas en ciertos contextos."
    },
    {
        palabras: ["productor", "productores"],
        respuesta: "Los productores, como las plantas y las algas, elaboran materia orgánica usando energía de la luz o de reacciones químicas. Son la base de muchas redes alimentarias."
    },
    {
        palabras: ["consumidor", "consumidores"],
        respuesta: "Los consumidores obtienen energía al alimentarse de otros organismos. Pueden ser herbívoros, carnívoros u omnívoros."
    },
    {
        palabras: ["ecosistema"],
        respuesta: "Un ecosistema incluye a los seres vivos de un lugar, el ambiente físico y las interacciones entre todos ellos."
    }
];

const formularioPregunta = document.getElementById("form-pregunta");
const campoPregunta = document.getElementById("pregunta");
const respuesta = document.getElementById("respuesta");
const botonesPregunta = document.querySelectorAll(".pregunta-sugerida");

function responderPregunta(texto) {
    const preguntaNormalizada = texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const coincidencia = respuestas.find((elemento) =>
        elemento.palabras.some((palabra) =>
            preguntaNormalizada.includes(
                palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
        )
    );

    const mensaje = coincidencia
        ? coincidencia.respuesta
        : "Todavía no tengo una respuesta preparada para esa pregunta. Prueba con: red alimentaria, cadena alimentaria, especie clave, depredadores o ecosistema.";

    respuesta.innerHTML = `
        <article class="tarjeta-resultado">
            <h3>Tu respuesta</h3>
            <p>${mensaje}</p>
            <small>Respuesta educativa predefinida; no es una IA.</small>
        </article>
    `;
}

formularioPregunta.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = campoPregunta.value.trim();

    if (texto) {
        responderPregunta(texto);
    }
});

botonesPregunta.forEach((boton) => {
    boton.addEventListener("click", () => {
        const texto = boton.textContent.trim();
        campoPregunta.value = texto;
        responderPregunta(texto);
    });
});
