import { spotifyApi } from 'config/spotify'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react' // Import useState
import { ExtendedSession, ExtendedToken, TokenError } from 'types'

export const useSpotify = () => {
    const { data: session } = useSession()
    const [api, setApi] = useState(spotifyApi); // Initialize state with spotifyApi

    useEffect(() => {
        if (!session) {
          return;
        }

        // if refresh token fails, redirect to login
        if (
            (session as ExtendedSession).error === TokenError.RefreshAccessTokenError
        ) {
            signIn()
        }

        // Safely update the access token
        if (api && session?.accessToken) {
            api.setAccessToken((session as ExtendedSession).accessToken);
        }
    }, [session, api]) // Depend on 'api'

    return api; // Return the API instance
}

export default useSpotify
