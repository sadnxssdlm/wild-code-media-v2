-- Table User
CREATE TABLE users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Post
CREATE TABLE posts (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  image VARCHAR(255),
  code_snippet TEXT,
  user_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Utilisateur d'exemple pour le post humoristique
INSERT INTO users (id, username, email, password_hash, first_name, last_name, avatar, created_at, updated_at)
VALUES (
  1,
  'dev42',
  'dev42@example.com',
  '$argon2id$v=19$m=65536,t=3,p=4$ZGV2dGVzdA$Q0FHRV9NT0NLRURfUEFTU1dPUkQ',
  'Jean',
  'Consolelog',
  NULL,
  NOW(),
  NOW()
);

-- Exemple de post humoristique créé par l'utilisateur 42
INSERT INTO posts (title, content, code_snippet, image, user_id, created_at, updated_at)
VALUES (
  'Pourquoi mon code marche ?',
  'Aujourd''hui, j''ai passé 2h à débugger un bug qui a disparu quand j''ai ajouté un console.log. Je pense sérieusement que mon code a une conscience. Est-ce que quelqu''un a déjà eu ce bug quantique ? 😂',
  'function debug() {
  // Ne surtout pas enlever ce console.log, sinon tout casse !
  console.log("Ça marche, mais on ne sait pas pourquoi...");
}',
  '/assets/images/hero.png',
  1,
  NOW(),
  NOW()
);

