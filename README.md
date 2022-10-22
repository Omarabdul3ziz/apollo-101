# Apollo 101: a GQL learning project.

### Prisma

- `prisma/schema.prisma`: the entry point for the db ORM schema.
- `npx prisma generate`: generate the prisma client
- `npx prisma migrate <db_name> --name "<migration_name>"`: migrate the new schema from `schema.prisma`
- Relations?
### Nexus

- `src/graphql`: the gql schema types.
  - `objectType, extendType`: the SchemaTypes types. either two types should have (type/name + definition).
    - `name`: with the new schema root types
    - `type`: to extend existed root type.
    - `definition(t)`: `t` is a reference to the object block.
  - `t.`:
    - `scalers`: the primitive types without trivial resolvers.
    - `field`: a resolving-required field
  - `.field`: is a discrete piece of information. and it takes
    - `fieldName`
    - `config`:
      - `type`: root type as a return type for the resolver.
      - `args`: optional
      - `resolver`: where the logic happens.
  - `resolve`
    - `parent`: carries the return value of the previous resolver execution.
    - `args`: carries the arguments for the incoming GraphQL operation.
    - `context`: a plain JavaScript object that every resolver in the resolver chain can read from and write to.

### Apollo

- the server entrypoint. the `ApolloServer()` takes:
  - `schema`: a nexus-generated typeDefinitions for GraphQL. `makeSchema`:
    - `types`: all nexus objects.
    - `outputs`: dir path for generated files.
    - `context`: the input file and the output object.
  - `context`: the shared object among the resolvers. contains any values
    - prismaClient ?
    - loggedInUser ?
    - ...

### Auth

- `bcrypt`:
  - `hash`: Async generates a hash for the given string.
  - `compare`: Async compares the given data against the given hash.
- `jwt`:
  - `sign`: sign the given payload into a JSON Web Token string with a secret.
  - `verify`: verify given token using a secret.
