import LogoFile from "@/public/notion-logo.png";
import Image from "next/image";

const Logo = ({ size }: { size: number }) => {
  return <Image src={LogoFile} height={size} width={size} alt="Logo" />;
};

export default Logo;
