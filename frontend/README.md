# Frontend - Tralala VrumVrumVrum

Este diretório contém a interface web do projeto Tralala VrumVrumVrum, responsável por permitir o controle do carrinho via gestos das mãos e volume da voz.

## Estrutura dos Arquivos

- `index.html`: Página inicial do frontend.
- `nginx.conf`: Configuração do Nginx para servir os arquivos estáticos.
- `assets/`: Recursos estáticos (ícones e scripts JavaScript).
  - `icon.png`: Ícone do projeto.
  - `js/`: Scripts JavaScript principais:
    - `fingerpose.js`: Biblioteca para reconhecimento de gestos com as mãos.
    - `gesture-recognition.js`: Lógica de detecção de gestos.
    - `gestures.js`: Definições dos gestos reconhecidos.
    - `mic.js`: Captura e análise do microfone para medir o volume.
    - `randomizer.js`: Randomização dos gestos para aumentar o desafio.
    - `request.js`: Comunicação com a API backend.
- `control/index.html`: Interface principal de controle do carrinho.

## Tecnologias Utilizadas

- **TensorFlow.js** e **MediaPipe Hands**: Reconhecimento de gestos das mãos via webcam.
- **Web Audio API**: Captura e análise do microfone para medir o volume da voz.
- **Tailwind CSS**: Estilização moderna e responsiva da interface.
- **Fetch API**: Comunicação HTTP com o backend Flask.

## Funcionalidades

### Controle por Gestos

A interface utiliza a webcam para detectar gestos das mãos, que são mapeados para comandos de direção do carrinho. Os gestos reconhecidos incluem:

- 👍🏻 Joinha
- 👎🏻 Dislike
- ✌️ Dois dedos (V)
- 🖕🏻 Dedo do meio
- 🖐️ Mão aberta
- 👆🏻 Para cima (L)
- 🔫 Arminha

A cada recarregamento da página, o mapeamento dos gestos pode ser randomizado para tornar o controle mais divertido.

### Controle por Volume da Voz

O microfone do usuário é utilizado para medir o volume do ambiente. Após uma calibração inicial (definição do "nível de ruído"), quanto mais alto o usuário gritar, maior será a velocidade enviada ao carrinho (de 0 a 255).

- O volume é exibido em tempo real em um medidor visual.
- O valor de velocidade é atualizado conforme o volume captado.
- O sistema realiza uma calibração automática ao iniciar para ajustar ao ambiente.

### Interface do Usuário

- Visual moderno, colorido e responsivo.
- Medidor de volume e velocímetro.
- Feedback visual e textual sobre o status do controle.
- Botão de parada de emergência.
- Tutorial interativo na parte inferior da tela.

## Integração com o Backend

A interface envia comandos para o backend Flask via requisições HTTP:

- **Direção**: Envia o gesto reconhecido para a API.
- **Velocidade**: Envia o valor de volume (0-255) para a API.

## Como Utilizar

1. Acesse a interface web (por exemplo, http://localhost/control/).
2. Permita o acesso à câmera e ao microfone.
3. Aguarde a calibração automática do microfone.
4. Use gestos e grite para controlar o carrinho!

## Requisitos do Navegador

- Navegador moderno com suporte a WebRTC (câmera) e Web Audio API (microfone).
- Permissões de câmera e microfone liberadas.
- Em conexões HTTP, pode ser necessário ativar a flag:
  `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
  e adicionar o endereço do Raspberry Pi como origem confiável.

## Dicas

- Mantenha as mãos visíveis e centralizadas na câmera.
- Fale ou grite próximo ao microfone para melhor resposta de velocidade.
- Se algo não funcionar, recarregue a página e permita novamente as permissões.
