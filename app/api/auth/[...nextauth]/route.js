import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkdinProvider from "next-auth/providers/linkedin";
import { connectDB } from "@/server/ConnectDB";
import User from "@/models/User";
export const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    LinkdinProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      issuer: "https://www.linkedin.com/oauth",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      async profile(profile) {
        if (profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
          };
        }
      },
      async clientCallback(req, res) {
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(
          "http://localhost:3000/callback",
          params
        );
        console.log("Received and validated tokens %j", tokenSet);
        res.end("success");
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ session, user, token }) {
      let Randomstr =
        session.user.name + Math.floor(Math.random() * 1000) + Date.now();
      await connectDB();
      const FindUser = await User.findOne({ email: session.user.email });
      if (!FindUser) {
        session.user.username = Randomstr.slice(0, -10);
        session.user.UPI_ID = "";
        session.user.Profilepic = "";
        session.user.Coverpic = "";
        await User.create({
          name: session.user.name,
          email: session.user.email,
          username: session.user.username,
        });
        return session;
      }
      session.user.username = FindUser.username;
      session.user.UPI_ID = FindUser.UPI_ID;
      session.user.Profilepic = FindUser.Profilepic;
      session.user.Coverpic = FindUser.Coverpic;
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
