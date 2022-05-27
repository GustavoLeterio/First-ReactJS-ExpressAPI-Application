import express from "express";
import cors from "cors"; //Solução de problemas cors

/*
Para corrigir problemas com CORS, podemos fazer isso:

server.use(cors());

Porém desta forma cors é liberado globalmente para todas as urls, 
isso pode dar problema de segurança, por isso solucionamos de url para url
*/

// enable cors = aceite que minha url faça requisições aqui
const enableCors = cors({ origin: "http://localhost:3000" });

const server = express(); //Instâncio o servidor express

/*Digo que toda vez que mandarem uma requisição GET na URL /status, ela responderá de acordo 
com a função anônima,que recebe (_,response)... o Underline(_) é para ignorar o request*/
server.get("/status", (_, response) => {
  //Mande a reposta {status:OK} no corpo
  response.send({
    status: "OK",
  });
});

//Sempre que requisitarem POST na URL, ela vai responder conforme a função anônima
//Para o browser aceiter CORS, colocaremos options(url,aceiteCors). E támbem colocaremos post.
server
  .options("/authenticate", enableCors)
  .post("/authenticate", enableCors, express.json(), (request, response) => {
    console.log("Email", request.body, "Senha", request.body.password);
    response.send();
  });

// procces é um grande objeto que refere a tudo do processo, env remete as variáveis globais, e PORT é a variável porta
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// procces é um grande objeto que refere a tudo do processo, env remete as variáveis globais, e HOSTNAME é a variável que fala o nome da rota
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1"; // O operador "||" (pipe pipe) nesse caso testa se o valor é false, 0, null, undefined ou "", caso seja ele pega o valor "127.0.0.1"

// Servidor ouve alguns argumentos, (Porta,HostName -> Passei um IP Local, função). Este listen define a URL em que a api vai rodar.
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}.`);
});
