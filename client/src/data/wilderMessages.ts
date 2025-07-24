export interface WilderMessage {
  message: string;
  author: {
    firstName: string;
    lastName: string;
  };
}

export const wilderMessages: WilderMessage[] = [
  {
    message:
      "J'ai enfin compris les hooks React... PSYCH ! useEffect m'a encore niqué ma life. J'ai mis 3 deps dans le tableau, ça loop à l'infini. J'en enlève une, plus rien marche. React, arrête de jouer avec mes sentiments bordel ! 😭",
    author: { firstName: "Marina", lastName: "Dupont" },
  },
  {
    message:
      "Mon code marche en dev ✅ Marche en staging ✅ Arrive en prod... NOPE CHUCK TESTA ! 💥 Apparemment 'undefined is not a function' c'est le nouveau 'Hello World'. JavaScript, t'es un sacré troll mon pote !",
    author: { firstName: "Nabil", lastName: "Benali" },
  },
  {
    message:
      "CSS Grid : 'Je vais révolutionner tes layouts !' Flexbox : 'Hold my beer...' Moi : *pleure en position: absolute* 🤡 J'ai 15 ans d'XP et je googling encore 'comment centrer une div' comme un noob !",
    author: { firstName: "Gary", lastName: "Martin" },
  },
  {
    message:
      "Plot twist : mon bug de 2h c'était pas un point-virgule manquant... C'était un ESPACE INSÉCABLE copié-collé depuis Stack Overflow ! 👻 Les caractères invisibles, c'est le boss final du développement web !",
    author: { firstName: "Matthieu", lastName: "Nguyen" },
  },
  {
    message:
      "console.log('pourquoi tu marches pas ?') console.log('MAIS POURQUOI TU MARCHES MAINTENANT ?!') console.log('je vais finir par parler à mon écran...') *2 minutes plus tard* 'Salut écran, ça va ?' 🤪",
    author: { firstName: "Nicole", lastName: "Sow" },
  },
  {
    message:
      "setState est asynchrone... MAIS PARFOIS NON ! Ça dépend de la phase de la lune et de si t'as bu ton café. React 18 avec ses batches automatiques, c'est du sadisme pur ! 🌙☕",
    author: { firstName: "Kevin", lastName: "Moreau" },
  },
  {
    message:
      "npm install... 2847 vulnerabilities found 🚨 npm audit fix... 3691 vulnerabilities found ?! WTF NPM ?! T'es censé RÉPARER pas empirer ! C'est un antivirus ou un virus ton truc ?!",
    author: { firstName: "Sarah", lastName: "Dubois" },
  },
  {
    message:
      "Interviewer: 'Explique-moi le closure' Moi: 'Euh... c'est quand une fonction... dans une autre fonction... fait des trucs...' 🤯 3 ans de React et je bégaie encore sur les bases JS !",
    author: { firstName: "Thomas", lastName: "Leroy" },
  },
  {
    message:
      "z-index: 999999 !important... Ça marche toujours pas ?! z-index: 99999999999 !important !! CSS, t'es une grosse Karen, tu respectes rien ! 🎭 Le stacking context, c'est de la sorcellerie !",
    author: { firstName: "Amélie", lastName: "Bernard" },
  },
  {
    message:
      "Git commit -m 'fix bug' Git commit -m 'fix real bug' Git commit -m 'this time its really fixed' Git commit -m 'i hate my life' Git commit -m '🔥🔥🔥' Mon historique Git ressemble à ma thérapie ! 😂",
    author: { firstName: "Lucas", lastName: "Petit" },
  },
  {
    message:
      "margin: 0 auto; // Pourquoi ça marche ? Aucune idée. Pourquoi ça marche PAS ? Encore moins d'idée.",
    author: { firstName: "Julie", lastName: "Roux" },
  },
  {
    message: "Junior dev: 'On peut pas juste utiliser jQuery ?' 💀",
    author: { firstName: "Senior", lastName: "Traumatisé" },
  },
  {
    message: "Moi: 'Mon code est clean!' *20 console.log oubliés en prod* 🤡",
    author: { firstName: "Hypocrite", lastName: "Assumé" },
  },
  {
    message: "404 Error: Motivation not found. Please try again monday.",
    author: { firstName: "Vendredi", lastName: "17h30" },
  },
  {
    message:
      "React: 'Don't mutate state directly!' Aussi React: *setState qui fait nawak*",
    author: { firstName: "Logique", lastName: "Absente" },
  },
  {
    message: "CSS: works fine Inspect Element: *change rien* CSS: ✨ magie ✨",
    author: { firstName: "Mystic", lastName: "Browser" },
  },
  {
    message: "npm start ❌ npm run start ❌ yarn start ✅ Pourquoi ? 🤷‍♂️",
    author: { firstName: "Node", lastName: "Modules" },
  },
  {
    message:
      "Bug en prod depuis 2 mois. Personne s'en est plaint. C'est une feature maintenant.",
    author: { firstName: "Product", lastName: "Owner" },
  },
  {
    message:
      "width: 100% overflow ✅ width: 100.1% ok ça va ✅ width: 101% APOCALYPSE 💥",
    author: { firstName: "CSS", lastName: "Logic" },
  },
  {
    message:
      "Stage 1: Denial - 'Ça peut pas être mon code' Stage 5: Acceptance - 'Ok c'était moi'",
    author: { firstName: "Debug", lastName: "Therapy" },
  },
];
