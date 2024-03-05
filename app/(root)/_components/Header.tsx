import Logo from "@/public/notion-logo.png"
import Image from "next/image"

const Header = () => {
  return (
    <header className='py-4 px-4'>
        <Image src={Logo} height={30} width={30} alt="Jotion" />
    </header>
  )
}

export default Header