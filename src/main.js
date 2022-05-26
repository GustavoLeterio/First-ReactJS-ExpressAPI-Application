import { createServer } from "http"; // Importo biblioteca http

import { readFile } from "fs"; // Importo biblioteca nativa Node para leitura de arquivos, nesta função leitura assíncrona.

import { resolve } from "path"; /* Biblioteca para solução de problemas de caminho, quando o passamos o caminho para 
readFile(path,(err,file)),o caminho não é referente a pasta definida como o arquivo main, nesse caso "./src", mas sim a pasta raiz 
do projeto, uma má prática, para corrigir usaremos o resolve() */

import { parse } from "querystring"; // Biblioteca para parseamento de querystring.

// Crio um servidor que ouve um pedido e responde algo.
const server = createServer((request, response) => {
  switch (
    request.url // o pedido deve ser requisitado para uma URL que responderá futuramente.
  ) {
    // Caso "url.com/status"
    case "/status": {
      response.writeHead(200, { "Content-Type": "application/json" }); // Crio uma resposta com o cabeçalho de status 200 (Representa Sucesso) e digo que a reposta terá um corpo JSON
      response.write(JSON.stringify({ status: "OK" })); // Corpo da resposta é o parse de um JSON {status:"OK"} para string
      response.end(); // Fecho o buffer de resposta
      break;
    }

    // Caso "url.com/home": leio os valores a fim de retornar um possível HTML
    case "/home": {
      const filePath = resolve(__dirname, "./pages/home.html"); // __dirname é relativo ao arquivo main (src) -> Ler import de "path"

      //Read File para ler a página ./pages/home.html, na função de leitura podemos ter um erro e se não ela devolvera um arquivo, usado em uma função anônima
      readFile(filePath, (err, file) => {
        //Se der erro na leitura
        if (err) {
          response.writeHead(500, "Can't process HTML file."); // Respondo o código 500 (erro interno da aplicação)
          response.end(); // Fecho o buffer de resposta
          return; // retorno o caso, para não rodar o resto
        }
        //se não...
        response.writeHead(200); // respondo o código 200 (Sucesso)
        response.write(file); // Renderizo a página lida na tela
        response.end(); // Fecho o buffer de resposta
      });
      break;
    }

    // Caso "url.com/sign-in": leio os valores a fim de retornar um possível HTML
    case "/sign-in": {
      const filePath = resolve(__dirname, "./pages/sign-in.html"); // __dirname é relativo ao arquivo main (src) -> Ler import de "path"

      //Read File para ler a página ./pages/home.html, na função de leitura podemos ter um erro e se não ela devolvera um arquivo, usado em uma função anônima
      readFile(filePath, (err, file) => {
        //Se der erro na leitura
        if (err) {
          response.writeHead(500, "Can't process HTML file."); // Respondo o código 500 (erro interno da aplicação)
          response.end(); // Fecho o buffer de resposta
          return; // retorno o caso, para não rodar o resto
        }
        //se não...
        response.writeHead(200); // respondo o código 200 (Sucesso)
        response.write(file); // Renderizo a página lida na tela
        response.end(); // Fecho o buffer de resposta
      });
      break;
    }

    // Caso "url.com/authenticate"
    case "/authenticate": {
      let data = "";

      /* Inicío de uma iteração para os dados que estarão encodados como querystring,
       digo que a cada chunk(pedaço,fragmento...) ele será concatenado à variável data. */
      request.on("data", (chunk) => {
        data += chunk; // concatenando em data.
      });
      //O resultado é uma grande string cheia de caracteres distintos misturado as requisições

      // Ao finalizar a iteração dos dados, executa a função anônima
      request.on("end", () => {
        const params = parse(data); // digo que params será a decodificação da querystring data.

        //Nesta região eu poderia validar os dados e permitir o redirecionamento para uma tela de logado, ou login errado.
        //Neste caso eu apenas redireciono sem validar.

        response.writeHead(301, { location: "/home" }); // Crio uma resposta com o cabeçalho de status 301 (Redirecionamento) que redireciona para "/home"
        response.end(); // Fecho o buffer de resposta
      });
      break;
    }
    // Caso não seja nenhuma das URLs previamente citadas, então executo o default
    default: {
      response.writeHead(404, "Service not found."); // Crio uma resposta com o cabeçalho de status 404 caso a url não exista
      response.end(); // Fecho o buffer de resposta
      break;
    }
  }
});

// procces é um grande objeto que refere a tudo do processo, env remete as variáveis globais, e PORT é a variável porta
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// procces é um grande objeto que refere a tudo do processo, env remete as variáveis globais, e HOSTNAME é a variável que fala o nome da rota
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1"; // O operador "||" (pipe pipe) nesse caso testa se o valor é false, 0, null, undefined ou "", caso seja ele pega o valor "127.0.0.1"

// Servidor ouve alguns argumentos, (Porta,HostName -> Passei um IP Local, função). Este listen define a URL em que a api vai rodar.
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}.`);
});
