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
      "J'ai enfin compris les hooks React... enfin je crois ! Mais demain, je relirai la doc, juste au cas où. Franchement, useEffect c'est un peu comme la magie noire, non ?",
    author: { firstName: "Marina", lastName: "Dupont" },
  },
  {
    message:
      "Quand mon code marche du premier coup, je me méfie toujours... C'est louche, il y a forcément un bug qui m'attend en prod. La confiance n'exclut pas le contrôle, surtout en JavaScript !",
    author: { firstName: "Nabil", lastName: "Benali" },
  },
  {
    message:
      "Le CSS, c'est comme la magie noire, mais en pire. Un jour tout est aligné, le lendemain tout explose sans raison. Flexbox, tu me fais rire et pleurer à la fois !",
    author: { firstName: "Gary", lastName: "Martin" },
  },
  {
    message:
      "J'ai passé 2h à chercher un bug, c'était un ; manquant. J'ai juré de toujours utiliser un linter... jusqu'à la prochaine fois. Qui a inventé le point-virgule, sérieusement ?",
    author: { firstName: "Matthieu", lastName: "Nguyen" },
  },
  {
    message:
      "console.log est mon meilleur ami. Il ne me juge jamais, il affiche juste la vérité. Parfois, je lui parle même quand tout va bien, pour le plaisir !",
    author: { firstName: "Nicole", lastName: "Sow" },
  },
];
