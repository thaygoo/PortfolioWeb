"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, ChevronRight, Terminal, X } from "lucide-react";
import Lenis from "lenis";

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

  const Wrapper = href ? "a" : "button" as any;
  return (
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

const projects = [
  {
    title: "Minishell",
    desc: "Création d'un interpréteur de commandes en C reproduisant le comportement de base de bash.",
    tech: ["C", "Unix", "Shell"],
    images: ["/projects/minishell.webp"],
    details: [
      "Re-création from scratch d'un shell type GNU bash interactif.",
      "Gestion complète de l'environnement, des variables locales, des redirections (pipes, >, <, >>, <<).",
      "Implémentation des builtins clés (echo, cd, pwd, export, unset, env, exit).",
      "Parsing complexe avec prise en charge des quotes simples/doubles."
    ]
  },
  {
    title: "Cub3D",
    desc: "Développement d'un moteur de jeu type Raycasting en C (en cours de développement).",
    tech: ["C", "Algorithmique", "Rendu"],
    images: ["/projects/cub3D.webp"],
    details: [
      "Création d'un système de rendu 3D basé sur la technique historique du Raycasting (façon Wolfenstein 3D).",
      "Calcul des intersections de rayons sur une grille 2D pour générer des perspectives.",
      "Gestion des textures, des déplacements caméra (translation, rotation avec souris/clavier), et des collisions avec les murs."
    ]
  },
  {
    title: "FdF",
    desc: "Programme de rendu 3D isométrique en fil de fer.",
    tech: ["C", "Mathématiques"],
    images: ["/projects/fdf100-6.webp", "/projects/fdfmars.webp", "/projects/fdft2.webp"],
    details: [
      "Représentation graphique fil de fer (wireframe) d'un paysage ou d'une carte topographique fournie sous forme de coordonnées X,Y,Z.",
      "Implémentation des algorithmes de tracé de segment de Bresenham.",
      "Calcul matriciel pour convertir un espace 3D en une projection isométrique 2D sur l'écran."
    ]
  },
  {
    title: "Helios Energies",
    desc: "Site vitrine. Intégration et adaptation d'un template web pour les besoins d'un client réel.",
    tech: ["Web", "Déploiement"],
    images: ["/projects/helios.webp"],
    details: [
      "Adaptation visuelle et structurelle d'un modèle pour répondre à l'identité d'une entreprise du secteur des énergies.",
      "Optimisation des performances avec des assets responsives et du lazy loading.",
      "Déploiement en ligne et configuration du domaine, permettant au client de gagner en visibilité numérique."
    ]
  },
  {
    title: "Distributeur IoT",
    desc: "Conception 3D, assemblage électronique et programmation d'un distributeur de croquettes domotisé.",
    tech: ["IoT", "Impression 3D", "Électronique"],
    images: ["/projects/distributeur.webp"],
    details: [
      "Modélisation complète des pièces sur un logiciel CAO (Fusion 360) et fabrication en impression 3D.",
      "Soudure et câblage des composants embarqués (microcontrôleur, servomoteur, capteurs).",
      "Écriture d'un programme en C/C++ pour l'orchestration, permettant des déclenchements programmés et une intégration réseau éventuelle."
    ]
  },
  {
    title: "Serveur Homelab",
    desc: "Mise en place d'un serveur personnel (Portainer, HomeAssistant, VaultWarden, Nextcloud...) pour l'auto-hébergement et la souveraineté des données.",
    tech: ["Docker", "Admin Sys", "Réseau"],
    images: ["/projects/homelab.webp"],
    details: [
      "Configuration complète d'un serveur à domicile depuis un OS vierge (Linux).",
      "Utilisation avancée de Docker / Docker Compose et administration via Portainer pour isoler les conteneurs hébergés.",
      "Gestion de proxy inversé (Traefik / Nginx), d'un dashboard unifié, et maintien opérationnel des certificats SSL/TLS."
    ]
  },
  {
    title: "Imprimante 3D Custom",
    desc: "Assemblage, câblage et configuration complète d'une imprimante 3D sur mesure.",
    tech: ["Hardware", "Marlin"],
    images: ["/projects/imprimante3D.webp", "/projects/imprimante3D_2.webp"],
    details: [
      "Choix et montage du profilé aluminium, de la cinématique (courroies, tiges filetées) et des moteurs pas-à-pas.",
      "Câblage sécurisé de l'alimentation, de la carte mère, et de l'extrusion (hotend).",
      "Configuration, compilation et flashage du firmware open-source Marlin. Calibration fine (steps/mm, PID tuning)."
    ]
  },
  {
    title: "IA & Python",
    desc: "Développement d'un script d'entraînement de modèle d'intelligence artificielle réalisé en stage.",
    tech: ["Python", "Machine Learning"],
    images: ["/projects/luxscan.webp"],
    details: [
      "Pipeline de traitement d'images automatisé (nettoyage, normalisation, annotation des défauts sur des surfaces boisées).",
      "Entraînement d'un modèle neuronal pour la segmentation ou détection de caractéristiques sur les planches.",
      "Amélioration de la fiabilité via des méthodes d'augmentation de données et analyse des résultats post-entraînement."
    ]
  }
];

const ContinuousBackground = () => (
  <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
    {}
    <motion.div 
      style={{ willChange: "transform" }}
      animate={{ 
        x: ["0%", "5%", "0%"], 
        y: ["0%", "8%", "0%"],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-5%] md:top-[-20%] left-[-10%] md:left-[10%] w-[100vw] md:w-[50vw] h-[100vw] md:h-[50vw] bg-accent/30 md:bg-accent/20 blur-[80px] md:blur-[100px] mix-blend-screen opacity-50 md:opacity-50" 
    />
    
    {}
    <motion.div 
      style={{ willChange: "transform" }}
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
    
    if (charIndex >= texts[textIndex].length) {
      if (textIndex < texts.length - 1) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + "\n");
          setTextIndex(textIndex + 1);
          setCharIndex(0);
        }, 500);
        return () => clearTimeout(timeout);
      }
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + texts[textIndex][charIndex]);
      setCharIndex(charIndex + 1);
    }, 40);

    return () => clearTimeout(timeout);
  }, [charIndex, textIndex, texts]);

  return (
    <span className="whitespace-pre-wrap">
      {displayedText}
      <span className="animate-pulse border-r-2 border-accent ml-[2px]" />
    </span>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  const stickyScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const scale = isDesktop ? stickyScale : 1;

  const overlayOpacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yTextRaw = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const overlayOpacity = isDesktop ? overlayOpacityRaw : 0;
  const yText = isDesktop ? yTextRaw : "0%";

  return (
    <motion.section 
      ref={containerRef}
      style={{ scale, transformOrigin: 'top center', zIndex: 5 }} 

      className="relative md:sticky top-0 min-h-[85vh] md:h-screen py-24 md:py-0 w-full flex items-center justify-center px-6 md:px-12 bg-transparent overflow-hidden"
    >
      {}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <motion.div style={{ y: yText }} className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center">
        <p className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 md:mb-8">
          Développeur & Maker
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-medium tracking-tighter leading-[0.95] mb-6 md:mb-8 text-white">
          Hugo <br/>
          <span className="text-accent italic font-light pr-2 md:pr-4">Burton.</span>
        </h1>
        <p className="text-base md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 md:mb-12 font-light leading-relaxed px-4 h-24">
          <TypewriterText 
            texts={[
              "Développeur Logiciel.\nModélisateur 3D.\nMaker IoT."
            ]} 
          />
        </p>
        <MagneticButton href="#projets-start" className="!bg-white !text-black hover:!bg-accent hover:!text-black px-6 py-3 md:px-8 md:py-4">
          Voir mes projets <ArrowDown className="w-4 h-4 ml-1" />
        </MagneticButton>
      </motion.div>
    </motion.section>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [project.images]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const stickyScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  
  const stickyOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const scale = isDesktop ? stickyScale : 1;
  const contentOpacity = isDesktop ? stickyOpacity : 1;

  const { scrollYProgress: slideProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const leftHaloRaw = useTransform(slideProgress, [0, 1], ["100%", "-100%"]);
  const leftHalo = isDesktop ? leftHaloRaw : "-100%";
  
  const isEven = index % 2 === 0;

  return (
    <motion.section 
      ref={containerRef}
      id={`projet-${index}`}
      style={{ 
        scale, 
        transformOrigin: 'top center', 
        zIndex: 10 + index,
      }} 

      className="relative md:sticky top-0 h-auto md:h-screen py-16 md:py-0 w-full flex items-center justify-center px-4 md:px-12 xl:px-24 bg-[#050505] border-t-0 md:border-t border-white/5 overflow-hidden"
    >
      {}
      <motion.div 
        style={{ left: leftHalo }}
        className="absolute top-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" 
      />
      
      {}
      
      {}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 md:gap-12 lg:gap-24 w-full max-w-screen-2xl items-center relative z-10 py-12 lg:py-0`}
      >
          
          {}
          <div className="w-full lg:w-5/12 flex flex-col justify-center order-2 lg:order-none mt-8 lg:mt-0">
            <div className="text-zinc-600 font-mono text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-6 flex items-center gap-4">
               <span className="w-6 md:w-8 h-[1px] bg-zinc-800" /> PROJET 0{index + 1}
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-medium tracking-tighter mb-6 md:mb-8 text-white">
              {project.title}
            </h2>
            <p className="text-base md:text-xl text-zinc-400 leading-relaxed font-light mb-8 md:mb-10">
              {project.desc}
            </p>
            <ul className="flex flex-wrap gap-2 mb-8 md:mb-10">
              {project.tech.map((t, i) => (
                <li key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/5 rounded-full text-zinc-300 font-medium text-[10px] md:text-xs tracking-wide">
                  {t}
                </li>
              ))}
            </ul>
            <div>
              <MagneticButton onClick={() => setIsFlipped(!isFlipped)} className="!px-5 !py-2 md:!px-6 md:!py-3 min-w-[180px] md:min-w-[200px]">
                {isFlipped ? "Retour" : "Détails techniques"}
                {isFlipped ? <X className="w-4 h-4 ml-2 opacity-50" /> : <ChevronRight className="w-4 h-4 ml-2 opacity-50" />}
              </MagneticButton>
            </div>
          </div>

          {}
          <div className="w-full lg:w-7/12 relative flex items-center justify-center order-1 lg:order-none" style={{ perspective: "2000px" }}>
            <motion.div 
              className="relative w-fit max-w-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {}
              <div 
                className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black pointer-events-auto"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(0)" }}
              >
                <div className="grid items-center justify-items-center">
                  {project.images.map((imgUrl, i) => {
                    const isActive = i === currentImageIndex;

                    return (
                      <div 
                        key={i} 
                        className={`col-start-1 row-start-1 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                          isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`${project.title} - vue ${i + 1}`}
                          className="w-auto h-auto max-w-full max-h-[300px] md:max-h-[60vh] lg:max-h-[75vh] rounded-2xl md:rounded-3xl block transition-transform duration-700 ease-out hover:scale-[1.02]"
                        />
                      </div>
                    );
                  })}
                </div>

                {}
                {project.images.length > 1 && (
                  <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(i);
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          i === currentImageIndex 
                            ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.7)]" 
                            : "bg-white/40 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {}
              <div 
                className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] flex flex-col p-6 md:p-12 pointer-events-auto"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(0)" }}
              >
                <button 
                  onClick={() => setIsFlipped(false)} 
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                <h3 className="text-2xl md:text-3xl font-medium tracking-tighter mb-4 md:mb-8 text-white flex items-center gap-3">
                  <Terminal className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  Notes Techniques
                </h3>
                
                <div 
                  className="flex-1 pr-2 md:pr-4 space-y-4 md:space-y-6 text-zinc-400 font-mono text-xs md:text-sm leading-relaxed relative z-40" 
                  onClick={e => e.stopPropagation()}
                >
                  {project.details.map((detail, idx) => (
                    <p key={idx} className="flex gap-3">
                      <span className="text-accent/60">{'//'}</span>
                      <span className="text-zinc-300">{detail}</span>
                    </p>
                  ))}
                  
                  <div className="p-4 bg-black/50 border border-white/5 rounded-lg mt-8 inline-block w-full">
                    <span className="text-zinc-500">[{project.tech.join("] - [")}]</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </motion.section>
  );
};

const skills = [
  "Fusion 360", "Adobe Premiere Pro", "Photoshop", "DaVinci Resolve",
  "Marlin", "IoT", "Électronique", "Docker", "Linux", "Git", "GitHub", "Portainer",
  "C", "C++", "Python", "Bash", "HTML", "CSS", "PHP", "TypeScript"
];

const SkillsSection = () => {
  return (
    <section id="competences" className="relative w-full py-24 md:py-32 bg-[#050505] border-t border-white/5 z-50 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full flex flex-col items-center">
        
        <h2 className="text-zinc-600 font-mono text-xs md:text-sm tracking-widest uppercase mb-16 flex items-center gap-4 px-6 text-center">
          <span className="hidden md:block w-8 h-[1px] bg-zinc-800" /> COMPÉTENCES & OUTILS <span className="hidden md:block w-8 h-[1px] bg-zinc-800" />
        </h2>

        {}
        <div className="w-full relative flex overflow-hidden mb-8 group [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            className="flex whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
          >
            {}
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-8 md:gap-16 px-4 md:px-8 items-center">
                {skills.map((skill, index) => (
                  <span key={index} className="text-4xl md:text-6xl font-medium tracking-tighter text-zinc-800 uppercase hover:text-white transition-colors duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const FooterSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const { scrollYProgress: slideProgress } = useScroll({ target: containerRef, offset: ["start end", "start start"] });
  const leftHaloRaw = useTransform(slideProgress, [0, 1], ["100%", "-100%"]);
  const leftHalo = isDesktop ? leftHaloRaw : "-100%";

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end end"] });
  const yContentRaw = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const opacityContentRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const yContent = isDesktop ? yContentRaw : "0%";
  const opacityContent = isDesktop ? opacityContentRaw : 1;

  return (
    <motion.footer 
      ref={containerRef}
      id="contact"
      className="relative md:sticky top-0 h-auto md:h-screen py-16 md:py-0 w-full bg-[#050505] border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center px-6 z-[100] overflow-hidden"
    >
      {}
      <motion.div 
        style={{ left: leftHalo }}
        className="absolute top-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" 
      />
      
      {}
      <div className="absolute top-0 inset-x-0 mx-auto w-full h-[40svh] md:h-[40vh] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />

      <motion.div 
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl"
      >
        <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-medium tracking-tighter mb-12 leading-[0.9]">
          Contactez-moi.
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-20 w-full">
          <MagneticButton href="mailto:hugo.burton6@gmail.com" className="!bg-black border border-white/10 hover:!border-accent/40 !text-white hover:!text-accent !p-4 transition-colors">
            <Mail className="w-6 h-6" />
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/hugo-burton-007591232/" className="!bg-black border border-white/10 hover:!border-accent/40 !text-white hover:!text-accent !p-4 transition-colors">
            <Linkedin className="w-6 h-6" />
          </MagneticButton>
          <MagneticButton href="https://github.com/thaygoo?tab=repositories" className="!bg-black border border-white/10 hover:!border-accent/40 !text-white hover:!text-accent !p-4 transition-colors">
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

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div

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

const SideNav = ({ projectsCount }: { projectsCount: number }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

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

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.08, 
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    
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
  }, [isLoading]);

  return (
    <div className="text-white font-sans selection:bg-accent selection:text-black min-h-screen relative">
      {}
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

      {}
      {!isLoading && (
        <>
          <SideNav projectsCount={projects.length} />
          {}
          <header className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between p-4 md:p-6 mb-4 bg-[#050505]/70 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/10 md:border-none mix-blend-normal md:mix-blend-difference pointer-events-none animate-[fadeIn_1s_ease-out]">
            <a href="#top" className="flex items-center gap-2 font-bold tracking-tighter text-lg pointer-events-auto">
              <Terminal className="w-5 h-5 text-accent" />
              <span>HB.</span>
            </a>
            <nav className="flex items-center gap-4 md:gap-6 font-medium text-xs tracking-widest uppercase pointer-events-auto text-zinc-400">
              <a href="#projets-start" className="hidden md:block hover:text-white transition-colors">Travaux</a>
              <a href="#competences" className="hidden md:block hover:text-white transition-colors">Compétences</a>
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
          {}
          <div className="relative w-full">
            <HeroSection />
            <div id="projets-start" className="absolute top-[100svh]" />
            {projects.map((_, i) => (
              <div key={`anchor-${i}`} id={`projet-anchor-${i}`} className="absolute w-full h-[1px] pointer-events-none" style={{ top: `calc(${(i + 1)} * 100svh)` }} />
            ))}
            {projects.map((proj, i) => <ProjectCard key={i} project={proj} index={i} />)}
            
            <SkillsSection />
            <FooterSection />
          </div>
        </motion.div>
      )}
    </div>
  );
}
