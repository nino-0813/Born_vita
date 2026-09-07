"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SiteMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.querySelector<HTMLElement>(".reference-site");
    if (!root) return;

    const main = root.querySelector("main");
    if (main) main.id = "main-content";

    const menuButtons = Array.from(
      root.querySelectorAll<HTMLElement>(".menu-btn, .hamburger, [class*='menu-trigger']"),
    );
    const menu = root.querySelector<HTMLElement>(".nav-menu, .header-nav, [class*='drawer']");
    const cleanups: Array<() => void> = [];

    menuButtons.forEach((button) => {
      button.setAttribute("role", "button");
      button.setAttribute("tabindex", "0");
      button.setAttribute("aria-label", "メニューを開閉");
      const toggle = () => {
        const open = document.body.classList.toggle("menu-is-open");
        button.setAttribute("aria-expanded", String(open));
        if (menu) menu.setAttribute("aria-hidden", String(!open));
      };
      const keydown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") toggle();
      };
      button.addEventListener("click", toggle);
      button.addEventListener("keydown", keydown);
      cleanups.push(() => {
        button.removeEventListener("click", toggle);
        button.removeEventListener("keydown", keydown);
      });
    });

    if (reduceMotion) return () => cleanups.forEach((fn) => fn());

    const hero = root.querySelector<HTMLElement>(".fv, .hero, [class*='first-view']");
    if (hero) {
      gsap.from(hero, { autoAlpha: 0, duration: 0.9, ease: "power2.out", clearProps: "all" });
    }

    const sections = gsap.utils.toArray<HTMLElement>(
      ".reference-site main > section, .reference-site main > div > section",
    );
    sections.slice(0, 18).forEach((section) => {
      gsap.from(
        section,
        {
          autoAlpha: 0,
          y: 36,
          duration: 0.75,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: { trigger: section, start: "top 88%", once: true },
        },
      );
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
