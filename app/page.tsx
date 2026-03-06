"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, ChevronRight, Terminal, X } from "lucide-react";
import Lenis from "lenis";

// --- BOUTON MAGNÉTIQUE PREMIUM (Apple-like) ---
const MagneticButton = ({ children, className, href, onClick, intensity = 0.1 }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void; intensity?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };
  const reset = () => setPosition({ x: 0, y: 0 });

  const Wrapper = href ? "a" : "button";
  return (
    // @ts-ignore : Types simplifiés pour la démo
    <Wrapper href={href} onClick={onClick} className="inline-block relative z-20">
      <motion.div 
        ref={ref} 
        onMouseMove={handleMouse} 
        onMouseLeave={reset} 
        animate={{ x: position.x, y: position.y }} 
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={`flex items-center justify-center p-3 px-6 rounded-full cursor-pointer bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors duration-300 backdrop-blur-md ${className}`}
      >
        <span className="relative z-10 font-medium tracking-wide text-sm flex items-center gap-2">{children}</span>
      </motion.div>
    </Wrapper>
  );
};

// --- DATA PROJETS ---
const projects = [
  {
    title: "Minishell",
    desc: "Création d'un interpréteur de commandes en C reproduisant le comportement de base de bash.",
    tech: ["C", "Unix", "Shell"],
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&auto=format&fit=crop",
  },
  {
    title: "Cub3D",
    desc: "Développement d'un moteur de jeu type Raycasting en C (en cours de développement).",
    tech: ["C", "Algorithmique", "Rendu"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&auto=format&fit=crop",
  },
  {
    title: "FdF",
    desc: "Programme de rendu 3D isométrique en fil de fer.",
    tech: ["C", "Mathématiques"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&auto=format&fit=crop",
  },
  {
    title: "Helios Energies",
    desc: "Site vitrine. Intégration et adaptation d'un template web pour les besoins d'un client réel.",
    tech: ["Web", "Déploiement"],
    image: "https://images.unsplash.com/photo-1618477247222-ac60c2800bf9?q=80&auto=format&fit=crop",
  },
  {
    title: "Distributeur IoT",
    desc: "Conception 3D, assemblage électronique et programmation d'un distributeur de croquettes domotisé.",
    tech: ["IoT", "Impression 3D", "Électronique"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&auto=format&fit=crop",
  },
  {
    title: "Serveur Homelab",
    desc: "Mise en place d'un serveur personnel (Portainer, HomeAssistant, VaultWarden, Nextcloud...) pour l'auto-hébergement et la souveraineté des données.",
    tech: ["Docker", "Admin Sys", "Réseau"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&auto=format&fit=crop",
  },
  {
    title: "Imprimante 3D Custom",
    desc: "Assemblage, câblage et configuration complète d'une imprimante 3D sur mesure.",
    tech: ["Hardware", "Marlin"],
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&auto=format&fit=crop",
  },
  {
    title: "IA & Python",
    desc: "Développement d'un script d'entraînement de modèle d'intelligence artificielle réalisé en stage.",
    tech: ["Python", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&auto=format&fit=crop",
  }
];

// --- FOND AMBIANT VIVANT (Style Aura / Nébuleuse) ---
const ContinuousBackground = () => (
  <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
    {/* Orbe Cyan - Mouvement de respiration lent */}
    <motion.div 
      animate={{ 
        x: ["0%", "5%", "0%"], 
        y: ["0%", "8%", "0%"],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-5%] md:top-[-20%] left-[-10%] md:left-[10%] w-[100vw] md:w-[50vw] h-[100vw] md:h-[50vw] bg-accent/30 md:bg-accent/20 blur-[80px] md:blur-[100px] mix-blend-screen opacity-50 md:opacity-50" 
    />
    
    {/* Orbe Bleu - Mouvement asynchrone */}
    <motion.div 
      animate={{ 
        x: ["0%", "-5%", "0%"], 
        y: ["0%", "-5%", "0%"],
        scale: [1, 1.05, 1]
      }}
      transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[-5%] right-[-10%] md:right-[10%] w-[120vw] md:w-[60vw] h-[120vw] md:h-[60vw] bg-blue-700/30 md:bg-blue-700/20 blur-[90px] md:blur-[120px] mix-blend-screen opacity-50 md:opacity-50" 
    />
  </div>
);

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  useEffect(() => {
    if (textIndex >= texts.length) return;
    
    // Si on a fini la ligne actuelle, ou passe à la suivante après un délai
    if (charIndex >= texts[textIndex].length) {
      if (textIndex < texts.length - 1) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + "\n");
          setTextIndex(textIndex + 1);
          setCharIndex(0);
        }, 500); // Pause entre les lignes
        return () => clearTimeout(timeout);
      }
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + texts[textIndex][charIndex]);
      setCharIndex(charIndex + 1);
    }, 40); // Vitesse de frappe

    return () => clearTimeout(timeout);
  }, [charIndex, textIndex, texts]);

  return (
    <span className="whitespace-pre-wrap">
      {displayedText}
      <span className="animate-pulse border-r-2 border-accent ml-[2px]" />
    </span>
  );
};

// --- HERO SECTION ---
const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  // La section recule légèrement (moins violent que 0.9)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  // Au lieu de jouer sur l'opacité ou les bords ronds, on crée une ombre qui s'épaissit
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Parallaxe interne du texte
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ scale, transformOrigin: 'top center', zIndex: 5 }} 
      className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 bg-transparent overflow-hidden"
    >
      {/* Ombre d'assombrissement organique (plus foncée en bas qu'en haut) */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <motion.div style={{ y: yText }} className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center">
        <p className="text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase mb-8">
          Développeur & Maker
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-medium tracking-tighter leading-[0.95] mb-8 text-white">
          Hugo <br/>
          <span className="text-accent italic font-light pr-4">Burton.</span>
        </h1>
        <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed px-4 h-24">
          <TypewriterText 
            texts={[
              "Développeur Logiciel. Modélisateur 3D. Maker IoT."
            ]} 
          />
        </p>
        <MagneticButton href="#projets-start" className="!bg-white !text-black hover:!bg-accent hover:!text-black px-8 py-4">
          Voir mes projets <ArrowDown className="w-4 h-4 ml-1" />
        </MagneticButton>
      </motion.div>
    </motion.section>
  );
};

// --- COMPOSANT PROJET : LE VRAI STACKING CARD EFFECT REFINÉ ---
const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Cette animation se déclenche UNIQUEMENT quand la carte est fixée en haut et que la SUIVANTE commence à glisser dessus.
  // start start: Le haut de CETTE carte touche le haut de l'écran.
  // end start: Le bas de CETTE carte (qui fait 100vh de base) touche le haut de l'écran (soit 100vh de scroll plus tard).
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Mouvement du halo : on veut l'animer PENDANT que la carte atterrit (glisse du bas de l'écran jusqu'en haut)
  const { scrollYProgress: slideProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  // Le halo balaye de droite vers la gauche exactement pendant l'apparition fluide de la carte
  const leftHalo = useTransform(slideProgress, [0, 1], ["100%", "-100%"]);
  
  const isEven = index % 2 === 0;

  return (
    <motion.section 
      ref={containerRef}
      id={`projet-${index}`}
      style={{ 
        scale, 
        transformOrigin: 'top center', 
        zIndex: 10 + index, 
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }} 
      className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 xl:px-24 bg-[#050505] border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Halo lumineux qui voyage de façon autonome et propre à cette carte */}
      <motion.div 
        style={{ left: leftHalo }}
        className="absolute top-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" 
      />
      
      {/* Ombre organique pour l'effet de profondeur sans le look "bloc noir". Protège du contenu et masque subtilement. */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none" />
      
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 w-full max-w-screen-2xl items-center relative z-10`}>
          
          {/* TEXTES - Typographie très aérée et raffinée (Apple style) */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center order-2 lg:order-none">
            <div className="text-zinc-600 font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
               <span className="w-8 h-[1px] bg-zinc-800" /> PROJET 0{index + 1}
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-medium tracking-tighter mb-8 text-white">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light mb-10">
              {project.desc}
            </p>
            <ul className="flex flex-wrap gap-2 mb-10">
              {project.tech.map((t, i) => (
                <li key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-zinc-300 font-medium text-xs tracking-wide">
                  {t}
                </li>
              ))}
            </ul>
            <div>
              <MagneticButton onClick={() => setIsFlipped(!isFlipped)} className="!px-6 !py-3 min-w-[200px]">
                {isFlipped ? "Retour" : "Détails techniques"}
                {isFlipped ? <X className="w-4 h-4 ml-2 opacity-50" /> : <ChevronRight className="w-4 h-4 ml-2 opacity-50" />}
              </MagneticButton>
            </div>
          </div>

          {/* IMAGE - 3D FLIP CONTAINER */}
          <div className="w-full lg:w-7/12 h-[45vh] lg:h-[70vh] relative flex items-center justify-center order-1 lg:order-none mt-20 lg:mt-0" style={{ perspective: "2000px" }}>
            <motion.div 
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* FRONT: IMAGE */}
              <div 
                className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 pointer-events-auto"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* loading="lazy" et decoding="async" pour d'énormes gains de performance */}
                <motion.img 
                  style={{ y: yImage, scale: 1.15 }}
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-[120%] object-cover object-center opacity-80 hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              {/* BACK: DETAILS */}
              <div 
                className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] flex flex-col p-8 md:p-12"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <button 
                  onClick={() => setIsFlipped(false)} 
                  className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50 text-zinc-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <h3 className="text-3xl font-medium tracking-tighter mb-8 text-white flex items-center gap-4">
                  <Terminal className="w-6 h-6 text-accent" />
                  Notes Techniques
                </h3>
                
                <div className="flex-1 overflow-y-auto pr-4 space-y-6 text-zinc-400 font-mono text-sm leading-relaxed custom-scrollbar relative z-40" onClick={e => e.stopPropagation()}>
                  <p className="text-zinc-300 font-sans text-base">
                    // TODO: Implémenter les détails spécifiques pour {project.title}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                  </p>
                  <div className="p-4 bg-black/50 border border-white/5 rounded-lg mt-4">
                    <span className="text-accent">console.log</span>("Architecture scalable déployée avec succès.");
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.section>
  );
};

// --- FOOTER MASSIF ---
const FooterSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Le même schéma de halo pour le footer
  const { scrollYProgress: slideProgress } = useScroll({ target: containerRef, offset: ["start end", "start start"] });
  const leftHalo = useTransform(slideProgress, [0, 1], ["100%", "-100%"]);

  // Apparition du contenu en douceur (Parallaxe vers le haut)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end end"] });
  const yContent = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.footer 
      ref={containerRef} 
      id="contact" 
      className="sticky top-0 h-screen w-full bg-[#050505] border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center px-6 z-[100] overflow-hidden"
    >
      {/* Halo lumineux qui voyage */}
      <motion.div 
        style={{ left: leftHalo }}
        className="absolute top-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" 
      />
      
      {/* Éclairage directionnel dramatique venant du haut */}
      <div className="absolute top-0 inset-x-0 mx-auto w-full h-[40vh] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />

      <motion.div 
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl"
      >
        <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-medium tracking-tighter mb-12 leading-[0.9]">
          Contactez-moi.
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-20 w-full">
          <MagneticButton href="mailto:contact@example.com" className="!bg-black border border-white/10 hover:!border-accent/40 !text-white hover:!text-accent !p-4 transition-colors">
            <Mail className="w-6 h-6" />
          </MagneticButton>
          <MagneticButton href="https://linkedin.com" className="!bg-black border border-white/10 hover:!border-accent/40 !text-white hover:!text-accent !p-4 transition-colors">
            <Linkedin className="w-6 h-6" />
          </MagneticButton>
          <MagneticButton href="https://github.com" className="!bg-black border border-white/10 hover:!border-accent/40 !text-white hover:!text-accent !p-4 transition-colors">
            <Github className="w-6 h-6" />
          </MagneticButton>
        </div>
        
        <div className="absolute bottom-8 text-zinc-600 text-xs font-mono tracking-widest">
          © 2026 — Hugo Burton
        </div>
      </motion.div>
    </motion.footer>
  );
}

// --- PRELOADER (Style 3 Boules Modernes & Rapide) ---
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    // Faux chargement extrêmement court (1 seconde)
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      // Fondu de sortie (le fond transparent permettait de voir ContinuousBackground, on met bg-transparent pour garder le monde visible)
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-transparent flex flex-col items-center justify-center pointer-events-none"
    >
      <motion.div 
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className="absolute inset-0 flex items-start justify-center"
            style={{ transform: `rotate(${i * 120}deg)` }}
          >
            <motion.div 
              className="w-3 h-3 bg-accent rounded-full shadow-[0_0_15px_#00f0ff]"
              animate={{ scale: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// --- SIDE NAVIGATION MODERNE ---
const SideNav = ({ projectsCount }: { projectsCount: number }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // On calcule l'index basé sur le scroll. Le HeroSection fait 1vh. Chaque projet fait 1vh.
      const newIndex = Math.floor((scrollY - vh * 0.5) / vh);
      
      if (newIndex < 0) setActiveIndex(-1);
      else if (newIndex >= projectsCount) setActiveIndex(projectsCount - 1);
      else setActiveIndex(newIndex);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projectsCount]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[300] hidden xl:flex flex-col gap-3 items-end mix-blend-difference pointer-events-none">
      {Array.from({ length: projectsCount }).map((_, i) => (
        <a 
          key={i} 
          href={`#projet-anchor-${i}`}
          className={`group flex items-center gap-3 transition-all duration-500 pointer-events-auto font-mono text-sm leading-none
            ${activeIndex === i ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
          aria-label={`Aller au projet ${i + 1}`}
        >
          <span className={`h-[1px] transition-all duration-500 ${activeIndex === i ? 'w-8 bg-accent' : 'w-3 bg-zinc-600 group-hover:w-5 group-hover:bg-zinc-400'}`} />
          <span>0{i + 1}</span>
        </a>
      ))}
    </div>
  );
};

// --- MAIN LAYOUT : CLEAN & LISSE ---
export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll Lenis ultra adouci (lerp à 0.08) pour une sensation luxueuse
    const lenis = new Lenis({
      lerp: 0.08, 
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    
    // Intercepter les liens d'ancre pour un smooth scroll avec Lenis
    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const hash = target.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        lenis.scrollTo(hash, { offset: 0, duration: 2 });
      }
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(a => a.addEventListener('click', handleAnchorClick));

    // Si on a l'attribut spécial pour scroller en haut
    const handleTopClick = (e: Event) => {
      e.preventDefault();
      lenis.scrollTo(0, { duration: 2 });
    };
    const topAnchors = document.querySelectorAll('a[href="#top"]');
    topAnchors.forEach(a => a.addEventListener('click', handleTopClick));

    return () => {
      anchors.forEach(a => a.removeEventListener('click', handleAnchorClick));
      topAnchors.forEach(a => a.removeEventListener('click', handleTopClick));
      lenis.destroy();
    };
  }, [isLoading]); // Ajout de isLoading en dépendance pour que Lenis se re-bind au DOM quand il a fini de charger

  return (
    <div className="text-white font-sans selection:bg-accent selection:text-black min-h-screen relative">
      {/* 
        Si on veut que l'aura/dégradé apparaisse EN MÊME TEMPS que le reste et pas avant,
        on le conditionne aussi avec !isLoading
      */}
      {!isLoading && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="absolute inset-0 z-0"
        >
          <ContinuousBackground />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* NAVBAR MINIMALISTE (Sortie du fade global pour éviter le saut 3D/Scale de Framer Motion) */}
      {!isLoading && (
        <>
          <SideNav projectsCount={projects.length} />
          <header className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between p-6 mix-blend-difference pointer-events-none animate-[fadeIn_1s_ease-out]">
            <a href="#top" className="flex items-center gap-2 font-bold tracking-tighter text-lg pointer-events-auto">
              <Terminal className="w-5 h-5 text-accent" />
              <span>HB.</span>
            </a>
            <nav className="flex items-center gap-6 font-medium text-xs tracking-widest uppercase pointer-events-auto text-zinc-400">
              <a href="#projets-start" className="hidden md:block hover:text-white transition-colors">Travaux</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>
          </header>
        </>
      )}

      {!isLoading && (
        <motion.div 
          key="main-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {/* STRUCTURE DU DECK DE CARTES */}
          <div className="relative w-full">
            <HeroSection />
            <div id="projets-start" className="absolute top-[100vh]" />
            {projects.map((_, i) => (
              <div key={`anchor-${i}`} id={`projet-anchor-${i}`} className="absolute w-full h-[1px] pointer-events-none" style={{ top: `${(i + 1) * 100}vh` }} />
            ))}
            {projects.map((proj, i) => <ProjectCard key={i} project={proj} index={i} />)}
            <FooterSection />
          </div>
        </motion.div>
      )}
    </div>
  );
}
