

import { scopes } from "config/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: {
                url: 'https://accounts.spotify.com/authorize',
                params: {
                    scope: scopes
                },
            },
        }),
    ],
    pages: {
        signIn: '/login'
    }
});