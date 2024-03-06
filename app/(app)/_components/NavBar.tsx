"use client";

import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, MouseEvent, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserMenu from "./UserItems";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { toast } from "sonner";
import DocumentList from "./DocumentList";

// i hate ts

const NavBar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      hideSidebar();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      hideSidebar();
    }
  }, [pathname, isMobile]);

  const mouseDownHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    // @ts-ignore
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const mouseUpHandler = () => {
    isResizingRef.current = false;
    // @ts-ignore
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  // TODO: fix TS errors

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const hideSidebar = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const createDocHandler = () => {
    const promise = create({ title: "Без названия" });
    toast.promise(promise, {
      loading: "Создаём документ...",
      success: "Документ создан!",
      error: "Не удалось создать документ 😔",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`group/sidebar  h-full bg-secondary overflow-y-auto relative flex flex-col z-[99999] w-60 ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile && "w-0"}`}
      >
        <div
          onClick={hideSidebar}
          role="button"
          className={`size-6 text-muted-foreground rounded-sm hover:bg-neutral-400 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ${
            isMobile && "opacity-100"
          }`}
        >
          <ChevronsLeft className="size-6" />
        </div>
        <div>
          <UserMenu />
          <Item onClick={() => {}} label="Поиск" icon={Search} isSearch />
          <Item onClick={() => {}} label="Настройки" icon={Settings} />
          <Item
            onClick={createDocHandler}
            label="Новый документ"
            icon={PlusCircle}
          />
        </div>
        <div className="mt-4 px-4">
          <p className="font-semibold text-lg border-b-2">Документы</p>
          <div className="flex flex-col gap-1 py-2">
            <DocumentList />
          </div>
        </div>
        <div
          // @ts-ignore
          onMouseDown={mouseDownHandler}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize w-1 h-full absolute bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={`absolute top-0 z-[99999] left-60 w-[calc(100%-240px)] ${
          isResetting && "transition-all ease-in-out duration-300"
        } ${isMobile && "left-0 w-full"}`}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              role="button"
              onClick={resetWidth}
              className={`size-6 text-muted-foreground rounded-sm   hover:bg-neutral-400 dark:hover:bg-neutral-600 transition`}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
