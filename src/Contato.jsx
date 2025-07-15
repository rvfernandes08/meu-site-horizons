import { useState } from "react";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarWhatsApp = (e) => {
    e.preventDefault();

    const texto = `Olá, meu nome é ${nome}. Assunto: ${assunto}. Mensagem: ${mensagem}`;
    const url = `https://wa.me/5511986609516?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  };

  return (
    <form
      onSubmit={enviarWhatsApp}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-xl space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">Fale comigo pelo WhatsApp</h2>

      <input
        type="text"
        placeholder="Seu nome"
        className="w-full p-2 border rounded"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Assunto"
        className="w-full p-2 border rounded"
        value={assunto}
        onChange={(e) => setAssunto(e.target.value)}
        required
      />

      <textarea
        placeholder="Digite sua mensagem"
        className="w-full p-2 border rounded"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Enviar pelo WhatsApp
      </button>
    </form>
  );
}

