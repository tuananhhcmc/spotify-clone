// pages/api/auth/[...nextauth].js
import { scopes, spotifyApi } from "config/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { ExtendedToken, TokenError } from "types";

const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshedTokens } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token || token.refreshToken,
      accessTokenExpiresAt: Date.now() + refreshedTokens.expires_in * 1000,
    };
  } catch (error) {
    console.error(error);
    return { ...token, error: TokenError.RefreshAccessTokenError };
  }
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: { scope: scopes },
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        return {
          ...token,
          user,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpiresAt: account.expires_at * 1000,
        };
      }
      if (Date.now() + 5000 < token.accessTokenExpiresAt) return token;
      return await refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
