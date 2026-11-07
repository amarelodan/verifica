"use client";

import { useState } from "react";
import { ArrowUpRight, Check, CircleHelp, ExternalLink, FileText, Link2, LoaderCircle, LockKeyhole, Menu, Search, ShieldCheck, Sparkles, X } from "lucide-react";

type Mode = "texto" | "link";
type Source = { title: string; url: string };
type Result = { analysis: string; sources: Source[]; model: string };

export default function Home() {
  const [mode, setMode] = useState<Mode>("texto");
  const [content, setContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim() || loading) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), mode })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível realizar a checagem.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally { setLoading(false); }
  }

  function changeMode(next: Mode) { setMode(next); setContent(""); setResult(null); setError(""); }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark"><ShieldCheck size={23} /></span><span>VERIFICA<span className="brand-dot">.</span></span></a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#criterios" onClick={() => setMenuOpen(false)}>Nossos critérios</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre o projeto</a>
        </nav>
        <div className="header-right">
          <span className="status"><span className="status-dot" /> Pesquisa online habilitada</span>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-line" /> INTELIGÊNCIA A FAVOR DA VERDADE</div>
        <h1>Antes de compartilhar,<br/><span>verifique.</span></h1>
        <p className="hero-copy">Investigue conteúdos, confronte evidências e consulte fontes antes de tirar conclusões.</p>

        <div className="checker-card">
          <div className="card-topline">
            <div><div className="card-title"><Sparkles size={17}/> Análise de informação</div><p>O que você deseja verificar hoje?</p></div>
            <span className="secure-label"><LockKeyhole size={12}/> Análise privada</span>
          </div>
          <div className="mode-switch" role="tablist" aria-label="Tipo de conteúdo">
            <button type="button" className={mode === "texto" ? "mode active" : "mode"} onClick={() => changeMode("texto")}><FileText size={16}/> Texto ou mensagem</button>
            <button type="button" className={mode === "link" ? "mode active" : "mode"} onClick={() => changeMode("link")}><Link2 size={16}/> Link de notícia</button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="claim">Conteúdo para verificar</label>
            <textarea id="claim" value={content} onChange={e => {setContent(e.target.value);setResult(null);setError("");}} placeholder={mode === "texto" ? "Cole aqui a mensagem, afirmação ou notícia que você recebeu..." : "https://exemplo.com/noticia"} rows={5} maxLength={5000} disabled={loading}/>
            <div className="input-footer"><span>{content.length}/5000 caracteres</span><span>Não compartilhe dados pessoais.</span></div>
            <button className="submit-button" type="submit" disabled={!content.trim() || loading}>
              {loading ? <><LoaderCircle className="spin" size={18}/> Investigando fontes...</> : <><Search size={18}/> Verificar informação <ArrowUpRight size={17}/></>}
            </button>
          </form>

          {loading && <div className="progress-notice" role="status"><LoaderCircle className="spin" size={18}/><div><strong>Investigação em andamento</strong><p>Estamos pesquisando fontes e comparando evidências. Isso pode levar alguns instantes.</p></div></div>}
          {error && <div className="error-notice" role="alert"><CircleHelp size={19}/><div><strong>Não foi possível concluir a checagem.</strong><p>{error}</p></div></div>}

          {result && <section className="result-panel" aria-live="polite">
            <div className="result-heading"><ShieldCheck size={20}/><div><strong>Resultado da investigação</strong><span>Resposta gerada com pesquisa na internet</span></div></div>
            <div className="result-text">{result.analysis}</div>
            {result.sources.length > 0 && <div className="sources-block"><h3>Fontes encontradas</h3>{result.sources.map(source => <a className="source-link" href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>{source.title}</span><ExternalLink size={14}/></a>)}</div>}
            <p className="result-disclaimer">Análise assistida por IA com base nas fontes encontradas. Confira as referências e considere o contexto antes de compartilhar.</p>
            <button className="new-check-button" type="button" onClick={() => {setResult(null);setContent("");}}>Fazer outra verificação</button>
          </section>}
          <div className="card-footnote"><LockKeyhole size={13}/> Sua chave de API permanece protegida no servidor.</div>
        </div>

        <div className="trust-row"><div><Check size={15}/> Evidências, não opiniões</div><div><Check size={15}/> Fontes identificadas</div><div><Check size={15}/> Transparência na análise</div></div>
      </section>

      <section className="how-section" id="como-funciona">
        <div className="section-heading"><span className="section-kicker">SIMPLES E TRANSPARENTE</span><h2>Uma informação. <span>Várias verificações.</span></h2><p>O VERIFICA mostra como uma conclusão foi construída.</p></div>
        <div className="steps-grid">
          <article className="step-card"><div className="step-number">01</div><div className="step-icon"><FileText size={21}/></div><h3>Envie o conteúdo</h3><p>Insira uma afirmação, mensagem ou endereço de uma notícia que deseja investigar.</p></article>
          <article className="step-card"><div className="step-number">02</div><div className="step-icon"><Search size={21}/></div><h3>Pesquisamos evidências</h3><p>O sistema busca referências, datas, contexto e fontes independentes.</p></article>
          <article className="step-card"><div className="step-number">03</div><div className="step-icon"><ShieldCheck size={21}/></div><h3>Apresentamos a análise</h3><p>Você vê a conclusão, os motivos, as limitações e os links consultados.</p></article>
        </div>
      </section>

      <section className="criteria-section" id="criterios">
        <div className="criteria-copy"><span className="section-kicker">COMPROMISSO COM A CLAREZA</span><h2>Nem tudo é simplesmente verdadeiro ou falso.</h2><p>Uma checagem responsável considera contexto, evidências disponíveis e o que ainda não pode ser confirmado.</p></div>
        <div className="verdict-list">
          <div><span className="verdict-dot green"/><strong>Verdadeiro</strong><small>As evidências sustentam a afirmação.</small></div>
          <div><span className="verdict-dot red"/><strong>Falso</strong><small>As evidências contradizem a afirmação.</small></div>
          <div><span className="verdict-dot yellow"/><strong>Enganoso</strong><small>Usa dados ou fatos de forma distorcida.</small></div>
          <div><span className="verdict-dot blue"/><strong>Fora de contexto</strong><small>O conteúdo omite informações importantes.</small></div>
          <div><span className="verdict-dot gray"/><strong>Inconclusivo</strong><small>Não há evidências suficientes para concluir.</small></div>
        </div>
      </section>
      <footer id="sobre"><a className="brand footer-brand" href="#"><span className="brand-mark"><ShieldCheck size={20}/></span><span>VERIFICA<span className="brand-dot">.</span></span></a><p>Informação confiável começa com verificação.</p><span className="footer-note">© 2026 VERIFICA · Projeto em desenvolvimento</span></footer>
    </main>
  );
}
