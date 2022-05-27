import React, { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    /* O código é uma promisse que pede para enviar na URL o uma requisição, em método POST, com o cabeçalho informando que será uma
     application/json e no corpo um JSON com os estados email e senha,então pegaremos a resposta e então avisaremos o sucesso */
    fetch("http://127.0.0.1:8000/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => {
      console.log(response.status);
    });
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="email">E-mail</label>
          <input
            onChange={handleEmailChange}
            value={email}
            id="email"
            type="email"
            inputMode="email"
            autoComplete="username"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Senha</label>
          <input
            onChange={handlePasswordChange}
            value={password}
            id="password"
            type="password"
            autoComplete="current-password"
          />
        </fieldset>
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
