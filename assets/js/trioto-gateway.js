(() => {
  const translations = {
    en: {
      title: "Private TRIOTO Gateway",
      leadLineOne: "You received a TRIOTO teaser.",
      leadLineTwo: "If it made sense, choose the fastest way to continue.",
      privateAccess: "Private access",
      warningTitle: "You opened the gateway.",
      warningBody: "Now choose the fastest way to start a relevant TRIOTO conversation.",
      whatsappTiago: "WhatsApp Tiago",
      whatsappVitor: "WhatsApp Vítor",
      sendEmail: "Send email",
      visitSite: "Visit trioto.tech",
      interestTitle: "Areas where exchange of ideas or deeper synergies would be welcome",
      interestIp: "IP / Protection",
      interestCorporate: "Corporate Pilot",
      interestInvestment: "Investment",
      interestGrants: "Grants",
      interestMvp: "MVP / Product Build",
      technologyTitle: "Technology areas",
      simfeBody: "Secure validation and operational control layer",
      trigoritmoBody: "Procedural / path intelligence model",
      triotBody: "Operational intelligence for connected infrastructure",
      directContact: "Direct contact",
      footerCompany: "Tecnologia e Patentes",
      footerFollowUp: "Direct follow-up available",
      mailSubject: "Private TRIOTO Gateway follow-up",
      mailBody: "Hello TRIOTO,\n\nI received the teaser and would like to continue the conversation.",
      waTiago: "Olá Tiago, recebi um teaser da TRIOTO no Startup Capital Summit. Fez sentido para mim e gostava de continuar a conversa.",
      waVitor: "Olá Vítor, recebi um teaser da TRIOTO no Startup Capital Summit. Fez sentido para mim e gostava de continuar a conversa.",
      interestIntroTiago: "Olá Tiago, recebi um teaser da TRIOTO no Startup Capital Summit. Fez sentido para mim e gostava de continuar a conversa.",
      interestIntroVitor: "Olá Vítor, recebi um teaser da TRIOTO no Startup Capital Summit. Fez sentido para mim e gostava de continuar a conversa.",
      interestIntentIp: "I'm interested in IP / protection.",
      interestIntentCorporate: "I'm interested in corporate pilots.",
      interestIntentInvestment: "I'm interested in investment.",
      interestIntentGrants: "I'm interested in grants.",
      interestIntentMvp: "I'm interested in MVP / product build.",
    },
    pt: {
      title: "Portal Privado TRIOTO",
      leadLineOne: "Recebeste um teaser TRIOTO.",
      leadLineTwo: "Se fez sentido, escolhe a forma mais rápida de continuar.",
      privateAccess: "Acesso privado",
      warningTitle: "Abriste o gateway.",
      warningBody: "Agora escolhe a forma mais rápida de começar uma conversa TRIOTO relevante.",
      whatsappTiago: "WhatsApp Tiago",
      whatsappVitor: "WhatsApp Vítor",
      sendEmail: "Enviar email",
      visitSite: "Visitar trioto.tech",
      interestTitle: "Áreas onde a troca de ideias ou sinergias mais profundas seriam bem-vindas",
      interestIp: "PI / Proteção",
      interestCorporate: "Piloto corporativo",
      interestInvestment: "Investimento",
      interestGrants: "Apoios",
      interestMvp: "MVP / Construção de produto",
      technologyTitle: "Áreas tecnológicas",
      simfeBody: "Validação segura e camada de controlo operacional",
      trigoritmoBody: "Modelo de inteligência procedural / percurso",
      triotBody: "Inteligência operacional para infraestrutura conectada",
      directContact: "Contacto direto",
      footerCompany: "Tecnologia e Patentes",
      footerFollowUp: "Acompanhamento direto disponível",
      mailSubject: "Seguimento pelo Portal Privado TRIOTO",
      mailBody: "Olá TRIOTO,\n\nRecebi o teaser e gostaria de continuar a conversa.",
      waTiago: "Olá Tiago, recebi um teaser da TRIOTO no Startup Capital Summit. Fez sentido para mim e gostava de continuar a conversa.",
      waVitor: "Olá Vítor, recebi um teaser da TRIOTO no Startup Capital Summit. Fez sentido para mim e gostava de continuar a conversa.",
      interestIntroTiago: "Olá Tiago, recebi um teaser da TRIOTO no Startup Capital Summit. Fez sentido para mim e gostava de continuar a conversa.",
      interestIntroVitor: "Olá Vítor, recebi um teaser da TRIOTO no Startup Capital Summit. Fez sentido para mim e gostava de continuar a conversa.",
      interestIntentIp: "I'm interested in IP / protection.",
      interestIntentCorporate: "I'm interested in corporate pilots.",
      interestIntentInvestment: "I'm interested in investment.",
      interestIntentGrants: "I'm interested in grants.",
      interestIntentMvp: "I'm interested in MVP / product build.",
    },
  };

  const langButtons = Array.from(document.querySelectorAll("[data-lang-option]"));
  const textNodes = Array.from(document.querySelectorAll("[data-i18n]"));
  const emailLink = document.querySelector("[data-email-link]");
  const whatsappLinks = Array.from(document.querySelectorAll("[data-whatsapp]"));
  const interestLinks = Array.from(document.querySelectorAll("[data-interest-whatsapp]"));
  const supported = new Set(["en", "pt"]);
  const interestKeyMap = {
    ip: "interestIntentIp",
    corporate: "interestIntentCorporate",
    investment: "interestIntentInvestment",
    grants: "interestIntentGrants",
    mvp: "interestIntentMvp",
  };

  const getInitialLang = () => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (supported.has(urlLang)) {
      return urlLang;
    }

    const hashLang = window.location.hash.replace("#", "");
    if (supported.has(hashLang)) {
      return hashLang;
    }

    try {
      const savedLang = window.localStorage.getItem("triotoGatewayLang");
      if (supported.has(savedLang)) {
        return savedLang;
      }
    } catch (_error) {
      return "en";
    }

    return "en";
  };

  const setLinkTargets = (lang) => {
    const copy = translations[lang];

    whatsappLinks.forEach((link) => {
      const person = link.getAttribute("data-whatsapp");
      const phone = person === "vitor" ? "351919558604" : "351918503013";
      const message = person === "vitor" ? copy.waVitor : copy.waTiago;
      link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    });

    interestLinks.forEach((link) => {
      const person = link.getAttribute("data-interest-contact") === "vitor" ? "vitor" : "tiago";
      const phone = person === "vitor" ? "351919558604" : "351918503013";
      const intro = person === "vitor" ? copy.interestIntroVitor : copy.interestIntroTiago;
      const intentKey = interestKeyMap[link.getAttribute("data-interest-whatsapp")] || interestKeyMap.ip;
      const intent = copy[intentKey];
      link.href = `https://wa.me/${phone}?text=${encodeURIComponent(`${intro}\n\n${intent}`)}`;
      link.setAttribute("aria-label", `WhatsApp ${person === "vitor" ? "Vítor" : "Tiago"}: ${intent}`);
    });

    if (emailLink) {
      const subject = encodeURIComponent(copy.mailSubject);
      const body = encodeURIComponent(copy.mailBody);
      emailLink.href = `mailto:admin@trioto.tech?subject=${subject}&body=${body}`;
    }
  };

  const setLang = (lang) => {
    const activeLang = supported.has(lang) ? lang : "en";
    const copy = translations[activeLang];

    document.documentElement.lang = activeLang;
    document.title = copy.title;

    textNodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (copy[key]) {
        node.textContent = copy[key];
      }
    });

    langButtons.forEach((button) => {
      const isActive = button.getAttribute("data-lang-option") === activeLang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    setLinkTargets(activeLang);

    try {
      window.localStorage.setItem("triotoGatewayLang", activeLang);
    } catch (_error) {
      return;
    }
  };

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLang(button.getAttribute("data-lang-option"));
    });
  });

  setLang(getInitialLang());
})();
