import { nonNull, stringArg, objectType, extendType } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { _AUTH_SECRET } from "../utils/auth";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.field("user", {
      type: "User",
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("singup", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        // hash pass
        const password = await bcrypt.hash(args.password, 10);

        // create user
        const user = await context.prisma.user.create({
          data: {
            email: args.email,
            name: args.name,
            password: password,
          },
        });

        // generate token
        const token = jwt.sign({ userId: user.id }, _AUTH_SECRET);

        // return payload
        return {
          token,
          user,
        };
      },
    });
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        // find user, error of not
        const user = await context.prisma.user.findUnique({
          where: { email: args.email },
        });

        if (!user) {
          throw new Error("No such user found");
        }

        // compare pass, error of not
        const valid = await bcrypt.compare(args.password, user.password);

        if (!valid) {
          throw new Error("Invalid password");
        }

        // generate token
        const token = jwt.sign({ userId: user.id }, _AUTH_SECRET);

        // return payload
        return {
          token,
          user,
        };
      },
    });
  },
});
