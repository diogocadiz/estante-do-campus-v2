// Acervo da biblioteca mantido EM MEMÓRIA (sem banco de dados).
// Esta é a "fonte de dados própria" que o Fastify entrega para o React.
// Ao reiniciar o servidor, tudo volta ao estado inicial deste arquivo.
// Na próxima etapa do projeto evolutivo, estes dados irão para o PostgreSQL.

// Formato de um livro. O frontend tem um tipo igual (frontend/src/types/Book.ts):
// esse é o "contrato da API" entre as duas partes.
export type Book = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  genre: string;
  pages: number;
  copies: number;
  available: number;
  subjects: string[];
  synopsis: string;
};

export const books: Book[] = [
  // ----- Literatura Brasileira -----
  { id: "liv-001", title: "Dom Casmurro", authors: ["Machado de Assis"], year: 1899, genre: "Literatura Brasileira", pages: 256, copies: 5, available: 3, subjects: ["Romance", "Realismo", "Clássico nacional"], synopsis: "Bentinho relembra a juventude e a paixão por Capitu, enquanto a dúvida sobre uma possível traição corrói sua memória." },
  { id: "liv-002", title: "Memórias Póstumas de Brás Cubas", authors: ["Machado de Assis"], year: 1881, genre: "Literatura Brasileira", pages: 208, copies: 4, available: 2, subjects: ["Romance", "Realismo", "Sátira"], synopsis: "Um defunto-autor narra, com ironia, os episódios de uma vida marcada por vaidades e pequenos fracassos." },
  { id: "liv-003", title: "O Cortiço", authors: ["Aluísio Azevedo"], year: 1890, genre: "Literatura Brasileira", pages: 320, copies: 3, available: 1, subjects: ["Naturalismo", "Romance social"], synopsis: "A vida coletiva de um cortiço carioca revela ambição, miséria e a força do ambiente sobre as pessoas." },
  { id: "liv-004", title: "Capitães da Areia", authors: ["Jorge Amado"], year: 1937, genre: "Literatura Brasileira", pages: 280, copies: 4, available: 4, subjects: ["Romance", "Crítica social"], synopsis: "Um grupo de meninos de rua sobrevive nas ruas de Salvador entre pequenos furtos, lealdade e sonhos." },
  { id: "liv-005", title: "Vidas Secas", authors: ["Graciliano Ramos"], year: 1938, genre: "Literatura Brasileira", pages: 176, copies: 5, available: 3, subjects: ["Regionalismo", "Seca", "Romance"], synopsis: "A família de Fabiano atravessa o sertão fugindo da seca, em busca de uma vida menos dura." },
  { id: "liv-006", title: "Grande Sertão: Veredas", authors: ["João Guimarães Rosa"], year: 1956, genre: "Literatura Brasileira", pages: 624, copies: 2, available: 1, subjects: ["Romance", "Sertão", "Experimental"], synopsis: "O jagunço Riobaldo narra suas travessias pelo sertão e o amor ambíguo por Diadorim." },
  { id: "liv-007", title: "A Hora da Estrela", authors: ["Clarice Lispector"], year: 1977, genre: "Literatura Brasileira", pages: 96, copies: 4, available: 2, subjects: ["Romance", "Introspecção"], synopsis: "Macabéa, uma jovem nordestina no Rio, vive uma existência simples que o narrador observa com delicadeza e angústia." },
  { id: "liv-008", title: "Iracema", authors: ["José de Alencar"], year: 1865, genre: "Literatura Brasileira", pages: 144, copies: 3, available: 3, subjects: ["Romantismo", "Indianismo"], synopsis: "A lenda do encontro entre a índia Iracema e o colonizador Martim dá origem a um mito de fundação." },
  { id: "liv-009", title: "Macunaíma", authors: ["Mário de Andrade"], year: 1928, genre: "Literatura Brasileira", pages: 192, copies: 3, available: 1, subjects: ["Modernismo", "Rapsódia"], synopsis: "O herói 'sem nenhum caráter' percorre o Brasil numa aventura cheia de mitos e humor." },
  { id: "liv-010", title: "Quarto de Despejo", authors: ["Carolina Maria de Jesus"], year: 1960, genre: "Literatura Brasileira", pages: 200, copies: 4, available: 4, subjects: ["Diário", "Favela", "Testemunho"], synopsis: "O diário de uma catadora de papel registra, sem filtros, a fome e a luta diária na favela do Canindé." },
  { id: "liv-011", title: "O Alienista", authors: ["Machado de Assis"], year: 1882, genre: "Literatura Brasileira", pages: 96, copies: 5, available: 5, subjects: ["Conto", "Sátira", "Ciência"], synopsis: "O médico Simão Bacamarte interna meia cidade em nome da ciência, levando a razão ao absurdo." },
  { id: "liv-012", title: "O Alquimista", authors: ["Paulo Coelho"], year: 1988, genre: "Literatura Brasileira", pages: 208, copies: 6, available: 4, subjects: ["Ficção", "Jornada"], synopsis: "O pastor Santiago cruza o deserto atrás de um tesouro e descobre que a verdadeira busca é interior." },

  // ----- Literatura Clássica -----
  { id: "liv-013", title: "Dom Quixote", authors: ["Miguel de Cervantes"], year: 1605, genre: "Literatura Clássica", pages: 863, copies: 2, available: 1, subjects: ["Romance", "Aventura", "Sátira"], synopsis: "Um fidalgo enlouquecido pelos livros de cavalaria sai pelo mundo para desfazer injustiças imaginárias." },
  { id: "liv-014", title: "Orgulho e Preconceito", authors: ["Jane Austen"], year: 1813, genre: "Literatura Clássica", pages: 424, copies: 4, available: 2, subjects: ["Romance", "Costumes"], synopsis: "Elizabeth Bennet e o orgulhoso Sr. Darcy enfrentam mal-entendidos até reconhecerem seus próprios defeitos." },
  { id: "liv-015", title: "Crime e Castigo", authors: ["Fiódor Dostoiévski"], year: 1866, genre: "Literatura Clássica", pages: 592, copies: 3, available: 1, subjects: ["Romance", "Psicológico"], synopsis: "O estudante Raskólnikov comete um assassinato e passa a ser perseguido pela própria consciência." },
  { id: "liv-016", title: "Os Miseráveis", authors: ["Victor Hugo"], year: 1862, genre: "Literatura Clássica", pages: 1480, copies: 2, available: 2, subjects: ["Romance", "Histórico"], synopsis: "Jean Valjean busca redenção numa França marcada pela pobreza e pela revolução." },
  { id: "liv-017", title: "Cem Anos de Solidão", authors: ["Gabriel García Márquez"], year: 1967, genre: "Literatura Clássica", pages: 448, copies: 3, available: 1, subjects: ["Realismo mágico", "Saga"], synopsis: "A saga da família Buendía na cidade mítica de Macondo mistura história, lenda e destino." },
  { id: "liv-018", title: "O Pequeno Príncipe", authors: ["Antoine de Saint-Exupéry"], year: 1943, genre: "Literatura Clássica", pages: 96, copies: 6, available: 5, subjects: ["Fábula", "Infantojuvenil"], synopsis: "Um piloto perdido no deserto encontra um principezinho que ensina a enxergar o essencial com o coração." },

  // ----- Distopia -----
  { id: "liv-019", title: "1984", authors: ["George Orwell"], year: 1949, genre: "Distopia", pages: 416, copies: 5, available: 2, subjects: ["Distopia", "Política"], synopsis: "Winston vive sob a vigilância total do Grande Irmão e tenta resistir ao controle absoluto do pensamento." },
  { id: "liv-020", title: "A Revolução dos Bichos", authors: ["George Orwell"], year: 1945, genre: "Distopia", pages: 152, copies: 5, available: 4, subjects: ["Fábula", "Sátira política"], synopsis: "Animais expulsam o fazendeiro e criam uma sociedade igualitária que logo se corrompe." },
  { id: "liv-021", title: "Admirável Mundo Novo", authors: ["Aldous Huxley"], year: 1932, genre: "Distopia", pages: 312, copies: 3, available: 1, subjects: ["Distopia", "Ficção científica"], synopsis: "Num futuro de felicidade fabricada, a estabilidade social custa a liberdade e a individualidade." },
  { id: "liv-022", title: "Fahrenheit 451", authors: ["Ray Bradbury"], year: 1953, genre: "Distopia", pages: 216, copies: 4, available: 3, subjects: ["Distopia", "Censura"], synopsis: "Num mundo onde livros são queimados, o bombeiro Montag começa a questionar sua própria função." },

  // ----- Ficção Científica -----
  { id: "liv-023", title: "Duna", authors: ["Frank Herbert"], year: 1965, genre: "Ficção Científica", pages: 680, copies: 3, available: 2, subjects: ["Ficção científica", "Épico"], synopsis: "No planeta desértico Arrakis, o jovem Paul Atreides se torna peça central de uma disputa por poder e especiaria." },
  { id: "liv-024", title: "Fundação", authors: ["Isaac Asimov"], year: 1951, genre: "Ficção Científica", pages: 288, copies: 3, available: 1, subjects: ["Ficção científica", "Império galáctico"], synopsis: "Diante da queda inevitável de um império galáctico, cientistas tentam preservar o conhecimento humano." },
  { id: "liv-025", title: "Eu, Robô", authors: ["Isaac Asimov"], year: 1950, genre: "Ficção Científica", pages: 320, copies: 4, available: 4, subjects: ["Contos", "Robótica"], synopsis: "Contos interligados exploram as três leis da robótica e os dilemas da convivência entre humanos e máquinas." },
  { id: "liv-026", title: "Neuromancer", authors: ["William Gibson"], year: 1984, genre: "Ficção Científica", pages: 288, copies: 2, available: 1, subjects: ["Cyberpunk", "Tecnologia"], synopsis: "Um hacker decadente recebe uma última missão no ciberespaço que definiria o gênero cyberpunk." },
  { id: "liv-027", title: "O Guia do Mochileiro das Galáxias", authors: ["Douglas Adams"], year: 1979, genre: "Ficção Científica", pages: 208, copies: 4, available: 3, subjects: ["Comédia", "Aventura espacial"], synopsis: "Arthur Dent escapa da destruição da Terra e embarca numa jornada cósmica absurda e divertida." },

  // ----- Fantasia -----
  { id: "liv-028", title: "O Hobbit", authors: ["J.R.R. Tolkien"], year: 1937, genre: "Fantasia", pages: 336, copies: 5, available: 2, subjects: ["Fantasia", "Aventura"], synopsis: "O pacato hobbit Bilbo é arrastado para uma jornada rumo à montanha do dragão Smaug." },
  { id: "liv-029", title: "O Senhor dos Anéis: A Sociedade do Anel", authors: ["J.R.R. Tolkien"], year: 1954, genre: "Fantasia", pages: 576, copies: 4, available: 1, subjects: ["Fantasia", "Épico"], synopsis: "Frodo parte para destruir o Um Anel e impedir que o mal domine a Terra-média." },
  { id: "liv-030", title: "Harry Potter e a Pedra Filosofal", authors: ["J.K. Rowling"], year: 1997, genre: "Fantasia", pages: 264, copies: 6, available: 3, subjects: ["Fantasia", "Infantojuvenil"], synopsis: "Um menino órfão descobre que é bruxo e inicia seus estudos na escola de Hogwarts." },
  { id: "liv-031", title: "As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa", authors: ["C.S. Lewis"], year: 1950, genre: "Fantasia", pages: 208, copies: 4, available: 4, subjects: ["Fantasia", "Infantojuvenil"], synopsis: "Quatro irmãos atravessam um guarda-roupa e chegam a Nárnia, um reino congelado por uma feiticeira." },
  { id: "liv-032", title: "A Guerra dos Tronos", authors: ["George R.R. Martin"], year: 1996, genre: "Fantasia", pages: 592, copies: 3, available: 1, subjects: ["Fantasia", "Político"], synopsis: "Famílias nobres disputam o trono dos Sete Reinos enquanto uma ameaça antiga desperta no norte." },

  // ----- Tecnologia / Computação -----
  { id: "liv-033", title: "Código Limpo", authors: ["Robert C. Martin"], year: 2008, genre: "Tecnologia", pages: 456, copies: 4, available: 2, subjects: ["Programação", "Boas práticas"], synopsis: "Princípios e exemplos para escrever código legível, simples e fácil de manter." },
  { id: "liv-034", title: "O Programador Pragmático", authors: ["Andrew Hunt", "David Thomas"], year: 1999, genre: "Tecnologia", pages: 352, copies: 3, available: 1, subjects: ["Programação", "Carreira"], synopsis: "Um guia prático com hábitos e atitudes que tornam o desenvolvimento de software mais eficaz." },
  { id: "liv-035", title: "Estruturas de Dados e Algoritmos em JavaScript", authors: ["Loiane Groner"], year: 2018, genre: "Tecnologia", pages: 404, copies: 5, available: 5, subjects: ["JavaScript", "Algoritmos"], synopsis: "Explica listas, pilhas, filas, árvores e grafos com exemplos práticos em JavaScript." },
  { id: "liv-036", title: "JavaScript: O Guia Definitivo", authors: ["David Flanagan"], year: 2020, genre: "Tecnologia", pages: 704, copies: 2, available: 1, subjects: ["JavaScript", "Referência"], synopsis: "Uma referência completa da linguagem JavaScript moderna e das APIs do navegador." },
  { id: "liv-037", title: "Você Não Sabe JS: Escopos e Closures", authors: ["Kyle Simpson"], year: 2015, genre: "Tecnologia", pages: 98, copies: 4, available: 3, subjects: ["JavaScript", "Fundamentos"], synopsis: "Aprofunda escopo, hoisting e closures, pilares muitas vezes mal compreendidos do JavaScript." },
  { id: "liv-038", title: "Refatoração", authors: ["Martin Fowler"], year: 1999, genre: "Tecnologia", pages: 448, copies: 3, available: 2, subjects: ["Programação", "Qualidade"], synopsis: "Catálogo de técnicas para melhorar a estrutura do código sem alterar seu comportamento." },
  { id: "liv-039", title: "Padrões de Projeto", authors: ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"], year: 1994, genre: "Tecnologia", pages: 395, copies: 2, available: 1, subjects: ["Programação", "Arquitetura"], synopsis: "Apresenta soluções reutilizáveis para problemas recorrentes no projeto de software orientado a objetos." },
  { id: "liv-040", title: "Introdução à Programação com Python", authors: ["Nilo Ney Coutinho Menezes"], year: 2019, genre: "Tecnologia", pages: 328, copies: 5, available: 4, subjects: ["Python", "Iniciantes"], synopsis: "Ensina lógica de programação e Python do zero, com muitos exercícios comentados." },
  { id: "liv-041", title: "Algoritmos: Teoria e Prática", authors: ["Thomas H. Cormen"], year: 2009, genre: "Tecnologia", pages: 1292, copies: 2, available: 1, subjects: ["Algoritmos", "Referência"], synopsis: "Obra de referência que cobre o projeto e a análise dos principais algoritmos da computação." },
  { id: "liv-042", title: "A Arte de Enganar", authors: ["Kevin Mitnick"], year: 2002, genre: "Tecnologia", pages: 304, copies: 3, available: 3, subjects: ["Segurança", "Engenharia social"], synopsis: "O famoso hacker mostra como a manipulação humana é o elo mais frágil da segurança da informação." },

  // ----- Ciências -----
  { id: "liv-043", title: "Uma Breve História do Tempo", authors: ["Stephen Hawking"], year: 1988, genre: "Ciências", pages: 256, copies: 4, available: 2, subjects: ["Física", "Cosmologia"], synopsis: "Explica, em linguagem acessível, buracos negros, o Big Bang e a natureza do tempo." },
  { id: "liv-044", title: "Cosmos", authors: ["Carl Sagan"], year: 1980, genre: "Ciências", pages: 384, copies: 3, available: 1, subjects: ["Astronomia", "Divulgação"], synopsis: "Uma viagem poética pelo universo e pela história da ciência que o tornou compreensível." },
  { id: "liv-045", title: "O Gene Egoísta", authors: ["Richard Dawkins"], year: 1976, genre: "Ciências", pages: 408, copies: 3, available: 3, subjects: ["Biologia", "Evolução"], synopsis: "Propõe que a evolução pode ser entendida a partir do ponto de vista dos genes." },

  // ----- História -----
  { id: "liv-046", title: "Sapiens: Uma Breve História da Humanidade", authors: ["Yuval Noah Harari"], year: 2011, genre: "História", pages: 464, copies: 5, available: 2, subjects: ["História", "Antropologia"], synopsis: "Percorre a trajetória do Homo sapiens das savanas africanas à era da informação." },
  { id: "liv-047", title: "Armas, Germes e Aço", authors: ["Jared Diamond"], year: 1997, genre: "História", pages: 480, copies: 2, available: 1, subjects: ["História", "Geografia"], synopsis: "Investiga por que algumas sociedades se desenvolveram mais rápido que outras ao longo da história." },
  { id: "liv-048", title: "1808", authors: ["Laurentino Gomes"], year: 2007, genre: "História", pages: 416, copies: 4, available: 4, subjects: ["História do Brasil"], synopsis: "Narra a fuga da corte portuguesa para o Brasil e as transformações que ela provocou." },

  // ----- Filosofia -----
  { id: "liv-049", title: "O Mundo de Sofia", authors: ["Jostein Gaarder"], year: 1991, genre: "Filosofia", pages: 560, copies: 3, available: 2, subjects: ["Filosofia", "Romance"], synopsis: "Uma adolescente recebe cartas misteriosas que a conduzem por toda a história da filosofia." },
  { id: "liv-050", title: "A República", authors: ["Platão"], year: -380, genre: "Filosofia", pages: 512, copies: 2, available: 1, subjects: ["Filosofia", "Política"], synopsis: "Sócrates e seus interlocutores discutem a justiça e imaginam a cidade ideal." },
  { id: "liv-051", title: "Meditações", authors: ["Marco Aurélio"], year: 180, genre: "Filosofia", pages: 256, copies: 3, available: 3, subjects: ["Estoicismo", "Filosofia"], synopsis: "Anotações pessoais de um imperador romano sobre autocontrole, dever e serenidade." },

  // ----- Psicologia -----
  { id: "liv-052", title: "Rápido e Devagar", authors: ["Daniel Kahneman"], year: 2011, genre: "Psicologia", pages: 608, copies: 3, available: 1, subjects: ["Psicologia", "Decisão"], synopsis: "Mostra como dois sistemas de pensamento, um rápido e um lento, guiam nossas escolhas." },
  { id: "liv-053", title: "O Poder do Hábito", authors: ["Charles Duhigg"], year: 2012, genre: "Psicologia", pages: 408, copies: 4, available: 2, subjects: ["Psicologia", "Comportamento"], synopsis: "Explica como os hábitos se formam e como podem ser transformados no dia a dia." },
  { id: "liv-054", title: "Mindset", authors: ["Carol S. Dweck"], year: 2006, genre: "Psicologia", pages: 312, copies: 4, available: 4, subjects: ["Psicologia", "Aprendizagem"], synopsis: "Diferencia a mentalidade fixa da mentalidade de crescimento e seu impacto no sucesso." },

  // ----- Negócios -----
  { id: "liv-055", title: "A Startup Enxuta", authors: ["Eric Ries"], year: 2011, genre: "Negócios", pages: 336, copies: 4, available: 2, subjects: ["Empreendedorismo", "Gestão"], synopsis: "Defende ciclos curtos de aprendizado para criar produtos que realmente atendam ao mercado." },
  { id: "liv-056", title: "Pai Rico, Pai Pobre", authors: ["Robert Kiyosaki"], year: 1997, genre: "Negócios", pages: 336, copies: 5, available: 3, subjects: ["Finanças", "Educação financeira"], synopsis: "Compara duas visões sobre dinheiro para discutir educação financeira e investimentos." },

  // ----- Poesia -----
  { id: "liv-057", title: "Antologia Poética", authors: ["Vinicius de Moraes"], year: 1954, genre: "Poesia", pages: 288, copies: 3, available: 3, subjects: ["Poesia", "Brasil"], synopsis: "Reúne sonetos e poemas de amor de um dos maiores poetas e compositores brasileiros." },
  { id: "liv-058", title: "A Rosa do Povo", authors: ["Carlos Drummond de Andrade"], year: 1945, genre: "Poesia", pages: 176, copies: 3, available: 2, subjects: ["Poesia", "Social"], synopsis: "Poemas que unem o lirismo pessoal à preocupação com o mundo e a coletividade." },

  // ----- Biografia -----
  { id: "liv-059", title: "O Diário de Anne Frank", authors: ["Anne Frank"], year: 1947, genre: "Biografia", pages: 352, copies: 4, available: 2, subjects: ["Diário", "Segunda Guerra"], synopsis: "O diário de uma adolescente judia escondida durante a ocupação nazista nos Países Baixos." },
  { id: "liv-060", title: "Steve Jobs", authors: ["Walter Isaacson"], year: 2011, genre: "Biografia", pages: 624, copies: 3, available: 1, subjects: ["Biografia", "Tecnologia"], synopsis: "A biografia autorizada do cofundador da Apple, baseada em dezenas de entrevistas." },
];
