"use client";

import { useState } from "react";
import {
  ArrowUpRight, Check, ChevronDown, CircleHelp, FileText, Image as ImageIcon,
  Link2, LockKeyhole, Menu, Search, ShieldCheck, Sparkles, UploadCloud,
  X, Zap
} from "lucide-react";

type InputMode = "texto" | "link";

export default function Home() {
  const [mode, setMode] = useState<InputMode>("texto");
  const [content, setContent] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim()) return;
    setShowDemo(true);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#" aria-label="VERIFICA início">
          <span className="brand-mark"><ShieldCheck size={23} strokeWidth={2.2} /></span>
          <span>VERIFICA<span className="brand-dot">.</span></span>
        </a>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#criterios" onClick={() => setMenuOpen(false)}>Nossos critérios</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre o projeto</a>
        </nav>

        <div className="header-right">
          <span className="status"><span className="status-dot" /> Projeto em desenvolvimento</span>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-line" /> INTELIGÊNCIA A FAVOR DA VERDADE</div>
        <h1>Antes de compartilhar,<br /><span>verifique.</span></h1>
        <p className="hero-copy">
          Informação merece cuidado. Investigue conteúdos, confronte evidências
          e consulte fontes antes de tirar conclusões.
        </p>

        <div className="checker-card">
          <div className="card-topline">
            <div>
              <div className="card-title"><Sparkles size={17} /> Análise de informação</div>
              <p>O que você deseja verificar hoje?</p>
            </div>
            <span className="secure-label"><LockKeyhole size={12} /> Ambiente de demonstração</span>
          </div>

          <div className="mode-switch" role="tablist" aria-label="Tipo de conteúdo">
            <button className={mode === "texto" ? "mode active" : "mode"} onClick={() => { setMode("texto"); setContent(""); setShowDemo(false); }}>
              <FileText size={16} /> Texto ou mensagem
            </button>
            <button className={mode === "link" ? "mode active" : "mode"} onClick={() => { setMode("link"); setContent(""); setShowDemo(false); }}>
              <Link2 size={16} /> Link de notícia
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="claim">{mode === "texto" ? "Texto para verificar" : "Link para verificar"}</label>
            <textarea
              id="claim"
              value={content}
              onChange={(e) => { setContent(e.target.value); setShowDemo(false); }}
              placeholder={mode === "texto"
                ? "Cole aqui a mensagem, afirmação ou notícia que você recebeu..."
                : "https://exemplo.com/noticia"}
              rows={5}
            />
            <div className="input-footer">
              <span>{content.length} caracteres</span>
              <span>{mode === "texto" ? "Não compartilhe dados pessoais." : "Use o endereço completo da publicação."}</span>
            </div>
            <button className="submit-button" type="submit" disabled={!content.trim()}>
              <Search size={18} /> Preparar verificação <ArrowUpRight size={17} />
            </button>
          </form>

          {showDemo && (
            <div className="demo-notice" role="status">
              <div className="demo-icon"><CircleHelp size={19} /></div>
              <div>
                <strong>Conteúdo recebido nesta demonstração.</strong>
                <p>A interface está pronta. A pesquisa de fontes e a análise automatizada serão conectadas na próxima etapa. Nenhum veredito foi emitido.</p>
              </div>
              <button onClick={() => setShowDemo(false)} aria-label="Fechar aviso"><X size={16} /></button>
            </div>
          )}

          <div className="card-footnote"><LockKeyhole size={13} /> Sua análise não será publicada ou compartilhada.</div>
        </div>

        <div className="trust-row">
          <div><Check size={15} /> Evidências, não opiniões</div>
          <div><Check size={15} /> Fontes identificadas</div>
          <div><Check size={15} /> Transparência na análise</div>
        </div>
      </section>

      <section className="how-section" id="como-funciona">
        <div className="section-heading">
          <span className="section-kicker">SIMPLES E TRANSPARENTE</span>
          <h2>Uma informação. <span>Várias verificações.</span></h2>
          <p>O VERIFICA será desenvolvido para mostrar como uma conclusão foi construída.</p>
        </div>
        <div className="steps-grid">
          <article className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon"><UploadCloud size={21} /></div>
            <h3>Envie o conteúdo</h3>
            <p>Insira uma afirmação, mensagem ou endereço de uma notícia que deseja investigar.</p>
          </article>
          <article className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon"><Search size={21} /></div>
            <h3>Pesquisamos evidências</h3>
            <p>O sistema buscará referências, datas, contexto e fontes independentes.</p>
          </article>
          <article className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon"><ShieldCheck size={21} /></div>
            <h3>Apresentamos a análise</h3>
            <p>Você verá a conclusão, os motivos, as limitações e os links consultados.</p>
          </article>
        </div>
      </section>

      <section className="criteria-section" id="criterios">
        <div className="criteria-copy">
          <span className="section-kicker">COMPROMISSO COM A CLAREZA</span>
          <h2>Nem tudo é simplesmente verdadeiro ou falso.</h2>
          <p>Uma checagem responsável considera contexto, evidências disponíveis e o que ainda não pode ser confirmado.</p>
        </div>
        <div className="verdict-list">
          <div><span className="verdict-dot green" /><strong>Verdadeiro</strong><small>As evidências sustentam a afirmação.</small></div>
          <div><span className="verdict-dot red" /><strong>Falso</strong><small>As evidências contradizem a afirmação.</small></div>
          <div><span className="verdict-dot yellow" /><strong>Enganoso</strong><small>Usa dados ou fatos de forma distorcida.</small></div>
          <div><span className="verdict-dot blue" /><strong>Fora de contexto</strong><small>O conteúdo omite informações importantes.</small></div>
          <div><span className="verdict-dot gray" /><strong>Inconclusivo</strong><small>Não há evidências suficientes para concluir.</small></div>
        </div>
      </section>

      <footer id="sobre">
        <a className="brand footer-brand" href="#"><span className="brand-mark"><ShieldCheck size={20} /></span><span>VERIFICA<span className="brand-dot">.</span></span></a>
        <p>Informação confiável começa com verificação.</p>
        <span className="footer-note">© 2026 VERIFICA · Projeto em desenvolvimento</span>
      </footer>
    </main>
  );
}
