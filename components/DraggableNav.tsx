'use client';

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Draggable, ScrollTrigger, ScrollToPlugin);

const NAV_ITEMS = [
    { label: "About", sectionId: "about" },
    { label: "Work", sectionId: "work" },
    { label: "Experience", sectionId: "experience" },
    { label: "Stack", sectionId: "stack" },
    { label: "Writing", sectionId: "writing" },
    { label: "Let's Talk", sectionId: "contact-me" },
];

function scrollToSection(sectionId: string) {
    const trigger = ScrollTrigger.getById(sectionId);

    if (trigger) {
        gsap.to(window, {
            duration: 1.2,
            ease: "power3.inOut",
            scrollTo: {
                y: trigger.start,
                autoKill: true,
            },
        });

        return;
    }

    // Fallback for normal sections.
    const el = document.getElementById(sectionId);

    if (!el) return;

    gsap.to(window, {
        duration: 1,
        ease: "power3.inOut",
        scrollTo: {
            y: el,
            autoKill: true,
        },
    });
}

export default function DraggableNav() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);
    const togglerRef = useRef<HTMLDivElement>(null);
    const logoLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const menuDropZone = dropZoneRef.current;
        const menuDrawer = drawerRef.current;
        const menuLogo = logoRef.current;
        const menuItems = itemsRef.current;
        const menuToggler = togglerRef.current;
        const menuLogoLine = logoLineRef.current;

        // Bail out instead of crashing if a ref hasn't attached yet
        // (e.g. during fast refresh, or if a section is conditionally unmounted).
        if (!menuDropZone || !menuDrawer || !menuLogo || !menuItems || !menuToggler) {
            return;
        }

        const menuItemElements = menuItems.querySelectorAll<HTMLElement>(".menu-item");

        let isMenuOpen = false;

        // Measure full-width BEFORE collapsing
        gsap.set(menuItems, { width: "auto" });
        gsap.set(menuItemElements, { opacity: 1 });

        const menuItemsFullWidth = menuItems.offsetWidth;
        const drawerGap = 0.35 * 16;
        const drawerPadding = 0.35 * 16;
        const logoWidth = menuLogo.offsetWidth;
        const togglerWidth = menuToggler.offsetWidth;

        const closedMenuWidth =
            drawerPadding + logoWidth + drawerGap + togglerWidth + drawerPadding;

        const openMenuWidth =
            drawerPadding +
            logoWidth +
            drawerGap +
            menuItemsFullWidth +
            drawerGap +
            togglerWidth +
            drawerPadding;

        // ── Initial hidden state ──────────────────────────────────────────────
        gsap.set(menuItems, { width: 0, marginRight: 0 });
        gsap.set(menuItemElements, { opacity: 0, scale: 0.85, display: "none" });
        gsap.set(menuDropZone, { width: closedMenuWidth });

        // Toggler: hidden to start
        gsap.set(menuToggler, { clipPath: "circle(0% at 50% 50%)", opacity: 0 });

        // Logo text: hidden, slightly pushed down
        gsap.set(menuLogoLine, { opacity: 0, y: 8 });

        // Entire drawer: hidden
        gsap.set(menuDrawer, { scale: 0, opacity: 0 });

        // ── Intro sequence ────────────────────────────────────────────────────
        // Step 1: Drawer pill scales in (closed shape — logo only width)
        // Step 2: "sanyam." text fades + slides up into place
        // Step 3: Toggler clip-path expands in
        // Step 4: Menu auto-opens (items slide out)

        const intro = gsap.timeline({ delay: 0.4 });

        // 1. Drawer appears as closed pill
        intro.to(menuDrawer, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power4.out",
        });

        // 2. "sanyam." text reveals
        intro.to(menuLogoLine, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
        }, "-=0.25");

        // 3. Toggler slides in via clip-path
        intro.to(menuToggler, {
            clipPath: "circle(100% at 50% 50%)",
            opacity: 1,
            duration: 0.55,
            ease: "back.out(1.4)",
        }, "-=0.15");

        // 4. Small pause, then auto-open menu
        intro.call(() => {
            // expand drop-zone width to open size
            gsap.to(menuDropZone, {
                width: openMenuWidth,
                duration: 0.55,
                ease: "power3.inOut",
            });

            // expand items container
            gsap.to(menuItems, {
                width: menuItemsFullWidth,
                duration: 0.55,
                ease: "power3.inOut",
                onStart: () => {
                    gsap.to(menuItemElements, {
                        opacity: 1,
                        scale: 1,
                        display: "flex",
                        duration: 0.3,
                        stagger: 0.05,
                        delay: 0.2,
                        ease: "power3.out",
                    });
                },
            });

            isMenuOpen = true;
            menuToggler.classList.add("close");
        }, [], "+=0.2");

        // ── Toggle helpers ────────────────────────────────────────────────────
        function openMenu() {
            menuToggler!.classList.add("close");

            gsap.to(menuItems, {
                width: menuItemsFullWidth,
                duration: 0.5,
                ease: "power3.inOut",
                onStart: () => {
                    gsap.to(menuItemElements, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        display: "flex",
                        stagger: 0.05,
                        delay: 0.2,
                        ease: "power3.out",
                    });
                },
            });

            gsap.to(menuDropZone, {
                width: openMenuWidth,
                duration: 0.5,
                ease: "power3.inOut",
            });
        }

        function closeMenu() {
            menuToggler!.classList.remove("close");

            gsap.to(menuItems, {
                width: 0,
                marginRight: 0,
                duration: 0.5,
                ease: "power3.inOut",
                onStart: () => {
                    gsap.to(menuItemElements, {
                        opacity: 0,
                        scale: 0.85,
                        duration: 0.3,
                        ease: "power3.inOut",
                        stagger: { each: 0.05, from: "end" },
                    });
                },
            });

            gsap.to(menuDropZone, {
                width: closedMenuWidth,
                duration: 0.5,
                ease: "power3.inOut",
            });
        }

        function toggleMenu() {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
            isMenuOpen = !isMenuOpen;
        }

        menuToggler.addEventListener("click", toggleMenu);

        // ── Draggable ─────────────────────────────────────────────────────────
        const snapThreshold = 200;

        const computeDrawerBounds = () => {
            const rect = menuDrawer!.getBoundingClientRect();
            const x = Number(gsap.getProperty(menuDrawer, "x")) || 0;
            const y = Number(gsap.getProperty(menuDrawer, "y")) || 0;
            return {
                minX: x - rect.left,
                maxX: x + (window.innerWidth - rect.right),
                minY: y - rect.top,
                maxY: y + (window.innerHeight - rect.bottom),
            };
        };

        const draggable = Draggable.create(menuDrawer, {
            type: "x,y",
            bounds: computeDrawerBounds(), // <-- was: bounds: window
            cursor: "grab",
            activeCursor: "grabbing",
            allowEventDefault: true,

            onPress: function () {
                // re-measure right before each drag — cheap, and guarantees accuracy
                // once the intro animation has settled the drawer to its real size
                this.applyBounds(computeDrawerBounds());
            },

            onDragStart: function () {
                const activeMenuWidth = isMenuOpen ? openMenuWidth : closedMenuWidth;
                gsap.set(menuDropZone, { width: activeMenuWidth });
            },

            onDrag: function () {
                const isWithinSnapZone =
                    Math.abs(this.x) < snapThreshold && Math.abs(this.y) < snapThreshold;
                gsap.to(menuDropZone, { opacity: isWithinSnapZone ? 1 : 0, duration: 0.1 });
            },

            onDragEnd: function () {
                gsap.to(menuDropZone, { opacity: 0, duration: 0.1 });
                const isWithinSnapZone =
                    Math.abs(this.x) < snapThreshold && Math.abs(this.y) < snapThreshold;
                if (isWithinSnapZone) {
                    gsap.to(menuDrawer, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
                }
            },
        });

        const refreshBounds = () => draggable[0]?.applyBounds(computeDrawerBounds());
        window.addEventListener("resize", refreshBounds);

        return () => {
            menuToggler.removeEventListener("click", toggleMenu);
            window.removeEventListener("resize", refreshBounds);
            draggable[0]?.kill();
            intro.kill();
        };
    }, []);

    // ── Scroll hide / show ────────────────────────────────────────────────────
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const drawer = drawerRef.current;
        if (!wrapper) return;

        gsap.set(wrapper, { xPercent: -50, y: 0, autoAlpha: 1 });

        let isHidden = false;
        let isDragging = false;
        let lastScrollY = window.scrollY;

        const hideNav = () => {
            isHidden = true;
            gsap.to(wrapper, {
                autoAlpha: 0,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const showNav = () => {
            isHidden = false;
            gsap.to(wrapper, {
                autoAlpha: 1,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const onPointerDown = () => { isDragging = true; };
        const onPointerUp = () => { isDragging = false; };
        drawer?.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointerup", onPointerUp);

        const trigger = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                if (isDragging) return;

                const scrollY = self.scroll();

                const delta = scrollY - lastScrollY;

                if (Math.abs(delta) < 8) return;

                if (delta > 0 && scrollY > 32 && !isHidden) hideNav()
                else if (delta < 0 && isHidden) showNav()

                lastScrollY = scrollY;
            },
        });

        return () => {
            trigger.kill();
            drawer?.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointerup", onPointerUp);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="fixed bottom-12 md:bottom-24 left-1/2 z-50 will-change-transform"
        >
            <div className="absolute w-max hidden sm:flex ">
                <div
                    ref={dropZoneRef}
                    className="
                        absolute top-0 left-0
                        h-[40px]
                        border-[0.075rem] border-secondary border-dashed rounded-[4rem]
                        opacity-0 pointer-events-none
                        -translate-2/4 will-change-transform
                        transition delay-200 ease-out"
                />

                <div
                    ref={drawerRef}
                    className="
                        text-sm
                        absolute
                        p-1 bg-primary text-background
                        rounded-full
                        flex items-center flex-row gap-1 
                        -translate-2/4 will-change-transform"
                >
                    <div
                        ref={logoRef}
                        className="flex flex-row justify-center items-center gap-1 bg-background h-8 w-max p-3 rounded-full shrink-0"
                    >
                        <div ref={logoLineRef} className="text-5xl/7 font-mont-sign text-secondary">sanyam.</div>
                    </div>

                    <div ref={itemsRef} className="flex flex-row gap-1 overflow-hidden">
                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.sectionId}
                                className="menu-item w-max py-1 px-1 hover:underline rounded-3xl flex items-center text-center shrink-0"
                            >
                                <a
                                    href={`#${item.sectionId}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.sectionId);
                                    }}
                                    className="select-none whitespace-nowrap cursor-pointer"
                                >
                                    {item.label}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div
                        ref={togglerRef}
                        className="group
                        relative w-8 h-8 p-1.5 rounded-full
                        flex flex-col justify-center items-center gap-0.5 shrink-0 cursor-pointer"
                    >
                        <span
                            className="relative w-full h-0.5 bg-toggle rounded-full origin-center
                            transition-transform duration-300 ease-in will-change-transform
                            group-[.close]:rotate-45 group-[.close]:translate-x-0 group-[.close]:translate-y-1 group-[.close]:scale-x-90"
                        />
                        <span
                            className="relative w-full h-0.5 bg-toggle rounded-full origin-center
                            transition-transform duration-800 ease-in will-change-transform
                            group-[.close]:translate-x-2 group-[.close]:opacity-0 group-[.close]:scale-x-90"
                        />
                        <span
                            className="relative w-full h-0.5 bg-toggle rounded-full origin-center
                            transition-transform duration-300 ease-in will-change-transform
                            group-[.close]:-rotate-45 group-[.close]:translate-x-0 group-[.close]:-translate-y-1 group-[.close]:scale-x-90"
                        />
                    </div>
                </div>
            </div>

            <div
                className="
                    flex flex-row gap-1 sm:hidden text-sm py-[6px] px-[8px] bg-primary text-background rounded-full
                    items-center absolute -translate-2/4 will-change-transform"
            >
                <div className="flex flex-row justify-center items-center bg-background h-10 w-max py-2 px-4 rounded-full">
                    <div className="text-6xl/7 font-mont-sign text-secondary">sanyam.</div>
                </div>

                <div className="grid grid-cols-[repeat(3,1fr)] justify-items-center pr-1">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.sectionId} className="w-max py-[2px] pb-0 px-1 hover:underline items-center text-center">
                            <a
                                href={`#${item.sectionId}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.sectionId);
                                }}
                                className="select-none whitespace-nowrap cursor-pointer"
                            >
                                {item.label}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}