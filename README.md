# Apollo 101: a GQL learning project.

the stack used in the project is `prisma`, `nexus` and `apollo`. all written with `ts`.

### Run the project

1. first start the psql container.

   ```bash
   docker-compose up -d
   ```

2. run apollo server
   ```bash
   npm i
   npm run dev
   ```

3. access the `/graphql` endpoint at `localhost:3000`
4. try the test queries from `./queries.ts`