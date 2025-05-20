# Especificação da API - Tralala VrumVrumVrum

Este documento apresenta exemplos práticos de requisições para a API backend responsável por controlar o robô via comandos HTTP e comunicação serial com o Arduino.

## Endpoints

### 1. Enviar Comando de Direção

- **Endpoint:** `/instructions`
- **Método:** POST
- **Descrição:** Envia um comando de direção para o robô (left, right, forward, stop).

#### Exemplo cURL
```sh
curl -X POST http://localhost:5000/instructions \
  -H "Content-Type: application/json" \
  -d '{"command": "left"}'
```

#### Resposta de Sucesso
```json
{
  "message": "Instruction sent",
  "command": "left"
}
```

#### Resposta de Erro
```json
{
  "error": "Invalid command"
}
```

### 2. Enviar Velocidade

- **Endpoint:** `/speed`
- **Método:** POST
- **Descrição:** Envia o valor de velocidade (0 a 255) para o robô.

#### Exemplo cURL
```sh
curl -X POST http://localhost:5000/speed \
  -H "Content-Type: application/json" \
  -d '{"speed": 200}'
```

#### Resposta de Sucesso
```json
{
  "message": "Speed sent",
  "speed": 200
}
```

#### Resposta de Erro
```json
{
  "error": "Speed must be an integer between 0 and 255"
}
```

---

## Especificação OpenAPI (Swagger)

```yaml
openapi: 3.0.0
info:
  title: Tralala VrumVrumVrum API
  version: 1.0.0
paths:
  /instructions:
    post:
      summary: Envia comando de direção
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                command:
                  type: string
                  enum: [left, right, forward, stop]
      responses:
        '200':
          description: Comando enviado com sucesso
        '400':
          description: Comando inválido
  /speed:
    post:
      summary: Envia valor de velocidade
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                speed:
                  type: integer
                  minimum: 0
                  maximum: 255
      responses:
        '200':
          description: Velocidade enviada com sucesso
        '400':
          description: Valor de velocidade inválido
```

---

Esses exemplos e especificação facilitam a integração de outros sistemas ou testes automatizados com a API do robô.
