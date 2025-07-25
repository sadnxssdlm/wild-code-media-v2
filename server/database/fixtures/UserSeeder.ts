import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "users", truncate: true });
  }

  // The run method - Populate the 'users' table with fake data

  run() {
    const funnyUsers = [
      {
        username: "dev42",
        email: "dev42@wildcode.com",
        password_hash:
          "$argon2id$v=19$m=65536,t=3,p=1$c29tZXNhbHQ$fake_hash_for_testing",
        first_name: "Jean",
        last_name: "Consolelog",
        avatar: null,
        refName: "user_1",
      },
      {
        username: "css_warrior",
        email: "css.ninja@wildcode.com",
        password_hash:
          "$argon2id$v=19$m=65536,t=3,p=1$c29tZXNhbHQ$fake_hash_for_testing",
        first_name: "Marie",
        last_name: "Flexbox",
        avatar: null,
        refName: "user_2",
      },
      {
        username: "stack_overflow_master",
        email: "copy.paste@wildcode.com",
        password_hash:
          "$argon2id$v=19$m=65536,t=3,p=1$c29tZXNhbHQ$fake_hash_for_testing",
        first_name: "Pierre",
        last_name: "Copypasta",
        avatar: null,
        refName: "user_3",
      },
      {
        username: "git_commit_poet",
        email: "git.poet@wildcode.com",
        password_hash:
          "$argon2id$v=19$m=65536,t=3,p=1$c29tZXNhbHQ$fake_hash_for_testing",
        first_name: "Sophie",
        last_name: "Versioning",
        avatar: null,
        refName: "user_4",
      },
      {
        username: "friday_deployer",
        email: "danger.zone@wildcode.com",
        password_hash:
          "$argon2id$v=19$m=65536,t=3,p=1$c29tZXNhbHQ$fake_hash_for_testing",
        first_name: "Alex",
        last_name: "Risktaker",
        avatar: null,
        refName: "user_5",
      },
    ];

    for (const user of funnyUsers) {
      this.insert(user);
    }
  }
}

// Export the UserSeeder class
export default UserSeeder;
