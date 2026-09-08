// Gera o curso v2 (landing + 2 trilhas + 7 módulos) em ../ (raiz) e ../curso/trilhaN/
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TRACKS, COURSE_TITLE, COURSE_SUB, LOGO, manifest, head, nav, footer, scripts, svg, modulePage, trackIndex, SOURCE_OFFICIAL, SOURCE_INDEX, SOURCE_DUMP, SOURCE_PRODUCT } from './lib.mjs';
import { T1 } from './content-t1.mjs';
import { T2 } from './content-t2.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, '..');
const out = (p) => join(ROOT, p);

const tracks = [T1, T2].map((tc, i) => ({ ...TRACKS[i], modules: tc.modules }));
const manifestJson = manifest(tracks);

// assets
mkdirSync(out('assets'), { recursive: true });
const SK = process.env.HOME + '/.claude/skills/formato-curso-v2/assets';
copyFileSync(join(SK, 'learn.css'), out('assets/learn.css'));
copyFileSync(join(SK, 'learn.js'), out('assets/learn.js'));

// ---- módulos + índices de trilha ----
const heroFor = (t) => {
  const total = t.modules.reduce((a, m) => a + m.topics.length, 0);
  return svg.fanout(t, { label: `Diagrama dos ${t.modules.length} módulos da trilha ${t.n}: ${t.title}`, center: `Trilha ${t.n}|${t.short}|${total} tópicos`, groups: t.modules.map(m => ({ n: m.topics.length, title: `${m.id.replace('-', '.')} ${m.title}`, sub: m.punch })) });
};

for (const t of tracks) {
  if (!t.modules.length) continue;
  const dir = out(`curso/${t.slug}`);
  mkdirSync(dir, { recursive: true });
  t.modules.forEach((m, i) => {
    const html = modulePage({ t, m, prev: t.modules[i - 1], next: t.modules[i + 1], manifestJson });
    writeFileSync(join(dir, `modulo-${m.id}.html`), html);
  });
  writeFileSync(join(dir, 'index.html'), trackIndex({ t, manifestJson, heroSvg: heroFor(t) }));
}

// ---- landing ----
const totalModules = tracks.reduce((a, t) => a + t.modules.length, 0);
const totalTopics = tracks.reduce((a, t) => a + t.modules.reduce((b, m) => b + m.topics.length, 0), 0);
const totalMin = tracks.reduce((a, t) => a + t.modules.reduce((b, m) => b + m.minutes, 0), 0);
const hours = Math.round(totalMin / 60 * 10) / 10;
const t1 = tracks[0];

const heroSvg = svg.fanout(t1, { label: 'O GPT-6 Astra alcança quatro superfícies de trabalho: app do ChatGPT, app do Codex, Codex CLI e os seus próprios agentes locais', center: 'GPT-6 Astra|delegar · verificar|iterar · escalar', groups: [
  { n: 1, title: 'ChatGPT (área de trabalho)', sub: 'computer use via extensão' },
  { n: 1, title: 'App do Codex', sub: 'projetos, sessões, fork' },
  { n: 1, title: 'Codex CLI', sub: 'config.toml, exec, MCP' },
  { n: 1, title: 'Seus agentes locais', sub: 'provedor Codex, sem chave de API' },
] });

const trackCard = (t) => {
  const topics = t.modules.reduce((a, m) => a + m.topics.length, 0);
  const min = t.modules.reduce((a, m) => a + m.minutes, 0);
  return `
      <a href="curso/${t.slug}/index.html" class="group block bg-dark-800 rounded-2xl border border-dark-600 hover:border-${t.color}-500/30 transition-all overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-${t.color}-900/30 to-dark-800 p-8">
          <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span class="inline-block px-3 py-1 bg-${t.color}-500/20 text-${t.color}-400 text-xs font-semibold rounded-full">TRILHA ${t.n}${t.n === 1 ? ' · COMECE AQUI' : ''}</span>
            <span class="text-sm text-neutral-500">${t.modules.length} módulos · ${topics} tópicos · ~${Math.round(min / 60 * 10) / 10}h</span>
          </div>
          <h3 class="text-2xl font-bold mb-3 group-hover:text-${t.color}-400 transition-colors">${t.emoji} ${t.title}</h3>
          <p class="text-neutral-400 mb-6 max-w-3xl">${t.desc}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${t.modules.map(m => `<span class="text-xs px-2.5 py-1 rounded-md bg-dark-900/60 border border-dark-600 text-neutral-300">${m.id.replace('-', '.')} ${m.title}</span>`).join('')}
          </div>
          <div data-inema-meter="trilha:${t.n}" class="inema-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso da trilha ${t.n}">
            <div class="flex justify-between text-xs text-neutral-500 mb-1"><span data-inema-meter-frac>0 de ${topics}</span><span data-inema-meter-pct>0%</span></div>
            <div class="inema-bar h-1.5 bg-dark-700 rounded-full overflow-hidden"><div class="inema-bar__fill h-full bg-${t.color}-500 rounded-full transition-all" data-inema-meter-fill style="width:0%"></div></div>
          </div>
          <span class="inline-flex items-center gap-1 text-${t.color}-400 font-semibold mt-5 group-hover:gap-2 transition-all">Entrar na trilha &#8594;</span>
        </div>
      </a>`;
};

const landing = head({ rel: '.', title: 'Início', desc: `${COURSE_TITLE}: ${COURSE_SUB}. Curso técnico em 2 trilhas e ${totalModules} módulos, com contratos de tarefa, comandos do Codex CLI, skills, MCP e orquestração — cada módulo com prompt copiável e como verificar.`, manifestJson }) + nav({ rel: '.', active: 0 }) + `
  <!-- HERO -->
  <header class="relative overflow-hidden bg-gradient-to-br from-emerald-900/30 via-dark-800 to-dark-800 border-b border-dark-600">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full mb-6 tracking-wider">CURSO PRÁTICO · ACESSO LIVRE · ~${hours}h</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">${LOGO} ${COURSE_TITLE}</h1>
        <p class="text-2xl text-emerald-400 font-semibold mb-4">${COURSE_SUB}</p>
        <p class="text-lg text-neutral-300 max-w-xl mb-8 leading-relaxed">
          Um modelo que resolve a tarefa inteira muda o que vale a pena delegar. O trabalho deixa de ser escrever passos e passa a ser <strong class="text-neutral-100">escrever contratos verificáveis</strong>: resultado, onde, prova. Este curso é a versão direta, com comando e prompt em cada módulo.
        </p>
        <p class="text-lg text-neutral-300 max-w-xl mb-8 leading-relaxed">
          Duas trilhas: <strong class="text-emerald-400">setup e operação</strong> (superfícies, contrato, computer use, iteração com git), depois <strong class="text-blue-400">construir e escalar</strong> (skills, MCP, cota e orquestração, memória compartilhada).
        </p>
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <a href="curso/trilha1/index.html" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30">Começar agora &#8594;</a>
          <button type="button" data-inema-journey-open class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dark-800 border border-emerald-500/30 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/10 transition-colors">🧭 Continuar de onde parei</button>
        </div>
        <div data-inema-meter="curso" class="inema-meter max-w-md" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do curso">
          <div class="flex justify-between text-sm text-neutral-400 mb-1"><span data-inema-meter-frac>0 de ${totalTopics} tópicos</span><span data-inema-meter-pct>0%</span></div>
          <div class="inema-bar h-2 bg-dark-700 rounded-full overflow-hidden"><div class="inema-bar__fill h-full bg-emerald-500 rounded-full transition-all" data-inema-meter-fill style="width:0%"></div></div>
        </div>
      </div>
      <div class="rounded-2xl border border-emerald-500/30 bg-dark-900/40 p-3 sm:p-4">${heroSvg}</div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        ${[[tracks.length, 'Trilhas'], [totalModules, 'Módulos'], [totalTopics, 'Tópicos'], [`~${hours}h`, 'Duração']].map(([v, l]) => `<div class="bg-dark-800/50 rounded-xl p-5 border border-dark-600 text-center"><div class="text-3xl font-extrabold text-emerald-400">${v}</div><div class="text-xs text-neutral-400 mt-1">${l}</div></div>`).join('')}
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- O LOOP -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Por que este curso</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">O loop mudou: delegar, verificar, iterar</h2>
        <p class="text-lg text-neutral-400">Benchmarks autorizam você a delegar tarefas maiores. Eles não dispensam nenhuma verificação. Tudo aqui existe para encurtar o ciclo entre pedir e provar.</p>
      </div>
      <div class="grid sm:grid-cols-3 gap-6">
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7"><div class="text-2xl font-extrabold text-emerald-400 mb-2">Contrato de 3 linhas</div><p class="text-neutral-300 text-sm">Resultado, onde, prova. A prova vem antes do resumo, sempre. Sem isso o agente "acha que terminou".</p></div>
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7"><div class="text-2xl font-extrabold text-blue-400 mb-2">Rollback em 1 comando</div><p class="text-neutral-300 text-sm">Árvore de git limpa antes de delegar transforma "ficou pior" em <code>git checkout</code> e uma rodada 2 com critério novo.</p></div>
        <div class="bg-dark-800 rounded-2xl border border-dark-600 p-7"><div class="text-2xl font-extrabold text-primary mb-2">O caro planeja</div><p class="text-neutral-300 text-sm">Modelo de fronteira gera o plano; modelo barato executa o volume. Mesma assinatura, muito mais trabalho por semana.</p></div>
      </div>
    </section>

    <!-- A PROMESSA -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">A promessa</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">O que você sai sabendo fazer</h2>
      </div>
      <div class="grid sm:grid-cols-2 gap-5">
        ${[
          ['🧾', 'Escrever contratos de tarefa verificáveis', 'Resultado, onde e prova de conclusão. O molde que todos os prompts do curso seguem.'],
          ['🔌', 'Ativar o Astra nas três superfícies', 'App do ChatGPT, app do Codex e Codex CLI, com config.toml, sandbox e AGENTS.md conferidos.'],
          ['🖱️', 'Usar computer use sem publicar besteira', 'Extensão vinculada, rascunho obrigatório antes de qualquer ação pública, prova visual no fim.'],
          ['⏪', 'Iterar num projeto real com rollback', 'Trocar modelo, refatorar UI com critério de aceite, reverter em um comando e refazer melhor.'],
          ['📚', 'Escrever skills de ferramenta e de gosto', 'Remotion em um prompt; e um guia visual com regras numéricas que torna "não gostei" verificável.'],
          ['🔗', 'Conectar MCP e rodar tarefas longas', 'Blender por MCP com marcos, evidência por etapa e retomada sem perder progresso.'],
          ['📉', 'Controlar cota e orquestrar modelos', 'Ler a taxa de consumo, escolher o esforço certo e mandar o volume para o modelo barato.'],
          ['🧠', 'Dar memória comum aos seus agentes', 'Base em markdown que todo agente lê antes de decidir e alimenta depois de decidir.'],
        ].map(([e, h, p]) => `<div class="flex items-start gap-4 bg-dark-800 rounded-xl border border-dark-600 p-6"><span class="text-2xl mt-0.5">${e}</span><div><h3 class="font-semibold text-neutral-100 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div></div>`).join('')}
      </div>
    </section>

    <!-- TRILHAS -->
    <section id="trilhas" class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">A jornada</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Duas trilhas: operar, depois escalar</h2>
        <p class="text-lg text-neutral-400">Cada módulo tem seis tópicos, diagramas, blocos de comando e prompt prontos para copiar com "como verificar", e um teste rápido de três perguntas.</p>
      </div>
      ${tracks.map(trackCard).join('')}
    </section>

    <!-- PARA QUEM -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Para quem é</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Quem já roda um agente no terminal e quer parar de improvisar</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        ${[
          ['⌨️', 'Quem usa Codex ou Claude Code', 'e quer contrato, sandbox e verificação em vez de tentativa e erro a cada tarefa.'],
          ['🧑‍💻', 'Pessoa desenvolvedora', 'que delega tarefas inteiras num repositório e precisa de diff pequeno, critério de aceite e rollback.'],
          ['🛠️', 'Quem escreve skills e conecta MCP', 'e quer o padrão de descrição, auditoria de terceiros e tarefas longas com marcos.'],
          ['📊', 'Quem paga a conta', 'e precisa prever a cota, escolher o esforço certo e orquestrar modelos baratos para o volume.'],
        ].map(([e, h, p]) => `<div class="bg-dark-800 rounded-xl border border-dark-600 p-6 text-center"><div class="text-3xl mb-3">${e}</div><h3 class="font-semibold text-neutral-100 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div>`).join('')}
      </div>
    </section>

    <!-- EXPERIÊNCIA -->
    <section class="py-16 border-b border-dark-600">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Sua experiência</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4">Mais que ler: uma plataforma de aprendizado</h2>
        <p class="text-lg text-neutral-400">Tudo roda no seu navegador, sem login. O curso lembra onde você parou.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${[['✅', 'Progresso automático', 'Marque tópicos como lidos e veja a evolução por módulo, trilha e curso.'], ['✍️', 'Anotações e grifos', 'Selecione qualquer trecho para grifar ou anotar. Fica salvo no seu navegador.'], ['🧭', 'Minha jornada', 'Continue de onde parou e veja tudo que já estudou num painel.'], ['🌓', 'Temas e leitura', 'Escuro, claro, sépia, foco, alto contraste. Tamanho de fonte e entrelinha.'], ['🧪', 'Quiz por módulo', 'Três perguntas com resposta e explicação, para checar se entendeu.'], ['📋', 'Prompts com prova', 'Cada fluxo traz o prompt traduzido, os marcadores para trocar e o que conferir no fim.']].map(([e, h, p]) => `<div class="bg-dark-800 rounded-xl border border-dark-600 p-6"><div class="text-2xl mb-2">${e}</div><h3 class="font-semibold text-emerald-400 mb-1">${h}</h3><p class="text-neutral-400 text-sm">${p}</p></div>`).join('')}
      </div>
    </section>

    <!-- FONTES -->
    <section class="py-16 border-b border-dark-600">
      <div class="max-w-3xl mx-auto">
        <span class="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Fontes e limites</span>
        <h2 class="text-3xl font-bold mt-3 mb-6">De onde vem o que este curso afirma</h2>
        <div class="space-y-4 text-neutral-300">
          <div class="bg-dark-800 rounded-xl border border-dark-600 p-5"><p class="font-semibold text-neutral-100 mb-1">Lançamento do modelo</p><p class="text-sm"><a href="${SOURCE_OFFICIAL}" target="_blank" class="text-sky-400 hover:text-sky-300">Página oficial do GPT-6 Astra</a> (OpenAI): capacidades, benchmarks de agente e custo por tarefa resolvida. Os números do lançamento aparecem no módulo 1.1 com o que eles não medem.</p></div>
          <div class="bg-dark-800 rounded-xl border border-dark-600 p-5"><p class="font-semibold text-neutral-100 mb-1">Comandos e configuração</p><p class="text-sm"><a href="${SOURCE_INDEX}" target="_blank" class="text-sky-400 hover:text-sky-300">Documentação do Codex</a>. Todo comando deste curso foi conferido no Codex CLI 0.153 em setembro de 2026. Flags e chaves mudam entre versões: <code>codex --help</code> na sua é a fonte final.</p></div>
          <div class="bg-dark-800 rounded-xl border border-dark-600 p-5"><p class="font-semibold text-neutral-100 mb-1">Projetos abertos usados nos exemplos</p><p class="text-sm"><a href="${SOURCE_DUMP}" target="_blank" class="text-sky-400 hover:text-sky-300">Remotion</a> (vídeo em React), <a href="${SOURCE_PRODUCT}" target="_blank" class="text-sky-400 hover:text-sky-300">Blender MCP</a> (modelagem 3D via protocolo) e <a href="https://obsidian.md/" target="_blank" class="text-sky-400 hover:text-sky-300">Obsidian</a> (base de notas em markdown).</p></div>
          <div class="bg-red-900/20 rounded-xl border border-red-500/30 p-5"><p class="font-semibold text-red-400 mb-1">Limites</p><p class="text-sm">Benchmark não mede o seu projeto. Nome de menu muda a cada versão do aplicativo. Consumo de cota depende da sua mistura de tarefas, então meça em vez de confiar nos números de exemplo. E nenhum prompt substitui ler o rascunho antes de publicar.</p></div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="py-20">
      <div class="bg-gradient-to-br from-emerald-900/40 via-dark-800 to-dark-800 rounded-3xl border border-emerald-500/30 p-10 sm:p-14 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">Pronto para delegar a tarefa inteira e verificar em vez de torcer?</h2>
        <p class="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">Comece pela Trilha 1. Em cerca de ${hours} horas você sai com o contrato de tarefa, o Astra ativo nas três superfícies, o ciclo de iteração com rollback e o sistema de skills, MCP, orquestração e memória montado.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="curso/trilha1/index.html" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30">Começar pela Trilha 1 &#8594;</a>
          <button type="button" data-inema-journey-open class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 border border-emerald-500/30 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/10 transition-colors">🧭 Minha jornada</button>
        </div>
      </div>
    </section>
  </main>
` + footer({}) + scripts({ rel: '.' });

writeFileSync(out('index.html'), landing);
console.log(`ok: ${totalModules} módulos, ${totalTopics} tópicos, ~${totalMin} min`);
