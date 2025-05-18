# Tralala VrumVrumVrum
[![Arduino][arduino-badge]][arduino-url]
[![Flask][flask-badge]][flask-url]
[![TensorFlow][tf-badge]][tf-url]

Este projeto integra um sistema de controle de motores via Arduino, uma API em Flask e uma interface web para interação com gestos e voz.

## Componentes Principais
- **Arduino**: Responsável pelo controle dos motores.
- **Flask**: Disponibiliza rotas para receber instruções de movimentação.
- **Frontend**: Usa TensorFlow e Fingerpose para reconhecer gestos e envia comandos via requisições HTTP. Também há um medidor de decibéis que controla a velocidade.

## Estrutura de Pastas
- `arduino/`: Contém o código para o microcontrolador.
- `flask/`: Contém a aplicação Flask.
- `public/`: Arquivos estáticos (HTML, CSS, JavaScript) para interação do usuário.

## Uso
1. Suba a aplicação Flask (app.py) para receber e responder às requisições.  
2. Sirva os arquivos HTML da pasta `public/` (por exemplo, pelo Nginx via docker-compose).  
3. Conecte seu Arduino ao computador e suba o sketch para controlar os motores.  
4. Acesse a interface web e teste a calibração do microfone e dos gestos.

## Requisitos
- Arduino com biblioteca AFMotor instalada.
- Python 3 e Flask instalados para a API.
- TensorFlow e Fingerpose (incluso via CDN no HTML).

## Licença
O projeto é distribuído sob a [GNU General Public License v3.0](./LICENSE).

[arduino-badge]: https://img.shields.io/badge/Arduino-00979C?style=for-the-badge&logo=Arduino&logoColor=white
[arduino-url]: https://www.arduino.cc/
[flask-badge]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[flask-url]: https://flask.palletsprojects.com/
[tf-badge]: https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white
[tf-url]: https://www.tensorflow.org/
