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
    const cleanups: Array<() => void> = [];

    const cursor = root.querySelector<HTMLElement>("[data-cursor]");
    const chaser = root.querySelector<HTMLElement>("[data-chaser]");
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (cursor && chaser && hasFinePointer) {
      gsap.set([cursor, chaser], {
        left: 0,
        top: 0,
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
      });

      const cursorX = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power3.out" });
      const cursorY = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power3.out" });
      const chaserX = gsap.quickTo(chaser, "x", { duration: 0.32, ease: "power3.out" });
      const chaserY = gsap.quickTo(chaser, "y", { duration: 0.32, ease: "power3.out" });

      const moveCursor = (event: PointerEvent) => {
        cursorX(event.clientX);
        cursorY(event.clientY);
        chaserX(event.clientX);
        chaserY(event.clientY);
        gsap.to([cursor, chaser], { autoAlpha: 1, duration: 0.15, overwrite: "auto" });
      };
      const hideCursor = () => gsap.to([cursor, chaser], { autoAlpha: 0, duration: 0.15 });
      const showActive = (event: PointerEvent) => {
        const interactive = (event.target as Element | null)?.closest(
          "a, button, input, select, textarea, [role='button']",
        );
        chaser.classList.toggle("is-active", Boolean(interactive));
      };

      window.addEventListener("pointermove", moveCursor, { passive: true });
      document.documentElement.addEventListener("pointerleave", hideCursor);
      document.addEventListener("pointerover", showActive, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", moveCursor);
        document.documentElement.removeEventListener("pointerleave", hideCursor);
        document.removeEventListener("pointerover", showActive);
      });
    }

    const main = root.querySelector("main");
    if (main) main.id = "main-content";

    const menuButtons = Array.from(
      root.querySelectorAll<HTMLElement>(".menu-btn, .hamburger, [class*='menu-trigger']"),
    );
    const menu = root.querySelector<HTMLElement>(".nav-menu, .header-nav, [class*='drawer']");

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

    const motion = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-bg", {
          autoAlpha: 0,
          scale: 1.04,
          duration: 1.15,
          clearProps: "transform,opacity,visibility",
        })
        .from(".innoshima-hero-copy p", { autoAlpha: 0, y: 18, duration: 0.45 }, "-=0.45")
        .from(
          ".innoshima-hero-copy h2",
          { autoAlpha: 0, y: 32, clipPath: "inset(0 0 100% 0)", duration: 0.85 },
          "-=0.25",
        )
        .from(".innoshima-hero-copy span", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.35");

      const campaignTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".campaign-images", start: "top 82%", once: true },
      });
      campaignTimeline
        .from(".campaign-heading span", {
          autoAlpha: 0,
          y: 16,
          letterSpacing: "0.34em",
          duration: 0.65,
          ease: "power2.out",
        })
        .from(".campaign-heading h2", { autoAlpha: 0, y: 10, duration: 0.4 }, "-=0.3")
        .from(
          ".campaign-visuals img",
          {
            autoAlpha: 0,
            y: 46,
            scale: 0.985,
            clipPath: "inset(10% 0 10% 0 round 4px)",
            stagger: 0.18,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.1",
        )
        .from(
          ".campaign-reserve-button",
          {
            autoAlpha: 0,
            y: 24,
            scale: 0.96,
            duration: 0.65,
            ease: "back.out(1.5)",
            clearProps: "transform,opacity,visibility",
          },
          "-=0.3",
        );

      const introTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".innoshima-intro", start: "top 78%", once: true },
      });
      introTimeline
        .from(".innoshima-brand", { autoAlpha: 0, y: 14, duration: 0.45 })
        .from(
          ".innoshima-intro h1",
          { autoAlpha: 0, y: 30, clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power3.out" },
          "-=0.2",
        )
        .from(".innoshima-lead", { autoAlpha: 0, y: 20, duration: 0.55 }, "-=0.3")
        .from(".innoshima-cta", { autoAlpha: 0, y: 16, duration: 0.45 }, "-=0.2");

      gsap.from(".concept-text-center", {
        autoAlpha: 0,
        x: 42,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".section-concept-v2", start: "top 72%", once: true },
      });

      gsap.from(".pilates-header, .pilates-content__text", {
        autoAlpha: 0,
        x: -40,
        stagger: 0.16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".section-pilates", start: "top 76%", once: true },
      });
      gsap.from(".pilates-content__image", {
        autoAlpha: 0,
        x: 54,
        clipPath: "inset(0 0 0 100% round 50%)",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".pilates-content", start: "top 78%", once: true },
      });

      gsap.utils.toArray<HTMLElement>(".about-block").forEach((block, index) => {
        const image = block.querySelector(".block__image");
        const copy = block.querySelector(".block__text");
        const direction = index % 2 === 0 ? -1 : 1;
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: block, start: "top 80%", once: true },
        });
        if (image) {
          timeline.from(image, {
            autoAlpha: 0,
            x: 54 * direction,
            clipPath: direction < 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
            duration: 0.9,
            ease: "power3.inOut",
          });
        }
        if (copy) {
          timeline.from(copy, { autoAlpha: 0, x: -28 * direction, duration: 0.65 }, "-=0.42");
        }
      });

      gsap.from(".location-content__inner > *", {
        autoAlpha: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: ".section-location", start: "top 72%", once: true },
      });

      const desktopMotion = gsap.matchMedia();
      desktopMotion.add("(min-width: 769px)", () => {
        gsap.to(".section-location .location-overlay", {
          scale: 1.07,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-location",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      motion.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
