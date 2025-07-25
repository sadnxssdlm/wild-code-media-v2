import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class PostSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "posts", truncate: true });
  }

  dependencies = [UserSeeder];

  run() {
    const funnyPosts = [
      {
        title: "Pourquoi mon code marche ?",
        content:
          "Aujourd'hui, j'ai passé 2h à débugger un bug qui a disparu quand j'ai ajouté un console.log. Je pense sérieusement que mon code a une conscience. Est-ce que quelqu'un a déjà eu ce bug quantique ? 😂",
        code_snippet: `function debug() {
  return "Ça marche, mais on ne sait pas pourquoi...";
}`,
        user_id: this.getRef("user_1").insertId,
      },
      {
        title: "La vérité sur les frameworks JS",
        content:
          "Moi quand on me demande quel framework utiliser en 2024. Plot twist : la réponse change toutes les semaines ! 🤯",
        code_snippet: `const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Solid'];
const choice = frameworks[Math.floor(Math.random() * frameworks.length)];
return \`Cette semaine, c'est \${choice} qui est à la mode !\`;`,
        user_id: this.getRef("user_2").insertId,
      },
      {
        title: "Mes erreurs préférées",
        content:
          "Collection personnelle d'erreurs que j'ai rencontrées cette semaine. Attention, âmes sensibles s'abstenir ! 🙈",
        code_snippet: `// Classics never die
undefined is not a function
Cannot read property 'map' of undefined
Unexpected token '}' in JSON at position 42
ReferenceError: $ is not defined
Maximum call stack size exceeded`,
        user_id: this.getRef("user_3").insertId,
      },
      {
        title: "CSS : mes règles perso",
        content:
          "Mes techniques secrètes pour survivre en CSS. Spoiler : ça implique beaucoup de !important 😅",
        code_snippet: `margin: 0 auto;
display: flex;
justify-content: center;
align-items: center;
position: absolute !important;
z-index: 9999 !important;`,
        user_id: this.getRef("user_1").insertId,
      },
      {
        title: "Débugger un vendredi soir",
        content:
          "Moi à 23h59 un vendredi en train de debug un truc qui marchait très bien à 17h... Quelqu'un peut m'expliquer ? 🤔",
        code_snippet: `function whyDoesntThisWork() {
  return 42;
}

function itWorkedBefore() {
  return whyDoesntThisWork() * 2;
}`,
        user_id: this.getRef("user_2").insertId,
      },
      {
        title: "Mon workflow Git",
        content:
          "Entre nous, voici mon vrai workflow Git quotidien. Pas très orthodox mais ça marche ! 😎",
        code_snippet: `git add .
git commit -m "fix"
git push
git add .
git commit -m "fix fix"
git push
git add .
git commit -m "actually works now"
git push`,
        user_id: this.getRef("user_3").insertId,
      },
      {
        title: "Tests unitaires vs réalité",
        content:
          "Mes tests passent tous, mais mon application crash dès qu'un utilisateur la regarde. Normal ? 🤷‍♂️",
        code_snippet: `describe('Mon super code', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });
  
  it('should handle all edge cases', () => {
    expect('user input').not.toBe('user input');
  });
});`,
        user_id: this.getRef("user_1").insertId,
      },
      {
        title: "Stack Overflow, mon meilleur ami",
        content:
          "Je pense que 90% de mon code vient de Stack Overflow. Est-ce que ça fait de moi un mauvais développeur ? 🤭",
        code_snippet: `// Copied from Stack Overflow
// Link: https://stackoverflow.com/questions/...
// I have no idea how this works but it does
function magicFunction(data) {
  return data.reduce((acc, curr) => ({
    ...acc,
    [curr.id]: curr
  }), {});
}`,
        user_id: this.getRef("user_2").insertId,
      },
      {
        title: "La documentation que personne ne lit",
        content:
          "J'ai passé 3 jours à écrire une super documentation. Résultat : 0 vue, mais 47 questions sur le channel Slack... 📚",
        code_snippet: `/**
 * Cette fonction fait quelque chose de très important
 * @param {any} data - Les données (voir la doc)
 * @returns {any} - Le résultat (voir la doc)
 * 
 * Exemples d'usage :
 * - Cas 1 : voir la doc
 * - Cas 2 : voir la doc
 * - Cas 3 : voir la doc
 */
function importantFunction(data) {
  return data;
}`,
        user_id: this.getRef("user_3").insertId,
      },
    ];

    for (const post of funnyPosts) {
      this.insert(post);
    }
  }
}

export default PostSeeder;
