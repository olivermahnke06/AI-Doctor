# 🩺 AI Doctor

> Plataforma web experimental voltada para assistência e organização de informações relacionadas à saúde.

O **AI Doctor** é um projeto desenvolvido com o objetivo de criar uma experiência simples e moderna para auxiliar o usuário na busca por informações iniciais sobre sintomas e na localização de estabelecimentos de saúde próximos.

O projeto também foi desenvolvido como forma de praticar **HTML, CSS, JavaScript, consumo de APIs e desenvolvimento de interfaces web**.

---

## 🚀 Funcionalidades

### 🧠 Análise inicial de sintomas

O usuário pode informar os sintomas apresentados e receber uma orientação inicial baseada em regras definidas no JavaScript.

A funcionalidade possui alguns cenários pré-configurados, como:

- Dor de cabeça
- Febre
- Tosse
- Dor de garganta
- Sintomas digestivos
- Sintomas de pele
- Alguns sinais de alerta

> ⚠️ A análise não representa um diagnóstico médico.

---

### 📍 Busca de atendimento

O sistema permite pesquisar uma região e encontrar estabelecimentos de saúde próximos.

É possível procurar por:

- 🩺 Médicos e consultórios
- 🏥 Hospitais
- 🏪 Clínicas
- 💊 Farmácias

Também existe a opção de utilizar a localização atual do navegador.

---

### 🗺️ Localização no mapa

Os estabelecimentos encontrados podem ser abertos diretamente no Google Maps para facilitar a localização.

---

### 👤 Perfil do usuário

O usuário pode cadastrar algumas informações básicas:

- Nome
- Idade
- E-mail
- Cidade

Os dados são armazenados localmente utilizando `localStorage`.

---

### 📱 Interface responsiva

A interface foi desenvolvida para funcionar em:

- Computadores
- Notebooks
- Tablets
- Smartphones

---

# 🛠️ Tecnologias utilizadas

## Front-end

- HTML5
- CSS3
- JavaScript

## APIs e recursos

- Geolocation API
- OpenStreetMap
- Nominatim
- Overpass API
- Google Maps

## Armazenamento

- LocalStorage

---

# 🌐 APIs utilizadas

## OpenStreetMap

O projeto utiliza dados públicos do OpenStreetMap para auxiliar na localização de estabelecimentos.

## Nominatim

Utilizado para transformar uma busca como:
