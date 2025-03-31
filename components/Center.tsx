"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePlaylistContext } from "contexts/PlaylistContexts";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserIcon from "public/user.png";
import { useEffect, useState } from "react";
import { pickRandom } from "utils/pickRandom";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
const Center = () => {
  const router = useRouter();
  const { playlistContextState } = usePlaylistContext();
  const { data: session } = useSession();
  const [fromColor, setFromColor] = useState<string | null>(null);

  useEffect(() => {
    setFromColor(pickRandom(colors));
  }, []);
  return (
    <div className="flex-grow text-white relative h-screen overflow-y-scroll scroll-hidden">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full py-1 pl-1 pr-2"
          onClick={async () => {
            await signOut({ redirect: false });
            router.push("/login");
          }}
        >
          <Image
            src={session?.user?.image || UserIcon}
            alt="User Avatar"
            height={40}
            width={40}
            className="rounded-full object-cover"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="icon" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${fromColor} to-black h-80 p-8`}
      >
        <p>PLAYLIST</p>
      </section>
    </div>
  );
};

export default Center;
