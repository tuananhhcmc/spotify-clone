import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { ExtendedToken } from 'types'
const useSpotify = () => {
    const {data:session} =  useSession()

    useEffect(() => {
        if (!session) return 


    }, [session])
}