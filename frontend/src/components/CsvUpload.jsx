import { useState } from "react";

const CsvUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus("loading");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const resp = await fetch("http://localhost:5000/api/upload_csv", {
        method: "POST",
        body: formData,
      });
      if (!resp.ok) throw new Error("Erro ao enviar arquivo");
      await resp.json();
      setStatus("success");
      setFile(null);
      if (onUpload) onUpload();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-md p-4 flex items-center space-x-4"
    >
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="flex-1 text-sm"
      />
      <button
        type="submit"
        disabled={!file || status === "loading"}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Enviar"}
      </button>
      {status === "success" && (
        <span className="text-green-600 text-sm">Upload realizado</span>
      )}
      {status === "error" && (
        <span className="text-red-600 text-sm">Falha no upload</span>
      )}
    </form>
  );
};

export default CsvUpload;
