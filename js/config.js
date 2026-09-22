/**
 * CONFIGURACIÓN DE LA GALAXIA DE FLORES AMARILLAS 🌻✨
 * Puedes modificar los textos, nombres y cartas aquí o a través del botón de personalizar en la web.
 */
const DEFAULT_CONFIG = {
    // Nombre de tu novia (aparecerá en el corazón y cartas)
    recipientName: "Andrea",
    senderName: "Con todo mi amor",
    title: "Galaxia de Flores Amarillas para ti Andrea",
    subtitle: "21 de Septiembre • Porque mereces todas las flores del universo",

    // Frase del corazón central
    heartText: "Te amo Andrea 💛🌻",

    // Carta Principal (se abre al hacer clic en el corazón central)
    centralHeartLetter: {
        id: "heart",
        tag: "El Núcleo de Mi Universo 💛",
        title: "Para el amor de mi vida",
        icon: "💛",
        content: `Sé que técnicamente ya pasó el día de las flores amarillas, pero recién ahora podemos esstar juntos :D creo que igual vale, porque contigo no me importa tanto el día, sino el detalle y el poder compartirlo contigo.

Quería darte este detalle por este dia que capaz algunos lo consideren algo tonto porque a mi tambien alguito pero es bonito poder darte un detalle y q no simplemente veas y sientas q no te de nada, que no me importas o algo asi, al contrario. 

Y bueno, recién estamos empezando esta historia juntos, pero me hace mucha ilusión todo lo que todavía nos queda por vivir. Espero que este pequeño detalle te guste.
Te amo muchísimo, y aunque llegué un poquito tarde al día de las flores amarillas, llegué con las mismas ganas de hacerte feliz. 💛`
    },

    // Lista de Ramos flotantes en la Galaxia 3D
    flowers: [
        {
            id: 1,
            title: "Eres mi Sol",
            tag: "Eres mi sol 🌻",
            image: "assets/flowers/1.png",
            position: { radius: 15, angle: 0.15, height: 1.5 },
            scale: 7.2,
            letter: {
                title: "Ramo de Girasoles: Eres mi Sol 🌻",
                date: "21 de Septiembre",
                content: `Así como los girasoles siempre buscan la luz del sol para florecer, mis ojos y mi corazón siempre te buscan a ti. 

Desde que llegaste a mi vida, iluminaste cada rincón con tu risa, tu bondad y esa manera tan única que tienes de hacer que todo sea mejor. Eres la luz más cálida y hermosa de mis días.`
            }
        },
        {
            id: 2,
            title: "Mi Amor Eterno",
            tag: "Mi Amor 💛",
            image: "assets/flowers/2.png",
            position: { radius: 19, angle: 1.25, height: 4.5 },
            scale: 7.0,
            letter: {
                title: "Rosas Amarillas: Mi Amor Eterno 💛",
                date: "21 de Septiembre",
                content: `Las rosas amarillas representan la calidez, la alegría pura y la promesa de permanecer unidos. 

Cada segundo a tu lado me confirma que elegí el lugar correcto: a tu lado. Me fascina tu forma de ser, tu voz y la ternura con la que me miras. Te amo más de lo que las palabras pueden explicar.`
            }
        },
        {
            id: 3,
            title: "Siempre Juntos",
            tag: "Siempre juntos 💛",
            image: "assets/flowers/3.png",
            position: { radius: 17, angle: 2.3, height: -3 },
            scale: 6.8,
            letter: {
                title: "Tulipanes Soleados: Siempre Juntos 🌷",
                date: "21 de Septiembre",
                content: `Los tulipanes amarillos simbolizan los pensamientos alegres y el brillo de la felicidad.

Contigo he aprendido lo que significa caminar de la mano con complicidad, soñar en grande y reírnos de cualquier tontería. No imagino un futuro donde no estés tú completando cada historia.`
            }
        },
        {
            id: 4,
            title: "Me Encantas",
            tag: "Me encantas ✨",
            image: "assets/flowers/4.png",
            position: { radius: 21, angle: 3.4, height: 3.5 },
            scale: 6.8,
            letter: {
                title: "Flores Silvestres: Me Encantas ✨",
                date: "21 de Septiembre",
                content: `Me encanta tu autenticidad, tu risa espontánea, tus ojos cuando te emocionas y hasta tus pequeños enojos. 

Las flores silvestres nacen libres y llenan de color los campos más inesperados, y eso hiciste tú conmigo: llenaste mi mundo de magia sin siquiera intentarlo.`
            }
        },
        {
            id: 5,
            title: "Eres Mi Todo",
            tag: "Eres mi todo 🌻",
            image: "assets/flowers/5.png",
            position: { radius: 16, angle: 4.4, height: -2.5 },
            scale: 7.4,
            letter: {
                title: "Girasol Radiante: Eres Mi Todo 🌻",
                date: "21 de Septiembre",
                content: `Si tuviera que elegir un solo deseo en este mundo, sería verte feliz cada día de tu vida. 

Eres mi apoyo incondicional, mi confidente y el pensamiento más dulce antes de irme a dormir. Gracias por existir y por permitirme ser quien tome tu mano.`
            }
        },
        {
            id: 6,
            title: "Eres Preciosa",
            tag: "Eres preciosa 🌻",
            image: "assets/flowers/6.png",
            position: { radius: 22, angle: 5.4, height: 4.2 },
            scale: 7.2,
            letter: {
                title: "Ramo Imperial: Eres Preciosa 👑",
                date: "21 de Septiembre",
                content: `No existe ramo de flores en la tierra que pueda igualar la belleza que hay en ti, tanto por fuera como en tu gran corazón.

Este 21 de septiembre quiero recordarte lo increíble, valiente y especial que eres. Nunca olvides que para mí eres la persona más maravillosa del mundo entero.`
            }
        },
        {
            id: 7,
            title: "Mi Felicidad",
            tag: "Amor de mi vida 💛",
            image: "assets/flowers/1.png",
            position: { radius: 25, angle: 0.75, height: -4.5 },
            scale: 6.6,
            letter: {
                title: "Girasoles del Corazón: Amor de mi vida 💛",
                date: "21 de Septiembre",
                content: `A veces me detengo a pensar en la inmensidad del universo y en lo afortunado que soy de coincidir en el mismo tiempo, en el mismo lugar y con la persona correcta: tú. 

Eres el regalo más bonito que la vida me ha dado.`
            }
        },
        {
            id: 8,
            title: "Por Siempre",
            tag: "Para siempre ✨",
            image: "assets/flowers/2.png",
            position: { radius: 26, angle: 2.9, height: 2 },
            scale: 6.6,
            letter: {
                title: "Rosas de Oro: Para Siempre ✨",
                date: "21 de Septiembre",
                content: `Hoy no solo te entrego flores amarillas digitales; te entrego mi promesa de cuidarte, respetarte, apoyarte en cada uno de tus sueños y recordarte todos los días cuánto te amo.

Que este 21 de septiembre quede grabado en nuestro recuerdo como una prueba más de que lo nuestro es único.`
            }
        }
    ]
};

// Cargar configuración guardada si existe en localStorage
function loadAppConfig() {
    const config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    try {
        const saved = localStorage.getItem('yellow_flowers_galaxy_config');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.recipientName) config.recipientName = parsed.recipientName;
            if (parsed.heartText) config.heartText = parsed.heartText;
            if (parsed.senderName) config.senderName = parsed.senderName;
        }
    } catch (e) {
        console.warn("No se pudo cargar la configuración de localStorage", e);
    }
    return config;
}

function saveAppConfig(config) {
    try {
        const toSave = {
            recipientName: config.recipientName,
            heartText: config.heartText,
            senderName: config.senderName
        };
        localStorage.setItem('yellow_flowers_galaxy_config', JSON.stringify(toSave));
    } catch (e) {
        console.error("Error guardando configuración", e);
    }
}

window.appConfig = loadAppConfig();
