"use client";
import Link from "next/link";
import { Button } from "./Button";
import { useState } from "react";

export const Navbar = () => {
  const [activepath, setactivepath] = useState<string>();

  const menu = [
    { name: "work", path: "#work" },
    { name: "about", path: "#about" },
    { name: "logs", path: "#testimonial" },
    { name: "contact", path: "#contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-6 md:px-12 border-b-[4px] bg-primary border-brand-dark bg-brand-cream sticky top-0 z-50">
      <div className="flex items-center gap-2 border-2 border-brand-dark px-3 py-1">
        <span className="font-black text-lg uppercase tracking-tighter">
          DEV_rodro_V1
        </span>
      </div>
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8 uppercase text-primary-text font-bold text-base tracking-widest">
          {menu?.map((item, index) => {
            const active = activepath === item.path;
            return (
              <Link
                onClick={() => setactivepath(item?.path)}
                key={index}
                href={item.path}
                replace
                className={`hover:text-primary-text transition-colors relative after:w-full after:bg-primary-text after:absolute after:bottom-0 after:left-0 after:h-1  after:transition-transform ${active ? "after:scale-x-100" : "after:scale-x-0"}`}
              >
                {item?.name}
              </Link>
            );
          })}
        </div>
        <div className="relative">
          <div className="bg-primary-text h-full absolute -bottom-1 -right-1 -z-10 w-full"></div>
          <Button
            size="sm"
            className="hidden sm:inline-flex bg-primary-text text-primary"
          >
            HIRE ME
          </Button>
        </div>
      </div>
    </nav>
  );
};
