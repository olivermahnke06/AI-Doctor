/*
    AI DOCTOR

    Projeto experimental.

    Funcionalidades:

    - análise inicial de sintomas
    - perfil do usuário
    - localStorage
    - busca de atendimento
    - localização do usuário
    - OpenStreetMap
    - Overpass API

    IMPORTANTE:

    A análise de sintomas NÃO é diagnóstico médico.
*/


// ============================================
// ANÁLISE DE SINTOMAS
// ============================================

function analisarSintomas() {

    const campo =
        document.getElementById("campoSintomas");

    const resultado =
        document.getElementById("resultadoSintomas");


    const sintomas =
        campo.value.toLowerCase().trim();


    const duracao =
        document.getElementById("duracao").value;


    const intensidade =
        document.getElementById("intensidade").value;


    if (sintomas === "") {

        mostrarResultado(
            "Digite seus sintomas",
            "Escreva o que você está sentindo para realizar a análise inicial."
        );

        return;
    }


    // Sinais de alerta

    if (
        sintomas.includes("dor no peito") ||
        sintomas.includes("falta de ar") ||
        sintomas.includes("desmaio") ||
        sintomas.includes("convulsão")
    ) {

        mostrarResultado(
            "⚠️ Procure atendimento",
            "Alguns sintomas descritos podem exigir avaliação médica rápida. Se forem intensos, súbitos ou estiverem piorando, procure um serviço de emergência."
        );

        return;
    }


    if (
        sintomas.includes("dor de cabeça") ||
        sintomas.includes("cefaleia")
    ) {

        mostrarResultado(
            "Dor de cabeça",
            "Pode ter várias causas, incluindo estresse, sono inadequado ou desidratação. Se for intensa, diferente do habitual ou persistente, procure avaliação profissional."
        );

        return;
    }


    if (
        sintomas.includes("febre") &&
        (
            sintomas.includes("tosse") ||
            sintomas.includes("garganta")
        )
    ) {

        mostrarResultado(
            "Sintomas respiratórios",
            "Febre associada a tosse ou dor de garganta pode ocorrer em diferentes infecções. Observe a evolução e procure atendimento se houver piora ou dificuldade para respirar."
        );

        return;
    }


    if (
        sintomas.includes("dor de garganta")
    ) {

        mostrarResultado(
            "Dor de garganta",
            "A dor de garganta possui diferentes causas. Procure avaliação profissional se houver dificuldade para respirar ou engolir, piora importante ou persistência."
        );

        return;
    }


    if (
        sintomas.includes("dor de barriga") ||
        sintomas.includes("dor abdominal") ||
        sintomas.includes("náusea") ||
        sintomas.includes("vomito") ||
        sintomas.includes("vômito")
    ) {

        mostrarResultado(
            "Sintomas digestivos",
            "Sintomas digestivos podem ter várias causas. Hidratação e observação da evolução podem ser importantes, mas uma avaliação profissional é necessária para determinar a causa."
        );

        return;
    }


    if (
        sintomas.includes("coceira") ||
        sintomas.includes("manchas") ||
        sintomas.includes("alergia")
    ) {

        mostrarResultado(
            "Sintomas de pele",
            "Alterações na pele podem ter diferentes causas. Procure avaliação profissional se houver piora, inchaço importante ou dificuldade para respirar."
        );

        return;
    }


    let complemento = "";


    if (duracao !== "") {

        complemento +=
            ` Duração informada: ${duracao}.`;

    }


    if (intensidade !== "") {

        complemento +=
            ` Intensidade informada: ${intensidade}.`;

    }


    mostrarResultado(
        "Análise inicial",
        "Não foi possível relacionar os sintomas a uma orientação específica através das regras deste protótipo." +
        complemento +
        " Para uma avaliação adequada, procure um profissional de saúde."
    );

}


// ============================================
// MOSTRAR RESULTADO
// ============================================

function mostrarResultado(titulo, mensagem) {

    const resultado =
        document.getElementById("resultadoSintomas");


    resultado.innerHTML = `

        <h3>
            ${titulo}
        </h3>

        <p>
            ${mensagem}
        </p>

    `;


    resultado.classList.remove("hidden");

    resultado.classList.add("fade-in");

}


// ============================================
// PERFIL
// ============================================

function salvarPerfil() {

    const nome =
        document.getElementById("nome").value.trim();


    const idade =
        document.getElementById("idade").value;


    const email =
        document.getElementById("email").value.trim();


    const cidade =
        document.getElementById("cidade").value.trim();


    if (
        !nome ||
        !idade ||
        !email ||
        !cidade
    ) {

        alert("Preencha todos os campos.");

        return;
    }


    const usuario = {

        nome: nome,

        idade: idade,

        email: email,

        cidade: cidade

    };


    localStorage.setItem(
        "aiDoctorUsuario",
        JSON.stringify(usuario)
    );


    mostrarPerfil();


    alert("Perfil salvo com sucesso!");

}


// ============================================
// MOSTRAR PERFIL
// ============================================

function mostrarPerfil() {

    const dados =
        localStorage.getItem("aiDoctorUsuario");


    const area =
        document.getElementById("dadosUsuario");


    if (!dados) {

        return;

    }


    const usuario =
        JSON.parse(dados);


    document.getElementById("nome").value =
        usuario.nome;


    document.getElementById("idade").value =
        usuario.idade;


    document.getElementById("email").value =
        usuario.email;


    document.getElementById("cidade").value =
        usuario.cidade;


    area.innerHTML = `

        <h3>
            Perfil salvo ✓
        </h3>

        <p>
            <strong>Nome:</strong>
            ${escaparHTML(usuario.nome)}
        </p>

        <p>
            <strong>Idade:</strong>
            ${escaparHTML(usuario.idade)}
        </p>

        <p>
            <strong>E-mail:</strong>
            ${escaparHTML(usuario.email)}
        </p>

        <p>
            <strong>Cidade:</strong>
            ${escaparHTML(usuario.cidade)}
        </p>

        <button
            class="secondary-btn"
            onclick="limparPerfil()"
        >
            Excluir dados salvos
        </button>

    `;


    area.classList.remove("hidden");

}


// ============================================
// APAGAR PERFIL
// ============================================

function limparPerfil() {

    localStorage.removeItem(
        "aiDoctorUsuario"
    );


    document.getElementById(
        "dadosUsuario"
    ).innerHTML = "";


    document.getElementById(
        "dadosUsuario"
    ).classList.add("hidden");


    document.getElementById("nome").value = "";

    document.getElementById("idade").value = "";

    document.getElementById("email").value = "";

    document.getElementById("cidade").value = "";

}


// ============================================
// GEOLOCALIZAÇÃO
// ============================================

function usarLocalizacao() {

    const resultado =
        document.getElementById(
            "resultadoAtendimento"
        );


    if (!navigator.geolocation) {

        mostrarErroBusca(
            "Seu navegador não oferece suporte à localização."
        );

        return;
    }


    resultado.innerHTML = `

        <div class="empty-state">

            <span>📍</span>

            <strong>
                Obtendo sua localização...
            </strong>

            <p>
                Permita o acesso à localização.
            </p>

        </div>

    `;


    navigator.geolocation.getCurrentPosition(

        function(posicao) {

            buscarPorCoordenadas(

                posicao.coords.latitude,

                posicao.coords.longitude

            );

        },


        function() {

            mostrarErroBusca(
                "Não foi possível acessar sua localização."
            );

        }

    );

}


// ============================================
// BUSCAR ATENDIMENTO
// ============================================

async function buscarAtendimento() {

    const regiao =
        document.getElementById(
            "regiao"
        ).value.trim();


    const resultado =
        document.getElementById(
            "resultadoAtendimento"
        );


    if (!regiao) {

        resultado.innerHTML = `

            <div class="empty-state">

                <span>📍</span>

                <strong>
                    Informe uma região
                </strong>

                <p>
                    Ex.: Blumenau, SC
                </p>

            </div>

        `;

        return;
    }


    resultado.innerHTML = `

        <div class="empty-state">

            <span>🔎</span>

            <strong>
                Procurando...
            </strong>

            <p>
                Consultando dados públicos.
            </p>

        </div>

    `;


    try {

        const url =
            "https://nominatim.openstreetmap.org/search" +
            "?q=" +
            encodeURIComponent(
                regiao + ", Brasil"
            ) +
            "&format=json" +
            "&limit=1";


        const resposta =
            await fetch(url);


        if (!resposta.ok) {

            throw new Error(
                "Falha ao localizar região."
            );

        }


        const cidades =
            await resposta.json();


        if (cidades.length === 0) {

            mostrarErroBusca(
                "Não encontrei essa região."
            );

            return;

        }


        await buscarPorCoordenadas(

            cidades[0].lat,

            cidades[0].lon

        );


    } catch (erro) {

        console.error(erro);


        mostrarErroBusca(
            "O serviço de localização não respondeu."
        );

    }

}


// ============================================
// BUSCAR POR COORDENADAS
// ============================================

async function buscarPorCoordenadas(
    latitude,
    longitude
) {

    const resultado =
        document.getElementById(
            "resultadoAtendimento"
        );


    const tipo =
        document.getElementById(
            "tipoAtendimento"
        ).value;


    const raio =
        document.getElementById(
            "raio"
        ).value;


    resultado.innerHTML = `

        <div class="empty-state">

            <span>🏥</span>

            <strong>
                Buscando locais próximos...
            </strong>

            <p>
                Isso pode levar alguns segundos.
            </p>

        </div>

    `;


    let consulta;


    if (tipo === "all") {

        consulta = `

            [out:json][timeout:25];

            (

                node["amenity"="doctors"]
                (around:${raio},${latitude},${longitude});

                node["amenity"="clinic"]
                (around:${raio},${latitude},${longitude});

                node["amenity"="hospital"]
                (around:${raio},${latitude},${longitude});

                node["amenity"="pharmacy"]
                (around:${raio},${latitude},${longitude});


                way["amenity"="doctors"]
                (around:${raio},${latitude},${longitude});

                way["amenity"="clinic"]
                (around:${raio},${latitude},${longitude});

                way["amenity"="hospital"]
                (around:${raio},${latitude},${longitude});

                way["amenity"="pharmacy"]
                (around:${raio},${latitude},${longitude});

            );

            out center;

        `;

    } else {

        consulta = `

            [out:json][timeout:25];

            (

                node["amenity"="${tipo}"]
                (around:${raio},${latitude},${longitude});

                way["amenity"="${tipo}"]
                (around:${raio},${latitude},${longitude});

            );

            out center;

        `;

    }


    const servidores = [

        "https://overpass-api.de/api/interpreter",

        "https://overpass.kumi.systems/api/interpreter"

    ];


    let dados = null;


    for (const servidor of servidores) {

        try {

            const resposta =
                await fetch(
                    servidor,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/x-www-form-urlencoded"

                        },

                        body:
                            "data=" +
                            encodeURIComponent(
                                consulta
                            )

                    }
                );


            if (resposta.ok) {

                dados =
                    await resposta.json();

                break;

            }

        } catch (erro) {

            console.log(
                "Servidor indisponível:",
                servidor
            );

        }

    }


    if (!dados) {

        mostrarErroBusca(
            "Os servidores estão temporariamente indisponíveis."
        );

        return;

    }


    mostrarLocais(
        dados.elements
    );

}


// ============================================
// MOSTRAR LOCAIS
// ============================================

function mostrarLocais(locais) {

    const resultado =
        document.getElementById(
            "resultadoAtendimento"
        );


    if (!locais.length) {

        resultado.innerHTML = `

            <div class="empty-state">

                <span>😕</span>

                <strong>
                    Nenhum local encontrado
                </strong>

                <p>
                    Tente aumentar o raio ou pesquisar
                    outra região.
                </p>

            </div>

        `;

        return;

    }


    resultado.innerHTML = "";


    locais
        .slice(0, 20)
        .forEach(function(local) {


            const nome =
                local.tags?.name ||
                "Estabelecimento sem nome";


            const tipo =
                traduzirTipo(
                    local.tags?.amenity
                );


            const rua =
                local.tags?.["addr:street"] ||
                "Endereço não informado";


            const numero =
                local.tags?.["addr:housenumber"] ||
                "";
            const telefone =
                local.tags?.phone ||
                local.tags?.["contact:phone"] ||
                "";

            const site =
                local.tags?.website ||
                local.tags?.["contact:website"] ||
                 "";    


            const latitude =
                local.lat ||
                local.center?.lat;


            const longitude =
                local.lon ||
                local.center?.lon;


            resultado.innerHTML += `

                <article class="place-card">

                    <div class="place-icon">

                        ${iconeTipo(
                            local.tags?.amenity
                        )}

                    </div>


                    <div>

                        <h3>
                            ${escaparHTML(nome)}
                        </h3>

                        <p>
                            ${tipo}
                        </p>

                        <p>
                            📍
                            ${escaparHTML(rua)}
                            ${escaparHTML(numero)}
                        </p>

                        ${
                          telefone
                          ? `<p>📞 ${escaparHTML(telefone)}</p>`
                          : ""
                        }

                        ${
                           site
                            ? `<p>
                           🌐
                         <a
                href="${escaparHTML(site)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Site oficial
            </a>
        </p>`
        : ""
}

                    </div>


                    <a
                        class="map-link"
                        href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver no mapa →
                    </a>

                </article>

            `;

        });

}


// ============================================
// TIPO
// ============================================

function traduzirTipo(tipo) {

    const tipos = {

        doctors:
            "Médico / consultório",

        clinic:
            "Clínica",

        hospital:
            "Hospital",

        pharmacy:
            "Farmácia"

    };


    return tipos[tipo] ||
        "Estabelecimento de saúde";

}


// ============================================
// ÍCONE
// ============================================

function iconeTipo(tipo) {

    const icones = {

        doctors: "🩺",

        clinic: "🏥",

        hospital: "🚑",

        pharmacy: "💊"

    };


    return icones[tipo] || "🏥";

}


// ============================================
// ERRO
// ============================================

function mostrarErroBusca(mensagem) {

    document.getElementById(
        "resultadoAtendimento"
    ).innerHTML = `

        <div class="empty-state">

            <span>⚠️</span>

            <strong>
                Não foi possível concluir a busca
            </strong>

            <p>
                ${escaparHTML(mensagem)}
            </p>

        </div>

    `;

}


// ============================================
// SEGURANÇA
// ============================================

function escaparHTML(texto) {

    return String(texto)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


// ============================================
// INICIALIZAÇÃO
// ============================================

mostrarPerfil();