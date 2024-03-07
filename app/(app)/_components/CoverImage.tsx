"use client";

import Image from "next/image";

type CIProps = {
    url?: string;
};

const CoverImage = ({ url }: CIProps) => {
  return (
    <div 
        className={`relative h-[35vh] w-full group ${!url && "h-[12vh] bg-neutral-200"} ${url && "bg-muted"}`}
    >
        {!!url && (
            <Image
                src={url}
                fill
                alt="Обложка"
                className="object-cover"
             />
        )}
    </div>
  )
};

export default CoverImage;
