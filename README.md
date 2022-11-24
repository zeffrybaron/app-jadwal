1. Init migration

    npx sequelize init

2. Create migration

    npx sequelize migration:generate --name <name-tabel-or-action>

    # example

    npx sequelize migration:generate --name create-roles

3. Running Migration

    npx sequelize db:migrate

4. Undo Migration

    npx sequelize db:migrate:undo

    #or

    npx sequelize db:migrate:undo:all

5. Create seeder

    npx sequelize seed:generate --name <name>

6. Running seeder

    npx sequelize db:seed:all

7. Undo seeder

    npx sequelize db:seed:undo:all
