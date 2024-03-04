'use client'
import Image from "next/image"
export default function Navbar() {

  const discord_img = require('../../../public/images/discord_img_text.png')
  return (
    <nav className="flex items-center justify-between p-5 bg-[#404EED]">
        <Image src={discord_img} width={100} height={100} alt="Discord"/>
        <div className="z-10 flex items-center font-mono text-sm gap-7">
          <h1 className="hover:text-white cursor-pointer font-bold">Download</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">Nitro</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">Support</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">Blog</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">GitHub</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">Discord</h1>
        </div> 
        <button className="z-10 bg-white font-semibold hover:text-[#404EED] rounded-full p-2 hover:drop-shadow-2xl transition-transform">Open Discord</button>
    </nav>
  )
}

  {/* <div className="z-10 flex items-center font-mono text-sm">
          <h1 className="hover:text-white cursor-pointer font-bold">Download</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">Nitro</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">Support</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">Blog</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">GitHub</h1>
          <h1 className="hover:text-white cursor-pointer font-bold">Discord</h1>
        </div> */}