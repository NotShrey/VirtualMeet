'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');
// now only if the user is verified and api is working we will create a new video client for him
    const client = new StreamVideoClient({// option Object
      apiKey: API_KEY,
      user: {// which user is creating this client
        id: user?.id,// id from clerk
        name: user?.username || user?.id,// same with this
        image: user?.imageUrl,// and this 
      },
      tokenProvider,// to verify if the user is the authorized and genuine user or not
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;