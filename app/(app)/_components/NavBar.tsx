"use client";

import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, MouseEvent, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const NavBar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  console.log(isCollapsed)

  const mouseDownHandler = (
    e: MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) {
      newWidth = 240;
    } else if (newWidth > 480) {
      newWidth = 480;
    }
    
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  }

  const mouseUpHandler = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", mouseMoveHandler)
    document.removeEventListener("mouseup", mouseUpHandler)
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`group/sidebar  h-full bg-secondary overflow-y-auto relative flex flex-col z-[99999] w-60 ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile && "w-0"}`}
      >
        <div
          role="button"
          className={`size-6 text-muted-foreground rounded-sm hover:bg-neutral-400 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ${
            isMobile && "opacity-100"
          }`}
        >
          <ChevronsLeft className="size-6" />
        </div>
        <div>
          <p>Action items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div 
        onMouseDown={mouseDownHandler}
        onClick={() => {}}
        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize w-1 h-full absolute bg-primary/10 right-0 top-0" />
      </aside>
      <div
        ref={navbarRef}
        className={`absolute top-0 z-[99999] left-60 w-[calc(100%-240px)] ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile && "left-0 w-full"}`}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
            {isMobile && <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" />}
          </nav>
      </div>
    </>
  );
};

export default NavBar;
