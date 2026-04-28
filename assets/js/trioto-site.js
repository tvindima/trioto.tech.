(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".js-year").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  if (header && menuButton && nav) {
    const closeMenu = () => {
      header.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
      const willOpen = !header.classList.contains("is-open");
      header.classList.toggle("is-open", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  const langSwitches = Array.from(document.querySelectorAll(".lang-switch"));
  if (langSwitches.length > 0) {
    document.addEventListener("click", (event) => {
      langSwitches.forEach((details) => {
        if (!details.contains(event.target)) {
          details.removeAttribute("open");
        }
      });
    });

    langSwitches.forEach((details) => {
      details.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => details.removeAttribute("open"));
      });
    });
  }

  const challengeForms = Array.from(document.querySelectorAll("form.challenge-form"));
  if (challengeForms.length > 0) {
    const formMessages = {
      en: {
        sending: "Submitting your challenge...",
        success: "Submission sent successfully. Thank you for your challenge.",
        error: "We could not submit your challenge right now. Please try again.",
      },
      pt: {
        sending: "A submeter o teu desafio...",
        success: "Submissão enviada com sucesso. Obrigado pelo teu desafio.",
        error: "Não foi possível submeter o desafio neste momento. Tenta novamente.",
      },
    };

    const setStatus = (node, stateClass, message) => {
      if (!node) {
        return;
      }
      node.classList.remove("is-info", "is-success", "is-error");
      node.classList.add("is-visible", stateClass);
      node.textContent = message;
    };

    challengeForms.forEach((form) => {
      if (!form.action || !form.action.includes("formspree.io")) {
        return;
      }

      const lang = form.getAttribute("data-form-lang") === "pt" ? "pt" : "en";
      const messages = formMessages[lang];
      const statusNode = form.querySelector("[data-form-status]");
      const submitButton = form.querySelector("button[type='submit']");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        if (submitButton) {
          submitButton.disabled = true;
        }
        setStatus(statusNode, "is-info", messages.sending);

        try {
          const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });

          if (response.ok) {
            form.reset();
            setStatus(statusNode, "is-success", messages.success);
            return;
          }

          let detailMessage = "";
          try {
            const payload = await response.json();
            if (Array.isArray(payload?.errors) && payload.errors[0]?.message) {
              detailMessage = ` ${payload.errors[0].message}`;
            }
          } catch (_error) {
            detailMessage = "";
          }
          setStatus(statusNode, "is-error", `${messages.error}${detailMessage}`);
        } catch (_error) {
          setStatus(statusNode, "is-error", messages.error);
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
          }
        }
      });
    });
  }

  const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));
  if (revealNodes.length > 0) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
    } else {
      document.documentElement.classList.add("has-scroll-reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.16,
          rootMargin: "0px 0px -8% 0px",
        }
      );
      revealNodes.forEach((node) => observer.observe(node));
      window.setTimeout(() => {
        revealNodes.forEach((node) => node.classList.add("is-visible"));
      }, 1800);
    }
  }

  const heroSection = document.querySelector(".home-hero");
  if (heroSection && !prefersReducedMotion) {
    let rafId = null;
    let pointerX = 0;
    let pointerY = 0;

    const applyShift = () => {
      const shiftX = ((pointerX - 0.5) * 16).toFixed(2);
      const shiftY = ((pointerY - 0.5) * 12).toFixed(2);
      heroSection.style.setProperty("--hero-shift-x", `${shiftX}px`);
      heroSection.style.setProperty("--hero-shift-y", `${shiftY}px`);
      rafId = null;
    };

    const updateParallax = (event) => {
      const rect = heroSection.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      pointerX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointerY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      if (rafId === null) {
        rafId = window.requestAnimationFrame(applyShift);
      }
    };

    const resetParallax = () => {
      heroSection.style.setProperty("--hero-shift-x", "0px");
      heroSection.style.setProperty("--hero-shift-y", "0px");
    };

    heroSection.addEventListener("mousemove", updateParallax);
    heroSection.addEventListener("mouseleave", resetParallax);
  }
})();
