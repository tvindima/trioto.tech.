# Projeto de Simulador de Trading Forex  
Este repositório contém um simulador de trading de Forex escrito em Python, uma API web construída com FastAPI e um esqueleto de aplicação móvel em React Native. O objectivo é fornecer um exemplo educativo de como poderá ser estruturado um robô de trading com gestão de risco e um interface de utilizador.  

## Estrutura  
- **api/forex_api.py** – Contém a classe `SimulatedForexAPI`, que permite abrir uma ordem, calcular o tamanho da posição com base no saldo e risco, definir take‑profit e stop‑loss e simular o fecho automático.  
- **api/app.py** – Implementa um servidor FastAPI. Expõe endpoints HTTP para abrir ordens e simular/fechar ordens.  
- **mobile_app/App.js** – Esqueleto de uma aplicação React Native que se liga à API; permite introduzir dados de uma ordem e enviar pedidos ao servidor.  

## Como executar a API  
1. Certifica‑te de que tens o Python 3 instalado. Cria um ambiente virtual (opcional).  
2. Instala as dependências necessárias:  
   - `pip install fastapi uvicorn pydantic`  
3. No directório do repositório, executa o servidor com:  
   - `uvicorn api.app:app --reload`  
4. O servidor estará acessível por defeito em `http://127.0.0.1:8000`. Utiliza uma ferramenta como `curl` ou `Postman` para enviar pedidos a `/open_order` e `/simulate` conforme definido em `api/app.py`.  

## Como preparar a aplicação móvel  
1. Certifica‑te de que tens Node.js e npm instalados. Recomendamos utilizar o Expo para facilitar os testes:  
   - `npm install -g expo-cli`  
2. Navega até à pasta `mobile_app` e instala as dependências:  
   - `npm install`  
3. Abre o ficheiro `mobile_app/App.js` e substitui `http://<your-server>:8000` pelo URL onde o servidor FastAPI está alojado (por exemplo, `http://127.0.0.1:8000` ou o IP público do teu servidor).  
4. Inicia a aplicação com o Expo:  
   - `expo start`  
5. Segue as instruções do Expo para instalar a app no teu dispositivo Android ou iOS. Poderás utilizar a câmara do telemóvel para digitalizar o QR code apresentado pelo Expo.  

## Avisos importantes  
- Este projecto é apenas um exemplo de demonstração. Não está ligado a brokers reais e não deve ser usado para operar em mercados financeiros com dinheiro real.  
- Se decidires evoluir para um sistema de trading real, terás de te ligar a uma corretora regulamentada, obter dados de mercado em tempo real e cumprir todas as normas legais.  
- O deploy da API e a construção/instalação da aplicação móvel exigem serviços e ferramentas que não podem ser executados neste ambiente, pelo que deverás realizar esses passos no teu próprio servidor e computador.
