"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, ChevronRight } from "lucide-react";
import Lenis from "lenis";

// --- BOUTON MAGNÉTIQUE PREMIUM (Apple-like) ---
const MagneticButton = ({ children, className, href, intensity = 0.1 }: { children: React.ReactNode; className?: string; href?: string; intensity?: number }) => {
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

  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper href={href} className="inline-block relative z-20">
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
    title: "École 42",
    desc: "Plongeon dans les abysses du système : C, algorithmique avancée, mathématiques et gestion de la mémoire. Reconstruire l'existant pour maîtriser les fondations.",
    tech: ["Langage C", "Unix", "Shell"],
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&auto=format&fit=crop",
  },
  {
    title: "Écosystème Web",
    desc: "Ingénierie front-end orientée performance et fluidité. Architectures React modernes, animations GSAP/Framer et design systems ultra-scalables.",
    tech: ["Next.js", "React", "TypeScript"],
    image: "https://images.unsplash.com/photo-1618477247222-ac60c2800bf9?q=80&auto=format&fit=crop",
  },
  {
    title: "Matière & IOT",
    desc: "Le code au service du réel. Du design CAO millimétré à l'impression 3D résine, en passant par le prototypage de circuits électroniques embarqués.",
    tech: ["Impression 3D", "Fusion 360", "Arduino"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&auto=format&fit=crop",
  }
];

// --- FOND AMBIANT FIXE (Évite les bandes noires !) ---
const ContinuousBackground = () => (
  // Ce fond reste TOUJOURS visible derrière les cartes. 
  // Quand une carte rétrécit, elle dévoile cette merveille au lieu du vide.
  <div className="fixed inset-0 z-[-1] bg-black overflow-hidden pointer-events-none">
    <div className="absolute top-[-20%] left-[10%] w-[50vw] h-[50vw] bg-accent/20 blur-[150px] mix-blend-screen opacity-50" />
    <div className="absolute bottom-[-10%] right-[10%] w-[60vw] h-[60vw] bg-blue-700/20 blur-[150px] mix-blend-screen opacity-50" />
  </div>
);

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
      style={{ scale, transformOrigin: 'top center' }} 
      className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 bg-transparent overflow-hidden"
    >
      {/* Ombre d'assombrissement pour la profondeur */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black z-20 pointer-events-none" />
      <motion.div style={{ y: yText }} className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center">
        <p className="text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase mb-8">
          Portfolio // 2026
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-medium tracking-tighter leading-[0.95] mb-8 text-white">
          Créateur <br/>
          <span className="text-accent italic font-light pr-4">Numérique.</span>
        </h1>
        <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed px-4">
          Ingénieur Front-end. Praticien IOT. Façonneur 3D.<br/>L'obsession du détail, du navigateur jusqu'au matériel.
        </p>
        <MagneticButton href="#projet-0" className="!bg-white !text-black hover:!bg-accent hover:!text-black px-8 py-4">
          Découvrir l'expertise <ArrowDown className="w-4 h-4 ml-1" />
        </MagneticButton>
      </motion.div>
    </motion.section>
  );
};

// --- COMPOSANT PROJET : LE VRAI STACKING CARD EFFECT REFINÉ ---
const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const containerRef = useRef<HTMLElement>(null);
  
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
      style={{ scale, transformOrigin: 'top center' }} 
      className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12 xl:px-24 bg-[#050505] border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,1)] overflow-hidden"
    >
      {/* Halo lumineux qui voyage de façon autonome et propre à cette carte */}
      <motion.div 
        style={{ left: leftHalo }}
        className="absolute top-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" 
      />
      
      {/* Ombre d'assombrissement. Protège du contenu précédent et masque le halo quand la carte s'efface */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black z-30 pointer-events-none" />
      
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
              <MagneticButton className="!px-6 !py-3">
                Voir l'étude de cas <ChevronRight className="w-4 h-4 ml-1 opacity-50" />
              </MagneticButton>
            </div>
          </div>

          {/* IMAGE - Fini le hover gadget, on privilégie une photo nette et immense */}
          <div className="w-full lg:w-7/12 h-[45vh] lg:h-[70vh] relative flex items-center justify-center order-1 lg:order-none mt-20 lg:mt-0">
            <div className="w-full h-full relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
              <motion.img 
                style={{ y: yImage, scale: 1.15 }}
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-[120%] object-cover object-center opacity-90 hover:opacity-100 transition-opacity duration-700"
              />
            </div>
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

  return (
    <motion.footer 
      ref={containerRef} 
      id="contact" 
      className="sticky top-0 h-screen w-full bg-[#050505] border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,1)] flex flex-col items-center justify-center px-6 z-[100] overflow-hidden"
    >
      {/* Halo lumineux qui voyage */}
      <motion.div 
        style={{ left: leftHalo }}
        className="absolute top-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" 
      />
      
      {/* Éclairage directionnel dramatique venant du haut */}
      <div className="absolute top-0 inset-x-0 mx-auto w-full h-[40vh] bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-8">
          Prêt à innover ?
        </p>
        <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-medium tracking-tighter mb-12 leading-[0.9]">
          Démarrons.
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-20 w-full">
          <MagneticButton href="mailto:contact@example.com" className="!bg-white !text-black !py-4 !px-8 text-base">
            Envoyer un email
          </MagneticButton>
          <MagneticButton href="https://linkedin.com" className="!bg-transparent !py-4 !px-8 text-base">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </MagneticButton>
          <MagneticButton href="https://github.com" className="!bg-transparent !py-4 !px-8 text-base">
            <Github className="w-5 h-5" /> GitHub
          </MagneticButton>
        </div>
        
        <div className="absolute bottom-8 text-zinc-600 text-xs font-mono tracking-widest">
          © {new Date().getFullYear()} — CRÉÉ AVEC RIGUEUR
        </div>
      </div>
    </motion.footer>
  );
}

// --- MAIN LAYOUT : CLEAN & LISSE ---
export default function Portfolio() {
  useEffect(() => {
    // Scroll Lenis ultra adouci (lerp à 0.08) pour une sensation luxueuse
    const lenis = new Lenis({
      lerp: 0.08, 
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    
    // Intercepter les liens d'ancre pour un smooth scroll avec Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const hash = target.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        lenis.scrollTo(hash, { offset: 0, duration: 2 });
      }
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(a => a.addEventListener('click', handleAnchorClick));

    return () => {
      anchors.forEach(a => a.removeEventListener('click', handleAnchorClick));
      lenis.destroy();
    };
  }, []);

  return (
    <div className="text-white font-sans selection:bg-accent selection:text-black">
      {/* Ce background est le secret pour ne jamais avoir de bandes noires au rétrécissement ! */}
      <ContinuousBackground />
      
      {/* NAVBAR MINIMALISTE */}
      <header className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between p-6 mix-blend-difference pointer-events-none">
        <a href="#" className="font-bold tracking-tighter text-lg pointer-events-auto">PORTFOLIO<span className="text-accent">.</span></a>
        <nav className="hidden md:flex items-center gap-6 font-medium text-xs tracking-widest uppercase pointer-events-auto text-zinc-400">
          <a href="#projet-0" className="hover:text-white transition-colors">Travaux</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* STRUCTURE DU DECK DE CARTES */}
      <div className="relative w-full">
        <HeroSection />
        {projects.map((proj, i) => <ProjectCard key={i} project={proj} index={i} />)}
        <FooterSection />
      </div>
    </div>
  );
}
