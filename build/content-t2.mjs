// Trilha 2 — Construir e escalar (blue) — módulos 2.1 a 2.4
import { c, svg } from './lib.mjs';

const link = (href, txt) => `<a href="${href}" target="_blank" class="text-sky-400 hover:text-sky-300 underline decoration-dotted">${txt}</a>`;
const REMOTION = 'https://www.remotion.dev/';
const BLENDER_MCP = 'https://github.com/ahujasid/blender-mcp';
const MCP_SPEC = 'https://modelcontextprotocol.io/';
const OBSIDIAN = 'https://obsidian.md/';
const CODEX_DOCS = 'https://developers.openai.com/codex/';

// ---------------------------------------------------------------- 2.1
const M21 = {
  id: '2-1', emoji: '📚', title: 'Skills: ensinar a ferramenta e o gosto', punch: 'Remotion num prompt, gosto num arquivo', minutes: 45, level: 'Intermediário', kind: 'Prática',
  lead: 'Um vídeo promocional de 30 segundos, com trilha, saiu de um único prompt porque o agente já tinha a skill do Remotion. O mesmo agente, sem skill, produziu um site sem graça. A diferença entre os dois resultados não é o modelo: é o que foi ensinado antes. Este módulo cobre os dois tipos de skill, a de ferramenta e a de gosto.',
  topics: [
    {
      emoji: '🧩', title: 'O que é uma skill e por que ela muda o resultado', sub: 'Instrução carregada sob demanda, não contexto permanente',
      what: 'A anatomia de uma skill: um arquivo de instruções com metadados que o agente carrega quando a tarefa combina, mais os scripts e referências que ela empacota.',
      why: 'Sem skill, o agente improvisa a partir do que sabe do treino. Com skill, ele segue um procedimento que você escreveu e pode corrigir.',
      keys: 'SKILL.md, frontmatter name/description, carregamento sob demanda, scripts empacotados.',
      body: (t) => [
        c.p('Uma skill é uma pasta com um arquivo de instruções na raiz. O cabeçalho traz nome e uma descrição que diz <em>quando</em> usar. O agente lê só o cabeçalho na maior parte do tempo; quando a tarefa bate com a descrição, carrega o corpo. É por isso que dez skills instaladas não pesam no contexto de uma tarefa que não usa nenhuma.'),
        c.glossary(t, [
          ['Skill', 'Pasta com instruções (e às vezes scripts) que ensina o agente a fazer um tipo de tarefa do seu jeito.'],
          ['Frontmatter', 'O cabeçalho no topo do arquivo, entre três hifens, com nome e descrição. É o que o agente lê para decidir se carrega a skill.'],
          ['Carregamento sob demanda', 'O corpo da skill entra no contexto só quando a descrição casa com a tarefa. Barato por padrão.'],
          ['MCP', 'Protocolo que conecta o agente a um servidor de ferramentas externo (Blender, banco de dados, API). Skill ensina procedimento; MCP dá capacidade nova. Ver módulo 2.2.'],
        ]),
        c.figure(t, svg.split(t, { label: 'Skill contra MCP: a skill ensina procedimento e gosto usando as ferramentas que já existem; o MCP acrescenta ferramentas novas ao agente', bridge: 'usados juntos na mesma tarefa', left: { title: 'Skill', items: ['texto de instrução + scripts', 'ensina COMO fazer', 'carregada sob demanda', 'você escreve e versiona'] }, right: { title: 'MCP', items: ['servidor com ferramentas', 'dá o QUE fazer (capacidade)', 'conectado na config', 'terceiro publica, você conecta'] } }), 'Duas coisas diferentes que costumam ser confundidas. A skill do Remotion não instala o Remotion; ela ensina o agente a usá-lo do jeito certo.'),
        c.code(t, { objective: 'Esqueleto mínimo de uma skill (o cabeçalho é o que decide se ela é usada)', lang: 'markdown', code: `---
name: <nome-em-kebab-case>
description: >-
  <O que faz, em uma frase.> Use quando <gatilho concreto: o tipo de pedido que
  deve acionar isso>. Não cobre <o que fica de fora>.
---

# <Nome>

## Quando usar
<Uma lista curta de situações reais.>

## Procedimento
1. <passo com comando exato>
2. <passo com critério de aceite>

## Erros comuns
- <erro> → <correção mínima>`, verify: 'Peça ao agente "quais skills você tem para <assunto>?". A sua deve aparecer pela descrição. Se não aparecer, a descrição está genérica demais: gatilhos concretos, não adjetivos.' }),
        c.tip({ title: 'A descrição é a interface', text: 'Skill boa com descrição vaga nunca é carregada. Escreva a descrição pensando no pedido que o usuário vai digitar, não no que a skill faz por dentro.' }),
      ],
    },
    {
      emoji: '🎬', title: 'Skill de ferramenta: vídeo com Remotion em um prompt', sub: 'Uma frase, um MP4 de 30 segundos',
      what: `Como o ${link(REMOTION, 'Remotion')} (vídeo escrito em React, código aberto) vira uma skill e o prompt único que produz um promocional completo.`,
      why: 'É o exemplo mais direto do ganho: uma tarefa que levava meia hora de edição saiu em minutos, com trilha, porque o procedimento estava escrito.',
      keys: 'Remotion, composição, render, MP4, prompt único, verificação do arquivo.',
      body: (t) => [
        c.p('Remotion renderiza vídeo a partir de componentes React: você descreve cenas em código, ele exporta MP4. Isso o torna ideal para um agente, que escreve código melhor do que arrasta linha do tempo. Com a skill instalada, o pedido é uma frase; sem ela, o agente reinventa a estrutura do projeto a cada vez e erra o comando de render.'),
        c.code(t, { objective: 'Criar um projeto Remotion e renderizar um promocional de 30 s a partir do README', lang: 'text', code: `Use a skill de Remotion.

Resultado: um vídeo promocional de 30 segundos sobre <PRODUTO/PROJETO>, renderizado em MP4 (1920x1080, 30 fps).
Conteúdo: leia o README desta pasta e extraia os 3 benefícios principais. Uma cena de abertura com o nome, três cenas de benefício, uma cena final com a chamada "<CTA>".
Estilo: <PALETA/TOM, ex.: fundo escuro, tipografia grande, transições curtas>. Trilha: use uma faixa livre de direitos que já exista no projeto, ou deixe sem áudio e me avise.
Onde: ./video/
Prova: caminho do MP4, duração real (\`ffprobe\`) e um frame de cada cena em ./video/frames/.
Não faça: não baixe áudio de fonte com direitos autorais, não instale nada fora do projeto ./video/.`, verify: '`ffprobe video/out.mp4` mostra ~30 s e 1920x1080. Abra os frames: cada cena tem o texto legível e nada cortado. Só então assista ao vídeo inteiro.' }),
        c.code(t, { objective: 'Comandos que você roda para conferir o resultado sem abrir editor', lang: 'bash', code: `# duração, resolução, codec
ffprobe -v error -show_entries format=duration -show_entries stream=width,height,codec_name \\
  -of default=noprint_wrappers=1 video/out.mp4

# extrair um frame por cena (a cada 6 s) para revisão rápida
mkdir -p video/frames && ffmpeg -i video/out.mp4 -vf fps=1/6 video/frames/f%02d.png`, verify: 'Os PNGs mostram texto legível e sem corte nas bordas. Texto cortado é o defeito mais comum de vídeo gerado: margem insuficiente na composição.' }),
        c.alert({ title: 'Trilha sonora tem dono', text: 'Peça explicitamente faixa livre de direitos ou nenhuma. Um agente que "acha uma música" pode trazer material licenciado para dentro do seu projeto, e o problema aparece na publicação, não no render.' }),
      ],
    },
    {
      emoji: '🎨', title: 'Skill de gosto: a biblioteca de referência visual', sub: 'Por que o site "do zero" saiu sem graça',
      what: 'Como transformar exemplos que você admira num guia de design que o agente segue, com regras, medidas e contraexemplos.',
      why: 'Pedir "redesenhe este site para ficar incrível" produziu algo mais escuro, mais vazio e pior que o original. O modelo não tem o seu gosto; ele tem a média da internet.',
      keys: 'Guia de design, exemplos comentados, regras numéricas, contraexemplos, taste library.',
      body: (t) => [
        c.p('Um redesign pedido sem referência sai genérico: fundo escuro, muito espaço vazio, pouca informação. A correção não é um prompt melhor, é uma biblioteca: páginas que você admira, com anotação do <em>porquê</em>, e regras que podem ser conferidas. O agente deixa de adivinhar o seu gosto e passa a aplicar um documento.'),
        c.code(t, { objective: 'Guia de design mínimo que o agente consegue seguir e você consegue conferir', lang: 'markdown', code: `---
name: guia-visual-<projeto>
description: >-
  Regras visuais de <PROJETO>. Use sempre que a tarefa mudar layout, cor,
  tipografia ou componentes de interface deste projeto.
---

# Guia visual

## Referências (o que copiar de cada uma)
- <URL_1> — hierarquia tipográfica: título 3x o corpo, subtítulo em peso médio.
- <URL_2> — densidade: cada tela mostra dados, não só espaço em branco.
- <URL_3> — cor: um acento só, usado no máximo em 3 elementos por tela.

## Regras conferíveis
- Escala de espaçamento: 4 / 8 / 16 / 24 / 40 px. Nada fora dela.
- Contraste do texto principal ≥ 4.5:1; títulos ≥ 3:1.
- Máximo 2 famílias tipográficas; corpo ≥ 16 px.
- Nenhuma tela pode perder informação num redesign: item que existia continua visível.

## Contraexemplos (reprovar na hora)
- Fundo mais escuro e menos conteúdo do que o original.
- Cartões vazios com um ícone e três palavras.
- Gradiente roxo-azul genérico sem relação com a marca.`, verify: 'Rode o mesmo pedido de redesign com e sem o guia carregado. Compare os dois screenshots: com guia, você consegue apontar qual regra cada mudança atende.' }),
        c.grid2(t, { okTitle: 'Referência que ensina', ok: ['URL + o que copiar dela, em uma linha', 'Números: espaçamento, contraste, tamanho', 'Lista do que reprovar na hora', 'Screenshot de uma tela que você aprova'], badTitle: 'Referência que não ensina', bad: ['"Estilo Apple"', '"Moderno e limpo"', 'Lista de URLs sem comentário', '"Use bom gosto"'] }),
        c.figure(t, svg.bars(t, { label: 'Comparação entre o redesign sem guia e com guia, em quatro critérios verificáveis', aLabel: 'sem guia', bLabel: 'com guia', max: 10, items: [
          { label: 'Informação preservada', a: 4, b: 9, aText: 'sumiu conteúdo', bText: 'tudo visível' },
          { label: 'Contraste do texto', a: 5, b: 9, aText: 'baixo', bText: '≥4.5:1' },
          { label: 'Consistência de espaço', a: 5, b: 9, aText: 'ad hoc', bText: 'escala fixa' },
          { label: 'Você sabe reprovar', a: 2, b: 10, aText: '"não gostei"', bText: 'regra X falhou' },
        ] }), 'O ganho maior não é estético: é a última barra. Com guia, reprovar deixa de ser opinião e vira apontar a regra violada.'),
      ],
    },
    {
      emoji: '🔍', title: 'Skills de terceiros: achar, auditar, usar', sub: 'Código de estranho roda na sua máquina',
      what: 'Como pedir ao agente que encontre uma skill pública, audite antes de usar e só então aplique.',
      why: '"Ache uma skill no GitHub e use" é conveniente e perigoso: skills carregam scripts que rodam com as suas permissões.',
      keys: 'Auditoria, scripts embutidos, rede, credenciais, execução em sandbox.',
      body: (t) => [
        c.p('Delegar a busca de uma skill funciona bem. Delegar a decisão de confiar nela, não. O procedimento: o agente encontra candidatas, lê o conteúdo, relata o que os scripts fazem, e só depois de você aprovar é que a skill entra em uso, primeiro num projeto descartável.'),
        c.code(t, { objective: 'Buscar e auditar uma skill pública antes de instalar', lang: 'text', code: `Encontre até 3 skills públicas para <TAREFA>. Para cada uma, NÃO instale e me relate:
1. Repositório, autor, data do último commit, número de estrelas.
2. Todo arquivo executável que ela contém (script, binário) e o que cada um faz, linha a linha nos trechos relevantes.
3. Acessa rede? Para quais domínios? Lê variáveis de ambiente, credenciais, ~/.ssh, ~/.aws, tokens?
4. Precisa de permissão elevada ou instalação global?
Termine com uma recomendação e o risco em uma frase. Não baixe nada para fora de ./sandbox-skills/.`, verify: 'O relatório cita trechos reais dos scripts. Se ele responde só com o README, peça de novo exigindo o conteúdo dos arquivos executáveis. Só instale depois de ler o relatório você mesmo.' }),
        c.grid2(t, { okTitle: 'Sinais de skill segura', ok: ['Sem scripts, só instruções em texto', 'Scripts que só leem e escrevem na pasta do projeto', 'Autor identificável, histórico de commits', 'Sem acesso a credenciais ou rede'], badTitle: 'Sinais de parar', bad: ['Script que lê variáveis de ambiente ou ~/.ssh', 'Instalação global ou sudo', 'Código ofuscado, base64, curl | bash', 'Repositório novo, autor anônimo, zero histórico'] }),
        c.alert({ title: 'Sandbox antes de confiança', text: 'A primeira execução de uma skill de terceiro roda num projeto descartável, com sandbox restrito à pasta e aprovação a pedido (módulo 1.2). Se ela pedir algo fora disso, essa é a resposta sobre confiar.' }),
      ],
    },
    {
      emoji: '🗂️', title: 'Organizar seu conjunto de skills', sub: 'Poucas, específicas, com gatilho claro',
      what: 'Como manter um conjunto de skills que não conflita: nomes, escopos, gatilhos distintos e o que fazer quando duas competem.',
      why: 'Cinco skills disputando o mesmo gatilho fazem o agente escolher errado ou nenhuma. É um problema real, não hipotético.',
      keys: 'Gatilho único, escopo, invocação direta, skill por projeto contra global.',
      body: (t) => [
        c.p('Quando várias skills têm descrições parecidas, o carregamento vira loteria. Duas saídas: gatilhos mutuamente exclusivos nas descrições, ou marcar as antigas como invocação direta apenas, sem gatilho automático. A segunda é o que se faz com versões legadas que precisam existir para manter trabalho antigo.'),
        c.table(t, { headers: ['Situação', 'Sintoma', 'Correção'], rows: [
          ['Duas skills, mesmo assunto', 'A errada é carregada', 'Descrições excludentes: "use quando X e NÃO quando Y"'],
          ['Versões (v1..v5) da mesma skill', 'Conflito permanente', 'Só a atual tem gatilho; as antigas viram invocação direta'],
          ['Skill nunca carrega', 'Ignorada em toda tarefa', 'Descrição genérica; reescreva com o pedido literal do usuário'],
          ['Skill carrega demais', 'Entra em tarefa que não é dela', 'Adicione a cláusula "Não cobre..." na descrição'],
        ], caption: 'O sintoma sempre aparece na escolha, não na execução. Se a skill errada foi carregada, o problema é a descrição.' }),
        c.steps(t, { title: 'Higiene do conjunto', items: [
          { h: 'Uma skill, um resultado', text: 'Se a descrição precisa de "e também", são duas skills.' },
          { h: 'Gatilho no vocabulário do usuário', text: 'Escreva a descrição com as palavras que você digita, não com jargão interno.' },
          { h: 'Projeto contra global', text: 'Regra que vale só num repositório vai no AGENTS.md dele; skill global é para procedimento que atravessa projetos.' },
          { h: 'Revisão trimestral', text: 'Skill não usada em três meses: apague ou marque como invocação direta. Conjunto pequeno escolhe melhor.' },
        ] }),
      ],
    },
    {
      emoji: '🧪', title: 'Prática: escrever a sua primeira skill', sub: 'Um procedimento seu, com prova',
      what: 'Roteiro para transformar um procedimento que você repete em skill, testar o gatilho e verificar o resultado.',
      why: 'A primeira skill própria é o momento em que o agente passa a trabalhar do seu jeito em vez do jeito médio.',
      keys: 'Procedimento repetido, escrita, teste de gatilho, teste de execução.',
      body: (t) => [
        c.steps(t, { title: 'Roteiro (30 min)', items: [
          { h: 'Escolha o procedimento', text: 'Algo que você explica ao agente toda semana: como você quer commits, como monta um relatório, como publica um post.' },
          { h: 'Escreva o corpo primeiro', text: 'Passos com comandos exatos e critérios de aceite. Depois escreva a descrição a partir do pedido que você digitaria.' },
          { h: 'Teste o gatilho', text: 'Sessão nova, pedido natural. A skill tem que ser carregada sem você citá-la.' },
          { h: 'Teste a execução', text: 'Rode a tarefa. Onde o agente improvisou, falta um passo no arquivo.' },
          { h: 'Corrija com o erro real', text: 'Cada erro vira uma linha na seção "Erros comuns". A skill melhora por uso, não por planejamento.' },
        ] }),
        c.code(t, { objective: 'Testar se o gatilho da sua skill funciona (sessão nova, sem citar o nome)', lang: 'text', code: `<Escreva aqui o pedido natural, do jeito que você digitaria num dia normal.>

Antes de executar, me diga: quais skills você carregou para esta tarefa e por quê?`, verify: 'A resposta cita a sua skill pelo nome. Se citar outra ou nenhuma, reescreva a descrição com os termos exatos do seu pedido e teste de novo.' }),
        c.tip({ title: 'Escreva a skill depois de fazer na mão', text: 'Skill escrita antes da primeira execução vira ficção. Faça a tarefa uma vez conversando, anote onde você corrigiu o agente, e transforme essas correções no corpo da skill.' }),
      ],
    },
  ],
  quiz: [
    { q: 'Uma skill que você escreveu nunca é carregada. Causa mais provável:', options: ['O modelo é fraco', 'A descrição é genérica e não bate com o pedido real', 'Falta reiniciar a máquina', 'Precisa de MCP'], answer: 1, why: 'O agente decide pela descrição. Gatilhos concretos, no vocabulário do pedido, resolvem.' },
    { q: 'Qual é a diferença entre skill e MCP?', options: ['Nenhuma, são sinônimos', 'Skill ensina procedimento; MCP adiciona ferramentas novas', 'MCP é mais barato', 'Skill só funciona no CLI'], answer: 1, why: 'A skill do Remotion ensina a usar; ela não instala capacidade nova no agente.' },
    { q: 'O redesign "do zero" saiu genérico. A correção estrutural é:', options: ['Aumentar o esforço de raciocínio', 'Repetir o prompt', 'Dar uma biblioteca de referência com regras conferíveis', 'Trocar de modelo'], answer: 2, why: 'Sem referência, o modelo aplica a média da internet. Regras numéricas tornam o gosto verificável.' },
  ],
  summary: [
    ['Skill é procedimento', 'instruções carregadas sob demanda; a descrição é a interface.'],
    ['Skill de ferramenta', 'Remotion num prompt; verifique com ffprobe e frames antes de assistir.'],
    ['Skill de gosto', 'referências comentadas + regras numéricas + contraexemplos.'],
    ['Terceiros', 'auditar scripts, rede e credenciais antes; primeira execução em projeto descartável.'],
    ['Conjunto enxuto', 'gatilhos excludentes; versões antigas só por invocação direta.'],
  ],
};

// ---------------------------------------------------------------- 2.2
const M22 = {
  id: '2-2', emoji: '🔌', title: 'MCP e trabalhos longos', punch: 'Blender por 45 minutos, sem babá', minutes: 45, level: 'Avançado', kind: 'Prática',
  lead: 'Um jogo de corrida 3D saiu de um prompt porque o agente conectou no Blender por MCP, modelou, exportou e ligou ao código. Trabalhos assim rodam por dezenas de minutos, pedem permissão no meio e às vezes reiniciam. Este módulo cobre conectar um servidor MCP, delegar uma tarefa longa e retomá-la sem perder o progresso.',
  topics: [
    {
      emoji: '🔗', title: 'O que MCP resolve', sub: 'Uma porta padrão para ferramentas externas',
      what: `O ${link(MCP_SPEC, 'Model Context Protocol')}: um servidor expõe ferramentas, o agente as chama como se fossem nativas. O que muda em relação a pedir código.`,
      why: 'Sem MCP, o agente escreve um script que fala com o Blender e torce. Com MCP, ele chama funções, lê o retorno e corrige no mesmo ciclo.',
      keys: 'Servidor MCP, ferramenta, stdio, HTTP, retorno estruturado, ciclo curto.',
      body: (t) => [
        c.p('MCP padroniza como um agente descobre e chama ferramentas de fora. O servidor anuncia o que sabe fazer; o agente chama com argumentos e recebe um retorno estruturado. A diferença prática em relação a "escreva um script": o agente vê o resultado de cada chamada e ajusta na hora, em vez de descobrir o erro só no fim.'),
        c.glossary(t, [
          ['Servidor MCP', 'Programa que expõe ferramentas para o agente. Roda na sua máquina (stdio) ou remoto (HTTP).'],
          ['Ferramenta', 'Uma função com nome, parâmetros e retorno. "criar_cubo(tamanho)" é uma ferramenta.'],
          ['stdio', 'O servidor roda como processo local e conversa pela entrada e saída padrão. O modo mais comum.'],
          ['Retorno estruturado', 'A resposta da ferramenta em formato que o agente entende (dados, não texto livre), o que permite corrigir no mesmo ciclo.'],
        ]),
        c.figure(t, svg.flow(t, { label: 'Ciclo de uma chamada MCP: o agente chama a ferramenta, o servidor executa no aplicativo, devolve resultado estruturado, o agente decide o próximo passo', steps: [
          { title: 'Agente chama', sub: 'ferramenta + argumentos' },
          { title: 'Servidor executa', sub: 'dentro do app real' },
          { title: 'Retorno', sub: 'dados, não prosa' },
          { title: 'Agente corrige', sub: 'próxima chamada' },
        ] }), 'O laço fecha a cada chamada. É por isso que uma tarefa de 45 minutos com MCP converge, enquanto um script único de 45 minutos falha no minuto 3 e você só descobre no fim.'),
        c.tip({ title: 'Antes de escrever um servidor, procure um pronto', text: 'A maioria dos aplicativos populares já tem servidor MCP publicado. Escrever o seu é trabalho de dias; conectar um pronto é um comando. Audite antes de usar, com o mesmo critério de skill de terceiro (módulo 2.1).' }),
        c.grid2(t, { okTitle: 'Caso para MCP', ok: ['Software com API própria (Blender, DAW, CAD)', 'Banco de dados que você consulta muito', 'Serviço interno com muitas operações', 'Qualquer coisa em que o retorno guia o próximo passo'], badTitle: 'Caso para skill ou script', bad: ['Procedimento que só usa arquivos e terminal', 'Tarefa de uma vez só', 'Regra de estilo ou de processo', 'Coisa que a linha de comando já resolve'] }),
      ],
    },
    {
      emoji: '⚙️', title: 'Conectar um servidor MCP no Codex', sub: 'codex mcp add, listar, remover',
      what: 'Os comandos de gerenciamento de servidores MCP no Codex CLI e como confirmar que as ferramentas apareceram para o agente.',
      why: 'A maior parte das falhas de MCP é de conexão, não de uso: servidor não sobe, comando errado, variável de ambiente faltando.',
      keys: 'codex mcp add, list, get, remove, --env, --url, stdio contra HTTP.',
      body: (t) => [
        c.p(`O CLI tem um grupo de comandos para isso. Servidores locais recebem o comando de execução depois de <code>--</code>; servidores remotos usam <code>--url</code>. Variáveis de ambiente vão em <code>--env</code> e só valem para servidores locais. A ${link(CODEX_DOCS, 'documentação do Codex')} traz os detalhes da sua versão.`),
        c.code(t, { objective: 'Adicionar, listar e inspecionar um servidor MCP local', lang: 'bash', code: `# servidor local (stdio): tudo depois de -- é o comando que sobe o servidor
codex mcp add <NOME> --env <CHAVE>=<VALOR> -- <COMANDO> <ARGS>

# servidor remoto (HTTP)
codex mcp add <NOME> --url https://<HOST>/<CAMINHO>

# conferir
codex mcp list
codex mcp get <NOME>

# remover quando não usar mais
codex mcp remove <NOME>`, verify: '`codex mcp list` mostra o servidor. Depois, numa sessão, pergunte "quais ferramentas MCP você tem disponíveis?" e confira se as do servidor aparecem pelo nome.' }),
        c.code(t, { objective: 'Exemplo concreto: conectar o Blender MCP (servidor Python instalado via uv/pipx)', lang: 'bash', code: `# 1. instale o servidor conforme o README do projeto
#    ${BLENDER_MCP}
# 2. registre no Codex (ajuste o comando ao que o README indicar)
codex mcp add blender -- uvx blender-mcp

# 3. abra o Blender e ative o complemento do lado do aplicativo
#    (o servidor fala com o Blender aberto; sem o Blender rodando, as chamadas falham)

codex mcp list`, verify: 'Com o Blender aberto e o complemento ativo, peça "liste os objetos da cena atual do Blender". Uma lista real (mesmo que só o cubo padrão) confirma as duas pontas.' }),
        c.grid2(t, { okTitle: 'Servidor local (stdio)', ok: ['Aplicativo que roda na sua máquina (Blender, editor, banco local)', 'Precisa de acesso a arquivos ou processos seus', 'Latência mínima, sem rede', 'Você controla a versão do servidor'], badTitle: 'Servidor remoto (--url)', bad: ['Serviço da equipe, compartilhado entre pessoas', 'Exige autenticação e sai da sua máquina', 'Depende de rede: trate queda como caso esperado', 'Não use --env: variáveis só valem para stdio'] }),
        c.table(t, { headers: ['Sintoma', 'Causa', 'Ação'], rows: [
          ['Ferramentas não aparecem', 'Servidor não subiu', '`codex mcp get <nome>` e rode o comando na mão para ver o erro'],
          ['Sobe e cai', 'Dependência ou versão', 'Rode o comando do servidor isolado no terminal; leia o stderr'],
          ['Conecta mas falha toda chamada', 'App alvo fechado', 'Abra o aplicativo e ative o complemento do lado dele'],
          ['Pede permissão a cada chamada', 'Política de aprovação', 'Aprovação a pedido é o certo aqui; não passe para "never"'],
        ] }),
      ],
    },
    {
      emoji: '🏎️', title: 'Uma tarefa longa de verdade', sub: 'Modelar, exportar, integrar, testar',
      what: 'O prompt de uma tarefa que roda dezenas de minutos: modelagem 3D via MCP, exportação e integração com o código do jogo, com marcos verificáveis.',
      why: 'Tarefa longa sem marcos é uma caixa preta: você descobre no minuto 40 que o minuto 5 estava errado.',
      keys: 'Marcos intermediários, exportação, integração, teste jogável, tempo esperado.',
      body: (t) => [
        c.p('O truque de tarefas longas é pedir marcos: pontos em que o agente para, mostra evidência e continua. Assim você corrige cedo. Um jogo de corrida 3D tem marcos naturais: cena modelada, assets exportados, pista carregada no jogo, controles respondendo.'),
        c.code(t, { objective: 'Tarefa longa com marcos: jogo de corrida 3D usando Blender por MCP', lang: 'text', code: `Use o servidor MCP do Blender (Blender já está aberto) e o código desta pasta.

Resultado: um protótipo jogável de corrida no navegador, com uma pista 3D modelada no Blender, um veículo controlável e colisão com as bordas da pista.

Marcos (pare e me mostre a evidência em cada um antes de seguir):
M1. Cena do Blender com a pista modelada. Evidência: render de topo em ./art/m1-pista.png e lista de objetos da cena.
M2. Assets exportados em glTF para ./public/models/. Evidência: \`ls -la\` da pasta e tamanho de cada arquivo.
M3. Pista carregada na engine do jogo, câmera posicionada. Evidência: screenshot do jogo rodando.
M4. Veículo controlável com colisão. Evidência: screenshot + como rodar localmente.

Escopo: não instale dependências novas sem me perguntar. Não altere nada fora de ./art, ./public/models e ./src/game.
Tempo esperado: isto pode levar de 20 a 60 minutos. Se algo travar por mais de 5 minutos na mesma etapa, pare e me diga o que travou.`, verify: 'Em cada marco, a evidência existe e você a abre. M2 com arquivos de 0 byte significa exportação falhada, mesmo que o agente diga que deu certo. Só libere o marco seguinte depois de olhar.' }),
        c.figure(t, svg.stack(t, { label: 'Camadas de uma tarefa longa com MCP, de fora para dentro: contrato com marcos, servidor MCP, aplicativo alvo, e no centro o artefato produzido', layers: [
          { title: 'Contrato com marcos', sub: 'evidência em cada parada' },
          { title: 'Servidor MCP', sub: 'ferramentas do aplicativo' },
          { title: 'Aplicativo alvo', sub: 'Blender aberto, complemento ativo' },
          { title: 'Artefato', sub: 'assets exportados e integrados' },
        ] }), 'Se qualquer camada de fora estiver frouxa, o artefato do centro sai errado e você descobre tarde. Os marcos são o que traz a descoberta para perto do erro.'),
        c.alert({ title: 'Tempo longo não é sinal de progresso', text: 'Uma tarefa que roda 45 minutos pode estar tentando a mesma chamada falha desde o minuto 4. A cláusula "se travar 5 minutos na mesma etapa, pare e me diga" transforma silêncio em relatório.' }),
      ],
    },
    {
      emoji: '🔁', title: 'Retomar: permissões, reinícios, "continue"', sub: 'A tarefa longa vai parar; o trabalho não precisa se perder',
      what: 'O que fazer quando a tarefa para no meio por permissão nova, reinício do aplicativo ou queda do servidor MCP.',
      why: 'Recomeçar do zero uma tarefa de 40 minutos por causa de uma parada de 10 segundos é o desperdício mais caro do curso.',
      keys: 'Mesma conversa, continue, estado dos marcos, reconexão do servidor.',
      body: (t) => [
        c.p('Tarefas com MCP pedem permissão quando tocam algo novo e às vezes o aplicativo reinicia. A regra é a mesma do módulo 1.3: volte à mesma conversa e mande continuar. Com marcos, a retomada é ainda mais barata, porque o estado está registrado em evidências no disco.'),
        c.code(t, { objective: 'Retomar uma tarefa longa deixando o estado explícito', lang: 'text', code: `continue.

Antes de agir: confira o que já existe no disco (./art, ./public/models, ./src/game), me diga qual foi o último marco concluído com evidência real e qual é o próximo passo. Não refaça marcos já concluídos.`, verify: 'A resposta cita arquivos que existem (confira com `ls`). Se ela propõe recomeçar do M1 com os arquivos do M2 no disco, corrija apontando os caminhos.' }),
        c.steps(t, { title: 'Quando o servidor MCP cai', items: [
          { h: 'Confirme as duas pontas', text: 'Aplicativo aberto? Complemento ativo? `codex mcp list` mostra o servidor?' },
          { h: 'Teste uma chamada barata', text: '"liste os objetos da cena" antes de retomar a tarefa pesada.' },
          { h: 'Retome na mesma conversa', text: '"continue" com o pedido de conferir o disco primeiro.' },
          { h: 'Se o contexto sumiu', text: 'Cole o contrato original e a lista de marcos concluídos. Custa um prompt, não 40 minutos.' },
        ] }),
        c.tip({ title: 'Uma conversa por tarefa longa, com pin', text: 'Tarefa de MCP compartilhando conversa com outra tarefa faz "continue" retomar a errada. Pin na criação (módulo 1.1) resolve.' }),
      ],
    },
    {
      emoji: '🧭', title: 'Escolher entre MCP, skill e computer use', sub: 'Três formas de alcançar o mesmo aplicativo',
      what: 'Critério de decisão: quando conectar por MCP, quando ensinar por skill e quando simplesmente operar a tela.',
      why: 'Usar computer use onde existe MCP é lento e frágil. Montar MCP para uma tarefa única é trabalho jogado fora.',
      keys: 'Frequência, existência de API, custo de setup, fragilidade.',
      body: (t) => [
        c.table(t, { headers: ['Situação', 'Caminho', 'Por quê'], rows: [
          ['App com MCP pronto, uso recorrente', 'MCP', 'Retorno estruturado, ciclo curto, sem screenshot'],
          ['App sem API, uso único', 'Computer use', 'Setup zero; a fragilidade não importa numa vez'],
          ['App sem API, uso semanal', 'Computer use uma vez, depois ferramenta', 'Mapeie com a tela, gere a linha de comando, rode barato'],
          ['Procedimento seu, ferramentas que já existem', 'Skill', 'Não falta capacidade, falta método'],
          ['App com API mas sem MCP', 'Script + skill', 'Mais simples que escrever um servidor'],
        ], caption: 'A pergunta que decide: com que frequência isso vai se repetir, e existe retorno estruturado disponível?' }),
        c.figure(t, svg.scale(t, { label: 'Balança entre custo de montar a integração e custo de repetir a tarefa na tela', tilt: 0, left: { title: 'Montar (MCP/ferramenta)', lines: ['custo alto uma vez', 'rápido e estável depois', 'roda com modelo barato'] }, right: { title: 'Operar a tela', lines: ['custo zero de setup', 'caro a cada execução', 'frágil a mudanças de interface'] } }), 'A balança vira na terceira ou quarta repetição. Antes disso, operar a tela é honesto; depois, é desperdício.'),
      ],
    },
    {
      emoji: '🧪', title: 'Prática: conectar um MCP e rodar uma tarefa com marcos', sub: 'Do add à evidência final',
      what: 'Roteiro para conectar um servidor MCP à sua escolha e rodar uma tarefa média com três marcos.',
      why: 'Conectar sem rodar tarefa real não prova nada; a primeira tarefa é onde aparecem os problemas de permissão e de estado do aplicativo.',
      keys: 'Escolha do servidor, conexão, chamada barata, tarefa com marcos, remoção.',
      body: (t) => [
        c.steps(t, { title: 'Roteiro (40 min)', items: [
          { h: 'Escolha um servidor', text: 'Blender se você modela; ou um MCP de banco de dados, de navegador, do seu serviço interno. Prefira um que você consegue verificar.' },
          { h: 'Conecte e liste', text: '`codex mcp add ... && codex mcp list`. Depois pergunte ao agente quais ferramentas ele vê.' },
          { h: 'Chamada barata primeiro', text: 'Uma operação de leitura. Se falhar aqui, não adianta delegar a tarefa grande.' },
          { h: 'Tarefa com 3 marcos', text: 'Escreva o contrato com evidência por marco e a cláusula de travamento de 5 minutos.' },
          { h: 'Confira cada marco', text: 'Abra as evidências. Libere o próximo só depois.' },
          { h: 'Limpe', text: '`codex mcp remove` se foi um teste. Servidor conectado é superfície de ataque parada.' },
        ] }),
        c.code(t, { objective: 'Chamada barata de verificação, antes de qualquer tarefa pesada', lang: 'text', code: `Usando o servidor MCP <NOME>: faça a operação de leitura mais simples que ele oferece e me mostre o retorno bruto. Não modifique nada.`, verify: 'O retorno bruto aparece e faz sentido para o aplicativo alvo. Erro aqui é conexão ou aplicativo fechado, não prompt.' }),
      ],
    },
  ],
  quiz: [
    { q: 'Por que uma tarefa longa via MCP converge melhor que um script único?', options: ['O modelo é mais rápido', 'O agente vê o retorno de cada chamada e corrige no mesmo ciclo', 'MCP usa menos tokens', 'Scripts não funcionam com IA'], answer: 1, why: 'O retorno estruturado a cada chamada encurta o laço entre erro e correção.' },
    { q: 'O servidor MCP conecta mas toda chamada falha. Primeira hipótese:', options: ['Modelo errado', 'O aplicativo alvo está fechado ou sem o complemento ativo', 'Falta esforço high', 'Precisa de skill'], answer: 1, why: 'O servidor fala com o aplicativo aberto; sem a outra ponta, a conexão existe e a chamada não.' },
    { q: 'Você opera a mesma busca num site sem API toda semana. Melhor caminho:', options: ['Computer use toda semana', 'Mapear uma vez com computer use e gerar uma ferramenta', 'Escrever um servidor MCP para o site', 'Fazer na mão'], answer: 1, why: 'A balança vira na terceira repetição: custo único de montar contra custo recorrente de operar a tela.' },
  ],
  summary: [
    ['MCP dá capacidade', 'ferramentas com retorno estruturado; o laço curto é o ganho.'],
    ['Conexão é a falha comum', 'codex mcp add/list/get; teste com chamada de leitura barata.'],
    ['Marcos em tarefa longa', 'evidência a cada parada e cláusula de travamento de 5 minutos.'],
    ['Retomar', 'mesma conversa, "continue", conferindo o disco antes de refazer.'],
    ['Escolher o caminho', 'frequência e retorno estruturado decidem entre MCP, ferramenta, skill e tela.'],
  ],
};

// ---------------------------------------------------------------- 2.3
const M23 = {
  id: '2-3', emoji: '📉', title: 'Cota, custo e orquestração', punch: 'O caro planeja, o barato executa', minutes: 40, level: 'Intermediário', kind: 'Prática',
  lead: 'Quarenta minutos de trabalho intenso consumiram cerca de um quarto da cota semanal. Isso não é problema se você souber ler o medidor e separar o que exige o modelo de fronteira do que não exige. Este módulo cobre leitura de cota, previsão, e o padrão de orquestração que multiplica o alcance da mesma assinatura.',
  topics: [
    {
      emoji: '📊', title: 'Ler o medidor antes de precisar dele', sub: 'Janela, percentual, reset',
      what: 'Onde ver o consumo no Codex, como interpretar as janelas (sessão, semana) e o que significa o reset.',
      why: 'Quem só olha a cota quando ela acaba descobre o limite no meio de uma tarefa longa, que é o pior momento possível.',
      keys: 'Janela semanal, percentual restante, reset, créditos extras.',
      body: (t) => [
        c.p('O Codex mostra o consumo por janela: uma de curto prazo e outra semanal, com data de reinício. Numa sessão de trabalho pesado, a semanal caiu cerca de 25 pontos em quarenta minutos. A leitura útil não é o número absoluto: é a taxa. Percentual consumido dividido pelo tempo de trabalho dá quantas horas de trabalho pesado ainda cabem na semana.'),
        c.code(t, { objective: 'Estimativa rápida de autonomia a partir de duas leituras do medidor', lang: 'bash', code: `# anote dois pares (percentual restante, minutos de trabalho pesado) no mesmo dia
# exemplo: 90% às 0 min, 75% aos 40 min
# taxa = (90 - 75) / 40 = 0,375 pontos por minuto
# autonomia restante = 75 / 0,375 = 200 minutos de trabalho pesado

python3 -c "
p0, m0 = 90, 0
p1, m1 = 75, 40
taxa = (p0 - p1) / (m1 - m0)
print(f'taxa: {taxa:.2f} pontos/min')
print(f'restam ~{p1/taxa:.0f} min de trabalho pesado')
"`, verify: 'Compare a previsão com o consumo real no dia seguinte. Se errou muito, sua mistura de tarefas mudou: tarefas com computer use e MCP consomem bem mais que edição de texto.' }),
        c.data({ title: 'O que puxa a cota para baixo', items: [
          'Computer use: cada passo carrega uma captura de tela para o modelo. É o mais caro por minuto.',
          'Esforço de raciocínio alto: mais tokens de raciocínio na mesma tarefa.',
          'Tarefas longas com MCP: dezenas de chamadas e retornos no mesmo contexto.',
          'Contexto grande: repositório inteiro lido a cada sessão nova em vez de reconhecimento salvo.',
        ] }),
        c.tip({ title: 'Meça no seu pior dia, não no melhor', text: 'A taxa de consumo de um dia de leitura e texto engana. Calcule com um dia de computer use e MCP: é esse número que decide se a semana chega ao fim.' }),
        c.figure(t, svg.curve(t, { label: 'Consumo da cota semanal ao longo de uma semana de trabalho, com e sem orquestração', yLabel: '% consumido', xLabels: ['seg', 'ter', 'qua', 'qui', 'sex'], series: [
          { name: 'tudo no modelo de fronteira', values: [25, 50, 72, 90, 100], texts: ['25', '50', '72', '90', 'acabou'] },
          { name: 'com orquestração', values: [12, 24, 34, 44, 55], texts: ['12', '24', '34', '44', '55'] },
        ] }), 'Mesma quantidade de trabalho, duas curvas. A diferença é o que foi delegado para modelos mais baratos, não menos trabalho feito.'),
      ],
    },
    {
      emoji: '🎚️', title: 'Escolher o esforço certo para cada tarefa', sub: 'medium é o padrão; high é exceção',
      what: 'Como o nível de esforço de raciocínio muda custo e resultado, e uma tabela de decisão por tipo de tarefa.',
      why: 'Rodar tudo em high é a forma mais silenciosa de queimar a cota sem melhorar o resultado.',
      keys: 'model_reasoning_effort, medium, high, tarefas que se beneficiam.',
      body: (t) => [
        c.p('Esforço alto ajuda quando o gargalo é raciocínio: um bug que atravessa módulos, uma migração com ordem de operações, uma decisão de arquitetura. Não ajuda quando o gargalo é contexto: se o agente não sabe onde está o arquivo, pensar mais não resolve, ler resolve.'),
        c.table(t, { headers: ['Tarefa', 'Esforço', 'Por quê'], rows: [
          ['Trocar valor de configuração', 'low/medium', 'Achar e editar; raciocínio não é o gargalo'],
          ['Refatorar CSS com critérios', 'medium', 'Muitas edições simples, critérios explícitos'],
          ['Gerar vídeo com skill', 'medium', 'O procedimento está escrito na skill'],
          ['Bug intermitente entre módulos', 'high', 'Hipóteses concorrentes, precisa raciocinar'],
          ['Migração de dados com ordem', 'high', 'Erro custa caro, ordem importa'],
          ['Reconhecimento de repo novo', 'medium', 'Leitura, não dedução'],
        ], caption: 'Regra: comece em medium. Suba para high quando a falha for de raciocínio, não de contexto.' }),
        c.grid2(t, { okTitle: 'Sinais de que high vale a pena', ok: ['O agente propôs duas soluções e escolheu a pior', 'A falha se repete com o mesmo raciocínio errado', 'A tarefa exige ordem correta de operações', 'Erro custa caro e é difícil de reverter'], badTitle: 'Sinais de que high é desperdício', bad: ['O agente não achou o arquivo (falta contexto, não raciocínio)', 'O procedimento já está escrito numa skill', 'A tarefa é repetição de um padrão conhecido', 'Você só quer "garantir", sem sintoma nenhum'] }),
        c.code(t, { objective: 'Rodar a mesma tarefa em dois níveis e comparar custo e resultado', lang: 'bash', code: `# medium (padrão do config)
codex exec --skip-git-repo-check "<TAREFA>" > /tmp/saida-medium.txt

# high só nesta chamada
codex exec --skip-git-repo-check -c model_reasoning_effort="high" "<TAREFA>" > /tmp/saida-high.txt

diff /tmp/saida-medium.txt /tmp/saida-high.txt | head -40`, verify: 'Se o diff é irrelevante para o seu objetivo, essa família de tarefas roda em medium para sempre. Anote a conclusão no AGENTS.md do projeto.' }),
      ],
    },
    {
      emoji: '🪜', title: 'Orquestração: o caro planeja, o barato executa', sub: 'O padrão que estica a assinatura',
      what: 'Como usar o modelo de fronteira para planejar e decidir, e modelos locais ou mais baratos para o volume de execução.',
      why: 'A maior parte do trabalho de um projeto é repetitivo e não precisa de fronteira. Separar as duas coisas multiplica quanto você faz com a mesma cota.',
      keys: 'Planejador, executor, plano em arquivo, modelo local, API barata.',
      body: (t) => [
        c.p('O padrão: o modelo forte lê o problema e produz um plano detalhado, com passos, critérios e comandos. Esse plano vira um arquivo. Um modelo mais barato (local ou API econômica) executa passo a passo, e o forte só volta para revisar o resultado ou destravar. O forte aparece duas vezes; o barato, vinte.'),
        c.figure(t, svg.fanout(t, { label: 'Orquestração: o modelo de fronteira produz um plano que se ramifica em muitas execuções feitas por modelos mais baratos', center: 'Astra|planeja e|revisa', groups: [
          { n: 1, title: 'Plano em arquivo', sub: 'passos, critérios, comandos' },
          { n: 8, title: 'Execuções repetitivas', sub: 'modelo local ou API barata' },
          { n: 1, title: 'Revisão final', sub: 'volta ao modelo forte' },
          { n: 1, title: 'Destravamento', sub: 'só quando o barato empaca' },
        ] }), 'Dez unidades de trabalho, duas passagens pelo modelo caro. É a mesma lógica de mapear um site uma vez e rodar a ferramenta muitas.'),
        c.code(t, { objective: 'Passo 1: pedir ao modelo forte um plano executável por um modelo mais fraco', lang: 'text', code: `Produza um plano de execução para: <OBJETIVO>.

O plano será executado por um modelo mais fraco, que não tem o seu contexto. Portanto:
- cada passo deve ser autocontido (caminhos completos, comandos exatos);
- cada passo tem um critério de aceite verificável por comando;
- nenhum passo pode exigir julgamento estético ou decisão de arquitetura: essas decisões você toma agora e escreve como regra;
- liste no fim os pontos em que o executor deve parar e me chamar.

Salve em ./PLANO.md. Não execute nada.`, verify: 'Leia PLANO.md: cada passo tem comando e critério. Passo com "ajuste conforme necessário" é passo que o modelo fraco vai errar; peça reescrita desse passo.' }),
        c.code(t, { objective: 'Passo 2: executar o plano com um modelo mais barato, um passo por vez', lang: 'bash', code: `# exemplo com modelo local via CLI (ajuste ao seu provedor)
codex exec --oss -m <MODELO_LOCAL> --skip-git-repo-check \\
  "Leia ./PLANO.md. Execute APENAS o passo <N>. Ao terminar, rode o critério de aceite do passo e cole a saída. Não avance para o próximo passo."

# revisão final volta ao modelo forte
codex exec -m gpt-6-astra --skip-git-repo-check \\
  "Revise o resultado da execução de ./PLANO.md: git diff --stat, e diga quais critérios de aceite não foram cumpridos."`, verify: 'O passo executado tem a saída do critério colada. A revisão final aponta divergências específicas, não um "está tudo certo".' }),
        c.tip({ title: 'O plano é o produto', text: 'Se o plano está bom, o executor barato funciona. Se o executor erra sempre no mesmo passo, o defeito está no plano, não no modelo. Corrija o arquivo.' }),
      ],
    },
    {
      emoji: '🤖', title: 'Ligar o Astra aos seus agentes sem chave de API', sub: 'A assinatura como provedor',
      what: 'Como um agente ou painel próprio pode usar o Astra através do login do Codex em vez de uma chave paga, e os limites disso.',
      why: 'Se você já paga a assinatura, apontar seus agentes para ela evita uma segunda conta de API. A cota passa a ser compartilhada, o que muda o cálculo.',
      keys: 'Provedor Codex, login da assinatura, cota compartilhada, limite de concorrência.',
      body: (t) => [
        c.p('Um agente local configurado para usar o provedor do Codex aproveita a sessão autenticada da assinatura. O ganho é direto: modelo de fronteira nos seus agentes sem chave separada. O custo é que tudo passa a consumir a mesma cota: sessões do Codex, seus agentes e qualquer automação.'),
        c.grid2(t, { okTitle: 'Bom uso da cota compartilhada', ok: ['Um agente pessoal que você usa sozinho', 'Automações pontuais, sob demanda', 'Planejamento e revisão (poucas chamadas caras)', 'Prototipar antes de decidir se vale API'], badTitle: 'Mau uso', bad: ['Serviço com muitos usuários simultâneos', 'Laço automático sem teto de chamadas', 'Executor de volume (isso é trabalho do modelo barato)', 'Produção com necessidade de disponibilidade garantida'] }),
        c.alert({ title: 'Automação sem teto zera a cota dormindo', text: 'Antes de ligar qualquer laço automático ao provedor da assinatura, coloque um teto: número máximo de chamadas por execução e por dia. Um laço com erro roda a noite inteira.' }),
        c.code(t, { objective: 'Teto simples para um laço automático que chama o agente', lang: 'bash', code: `MAX=20
for i in $(seq 1 $MAX); do
  codex exec --skip-git-repo-check "<TAREFA_DO_ITEM $i>" || break
done
echo "encerrado após no máximo $MAX chamadas"`, verify: 'Rode com MAX=2 primeiro e confira o consumo antes e depois no medidor. Só então aumente.' }),
      ],
    },
    {
      emoji: '⏱️', title: 'Reduzir custo sem reduzir trabalho', sub: 'Cinco ajustes que economizam de verdade',
      what: 'Práticas concretas que baixam o consumo: reconhecimento salvo, escopo fechado, contexto enxuto, computer use só quando necessário, ferramenta em vez de repetição.',
      why: 'A economia real vem de não repetir trabalho que já foi feito, não de escrever prompts mais curtos.',
      keys: 'Reconhecimento salvo, escopo, contexto, ferramenta, repetição.',
      body: (t) => [
        c.steps(t, { title: 'Os cinco ajustes, em ordem de impacto', items: [
          { h: 'Salve o reconhecimento do repositório', sub: 'maior economia isolada', text: 'O mapa do projeto (módulo 1.4) vai para um arquivo no repo. Sessões novas leem o arquivo em vez de reler o código inteiro.' },
          { h: 'Feche o escopo em toda tarefa', sub: 'evita trabalho não pedido', text: 'A lista de arquivos permitidos impede o agente de "aproveitar e arrumar" outras coisas, que custa tokens e revisão.' },
          { h: 'Computer use só onde não há alternativa', sub: 'o mais caro por minuto', text: 'Se existe comando, API ou MCP, use. Captura de tela a cada passo é o item mais caro do curso.' },
          { h: 'Vire ferramenta o que se repete', sub: 'custo único contra recorrente', text: 'Terceira repetição da mesma tarefa: peça uma linha de comando e rode com modelo barato daí em diante.' },
          { h: 'Esforço medium por padrão', sub: 'ajuste fino', text: 'high só quando a falha é de raciocínio. Anote no AGENTS.md quais famílias de tarefa precisam.' },
        ] }),
        c.code(t, { objective: 'Salvar o reconhecimento do repositório para reaproveitar em toda sessão', lang: 'text', code: `Escreva ./MAPA.md com o reconhecimento deste repositório:
- stack e comandos (subir, testar, build), exatos;
- estrutura de pastas com uma linha por pasta relevante;
- onde ficam configurações sensíveis (modelo, credenciais, endpoints) com arquivo:linha;
- os 5 arquivos mais arriscados e por quê;
- decisões de arquitetura que não são óbvias pelo código.

Depois adicione ao AGENTS.md a linha: "Leia MAPA.md antes de qualquer tarefa neste repositório."`, verify: 'Sessão nova: peça "qual o comando para rodar os testes aqui?" e veja se responde sem reler o projeto. Atualize MAPA.md quando a estrutura mudar.' }),
      ],
    },
    {
      emoji: '🧪', title: 'Prática: medir, planejar, orquestrar', sub: 'Uma tarefa real dividida entre dois modelos',
      what: 'Roteiro que mede o consumo de uma tarefa feita inteira no modelo forte e da mesma tarefa dividida entre planejador e executor.',
      why: 'O número que convence é o seu, no seu projeto. A medição leva vinte minutos e decide o seu fluxo pelos próximos meses.',
      keys: 'Medição antes e depois, plano, execução barata, comparação de resultado.',
      body: (t) => [
        c.steps(t, { title: 'Roteiro (40 min)', items: [
          { h: 'Escolha uma tarefa repetitiva real', text: 'Algo com dez ou mais passos parecidos: renomear em vários arquivos, gerar variações, aplicar um padrão.' },
          { h: 'Meça o baseline', text: 'Anote o percentual da cota, rode tudo no modelo forte, anote de novo. Guarde o resultado.' },
          { h: 'Rollback', text: 'git checkout para voltar ao estado inicial.' },
          { h: 'Plano', text: 'Peça o PLANO.md ao modelo forte. Leia e corrija os passos vagos.' },
          { h: 'Execução barata', text: 'Rode os passos com o modelo mais barato que você tem, um por vez.' },
          { h: 'Compare', text: 'Consumo de cota e qualidade do resultado, lado a lado. Decida qual família de tarefa vira orquestrada.' },
        ] }),
        c.code(t, { objective: 'Comparar os dois resultados de forma objetiva', lang: 'bash', code: `# guarde os dois estados em branches
git checkout -b baseline-forte && git add -A && git commit -m "tudo no modelo forte"
git checkout main && git checkout -- .
# ...depois da execução orquestrada:
git checkout -b orquestrado && git add -A && git commit -m "plano + executor barato"
git diff baseline-forte orquestrado --stat`, verify: 'O diff entre as duas branches mostra se o resultado é equivalente. Diferença pequena e cota bem menor significa que essa família de tarefa deve ser orquestrada sempre.' }),
      ],
    },
  ],
  quiz: [
    { q: 'Qual atividade consome mais cota por minuto?', options: ['Edição de texto', 'Computer use com captura de tela a cada passo', 'Leitura de um arquivo', 'Rodar testes'], answer: 1, why: 'Cada passo carrega uma imagem da tela para o modelo.' },
    { q: 'Quando subir o esforço de raciocínio para high?', options: ['Sempre, por segurança', 'Quando a falha é de raciocínio, não de contexto', 'Quando a tarefa é longa', 'Quando a cota está cheia'], answer: 1, why: 'Se o agente não sabe onde está o arquivo, pensar mais não resolve; ler resolve.' },
    { q: 'No padrão de orquestração, o modelo de fronteira aparece:', options: ['Em todos os passos', 'Só no plano e na revisão', 'Nunca', 'Só quando o barato falha'], answer: 1, why: 'Ele planeja e revisa; o volume de execução vai para o modelo barato, com destravamento pontual.' },
  ],
  summary: [
    ['Leia a taxa, não o número', 'dois pares de leitura dão a autonomia restante em minutos.'],
    ['medium por padrão', 'high só quando o gargalo é raciocínio; meça com o mesmo prompt nos dois.'],
    ['Orquestrar', 'o forte produz PLANO.md autocontido; o barato executa passo a passo.'],
    ['Cota compartilhada', 'agentes próprios via assinatura precisam de teto de chamadas.'],
    ['Economia real', 'reconhecimento salvo, escopo fechado, ferramenta em vez de repetição.'],
  ],
};

// ---------------------------------------------------------------- 2.4
const M24 = {
  id: '2-4', emoji: '🧠', title: 'Memória compartilhada e o sistema completo', punch: 'Um cérebro em arquivos, vários agentes', minutes: 45, level: 'Avançado', kind: 'Prática',
  lead: 'O incômodo mais citado por quem usa vários agentes é que eles não sabem nada uns dos outros: cada conversa recomeça do zero. A saída não é um produto, é um formato: notas em arquivos de texto numa pasta que todos os agentes leem e escrevem. Este módulo monta essa camada e junta tudo o que o curso construiu.',
  topics: [
    {
      emoji: '🧩', title: 'O problema: contexto que não atravessa sessões', sub: 'Cada conversa é uma amnésia nova',
      what: 'Por que agentes não compartilham contexto por padrão e quais são as três formas de resolver: no prompt, no repositório, numa base comum.',
      why: 'Reexplicar o projeto a cada sessão é o custo invisível mais alto do trabalho com agentes, em tempo e em cota.',
      keys: 'Contexto por sessão, instruções de projeto, base de conhecimento comum.',
      body: (t) => [
        c.p('Sessões são isoladas por desenho: cada uma nasce sem saber o que a anterior descobriu. Projetos e instruções resolvem parte disso dentro de uma ferramenta. O que não se resolve sozinho é o contexto que atravessa ferramentas: o que você decidiu num agente e precisa valer no outro.'),
        c.figure(t, svg.stack(t, { label: 'Três camadas de memória, da mais volátil à mais durável: contexto da sessão, instruções do projeto, base de conhecimento em arquivos', layers: [
          { title: 'Contexto da sessão', sub: 'morre ao fechar' },
          { title: 'Instruções do projeto', sub: 'AGENTS.md, vale num repo' },
          { title: 'Reconhecimento salvo', sub: 'MAPA.md, vale no repo' },
          { title: 'Base em arquivos', sub: 'atravessa ferramentas e projetos' },
        ] }), 'Cada camada de baixo sobrevive mais que a de cima. A da base é a única que serve a dois agentes diferentes ao mesmo tempo.'),
        c.table(t, { headers: ['O que guardar', 'Onde', 'Por quê'], rows: [
          ['Como rodar e testar este projeto', 'AGENTS.md do repo', 'Vale para toda sessão daquela pasta'],
          ['Mapa e riscos do repo', 'MAPA.md do repo', 'Evita releitura completa'],
          ['Decisões que atravessam projetos', 'Base em arquivos', 'Vários agentes, vários repos'],
          ['Preferências suas de trabalho', 'Base em arquivos', 'Estilo, formato de entrega, o que reprovar'],
          ['Segredos, chaves, senhas', 'Gerenciador de segredos', 'Nunca em nota nem em repo'],
        ] }),
      ],
    },
    {
      emoji: '📓', title: 'Uma base em arquivos de texto', sub: 'Markdown numa pasta é a interface universal',
      what: `Como montar a base com ${link(OBSIDIAN, 'Obsidian')} ou qualquer editor de markdown: estrutura de pastas, formato de nota, links entre notas.`,
      why: 'Texto em pasta é lido por todo agente, versionável por git, e não depende de nenhum fornecedor continuar existindo.',
      keys: 'Markdown, pasta, uma ideia por arquivo, links, frontmatter.',
      body: (t) => [
        c.p('O formato importa mais que a ferramenta. Uma nota por ideia, nome descritivo, um cabeçalho pequeno com tipo e data, links entre notas relacionadas. O Obsidian dá visualização e busca em cima disso, mas qualquer agente com acesso ao disco lê a mesma pasta.'),
        c.code(t, { objective: 'Estrutura inicial da base e o formato de uma nota', lang: 'bash', code: `mkdir -p ~/base/{decisoes,projetos,ferramentas,pessoas,diario}

cat > ~/base/decisoes/orquestracao-modelo-barato.md <<'EOF'
---
tipo: decisao
data: 2026-09-07
projetos: [<projeto-a>, <projeto-b>]
---

# Orquestração: fronteira planeja, barato executa

Tarefas repetitivas de 10+ passos usam PLANO.md gerado pelo modelo de fronteira
e execução com modelo local. Medido em <projeto-a>: consumo de cota caiu de
25% para 11% com resultado equivalente.

Relacionado: [[cota-semanal-como-ler]], [[plano-executavel-formato]]
EOF

ls -R ~/base | head -20`, verify: 'A pasta existe com a nota dentro. Abra num editor de markdown e confirme que o cabeçalho e os links aparecem como texto legível.' }),
        c.grid2(t, { okTitle: 'Nota que serve a um agente', ok: ['Uma decisão ou fato por arquivo', 'Data e projetos no cabeçalho', 'O porquê, não só o quê', 'Links para notas relacionadas'], badTitle: 'Nota que atrapalha', bad: ['Arquivo gigante com tudo', 'Sem data (o agente não sabe se ainda vale)', 'Só conclusão, sem contexto', 'Segredos e credenciais'] }),
        c.alert({ title: 'Nota velha vira instrução errada', text: 'Um agente lê a base como verdade. Nota sem data ou desatualizada faz ele recomendar um comando que não existe mais. Datar tudo e revisar o que envelhece é parte do custo dessa camada.' }),
      ],
    },
    {
      emoji: '🔄', title: 'Conectar os agentes à base', sub: 'Ler antes de agir, escrever depois de decidir',
      what: 'Como fazer cada agente ler a base no início e registrar decisões no fim, por instrução de projeto ou por servidor MCP de arquivos.',
      why: 'Base que ninguém lê é pasta morta. A conexão precisa ser automática, não uma lembrança sua.',
      keys: 'Instrução de leitura, busca por termo, registro ao fim, MCP de sistema de arquivos.',
      body: (t) => [
        c.p('Duas ligações. Na entrada: uma instrução permanente mandando consultar a base antes de decidir. Na saída: um pedido explícito de registrar o que foi decidido. A leitura pode ser por acesso direto ao disco (o agente já tem, se a pasta estiver no escopo) ou por um servidor MCP de sistema de arquivos, quando o agente roda fora da sua máquina.'),
        c.code(t, { objective: 'Instrução permanente que liga qualquer projeto à base', lang: 'markdown', code: `## Base de conhecimento

Antes de decisões de arquitetura, escolha de ferramenta ou padrão de trabalho,
consulte ~/base/ (markdown). Busque por termos do problema:

    grep -ril "<termo>" ~/base/ | head -20

Se encontrar nota relevante, cite o arquivo na sua resposta e siga a decisão
registrada. Se a nota contradiz o que eu pedi agora, me avise antes de agir.

Ao fim de uma tarefa que gerou decisão nova, proponha (não crie sozinho) uma
nota em ~/base/decisoes/ no formato padrão, e me mostre o conteúdo.`, verify: 'Sessão nova num projeto qualquer: peça uma decisão que já está na base. A resposta deve citar o arquivo. Se não citar, a instrução não está sendo lida ou a pasta está fora do escopo do sandbox.' }),
        c.code(t, { objective: 'Dar acesso à base para um agente que roda em outra pasta', lang: 'bash', code: `# opção 1: incluir a pasta no escopo da sessão
codex --add-dir ~/base "<TAREFA>"

# opção 2: servidor MCP de sistema de arquivos limitado à base
codex mcp add base -- <COMANDO_DO_SERVIDOR_DE_ARQUIVOS> ~/base
codex mcp list`, verify: 'Peça "liste os títulos das notas em ~/base/decisoes". Uma lista real confirma o acesso. Prefira acesso somente leitura quando o agente não precisa escrever.' }),
        c.grid2(t, { okTitle: 'O agente pode fazer sozinho', ok: ['Buscar e ler qualquer nota da base', 'Citar o arquivo que embasou a resposta', 'Apontar contradição entre nota e pedido atual', 'Redigir a proposta de nota nova'], badTitle: 'Só com a sua aprovação', bad: ['Criar arquivo novo na base', 'Editar ou apagar nota existente', 'Reorganizar pastas e renomear notas', 'Registrar como decisão algo que ainda é hipótese'] }),
        c.tip({ title: 'Propor, não escrever', text: 'Deixe o agente propor a nota e você aprovar. Base escrita automaticamente acumula duplicata e conclusão errada, e a próxima sessão lê isso como verdade.' }),
      ],
    },
    {
      emoji: '🕸️', title: 'Visualizar e revisar a base', sub: 'O grafo serve para achar o que apodreceu',
      what: 'Como usar a visualização de ligações e a revisão periódica para manter a base útil em vez de volumosa.',
      why: 'Base cresce sozinha e apodrece sozinha. Sem revisão, ela passa de ativo a fonte de erro.',
      keys: 'Grafo de ligações, notas órfãs, revisão por data, poda.',
      body: (t) => [
        c.p('Ferramentas de markdown com grafo mostram notas isoladas e aglomerados. Nota órfã costuma ser uma de duas coisas: ideia que nunca se conectou a nada (candidata a poda) ou assunto novo que ainda vai crescer. A revisão olha data e uso: o que não é citado nem atualizado há meses sai ou vira arquivo morto.'),
        c.code(t, { objective: 'Encontrar notas velhas e notas órfãs para revisar', lang: 'bash', code: `# notas não modificadas há mais de 180 dias
find ~/base -name "*.md" -mtime +180 | head -30

# notas que ninguém referencia (nenhum [[link]] aponta para elas)
cd ~/base
for f in $(find . -name "*.md"); do
  n=$(basename "$f" .md)
  grep -rql "\\[\\[$n\\]\\]" . >/dev/null 2>&1 || echo "orfa: $f"
done | head -30`, verify: 'As duas listas cabem numa revisão de trinta minutos. Cada item: atualizar com data nova, ligar a outra nota, ou apagar. Nenhum item fica sem decisão.' }),
        c.steps(t, { title: 'Ritmo de revisão', items: [
          { h: 'Semanal, 10 minutos', text: 'Notas criadas na semana: cabeçalho completo? Ligadas a alguma coisa?' },
          { h: 'Mensal, 30 minutos', text: 'Rode as duas buscas acima. Poda e religação.' },
          { h: 'Quando um agente errar', text: 'Se a recomendação errada veio de uma nota, corrija a nota na hora. É o feedback mais valioso que a base recebe.' },
        ] }),
      ],
    },
    {
      emoji: '🏗️', title: 'O sistema completo', sub: 'Como as sete peças se encaixam',
      what: 'A montagem final: superfícies, contrato, computer use, iteração com git, skills, MCP, orquestração e memória, funcionando como um fluxo só.',
      why: 'Cada peça sozinha ajuda pouco. Juntas, elas mudam quanto trabalho cabe numa semana.',
      keys: 'Fluxo completo, entrada, execução, verificação, registro.',
      body: (t) => [
        c.figure(t, svg.flow(t, { label: 'O fluxo completo do sistema: consultar a base, escrever o contrato, delegar com skill ou MCP, verificar a prova, registrar a decisão na base', steps: [
          { title: 'Consultar base', sub: 'já decidimos isso?' },
          { title: 'Contrato', sub: 'resultado, onde, prova' },
          { title: 'Delegar', sub: 'skill · MCP · tela · plano' },
          { title: 'Verificar', sub: 'a prova, não o resumo' },
          { title: 'Registrar', sub: 'decisão nova na base' },
        ] }), 'O último passo alimenta o primeiro. É isso que faz o sistema melhorar por uso em vez de repetir os mesmos erros em projetos diferentes.'),
        c.cards(t, [
          { emoji: '🧭', h: 'Entrada', text: 'Base consultada e contrato escrito. Dois minutos que evitam meia hora de retrabalho.' },
          { emoji: '⚙️', h: 'Execução', text: 'Skill quando o método é seu, MCP quando falta capacidade, tela quando não há alternativa, plano quando o volume é grande.' },
          { emoji: '✅', h: 'Verificação', text: 'Git limpo antes, prova depois, rollback barato. Reprovar é normal e gera o critério da próxima rodada.' },
          { emoji: '🧠', h: 'Registro', text: 'Decisão nova vira nota datada. Amanhã, outro agente em outro projeto começa sabendo.' },
        ]),
        c.table(t, { headers: ['Módulo', 'O que entregou', 'Onde entra no fluxo'], rows: [
          ['1.1', 'Loop e contrato de três linhas', 'Entrada'],
          ['1.2', 'Três superfícies, sandbox, AGENTS.md', 'Entrada e execução'],
          ['1.3', 'Computer use com rascunho e prova', 'Execução'],
          ['1.4', 'Iteração com git e critérios de aceite', 'Verificação'],
          ['2.1', 'Skills de ferramenta e de gosto', 'Execução'],
          ['2.2', 'MCP e tarefas longas com marcos', 'Execução'],
          ['2.3', 'Cota, esforço e orquestração', 'Execução'],
          ['2.4', 'Base em arquivos', 'Entrada e registro'],
        ] }),
      ],
    },
    {
      emoji: '🚀', title: 'Prática final: montar a base e fechar um ciclo', sub: 'Uma volta completa do sistema, hoje',
      what: 'Roteiro que cria a base, conecta um projeto, roda uma tarefa real pelo fluxo completo e registra a decisão.',
      why: 'O sistema só existe depois de dar a primeira volta inteira. A partir daí, cada volta é mais barata que a anterior.',
      keys: 'Base criada, projeto conectado, tarefa pelo fluxo, nota registrada.',
      body: (t) => [
        c.steps(t, { title: 'Roteiro (45 min)', items: [
          { h: 'Crie a base', text: 'As pastas do tópico 2 e três notas: uma decisão que você já tomou, uma preferência de trabalho, um aprendizado deste curso.' },
          { h: 'Conecte um projeto', text: 'Bloco "Base de conhecimento" no AGENTS.md do repositório em que você mais trabalha.' },
          { h: 'Escolha uma tarefa real', text: 'Algo que você faria hoje de qualquer jeito. Não invente exercício.' },
          { h: 'Rode o fluxo inteiro', text: 'Consultar base, contrato, delegar, verificar prova, git commit.' },
          { h: 'Registre', text: 'Peça ao agente a proposta de nota. Revise, corrija, salve com data.' },
          { h: 'Confirme o ciclo', text: 'Sessão nova, pergunta relacionada. A resposta deve citar a nota que você acabou de salvar.' },
        ] }),
        c.code(t, { objective: 'Fechar o ciclo: pedir a nota da decisão que a tarefa gerou', lang: 'text', code: `A tarefa terminou e foi verificada. Proponha uma nota para ~/base/decisoes/ no formato padrão (cabeçalho com tipo, data e projetos), contendo:
- a decisão em uma frase;
- o contexto: qual problema levou a ela;
- a evidência: o que foi medido ou observado;
- o que NÃO fazer, aprendido nesta tarefa;
- links para notas relacionadas que já existirem em ~/base/.

Mostre o conteúdo. Não crie o arquivo até eu aprovar.`, verify: 'A nota tem data e evidência concreta, não generalidade. Depois de salvar, abra uma sessão nova e faça uma pergunta relacionada: a resposta deve citar o arquivo pelo caminho.' }),
        c.tip({ title: 'A primeira volta é a mais cara', text: 'Montar base, conectar projeto e escrever a primeira nota leva quase uma hora. A segunda volta leva o tempo da tarefa mais dois minutos. É aí que o sistema começa a pagar.' }),
      ],
    },
  ],
  quiz: [
    { q: 'Por que markdown numa pasta e não um produto de memória fechado?', options: ['É mais bonito', 'Todo agente lê arquivo, versiona com git e não depende de um fornecedor', 'É mais rápido', 'Não precisa de disco'], answer: 1, why: 'O formato aberto é o que permite vários agentes diferentes usarem a mesma base.' },
    { q: 'Qual é o risco de deixar o agente escrever na base sem revisão?', options: ['Fica lento', 'Duplicatas e conclusões erradas viram verdade para as próximas sessões', 'Ocupa disco', 'Nenhum'], answer: 1, why: 'A base é lida como fonte; nota errada propaga o erro para todos os agentes.' },
    { q: 'Qual passo faz o sistema melhorar por uso?', options: ['Escrever o contrato', 'Delegar com skill', 'Registrar a decisão nova na base ao fim do ciclo', 'Verificar a prova'], answer: 2, why: 'O registro fecha o laço: a próxima tarefa, em outro projeto, começa sabendo.' },
  ],
  summary: [
    ['Memória em camadas', 'sessão, projeto, mapa do repo, base comum. Só a última atravessa ferramentas.'],
    ['Formato aberto', 'markdown em pasta, uma ideia por arquivo, data e links. Sem segredos.'],
    ['Ler e propor', 'instrução permanente para consultar antes de decidir; nota proposta, você aprova.'],
    ['Revisar', 'notas velhas e órfãs saem ou se religam; nota errada corrigida na hora do erro.'],
    ['O laço fechado', 'consultar, contratar, delegar, verificar, registrar. A volta seguinte é mais barata.'],
  ],
};

export const T2 = { modules: [M21, M22, M23, M24] };
