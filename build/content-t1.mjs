// Trilha 1 — Setup e operação (emerald) — módulos 1.1 a 1.4
import { c, svg } from './lib.mjs';

const link = (href, txt) => `<a href="${href}" target="_blank" class="text-sky-400 hover:text-sky-300 underline decoration-dotted">${txt}</a>`;
const LAUNCH = 'https://openai.com/index/gpt-6-astra/';
const CODEX_DOCS = 'https://developers.openai.com/codex/';
const CU_COURSE = 'https://inematds.github.io/astra-computer-use/';

// ---------------------------------------------------------------- 1.1
const M11 = {
  id: '1-1', emoji: '🔁', title: 'O que o Astra muda no loop de trabalho', punch: 'Delegar a tarefa, não o passo', minutes: 35, level: 'Básico', kind: 'Fundamento',
  lead: 'GPT-6 Astra é um modelo. O que muda para você não é o número no benchmark, é o tamanho da unidade de trabalho que dá para entregar de uma vez: em vez de pedir um trecho, você pede o resultado, o agente executa, você verifica. Este módulo fixa esse loop e o vocabulário que o resto do curso usa.',
  topics: [
    {
      emoji: '📦', title: 'A unidade de trabalho cresceu', sub: 'De "escreva a função" para "troque o modelo do projeto e confirme rodando"',
      what: 'A diferença operacional entre pedir um pedaço e pedir a tarefa inteira, e por que o Astra torna a segunda forma o padrão.',
      why: 'Quem continua pedindo pedaços paga o custo do modelo caro e fica com o trabalho de costurar. O ganho está em delegar a unidade maior e gastar seu tempo verificando.',
      keys: 'Tarefa inteira, critério de pronto, verificação, loop delegar/verificar/iterar.',
      body: (t) => [
        c.p('Modelos anteriores já escreviam código. O que muda com o Astra é o tamanho da tarefa que sobrevive inteira de ponta a ponta: localizar o arquivo certo num projeto que ele nunca viu, editar, reiniciar o serviço, abrir a página, ler o resultado e reportar. Num projeto de agentes local, "troque o modelo da seção Codex para gpt-6-astra" foi de prompt a serviço reiniciado com o modelo novo em poucos minutos, sem apontar o arquivo. Isso é o que muda o loop: você deixa de escrever passos e passa a escrever resultados verificáveis.'),
        c.glossary(t, [
          ['Agente', 'Um modelo com ferramentas (editar arquivo, rodar comando, abrir navegador) e um loop: planeja, age, lê o resultado, age de novo até terminar.'],
          ['Codex', 'O produto de agente de código da OpenAI. Existe como app de computador, extensão no ChatGPT e CLI (linha de comando). Todos usam sua assinatura, não uma chave de API.'],
          ['Critério de pronto', 'Condição observável que encerra a tarefa. "Página abre e o seletor mostra gpt-6-astra" é um critério; "melhore o app" não é.'],
          ['Rollback', 'Voltar para a versão anterior de um arquivo ou projeto. Com git, é um comando. Sem git, é sorte.'],
        ]),
        c.figure(t, svg.flow(t, { label: 'O loop de trabalho com o Astra: delegar a tarefa inteira com critério de pronto, o agente executa, você verifica o resultado, itera ou faz rollback', steps: [
          { title: 'Delegar', sub: 'resultado + onde + prova' },
          { title: 'Executar', sub: 'agente edita, roda, lê' },
          { title: 'Verificar', sub: 'você confere a prova' },
          { title: 'Iterar / rollback', sub: 'nova versão ou volta' },
        ] }), 'Quatro caixas, uma seta. O único ponto em que você aparece é "verificar". Tudo que o curso ensina serve para encurtar as outras três ou para tornar a sua mais barata.'),
        c.grid2(t, { okTitle: 'Pedido que aproveita o modelo', ok: ['"Troque o modelo da seção Codex do projeto em localhost:3000 para gpt-6-astra. Reinicie o serviço e confirme abrindo a página."', '"Refatore o CSS da tela principal para um visual mais moderno. Não mude comportamento. Me mostre o antes/depois."', '"Gere um vídeo promocional de 30 s com Remotion a partir do README. Renderize em MP4 e me diga o caminho."'], badTitle: 'Pedido que desperdiça o modelo', bad: ['"Qual arquivo contém a configuração do modelo?" (você vai fazer o resto na mão)', '"Escreva uma função que leia o config.toml" (pedaço, sem contexto do objetivo)', '"Melhore o app" (sem critério de pronto: qualquer coisa serve, nada serve)'] }),
        c.tip({ title: 'Regra de bolso', text: 'Se você consegue descrever como vai saber que ficou pronto, delegue inteiro. Se não consegue, o problema é seu critério, não o modelo.' }),
      ],
    },
    {
      emoji: '📊', title: 'Benchmarks: o que ler e o que ignorar', sub: 'Os números da página de lançamento e o que eles não medem',
      what: 'O que a OpenAI publicou no lançamento, como interpretar e o que não dá para concluir sobre o seu projeto.',
      why: 'Você vai ver esses números repetidos em todo lugar. Saber o que eles medem evita duas decisões ruins: ignorar o modelo e confiar cego nele.',
      keys: 'Computer use, resolução de tarefas, custo por tarefa, amostra do seu projeto.',
      body: (t) => [
        c.p(`A ${link(LAUNCH, 'página de lançamento')} apresenta o Astra como o modelo mais forte da OpenAI em uso de computador, engenharia de software, segurança e trabalho profissional, com ganhos grandes em benchmarks de agentes e resultados novos em problemas abertos de matemática. A tabela de custo por tarefa resolvida mostra o Astra abaixo dos concorrentes de fronteira, isto é, mais barato por tarefa concluída, não mais barato por token.`),
        c.data({ title: 'O que os números não dizem', items: [
          'Benchmark mede tarefas de laboratório com critério de pronto definido pelo avaliador. O seu projeto não tem esse critério até você escrever.',
          'Custo por tarefa resolvida assume que a tarefa foi resolvida. Uma tarefa mal especificada gera três tentativas caras.',
          'Velocidade percebida ("fez em 2 minutos o que levava 30") vem de sessões ao vivo, não de medição controlada. Trate como indício.',
          'Saturar um benchmark significa que ele parou de discriminar modelos, não que o modelo parou de errar.',
        ] }),
        c.figure(t, svg.scale(t, { label: 'Balança: o que o benchmark prova contra o que só a sua verificação prova', tilt: 0, left: { title: 'Benchmark prova', lines: ['capacidade geral', 'custo médio por tarefa', 'comparação entre modelos'] }, right: { title: 'Só você prova', lines: ['funciona no seu repo', 'o resultado é o que pediu', 'nada quebrou fora do escopo'] } }), 'Equilíbrio, não vitória: o benchmark autoriza você a delegar tarefas maiores; ele não substitui a verificação de nenhuma delas.'),
        c.alert({ title: 'O erro clássico da primeira semana', text: 'Ler "melhor em computer use" e deixar o agente postar, publicar ou pagar sem revisar. Na primeira sessão de teste que serviu de base a este curso, o agente publicou um anúncio com o nome errado do produto. Funcionou; o conteúdo estava errado. Rascunho primeiro, sempre (módulo 1.3).' }),
      ],
    },
    {
      emoji: '🧱', title: 'As três superfícies: app, Codex e CLI', sub: 'Mesmo modelo, três formas de dar tarefa',
      what: 'Onde o Astra aparece para você: ChatGPT (chat e área de trabalho), app do Codex e Codex CLI no terminal. O que cada uma faz melhor.',
      why: 'A superfície errada desperdiça a tarefa. Chat para pensar, Codex para projetos com arquivos, CLI para automatizar e integrar.',
      keys: 'ChatGPT chat, ChatGPT "trabalho", app Codex, Codex CLI, sessão, projeto.',
      body: (t) => [
        c.p('O modelo é um só. O que muda é o harness em volta: quais ferramentas ele tem, onde os arquivos ficam, se a sessão persiste. No ChatGPT comum, o Astra pode não aparecer no seletor. Na área de trabalho do ChatGPT (o modo voltado a tarefas) e no app do Codex, ele aparece após atualizar o app. No CLI, é um valor de configuração.'),
        c.table(t, { headers: ['Superfície', 'Quando usar', 'Ferramentas', 'Estado'], rows: [
          ['ChatGPT (chat)', 'Pensar, rascunhar prompt, revisar texto', 'Busca, arquivos anexados', 'Conversa'],
          ['ChatGPT (área de trabalho)', 'Tarefas com navegador e apps do computador', 'Computer use via extensão, apps conectados', 'Conversa fixável'],
          ['App do Codex', 'Projetos com pasta de código, várias sessões em paralelo', 'Editar, rodar, navegador interno, MCP, skills', 'Sessão por projeto, fork'],
          ['Codex CLI', 'Terminal, automação, CI, scripts', 'Tudo do app + `exec` não interativo', 'Sessão retomável (`resume`)'],
        ], caption: 'Nomes de menu variam por versão; a divisão de responsabilidades não.' }),
        c.figure(t, svg.stack(t, { label: 'Camadas de fora para dentro: superfície (app, Codex, CLI), harness de ferramentas, sessão e projeto, e no centro o modelo GPT-6 Astra', layers: [
          { title: 'Superfície', sub: 'ChatGPT · app Codex · Codex CLI' },
          { title: 'Harness', sub: 'ferramentas, sandbox, aprovações' },
          { title: 'Sessão e projeto', sub: 'pasta, histórico, fork' },
          { title: 'GPT-6 Astra', sub: 'o modelo, igual em todas' },
        ] }), 'Trocar de superfície não troca o modelo. Troca o que ele pode tocar e o que lembra.'),
        c.tip({ title: 'Para quem já usa Claude Code', text: 'O mapa é 1:1. App do Codex ≈ Claude Code desktop; Codex CLI ≈ claude no terminal; skills ≈ skills; MCP é o mesmo protocolo. O que você aprendeu de contrato de prompt transfere sem ajuste.' }),
      ],
    },
    {
      emoji: '🧾', title: 'O contrato de tarefa em três linhas', sub: 'Resultado, onde, prova',
      what: 'O molde mínimo de pedido que faz uma tarefa sair verificável: o resultado esperado, onde ele deve aparecer e qual evidência encerra.',
      why: 'Todo prompt do curso segue este molde. É a diferença entre um agente que termina e um que "acha que terminou".',
      keys: 'Resultado, localização, prova de conclusão, escopo negativo.',
      body: (t) => [
        c.p('Três linhas. Resultado: o estado final, em uma frase observável. Onde: o arquivo, a URL, a pasta. Prova: o que o agente deve mostrar para você aceitar (saída de comando, screenshot, caminho de arquivo). Uma quarta linha opcional, escopo negativo, evita os efeitos colaterais mais comuns.'),
        c.code(t, { objective: 'Molde de contrato de tarefa. Cole no Codex, preencha os campos entre < >', lang: 'text', code: `Resultado: <o estado final, observável, em uma frase>
Onde: <pasta do projeto | URL | arquivo>
Prova: <comando cuja saída eu vou ler | screenshot | caminho do arquivo gerado>
Não faça: <o que está fora do escopo, ex.: não mude dependências, não faça commit>

Quando terminar, me mostre a prova antes de qualquer outra coisa.`, verify: 'A resposta final do agente começa com a prova (saída de comando, screenshot ou caminho), não com um resumo do que ele fez. Se começar com resumo, o contrato não foi lido.' }),
        c.code(t, { objective: 'Contrato preenchido: trocar o modelo de um serviço local e confirmar rodando', lang: 'text', code: `Resultado: o serviço em http://localhost:<PORTA> usa o modelo gpt-6-astra na seção Codex.
Onde: pasta atual (este repositório).
Prova: saída de \`grep -rn "gpt-6-astra" <ARQUIVO_DE_CONFIG>\` e um screenshot da página com o modelo selecionado.
Não faça: não altere outros provedores, não instale dependências, não faça commit.

Quando terminar, me mostre a prova antes de qualquer outra coisa.`, verify: 'O grep devolve ao menos uma linha com o modelo novo e o screenshot mostra o seletor. Abra a página você mesmo antes de aceitar.' }),
        c.grid2(t, { okTitle: 'Prova aceitável', ok: ['Saída literal de um comando que você pode rodar de novo', 'Screenshot da tela final com o valor visível', 'Caminho de arquivo que você abre e confere', 'Diff resumido com os arquivos tocados'], badTitle: 'Prova que não prova', bad: ['"Feito, o modelo foi trocado com sucesso"', '"Testei e está funcionando"', 'Resumo dos passos executados sem saída', 'Promessa de que "deve funcionar"'] }),
      ],
    },
    {
      emoji: '🧭', title: 'Onde as coisas somem: sessões, projetos e pin', sub: 'Organização do app do Codex antes que ela te custe uma tarde',
      what: 'Como o app do Codex organiza conversas por projeto, por que sessões parecem desaparecer e a rotina de pin/fork que evita perder trabalho.',
      why: 'Com três ou quatro tarefas em paralelo, a interface some com conversas. A rotina custa dez segundos e evita procurar por vinte minutos.',
      keys: 'Projeto, sessão, pin, fork, resume, recentes.',
      body: (t) => [
        c.p('Rodando várias tarefas ao mesmo tempo (troca de modelo, redesign de UI, vídeo, jogo), a barra lateral do app do Codex reorganiza a lista e uma conversa recém-criada parece ter sumido. Ela está em "recentes" ou dentro do projeto. A rotina: toda sessão que vai durar mais de uma resposta recebe pin na hora em que é criada; toda mudança arriscada nasce de um fork da sessão estável, não da própria.'),
        c.steps(t, { title: 'Rotina de organização', items: [
          { h: 'Um projeto por pasta de código', text: 'Crie o projeto apontando para a pasta. Sessões daquele projeto herdam a pasta e as instruções dela (AGENTS.md).' },
          { h: 'Pin na criação', text: 'Antes de mandar o primeiro prompt longo, fixe a sessão. Desfixe quando a tarefa fechar.' },
          { h: 'Fork para experimentos', text: 'Redesign, migração, refatoração grande: fork da sessão que está funcionando. Se der errado, a original continua intacta.' },
          { h: 'Nomeie pelo resultado', text: '"trocar modelo → astra", "UI v2", "vídeo promo remotion". Nomes por resultado são buscáveis; "nova conversa 7" não é.' },
        ] }),
        c.code(t, { objective: 'No CLI: retomar a última sessão e criar um fork dela para um experimento', lang: 'bash', code: `# retoma a sessão mais recente deste projeto
codex resume --last

# abre um fork da sessão mais recente (a original fica intacta)
codex fork --last

# lista as sessões do daemon local (quando o app-server está ativo)
codex agents`, verify: 'O fork abre com o histórico da sessão original. Faça uma mudança no fork, volte à original com `codex resume` e confirme que ela não tem a mudança.' }),
        c.tip({ title: 'Conversa sumiu?', text: 'Antes de recriar: barra lateral → recentes, depois o projeto. Recriar a sessão perde o contexto que o agente já construiu sobre o projeto e custa tokens de novo.' }),
      ],
    },
    {
      emoji: '🗺️', title: 'Mapa do curso e o que você vai construir', sub: 'Oito módulos, um sistema no fim',
      what: 'O que cada módulo entrega e como as peças se encaixam num sistema de trabalho: superfícies, contrato, computer use, iteração, skills, MCP, cota e memória.',
      why: 'Saber o destino permite pular o que você já domina e prestar atenção no que muda o seu fluxo.',
      keys: 'Trilha 1 setup e operação, trilha 2 construir e escalar.',
      body: (t) => [
        c.figure(t, svg.fanout(t, { label: 'Um sistema de trabalho com o Astra se ramifica em superfícies, contrato, computer use, iteração, skills, MCP, cota e memória', center: 'Sistema|de trabalho|com o Astra', groups: [
          { n: 1, title: '1.2 Ativar nas três superfícies', sub: 'app, Codex, CLI, config.toml' },
          { n: 1, title: '1.3 Computer use no navegador', sub: 'extensão, rascunho, permissões' },
          { n: 1, title: '1.4 Codar, iterar, rollback', sub: 'trocar modelo, refatorar UI, git' },
          { n: 1, title: '2.1 Skills e biblioteca de gosto', sub: 'Remotion, SKILL.md, design guide' },
          { n: 1, title: '2.2 MCP e trabalhos longos', sub: 'Blender MCP, continue, reinício' },
          { n: 1, title: '2.3 Cota, custo, orquestração', sub: 'medidor, modelo barato, exec' },
          { n: 1, title: '2.4 Memória compartilhada', sub: 'Obsidian, AGENTS.md, sistema' },
        ] }), 'Cada ramo é um módulo. O centro é o que você tem no fim: um sistema em que o Astra planeja e executa, e ferramentas mais baratas fazem o volume.'),
        c.cards(t, [
          { emoji: '🧭', h: 'Trilha 1: operar', text: 'Ativar, delegar com contrato, usar o navegador com segurança, iterar num projeto com rollback. Sai com o loop funcionando.' },
          { emoji: '🛠️', h: 'Trilha 2: escalar', text: 'Ensinar o agente (skills), conectar ferramentas (MCP), controlar cota e custo, e dar memória comum aos agentes. Sai com o sistema.' },
          { emoji: '🖱️', h: 'Aprofundamento', text: `Computer use em cinco fluxos completos está no curso irmão ${link(CU_COURSE, 'Computer Use com o GPT-6 Astra')}. Aqui você vê o essencial para operar com segurança.` },
        ]),
        c.p('Os prompts e comandos foram conferidos no Codex CLI 0.153 e no app do Codex em setembro de 2026. Menus mudam; o contrato e o loop não.'),
      ],
    },
  ],
  quiz: [
    { q: 'Qual pedido aproveita o que o Astra tem de novo?', options: ['"Qual arquivo tem a configuração do modelo?"', '"Troque o modelo para gpt-6-astra, reinicie e confirme abrindo a página."', '"Escreva uma função que leia o config."', '"Melhore o app."'], answer: 1, why: 'É a tarefa inteira com critério de pronto observável. As outras são pedaços ou não têm como terminar.' },
    { q: 'O que um benchmark de computer use prova sobre o seu projeto?', options: ['Que o agente vai acertar no seu app', 'Que o custo será baixo no seu caso', 'Nada direto: autoriza delegar mais, não dispensa verificar', 'Que rollback não é necessário'], answer: 2, why: 'Benchmark mede tarefas de laboratório com critério do avaliador. O seu critério só existe quando você escreve.' },
    { q: 'Qual das opções é uma prova de conclusão aceitável?', options: ['"Feito com sucesso"', 'Resumo dos passos executados', 'Saída literal de um comando que você pode rodar de novo', '"Deve estar funcionando"'], answer: 2, why: 'Prova é algo que você reproduz ou vê. Texto do agente sobre o próprio trabalho não é prova.' },
  ],
  summary: [
    ['A unidade cresceu', 'delegue a tarefa inteira com critério de pronto, não o passo.'],
    ['Benchmarks autorizam, não dispensam', 'delegue mais; verifique tudo.'],
    ['Três superfícies, um modelo', 'chat para pensar, Codex para projetos, CLI para automatizar.'],
    ['Contrato de três linhas', 'resultado, onde, prova. Prova vem antes do resumo.'],
    ['Pin e fork', 'toda sessão longa fixada na criação; todo experimento nasce de um fork.'],
  ],
};

// ---------------------------------------------------------------- 1.2
const M12 = {
  id: '1-2', emoji: '🔌', title: 'Ativando: app, Codex e CLI', punch: 'Modelo certo nas três superfícies, com prova', minutes: 40, level: 'Básico', kind: 'Prática',
  lead: 'Ativar o Astra é trivial quando você sabe onde olhar e frustrante quando não sabe: o seletor do chat pode não mostrar o modelo, o app precisa de atualização, o CLI lê um arquivo de configuração. Este módulo cobre as três superfícies com um comando de verificação em cada uma.',
  topics: [
    {
      emoji: '🖥️', title: 'ChatGPT: atualizar e achar o seletor', sub: 'O modelo aparece na área de trabalho, não necessariamente no chat',
      what: 'Como colocar o Astra disponível no app de computador do ChatGPT: plano, atualização do app e o lugar certo do seletor.',
      why: 'A causa mais comum de "não tenho o Astra" é o app desatualizado ou o seletor errado, não o plano.',
      keys: 'Plano, verificar atualizações, relançar, seletor de modelo, área de trabalho.',
      body: (t) => [
        c.p('Sequência que resolve a maioria dos casos: confirme o plano (Pro; Plus também recebe, conforme o lançamento), abra o app de computador do ChatGPT, procure "verificar atualizações" no menu do app, atualize e relance. Depois, troque para a área de trabalho (o modo voltado a tarefas) e abra o seletor de modelo ali. No chat comum o seletor pode continuar mostrando só o modelo anterior.'),
        c.steps(t, { title: 'Checklist de ativação no ChatGPT', items: [
          { h: 'Plano', text: 'Configurações → plano. Se for gratuito, o Astra não aparece.' },
          { h: 'Atualizar o app', text: 'Menu do app → verificar atualizações → instalar e relançar. Sem relançar, o seletor não muda.' },
          { h: 'Modo certo', text: 'Alterne do chat para a área de trabalho. Abra o seletor de modelo e escolha GPT-6 Astra.' },
          { h: 'Prova', text: 'Pergunte "qual modelo você é?" e confira o nome na resposta e no seletor. Os dois têm que bater.' },
        ] }),
        c.grid2(t, { okTitle: 'Sinais de que está ativo', ok: ['Seletor mostra GPT-6 Astra na área de trabalho', 'Resposta a "qual modelo você é?" bate com o seletor', 'Tarefas com navegador aparecem como opção'], badTitle: 'Sinais de que não está', bad: ['Seletor só mostra o modelo anterior no chat comum (normal; troque de modo)', 'App sem opção de atualizar (baixe a versão nova do site)', 'Plano gratuito'] }),
        c.tip({ title: 'Versão do app importa mais que a data', text: 'O lançamento chega por atualização do app, não por data. Se um colega tem e você não, a diferença é quase sempre a versão instalada.' }),
      ],
    },
    {
      emoji: '🧰', title: 'App do Codex: atualizar e selecionar', sub: 'Modelo por sessão, esforço de raciocínio por tarefa',
      what: 'Como atualizar o app do Codex, escolher o Astra e ajustar o nível de esforço de raciocínio por tipo de tarefa.',
      why: 'No Codex o modelo é escolhido por sessão e o esforço de raciocínio muda custo e tempo. Escolher errado custa cota (módulo 2.3).',
      keys: 'Atualizar Codex, seletor por sessão, esforço de raciocínio (medium, high), projeto.',
      body: (t) => [
        c.p('Atualize o app do Codex (menu → atualizar, ou baixe a versão nova). Crie ou abra um projeto apontando para a pasta de código. No seletor de modelo da sessão, escolha GPT-6 Astra. Ao lado costuma existir o esforço de raciocínio: medium para tarefas de edição e UI, high para depuração e migração. O que é medium de sobra não precisa de high.'),
        c.figure(t, svg.split(t, { label: 'Dois eixos de escolha no Codex: o modelo (qual) e o esforço de raciocínio (quanto pensa), com exemplos de tarefa em cada nível', bridge: 'mesma sessão, ajuste por tarefa', left: { title: 'medium', items: ['trocar valor de config', 'refatorar CSS', 'gerar vídeo com skill', 'post, texto, resumo'] }, right: { title: 'high', items: ['bug que atravessa módulos', 'migração de dados', 'projeto que ele nunca viu', 'decisão de arquitetura'] } }), 'Esforço é custo. Comece em medium; suba para high só quando a tarefa falhar por raciocínio, não por falta de contexto.'),
        c.code(t, { objective: 'Prova de ativação no app do Codex: uma tarefa mínima com verificação', lang: 'text', code: `Resultado: um arquivo HELLO.md na raiz com o nome do modelo que você é e a data de hoje.
Onde: pasta atual.
Prova: saída de \`cat HELLO.md\`.
Não faça: não toque em nenhum outro arquivo.`, verify: 'O cat mostra o nome do modelo igual ao seletor. Apague o arquivo depois (ou peça para apagar e mostrar `ls`).' }),
        c.alert({ title: 'Sessão antiga, modelo antigo', text: 'Sessões criadas antes da atualização podem manter o modelo anterior. Confira o seletor da sessão, não o padrão do app.' }),
      ],
    },
    {
      emoji: '⌨️', title: 'Codex CLI: config.toml e flags', sub: 'O modelo é uma linha; o resto é política',
      what: 'Instalar ou atualizar o Codex CLI, definir o modelo no config.toml, sobrescrever por flag e conferir com doctor.',
      why: 'O CLI é a superfície que você automatiza. Se o modelo padrão está errado ali, todo script herda o erro.',
      keys: 'config.toml, model, model_reasoning_effort, -m, codex doctor, trust_level.',
      body: (t) => [
        c.p(`O CLI lê <code>~/.codex/config.toml</code>. As duas chaves que importam agora são <code>model</code> e <code>model_reasoning_effort</code>. Tudo pode ser sobrescrito por flag numa chamada (<code>-m</code>, <code>-c chave=valor</code>). A ${link(CODEX_DOCS, 'documentação do Codex')} lista as demais; confira na sua versão.`),
        c.code(t, { objective: 'Atualizar o CLI, definir o Astra como padrão e conferir', lang: 'bash', code: `# atualiza (npm) e confere a versão
npm i -g @openai/codex && codex --version

# define o modelo padrão e o esforço
cat >> ~/.codex/config.toml <<'EOF'
model = "gpt-6-astra"
model_reasoning_effort = "medium"
EOF

# diagnóstico: instalação, config, auth, runtime
codex doctor`, verify: '`codex doctor` não acusa erro de config e `codex --version` mostra 0.153 ou mais novo. Se já existia uma linha `model =`, remova a duplicada: a última vence, mas fica ambíguo.' }),
        c.code(t, { objective: 'Sobrescrever o modelo e o esforço só nesta chamada, sem editar o arquivo', lang: 'bash', code: `codex -m gpt-6-astra -c model_reasoning_effort="high" "Qual modelo você é? Responda só o nome."`, verify: 'A resposta contém gpt-6-astra. Rode sem `-m` e confira que o padrão do config também responde certo.' }),
        c.table(t, { headers: ['Chave / flag', 'Efeito', 'Quando'], rows: [
          ['<code>model</code>', 'Modelo padrão de toda sessão', 'Uma vez, no config'],
          ['<code>model_reasoning_effort</code>', 'low/medium/high por padrão', 'medium no config, high por flag'],
          ['<code>-m</code>, <code>-c k=v</code>', 'Sobrescreve nesta chamada', 'Scripts e testes'],
          ['<code>[projects."<pasta>"] trust_level</code>', 'Marca a pasta como confiável (menos prompts de aprovação)', 'Por projeto que você controla'],
          ['<code>sandbox_mode</code>, <code>-s</code>', 'O que o agente pode tocar fora da pasta', 'Ver tópico 5'],
        ], caption: 'Chaves conferidas no CLI 0.153; nomes podem mudar. `codex --help` na sua versão é a fonte.' }),
      ],
    },
    {
      emoji: '📌', title: 'A conversa de trabalho fixada', sub: 'Uma sessão longa por projeto, com instruções na pasta',
      what: 'Como estruturar a sessão principal de um projeto: pasta, AGENTS.md com instruções permanentes, pin e o primeiro prompt de contexto.',
      why: 'Sem instruções na pasta, você repete as mesmas regras em todo prompt. Com AGENTS.md, o agente lê antes de agir.',
      keys: 'AGENTS.md, instruções do projeto, sessão principal, contexto inicial.',
      body: (t) => [
        c.p('O Codex lê um arquivo de instruções na raiz do projeto (AGENTS.md) e o aplica a toda sessão daquela pasta. Coloque ali o que você não quer repetir: como rodar, como testar, o que não tocar, o formato de prova que você aceita. O primeiro prompt da sessão principal pede um reconhecimento do projeto, e a partir dele você delega.'),
        c.code(t, { objective: 'AGENTS.md mínimo para um projeto web local', lang: 'markdown', code: `# Instruções para agentes

## Rodar e testar
- Subir: \`npm run dev\` (porta <PORTA>)
- Testar: \`npm test\`
- Nunca rode \`npm run deploy\` sem eu pedir explicitamente.

## Regras
- Não altere dependências (package.json) sem avisar antes.
- Não faça commit. Eu commito depois de verificar.
- Não mude comportamento em tarefas de "visual/CSS".

## Prova de conclusão
- Toda tarefa termina com: comando rodado + saída, ou screenshot, ou caminho do arquivo.
- Mostre a prova antes do resumo.`, verify: 'Abra uma sessão nova na pasta e peça "quais regras você deve seguir aqui?". A resposta cita o arquivo. Se não citar, o arquivo não está na raiz ou tem outro nome.' }),
        c.code(t, { objective: 'Primeiro prompt da sessão principal: reconhecimento sem mudanças', lang: 'text', code: `Leia o projeto nesta pasta. Não altere nada.
Me devolva, em até 15 linhas:
1. O que o projeto faz e como sobe.
2. Onde ficam configurações de modelo/provedor de IA (arquivo e linha).
3. Os três arquivos que você tocaria para mudar o visual da tela principal.
4. Riscos que você vê (segredos em texto, ausência de testes, etc.).`, verify: 'Os caminhos citados existem (`ls` neles). Fixe a sessão com pin logo depois desta resposta.' }),
        c.tip({ title: 'Um AGENTS.md por repo, não por sessão', text: 'Regra que vale para todo prompt vai no arquivo. Regra de uma tarefa vai no prompt. Misturar os dois faz o arquivo crescer até ninguém ler.' }),
      ],
    },
    {
      emoji: '🛡️', title: 'Sandbox, aprovações e o que ele pode tocar', sub: 'Decida antes da primeira tarefa destrutiva',
      what: 'Os modos de sandbox e a política de aprovação do Codex: o que o agente pode ler, escrever e executar sem perguntar.',
      why: 'Aprovar tudo às cegas é o caminho para um `rm` na pasta errada. Bloquear tudo transforma cada tarefa em vinte cliques.',
      keys: 'sandbox_mode, ask-for-approval, on-request, never, trust_level, full access.',
      body: (t) => [
        c.p('Dois controles independentes. O sandbox limita o que o processo consegue tocar (só leitura, escrita na pasta, acesso total). A política de aprovação decide quando ele pergunta antes de rodar algo (a pedido do modelo, nunca). O padrão sensato para uma máquina de trabalho: escrita na pasta do projeto, aprovação a pedido. Acesso total só quando o sandbox do sistema falha e a máquina é sua.'),
        c.code(t, { objective: 'Rodar uma tarefa com sandbox restrito à pasta e aprovação a pedido', lang: 'bash', code: `codex -s workspace-write -a on-request "Liste os arquivos que você mudaria para trocar o modelo de IA deste projeto. Não mude nada ainda."`, verify: 'O agente responde com a lista e não pede aprovação (não executou nada de escrita). Se pedir, leia o comando antes de aprovar.' }),
        c.grid2(t, { okTitle: 'Aprove sem ler de novo', ok: ['Leitura de arquivos e `grep`', 'Rodar testes e build do projeto', 'Editar arquivos dentro da pasta', 'Subir o servidor de desenvolvimento'], badTitle: 'Leia o comando inteiro', bad: ['Qualquer `rm`, `git reset`, `git push`', 'Instalação global (`npm i -g`, `pip install`)', 'Comandos fora da pasta do projeto', 'Qualquer coisa com token, chave ou senha'] }),
        c.alert({ title: 'Acesso total é um modo, não um padrão', text: 'Se o sandbox do seu sistema falhar (acontece em alguns kernels Linux), o CLI oferece desligar o sandbox. Faça isso por projeto que você controla, nunca no config global de uma máquina compartilhada. E nunca junto com aprovação "never".' }),
      ],
    },
    {
      emoji: '✅', title: 'Prova das três superfícies', sub: 'Um teste de dois minutos que fecha o módulo',
      what: 'Um roteiro único que confirma modelo, harness e permissões nas três superfícies e deixa um registro para o próximo módulo.',
      why: 'Descobrir que o CLI estava no modelo errado no meio de uma automação custa mais que dois minutos agora.',
      keys: 'Prova por superfície, registro, config conferida.',
      body: (t) => [
        c.steps(t, { title: 'Roteiro', items: [
          { h: 'ChatGPT (área de trabalho)', text: '"Qual modelo você é? Responda só o nome." Nome bate com o seletor.' },
          { h: 'App do Codex', text: 'Tarefa HELLO.md do tópico 2. `cat` mostra o nome do modelo. Apague o arquivo.' },
          { h: 'Codex CLI', text: '`codex doctor` limpo e o comando abaixo devolvendo o nome certo.' },
          { h: 'Registro', text: 'Anote versão do app, do CLI e o conteúdo das duas linhas de modelo do config. Você vai precisar disso no módulo 2.3.' },
        ] }),
        c.code(t, { objective: 'Prova do CLI em modo não interativo (o mesmo que você vai usar em scripts)', lang: 'bash', code: `codex exec --skip-git-repo-check "Responda em uma linha: qual modelo você é e qual o esforço de raciocínio configurado?"`, verify: 'Uma linha com gpt-6-astra e o esforço do config. `exec` não abre a interface; é o modo de automação do módulo 2.3.' }),
        c.figure(t, svg.chips(t, { title: 'Estado ao fim do módulo 1.2', label: 'Seis condições que devem estar verdadeiras ao fim do módulo: app atualizado, modelo selecionado, config.toml com model, AGENTS.md na raiz, sandbox definido, prova registrada', items: ['app atualizado', 'Astra no seletor', 'config.toml: model', 'AGENTS.md na raiz', 'sandbox definido', 'prova registrada'], cols: 3 }), 'Se algum chip está falso, o módulo 1.4 vai falhar por motivo que não tem a ver com o modelo.'),
      ],
    },
  ],
  quiz: [
    { q: 'O Astra não aparece no seletor do chat comum do ChatGPT. Primeira coisa a fazer:', options: ['Mudar de plano', 'Reinstalar o sistema', 'Atualizar o app, relançar e olhar o seletor na área de trabalho', 'Esperar o dia seguinte'], answer: 2, why: 'A causa mais comum é app desatualizado ou seletor do modo errado.' },
    { q: 'Onde o modelo padrão do Codex CLI é definido?', options: ['Na variável PATH', 'Em `~/.codex/config.toml`, chave `model`', 'No AGENTS.md', 'No package.json'], answer: 1, why: 'O config.toml é a fonte; `-m` sobrescreve só a chamada atual.' },
    { q: 'Qual combinação é insegura?', options: ['workspace-write + on-request', 'read-only + on-request', 'acesso total + aprovação never', 'workspace-write + trust_level trusted'], answer: 2, why: 'Acesso total sem nenhuma aprovação deixa qualquer comando destrutivo rodar sem você ver.' },
  ],
  summary: [
    ['ChatGPT', 'atualizar, relançar, seletor na área de trabalho; prova com "qual modelo você é?".'],
    ['App do Codex', 'modelo por sessão, esforço medium por padrão; sessões antigas mantêm o modelo antigo.'],
    ['CLI', 'model no config.toml, -m por chamada, doctor para diagnosticar.'],
    ['AGENTS.md', 'regras permanentes na pasta; regras de uma tarefa no prompt.'],
    ['Sandbox e aprovação', 'escrita na pasta + a pedido. Leia todo rm, push e install.'],
  ],
};

// ---------------------------------------------------------------- 1.3
const M13 = {
  id: '1-3', emoji: '🖱️', title: 'Computer use no navegador', punch: 'Extensão ligada, rascunho primeiro, prova no fim', minutes: 40, level: 'Intermediário', kind: 'Prática',
  lead: 'Com a extensão do ChatGPT no navegador, o Astra abre sites, preenche formulários e publica. Na primeira sessão de teste ele postou um anúncio com o nome errado do produto: executou perfeitamente o pedido errado. Este módulo monta o fluxo que impede isso: extensão, rascunho antes de publicar, permissões e prova.',
  topics: [
    {
      emoji: '🧩', title: 'Ligar a extensão e vincular a conta', sub: 'O que "computer use" significa aqui e o que precisa estar instalado',
      what: 'O que a extensão de navegador do ChatGPT faz, como habilitar, vincular e confirmar que o agente enxerga a aba.',
      why: 'Sem a extensão habilitada, o agente descreve o que faria em vez de fazer. O sintoma engana: parece que ele "não quer".',
      keys: 'Extensão de navegador, vincular conta, aba controlada, sessão logada.',
      body: (t) => [
        c.p('Computer use aqui é o agente operando o seu navegador: lê a página, clica, digita, rola. A extensão do ChatGPT é o canal. Ela precisa estar instalada, habilitada e vinculada à mesma conta do app. O login nos sites é o seu: o agente usa a sessão já aberta no navegador, então tudo que ele faz é feito como você.'),
        c.glossary(t, [
          ['Extensão', 'Complemento instalado no navegador que dá ao ChatGPT acesso à aba: ler o conteúdo, clicar, digitar.'],
          ['Vincular', 'Conectar a extensão à sua conta do ChatGPT. Sem isso, o app não vê a extensão.'],
          ['Aba controlada', 'A aba em que o agente está agindo. Você pode assistir; evite clicar nela durante a tarefa.'],
        ]),
        c.steps(t, { title: 'Habilitar', items: [
          { h: 'Instalar a extensão', text: 'Loja de extensões do navegador → extensão oficial do ChatGPT. Confira o publicador.' },
          { h: 'Habilitar e vincular', text: 'Ícone da extensão → habilitar → entrar com a mesma conta do app. Pode pedir login de novo.' },
          { h: 'Confirmar no app', text: 'No ChatGPT (área de trabalho), a opção de usar o navegador aparece como conectada.' },
          { h: 'Teste de leitura', text: 'Abra uma página qualquer e peça "leia o título desta aba". Se ele responder o título, o canal está aberto.' },
        ] }),
        c.code(t, { objective: 'Teste de leitura da aba (sem ação, só prova do canal)', lang: 'text', code: `Usando o navegador: abra <URL_DE_UM_SITE_SEU> e me diga o título da página e o texto do primeiro botão. Não clique em nada.`, verify: 'Título e texto do botão batem com o que você vê. Se ele "descrever" o que faria, a extensão não está vinculada.' }),
      ],
    },
    {
      emoji: '📝', title: 'Rascunho primeiro: o caso do nome errado', sub: 'Executar perfeito o pedido errado é o modo de falha padrão',
      what: 'Por que toda ação de publicação começa com um rascunho que você lê, e o prompt que força isso.',
      why: 'O agente postou "GPT-5" num anúncio sobre o GPT-6. O fluxo estava certo; o conteúdo, errado. Só um humano lendo o rascunho pega isso.',
      keys: 'Rascunho, revisão humana, publicar só após "ok", prova da publicação.',
      body: (t) => [
        c.p('O modo de falha não é o agente travar. É ele concluir com confiança uma versão ligeiramente errada: nome do produto, data, link, valor. Em ações reversíveis (editar um arquivo local) isso custa um rollback. Em ações públicas (postar, enviar, pagar) custa reputação. Regra: o agente redige, você lê, o agente publica só depois do seu "ok", e devolve a prova.'),
        c.figure(t, svg.flow(t, { label: 'Fluxo de publicação com rascunho: o agente redige, você revisa e responde ok, o agente publica e devolve a URL como prova', steps: [
          { title: 'Redigir', sub: 'texto completo no chat' },
          { title: 'Você revisa', sub: 'nome, data, link, valor' },
          { title: '"ok, publique"', sub: 'só depois disso' },
          { title: 'Prova', sub: 'URL + screenshot' },
        ] }), 'A segunda caixa é o único ponto em que o nome errado é pego. Não existe prompt que substitua a leitura.'),
        c.code(t, { objective: 'Publicar um anúncio numa comunidade, com rascunho obrigatório', lang: 'text', code: `Tarefa em duas fases. NÃO publique nada na fase 1.

Fase 1 (rascunho): escreva o texto de um anúncio para <NOME_DA_COMUNIDADE> informando que <FATO_EXATO, ex.: "o treinamento X sobre GPT-6 Astra está disponível">. Use exatamente estes nomes: <LISTA DE NOMES PRÓPRIOS>. Me mostre o texto e pare.

Fase 2 (só depois que eu responder "ok, publique"): usando o navegador, abra <URL_DA_COMUNIDADE>, crie um post com o texto aprovado sem alterações, publique e me devolva a URL do post e um screenshot.`, verify: 'Fase 1 termina sem nenhuma ação no navegador. Após o ok, a URL abre no seu navegador com o texto idêntico ao aprovado. Diferença de uma palavra = rollback (editar o post) e ajuste do prompt.' }),
        c.alert({ title: 'Nomes próprios vão na lista, não na cabeça', text: 'O erro do nome foi um nome de produto parecido com o anterior. Toda vez que um nome próprio importa, escreva-o literalmente no prompt e peça "use exatamente".' }),
      ],
    },
    {
      emoji: '🎯', title: 'O contrato de computer use', sub: 'App exato, resultado, escopo, prova: quatro partes',
      what: 'A versão do contrato de tarefa para ações no navegador: nomear o site e a aba, o resultado, o que não tocar e a evidência.',
      why: 'No navegador o agente tem mais liberdade que num repo. Sem escopo negativo, ele resolve problemas que você não pediu.',
      keys: 'Site nomeado, resultado, escopo negativo, prova visual.',
      body: (t) => [
        c.p(`O contrato de três linhas ganha uma quarta parte obrigatória: o site ou app exato, com URL. E a prova é sempre visual ou um estado do site (URL do resultado, screenshot). Os cinco fluxos completos (busca que vira ferramenta, teste de app, edição de vídeo, celular) estão no curso irmão ${link(CU_COURSE, 'Computer Use com o GPT-6 Astra')}; aqui fica o molde.`),
        c.code(t, { objective: 'Molde de contrato para ação no navegador', lang: 'text', code: `App: <site e URL exatos; aba já logada>
Resultado: <estado final observável no site>
Não faça: <não publique / não pague / não altere configurações / não saia deste domínio>
Prova: <URL do resultado + screenshot da tela final>

Se algo pedir login, senha ou pagamento, pare e me avise. Não preencha.`, verify: 'O agente para em qualquer tela de credencial. Se preencheu algo que você não deu, o "Não faça" ficou fraco ou a extensão tem autofill ligado: desligue.' }),
        c.grid2(t, { okTitle: 'Bom uso do navegador', ok: ['Ler e resumir uma página longa', 'Preencher um formulário com dados que você deu, sem enviar', 'Publicar texto aprovado e devolver a URL', 'Navegar um painel e extrair números para uma tabela'], badTitle: 'Não delegue ao navegador', bad: ['Qualquer tela de senha, cartão, documento', 'Ações irreversíveis sem rascunho (enviar, pagar, apagar)', 'Sites com CAPTCHA (ele deve parar)', 'Tarefas que se repetem toda semana: vire ferramenta (curso irmão, fluxo 1)'] }),
      ],
    },
    {
      emoji: '🔐', title: 'Permissões, reinícios e "continue"', sub: 'O que acontece quando ele para no meio',
      what: 'Os momentos em que o agente pede permissão, reinicia ou perde a aba, e como retomar sem perder o trabalho.',
      why: 'Em tarefas longas o agente vai parar pedindo permissão ou porque o app reiniciou. Quem não sabe retomar recomeça do zero.',
      keys: 'Pedido de permissão, reinício do app, retomar com "continue", mesma conversa.',
      body: (t) => [
        c.p('Tarefas com navegador e com ferramentas externas pedem permissões novas no meio (acessar outro domínio, abrir um app). Às vezes o app reinicia. Regra: volte à mesma conversa em que a tarefa rodava e mande "continue". O agente retoma do último estado que registrou. Abrir conversa nova perde o contexto e repete o trabalho.'),
        c.table(t, { headers: ['Sintoma', 'Causa provável', 'Ação'], rows: [
          ['Parou pedindo permissão', 'Domínio ou app novo', 'Leia o pedido. Aprove se está no escopo. "continue".'],
          ['Conversa sumiu da lista', 'Reordenação da barra lateral', 'Recentes → projeto. Nunca recrie.'],
          ['App reiniciou', 'Atualização ou ferramenta pesada', 'Reabra a mesma conversa. "continue".'],
          ['Ele "descreve" em vez de agir', 'Extensão desvinculada', 'Tópico 1: vincular de novo, teste de leitura.'],
          ['Aba mudou sozinha', 'Você clicou na aba controlada', 'Deixe a aba quieta durante a tarefa.'],
        ] }),
        c.code(t, { objective: 'Retomar uma tarefa interrompida sem perder o estado', lang: 'text', code: `continue. Antes de agir, me diga em uma linha em que passo você parou e qual é o próximo.`, verify: 'A linha descreve um passo que já aconteceu (você viu). Se descrever o início da tarefa, o contexto se perdeu: cole o contrato original e o que já foi feito.' }),
        c.tip({ title: 'Uma conversa por tarefa longa', text: 'Tarefas que pedem permissão no meio (MCP, navegador) ganham conversa própria e pin. Misturar duas tarefas longas numa conversa faz o "continue" retomar a errada.' }),
      ],
    },
    {
      emoji: '🔗', title: 'Referenciar a tela: screenshot e seleção', sub: 'Mostrar é mais barato que descrever',
      what: 'Como anexar screenshot, apontar um elemento da página e usar isso para pedir mudanças precisas.',
      why: '"O botão azul do canto" gera ambiguidade. Um screenshot com o elemento marcado elimina uma rodada inteira de correção.',
      keys: 'Screenshot anexado, referência a elemento, -i no CLI, antes/depois.',
      body: (t) => [
        c.p('No app, arraste o screenshot para o prompt. No CLI, a flag <code>-i</code> anexa um arquivo de imagem. A extensão também permite referenciar o que está na aba a partir do chat. Toda mudança visual começa com um "antes" anexado e termina com um "depois" que o próprio agente captura.'),
        c.code(t, { objective: 'CLI: pedir uma mudança de UI a partir de um screenshot anexado', lang: 'bash', code: `codex -i ~/Imagens/tela-antes.png "Este é o estado atual da tela principal (screenshot anexo). Deixe o painel de memórias mais legível: mais contraste, agrupamento por data, sem mudar dados nem rotas. Ao terminar, suba o dev server, capture um screenshot da mesma tela em ./tela-depois.png e me dê o caminho."`, verify: 'O arquivo tela-depois.png existe e mostra a mesma tela. Compare lado a lado antes de aceitar; "mais moderno" costuma vir mais escuro e mais vazio (módulo 1.4).' }),
        c.grid2(t, { okTitle: 'Referência boa', ok: ['Screenshot inteiro + "o painel marcado em vermelho"', 'URL exata + texto visível do elemento', 'Nome do componente no código, se souber'], badTitle: 'Referência ruim', bad: ['"Aquele botão"', '"A parte de cima"', 'Screenshot recortado sem contexto'] }),
      ],
    },
    {
      emoji: '🧪', title: 'Prática: uma ação real com rascunho e prova', sub: 'Do contrato ao screenshot final',
      what: 'Um exercício completo em site seu: rascunho, revisão, publicação, prova e rollback se preciso.',
      why: 'O fluxo só vira hábito depois de rodar inteiro uma vez, incluindo o momento de ler o rascunho e achar um erro.',
      keys: 'Exercício completo, rascunho, ok, prova, rollback.',
      body: (t) => [
        c.steps(t, { title: 'Roteiro (site onde você pode editar e apagar)', items: [
          { h: 'Escolha um alvo reversível', text: 'Um post numa comunidade sua, uma página de teste, um item de um painel que você pode apagar.' },
          { h: 'Contrato de quatro partes', text: 'App com URL, resultado, "não faça", prova. Nomes próprios em lista.' },
          { h: 'Fase 1: rascunho', text: 'Leia com atenção. Introduza de propósito um nome parecido no prompt e veja se ele confunde.' },
          { h: 'Fase 2: publicar', text: 'Só após "ok, publique". Receba URL e screenshot.' },
          { h: 'Prova e rollback', text: 'Abra a URL. Se algo divergir, peça a edição pelo mesmo agente e uma nova prova.' },
        ] }),
        c.code(t, { objective: 'Prompt da prática, preenchido para um post de teste', lang: 'text', code: `App: <URL_DA_COMUNIDADE_OU_PÁGINA>, aba já logada.
Tarefa em duas fases. NÃO publique na fase 1.
Fase 1: escreva um post curto de teste com o título "Teste de publicação <DATA>" e o texto "<TEXTO_QUE_VOCÊ_ESCOLHER>". Use exatamente estes nomes: <LISTA>. Mostre e pare.
Fase 2 (após "ok, publique"): publique sem alterações, me devolva a URL e um screenshot.
Não faça: não altere outros posts, não mude configurações, não saia deste domínio.
Se pedir senha ou pagamento, pare e me avise.`, verify: 'Post publicado igual ao rascunho, URL abre, screenshot bate. Depois, peça "apague o post de teste e me mostre a lista sem ele" para fechar o ciclo com rollback.' }),
        c.figure(t, svg.donut(t, { label: 'Onde vai o tempo de uma tarefa de publicação bem feita: maior parte na revisão humana do rascunho, o resto em contrato, execução e prova', center: 'tarefa|de publicar', parts: [
          { title: 'Revisar rascunho', sub: 'você', value: 40 },
          { title: 'Escrever contrato', sub: 'você', value: 20 },
          { title: 'Executar', sub: 'agente', value: 25 },
          { title: 'Conferir prova', sub: 'você', value: 15 },
        ] }), 'Três fatias são suas. É assim que deve ser: o agente executa; a responsabilidade pelo que sai público é de quem lê o rascunho.'),
      ],
    },
  ],
  quiz: [
    { q: 'O agente "descreve" o que faria no site em vez de fazer. Causa mais provável:', options: ['O modelo é antigo', 'A extensão não está vinculada à conta', 'O site bloqueou', 'Faltou "por favor"'], answer: 1, why: 'Sem canal com a aba, o agente não tem ferramenta e responde em texto.' },
    { q: 'Qual passo pega um nome de produto errado num anúncio?', options: ['Aumentar o esforço de raciocínio', 'Pedir "seja cuidadoso"', 'Ler o rascunho antes do "ok, publique"', 'Rodar duas vezes'], answer: 2, why: 'Só a revisão humana do rascunho pega erros de conteúdo que o agente executa com confiança.' },
    { q: 'A tarefa parou pedindo permissão e o app reiniciou. O que fazer?', options: ['Abrir conversa nova e repetir', 'Mesma conversa, "continue"', 'Desinstalar a extensão', 'Trocar de modelo'], answer: 1, why: 'A mesma conversa guarda o estado; nova conversa recomeça do zero.' },
  ],
  summary: [
    ['Extensão', 'instalar, habilitar, vincular, teste de leitura da aba.'],
    ['Rascunho primeiro', 'toda publicação em duas fases; nomes próprios em lista, "use exatamente".'],
    ['Contrato de quatro partes', 'app com URL, resultado, não faça, prova visual.'],
    ['Continue', 'permissão ou reinício: mesma conversa, "continue", nunca recriar.'],
    ['Mostrar, não descrever', 'screenshot anexado no antes; o agente captura o depois.'],
  ],
};

// ---------------------------------------------------------------- 1.4
const M14 = {
  id: '1-4', emoji: '🧑‍💻', title: 'Codar com o Astra: trocar, refatorar, rollback', punch: 'Fork, mudança, prova, git', minutes: 45, level: 'Intermediário', kind: 'Prática',
  lead: 'Três tarefas reais num projeto local: trocar o modelo de um serviço, refatorar a interface e reverter quando o resultado ficou pior. O redesign de um painel saiu pior na primeira rodada e melhor na segunda. O módulo mostra como iterar sem medo: git antes, fork da sessão, critério de aceite, rollback em um comando.',
  topics: [
    {
      emoji: '🔧', title: 'Tarefa 1: trocar o modelo de um serviço local', sub: 'Localizar, editar, reiniciar, provar',
      what: 'A tarefa que abriu o curso, agora com o contrato completo e o git preparado antes.',
      why: 'É a tarefa mais simples que exercita o loop inteiro. Se ela falha, o problema é setup, não modelo.',
      keys: 'git status limpo, contrato, grep como prova, reinício do serviço.',
      body: (t) => [
        c.p('Antes de qualquer tarefa que edita código: árvore limpa no git. Isso transforma rollback em <code>git checkout .</code>. Depois, o contrato. O agente localiza a configuração (sem você apontar), edita, reinicia o serviço e prova com um grep e a página aberta.'),
        c.code(t, { objective: 'Preparar o terreno: garantir árvore limpa e um ponto de retorno', lang: 'bash', code: `cd <PASTA_DO_PROJETO>
git status --short          # deve vir vazio
git add -A && git commit -m "ponto de retorno antes do Astra" 2>/dev/null || true
git log --oneline -1`, verify: '`git status --short` vazio e um commit recente. Se não é repositório git, `git init && git add -A && git commit -m init` antes de continuar.' }),
        c.code(t, { objective: 'Contrato da tarefa 1, no app ou no CLI', lang: 'text', code: `Resultado: o serviço em http://localhost:<PORTA> passa a usar o modelo "gpt-6-astra" no provedor Codex. Serviço reiniciado e respondendo.
Onde: esta pasta.
Prova: (1) saída de \`git diff --stat\`, (2) saída de \`grep -rn "gpt-6-astra" --include=*.{toml,json,yaml,yml,env,ts,js,py} .\`, (3) screenshot da página com o modelo selecionado.
Não faça: não altere outros provedores, não instale nada, não faça commit.`, verify: 'O diff toca um ou dois arquivos de configuração, não dez. O grep mostra o modelo. A página abre com ele. Pergunte ao serviço "qual modelo você é?" e confira.' }),
        c.tip({ title: 'Diff pequeno é o sinal de saúde', text: 'Trocar um modelo é uma linha. Se o diff --stat mostra cinco arquivos, o agente "aproveitou" para arrumar outras coisas. Peça rollback dos extras e ajuste o "Não faça".' }),
      ],
    },
    {
      emoji: '🎨', title: 'Tarefa 2: refatorar a UI sem mudar comportamento', sub: 'Fork da sessão, critério de aceite, antes/depois',
      what: 'Redesign da tela principal com escopo fechado em visual, num fork da sessão, com screenshot de antes e depois como prova.',
      why: '"Mais moderno" sem critério produz telas mais escuras e mais vazias. Critério de aceite e antes/depois transformam gosto em verificação.',
      keys: 'Fork, escopo visual, critério de aceite, antes/depois, sem mudança de rota ou dado.',
      body: (t) => [
        c.p('Abra um fork da sessão principal (a original continua estável). No contrato, feche o escopo: só CSS e marcação, nenhuma rota, nenhum dado, nenhuma dependência. Dê critérios: contraste, espaçamento, hierarquia. Peça o antes/depois capturado pelo próprio agente.'),
        c.code(t, { objective: 'Contrato da refatoração visual (rodar num fork da sessão)', lang: 'text', code: `Resultado: a tela principal com visual mais limpo e moderno. Critérios de aceite:
- texto principal com contraste mínimo 4.5:1 sobre o fundo;
- espaçamento consistente (escala de 4/8/16/24 px);
- hierarquia clara: título > seções > itens;
- nenhuma rota, dado, chamada de API ou dependência alterada.
Onde: esta pasta; só arquivos de estilo e marcação da tela principal.
Prova: \`git diff --stat\`, screenshot antes (./ui-antes.png) e depois (./ui-depois.png) da mesma tela na mesma largura.
Não faça: não toque em lógica, não instale pacotes, não faça commit.`, verify: 'diff --stat só com CSS/HTML/componentes de apresentação. Os dois PNGs existem e mostram a mesma tela. Se "depois" ficou mais vazio (menos informação visível), reprove: pediu limpo, não esvaziado.' }),
        c.figure(t, svg.split(t, { label: 'Duas rodadas do mesmo redesign: primeira sem critério ficou mais escura e vazia; segunda com critério ficou mais legível e organizada', bridge: 'mesmo prompt base, critérios diferentes', left: { title: 'Rodada 1 (sem critério)', items: ['"mais bonito e moderno"', 'fundo mais escuro', 'menos informação na tela', 'você não sabe dizer por que não gostou'] }, right: { title: 'Rodada 2 (com critério)', items: ['contraste ≥ 4.5:1', 'agrupamento por data', 'conexões visíveis entre itens', 'dá para aceitar ou reprovar item a item'] } }), 'O que mudou entre as rodadas não foi o modelo. Foi o contrato ter critérios que um humano ou um script consegue conferir.'),
        c.grid2(t, { okTitle: 'Critério de aceite verificável', ok: ['Contraste numérico', 'Lista do que não pode mudar', 'Screenshot na mesma largura', 'Nenhum arquivo fora de uma lista'], badTitle: 'Critério que não verifica', bad: ['"mais bonito"', '"mais profissional"', '"como um app moderno"', '"você decide"'] }),
      ],
    },
    {
      emoji: '⏪', title: 'Tarefa 3: rollback quando ficou pior', sub: 'Um comando, e a segunda rodada com critério',
      what: 'Como voltar a versão anterior em segundos e reaproveitar a sessão para a rodada seguinte, com o que aprendeu da primeira.',
      why: 'Sem rollback rápido, você aceita o resultado pior por preguiça. Com rollback, iterar é barato e o gosto melhora a cada rodada.',
      keys: 'git checkout, git stash, restore, rodada 2, critério aprendido.',
      body: (t) => [
        c.code(t, { objective: 'Rollback total ou seletivo do que o agente mudou (sem commit feito)', lang: 'bash', code: `# ver o que mudou
git status --short && git diff --stat

# voltar TUDO ao último commit
git checkout -- . && git clean -fd

# OU guardar a tentativa para comparar depois e voltar
git stash push -m "ui rodada 1"
# ...depois, se quiser rever: git stash list / git stash apply`, verify: '`git status --short` vazio após o checkout. Suba o serviço e confirme a tela antiga. O stash guarda a rodada 1 se você quiser reaproveitar partes.' }),
        c.code(t, { objective: 'Rodada 2: pedir a nova versão dizendo o que reprovou na primeira', lang: 'text', code: `Voltei ao estado anterior (git checkout). A rodada anterior ficou pior: mais escura e com menos informação visível. Refaça com estes critérios adicionais:
- manter TODA a informação que existia (nenhum item some);
- agrupar os itens por <CRITÉRIO, ex.: data>;
- mostrar as ligações entre <ELEMENTOS> de forma visível;
- fundo não mais escuro que o atual.
Mesmas provas: git diff --stat + ui-antes.png + ui-depois.png.`, verify: 'Compare ui-depois.png das duas rodadas. A segunda deve ter mais informação legível, não menos. Só então commit.' }),
        c.steps(t, { title: 'Ciclo de iteração', items: [
          { h: 'Rodada N', text: 'Contrato com critérios. Prova.' },
          { h: 'Reprovar com motivo', text: 'Uma frase sobre o que ficou pior. Isso vira critério da próxima.' },
          { h: 'Rollback', text: 'git checkout ou stash. Estado limpo.' },
          { h: 'Rodada N+1', text: 'Mesmo contrato + critérios novos. Quando aprovar: commit com mensagem que diz o que foi aceito.' },
        ] }),
      ],
    },
    {
      emoji: '🧭', title: 'Trabalhar com projetos que você não conhece', sub: 'Reconhecimento antes de mudança',
      what: 'Como usar o agente para mapear um repositório desconhecido antes de delegar mudanças, e como limitar o raio de ação.',
      why: 'O Astra acha o arquivo certo num projeto novo. Isso é bom até ele achar dois e escolher o errado. Reconhecimento primeiro reduz o raio.',
      keys: 'Reconhecimento, mapa de arquivos, raio de ação, lista de arquivos permitidos.',
      body: (t) => [
        c.code(t, { objective: 'Reconhecimento de um repositório desconhecido, sem mudanças', lang: 'text', code: `Leia este repositório. Não altere nada. Responda:
1. Stack e como sobe (comando exato).
2. Onde está a configuração de modelos de IA (arquivo:linha). Se houver mais de um lugar, liste todos e diga qual é o efetivo em runtime.
3. Existe teste? Comando.
4. Os 5 arquivos mais arriscados de tocar e por quê.
Formato: lista curta, caminhos relativos.`, verify: 'Rode o comando de subir e o de teste que ele deu. Se algum falha, o mapa está errado e a próxima tarefa vai errar junto.' }),
        c.code(t, { objective: 'Limitar o raio de ação a uma lista de arquivos', lang: 'text', code: `Você só pode editar estes arquivos: <A>, <B>, <C>. Qualquer outra mudança necessária: pare e me pergunte antes.
Tarefa: <CONTRATO>.`, verify: '`git diff --stat` só lista arquivos da lista. Um arquivo fora dela sem pergunta = reprove e reforce a regra no AGENTS.md.' }),
        c.tip({ title: 'Dois lugares de config', text: 'Projetos crescidos têm a mesma configuração em dois lugares (arquivo e variável de ambiente, ou dois arquivos). Pergunte qual vale em runtime antes de editar; o agente costuma saber, mas só se você perguntar.' }),
      ],
    },
    {
      emoji: '🤖', title: 'Astra dentro do seu agente local', sub: 'Usar a assinatura, não uma chave de API',
      what: 'Como apontar um agente ou serviço local para o Astra usando a sessão do Codex em vez de uma chave paga, e como pedir ao próprio Codex que faça essa troca.',
      why: 'O mesmo modelo pode servir vários agentes seus sem custo de API extra. A troca é uma tarefa delegável.',
      keys: 'Perfil de modelo, provedor Codex, sem chave de API, troca delegada.',
      body: (t) => [
        c.p('Se você roda um agente próprio ou um painel de agentes local, ele provavelmente tem perfis de modelo. Um perfil apontando para o provedor Codex usa o login da sua assinatura. A troca é exatamente a tarefa 1 deste módulo, com um perfil novo em vez de uma edição: o agente do Codex cria o perfil, reinicia e prova.'),
        c.code(t, { objective: 'Delegar a criação de um perfil de modelo no seu agente local', lang: 'text', code: `Resultado: no <NOME_DO_SEU_AGENTE_OU_PAINEL> rodando em http://localhost:<PORTA>, existe um perfil novo chamado "astra" que usa o modelo gpt-6-astra via provedor Codex (login da assinatura, sem chave de API). O perfil aparece no seletor e responde.
Onde: esta pasta.
Prova: \`git diff --stat\`, o trecho de config do perfil novo, e a resposta do perfil a "qual modelo você é?".
Não faça: não remova perfis existentes, não altere o perfil padrão, não faça commit.`, verify: 'O perfil novo aparece no seletor do seu painel e responde com o nome do modelo. Os perfis antigos continuam lá.' }),
        c.alert({ title: 'Chave de API em texto no diff', text: 'Se o diff mostra uma chave (sk-..., token, secret) escrita num arquivo, reprove na hora. Perfis via Codex não precisam de chave; se apareceu uma, o agente inventou um caminho. Rollback e "sem chave de API" em maiúsculas no contrato.' }),
      ],
    },
    {
      emoji: '📋', title: 'Prática: as três tarefas em sequência', sub: 'Trocar, refatorar, reverter, commit',
      what: 'Roteiro fechado que encadeia as três tarefas num projeto seu e termina com um commit revisado.',
      why: 'Encadeadas, as tarefas mostram o custo real: setup uma vez, depois cada iteração é minutos.',
      keys: 'Roteiro, ordem, commit final com mensagem de aceite.',
      body: (t) => [
        c.steps(t, { title: 'Roteiro (40 min)', items: [
          { h: 'Git limpo', text: 'status vazio, commit de ponto de retorno.' },
          { h: 'Tarefa 1', text: 'Trocar modelo. Prova: diff --stat, grep, página.' },
          { h: 'Commit 1', text: '"troca modelo para gpt-6-astra (verificado: página + grep)".' },
          { h: 'Fork + tarefa 2', text: 'Refatoração visual com critérios. Antes/depois.' },
          { h: 'Reprovar ou aceitar', text: 'Reprovou: rollback + rodada 2 com o motivo como critério. Aceitou: commit 2.' },
          { h: 'Tarefa 3 (opcional)', text: 'Perfil "astra" no seu agente local. Commit 3.' },
        ] }),
        c.code(t, { objective: 'Commit final que registra o que foi verificado (você commita, não o agente)', lang: 'bash', code: `git add -A
git commit -m "UI: rodada 2 aceita (contraste ok, nada sumiu, diff só em estilos)"
git log --oneline -3`, verify: 'Três commits (ou dois) com mensagens que dizem o que foi aceito. Quem ler o log daqui a um mês entende o que o agente fez e o que você verificou.' }),
        c.figure(t, svg.curve(t, { label: 'Curva de esforço humano por rodada: alto na primeira (setup, contrato), caindo nas seguintes até estabilizar em revisão e prova', yLabel: 'minutos seus', xLabels: ['setup', 'rodada 1', 'rodada 2', 'rodada 3', 'rodada 4'], series: [{ name: 'seu tempo', values: [20, 14, 8, 6, 6], texts: ['git+contrato', 'reprovar', 'critério', 'prova', 'prova'] }] }), 'O custo cai porque o critério aprendido na rodada 1 vira texto no contrato da rodada 2. Sem rollback barato, a curva não desce: você aceita a rodada 1.'),
      ],
    },
  ],
  quiz: [
    { q: 'Trocar um modelo produziu um diff em cinco arquivos. O que isso indica?', options: ['O projeto é grande', 'O agente extrapolou o escopo; rollback dos extras e "Não faça" mais forte', 'Está tudo certo', 'Faltou esforço high'], answer: 1, why: 'Trocar modelo é uma linha. Diff grande é escopo vazando.' },
    { q: 'Qual critério de aceite é verificável?', options: ['"mais bonito"', '"como um app moderno"', '"contraste mínimo 4.5:1 e nenhum item some"', '"você decide"'], answer: 2, why: 'Números e listas do que não pode mudar podem ser conferidos; gosto não.' },
    { q: 'A rodada de redesign ficou pior. Primeiro passo:', options: ['Aceitar e ajustar depois', 'git checkout (ou stash) e rodada 2 com o motivo como critério', 'Trocar de modelo', 'Apagar a sessão'], answer: 1, why: 'Rollback barato é o que torna a iteração possível; o motivo da reprovação vira critério.' },
  ],
  summary: [
    ['Git antes', 'árvore limpa e commit de retorno tornam rollback um comando.'],
    ['Diff pequeno', 'trocar modelo é uma linha; diff grande é escopo vazando.'],
    ['Critério de aceite', 'números e listas do que não muda; antes/depois na mesma largura.'],
    ['Rollback e rodada 2', 'reprovar com motivo, voltar, pedir de novo com o motivo como critério.'],
    ['Seu agente local no Astra', 'perfil via provedor Codex, sem chave; chave no diff é reprovação.'],
  ],
};

export const T1 = { modules: [M11, M12, M13, M14] };
