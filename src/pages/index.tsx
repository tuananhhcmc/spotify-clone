"use client"; // Thêm dòng này để chỉ định đây là client component

import Center from "components/Center";
import Player from "components/Player";
import Sidebar from "components/Sidebar";
import PlaylistContextProvider from "contexts/PlaylistContexts";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <PlaylistContextProvider>
        <Head>
          <title>Spotify</title>
          <meta name="description" content="Spotify by Tuan Anh" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex">
          <Sidebar />
          <Center />
        </main>

        <div className="sticky bottom-0 text-white">
          <Player />
        </div>
      </PlaylistContextProvider>
    </div>
  );
};

export default Home;
