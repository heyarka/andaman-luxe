import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import heroImage from "@/assets/hero-beach-bg.jpg";

const animatedButtonStyles = `
  .plane-button {
    --primary: hsl(210 100% 50%);
    --neutral-1: #f7f8f7;
    --neutral-2: #e7e7e7;
    --radius: 9999px;
    cursor: pointer;
    border-radius: var(--radius);
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    border: none;
    box-shadow: 0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
      0 10px 20px rgba(0, 0, 0, 0.2), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
    min-width: 220px;
    padding: 14px 24px;
    height: 50px;
    font-family: inherit;
    font-style: normal;
    font-size: 14px;
    font-weight: 600;
    background: transparent;
    text-decoration: none;
    color: #1a1a1a;
  }
  .plane-button:hover {
    transform: scale(1.02);
    box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3),
      0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 3px -3px rgba(0, 0, 0, 0.04);
  }
  .plane-button:active {
    transform: scale(1);
    box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3),
      0 10px 3px -3px rgba(0, 0, 0, 0.2);
  }
  .plane-button:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    border: 2.5px solid transparent;
    background: linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
      linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45)) border-box;
    z-index: 0;
    transition: all 0.4s ease;
  }
  .plane-button:hover::after {
    transform: scale(1.05, 1.1);
    box-shadow: inset 0 -1px 3px 0 rgba(255, 255, 255, 1);
  }
  .plane-button::before {
    content: "";
    inset: 7px 6px 6px 6px;
    position: absolute;
    background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
    border-radius: var(--radius);
    filter: blur(0.5px);
    z-index: 2;
  }
  .plane-state p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  .plane-state .plane-icon {
    position: absolute;
    left: 18px;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: scale(1.25);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .plane-state .plane-icon svg { overflow: visible; }
  .outline-ring {
    position: absolute;
    border-radius: inherit;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s ease;
    inset: -2px -3.5px;
  }
  .outline-ring::before {
    content: "";
    position: absolute;
    inset: -100%;
    background: conic-gradient(from 180deg, transparent 60%, white 80%, transparent 100%);
    animation: spin 2s linear infinite;
    animation-play-state: paused;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .plane-button:hover .outline-ring { opacity: 1; }
  .plane-button:hover .outline-ring::before { animation-play-state: running; }
  .plane-state p span {
    display: block;
    opacity: 0;
    animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
  }
  .plane-button:hover p span {
    opacity: 1;
    animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
  }
  .plane-button.focused p span {
    opacity: 1;
    animation: disapear 0.6s ease forwards calc(var(--i) * 0.03s);
  }
  @keyframes wave {
    30% { opacity: 1; transform: translateY(4px) translateX(0) rotate(0); }
    50% { opacity: 1; transform: translateY(-3px) translateX(0) rotate(0); color: var(--primary); }
    100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
  }
  @keyframes slideDown {
    0% { opacity: 0; transform: translateY(-20px) translateX(5px) rotate(-90deg); color: var(--primary); filter: blur(5px); }
    30% { opacity: 1; transform: translateY(4px) translateX(0) rotate(0); filter: blur(0); }
    50% { opacity: 1; transform: translateY(-3px) translateX(0) rotate(0); }
    100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
  }
  @keyframes disapear {
    from { opacity: 1; }
    to { opacity: 0; transform: translateX(5px) translateY(20px); color: var(--primary); filter: blur(5px); }
  }
  .state-default .plane-icon svg { animation: land 0.6s ease forwards; }
  .plane-button:hover .state-default .plane-icon { transform: rotate(45deg) scale(1.25); }
  .plane-button.focused .state-default svg { animation: takeOff 0.8s linear forwards; }
  .plane-button.focused .state-default .plane-icon { transform: rotate(0) scale(1.25); }
  @keyframes takeOff {
    0% { opacity: 1; }
    60% { opacity: 1; transform: translateX(70px) rotate(45deg) scale(2); }
    100% { opacity: 0; transform: translateX(160px) rotate(45deg) scale(0); }
  }
  @keyframes land {
    0% { transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2); opacity: 0; filter: blur(3px); }
    100% { transform: translateX(0) translateY(0) rotate(0); opacity: 1; filter: blur(0); }
  }
  .state-default .plane-icon:before {
    content: "";
    position: absolute;
    top: 50%;
    height: 2px;
    width: 0;
    left: -5px;
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5));
  }
  .plane-button.focused .state-default .plane-icon:before { animation: contrail 0.8s linear forwards; }
  @keyframes contrail {
    0% { width: 0; opacity: 1; }
    8% { width: 15px; }
    60% { opacity: 0.7; width: 80px; }
    100% { opacity: 0; width: 160px; }
  }
  .plane-state {
    /* Reserve enough space for the absolute-positioned icon. */
    padding-left: 42px;
    padding-right: 8px;
    z-index: 3;
    display: flex;
    position: relative;
  }
  .state-sent { display: none; }
  .state-sent svg { transform: scale(1.25); margin-right: 8px; }
  .plane-button.focused .state-default { position: absolute; }
  .plane-button.focused .state-sent { display: flex; }
  .plane-button.focused .state-sent span {
    opacity: 0;
    animation: slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
  }
  .plane-button.focused .state-sent .plane-icon svg {
    opacity: 0;
    animation: appear 1.2s ease forwards 0.8s;
  }
  @keyframes appear {
    0% { opacity: 0; transform: scale(4) rotate(-40deg); color: var(--primary); filter: blur(4px); }
    30% { opacity: 1; transform: scale(0.6); filter: blur(1px); }
    50% { opacity: 1; transform: scale(1.2); filter: blur(0); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const exploreText = "Explore Destinations";
  const exploreLetters = exploreText.split("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <style>{animatedButtonStyles}</style>

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-white/70 mb-6 font-body font-light"
        >
          Luxury Travel · Andaman Islands
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white mb-6"
        >
          Discover Paradise
          <br />
          <span className="italic font-normal">in the Andaman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-10 font-body font-light leading-relaxed"
        >
          Curated luxury experiences, private island escapes,
          and unforgettable adventures await you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/book"
            className="btn-frosted-blue inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 font-body"
          >
            Plan Your Trip
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            className={`plane-button ${focused ? "focused" : ""}`}
            onClick={() => {
              setFocused(true);
              setTimeout(() => {
                navigate("/explore");
              }, 1200);
            }}
          >
            <div className="outline-ring" />
            <div className="plane-state state-default">
              <div className="plane-icon">
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g style={{ filter: "url(#shadow)" }}>
                    <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" fill="currentColor" />
                    <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" fill="currentColor" />
                  </g>
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <p>
                {exploreLetters.map((letter, i) => (
                  <span key={i} style={{ "--i": i } as React.CSSProperties}>
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </p>
            </div>
            <div className="plane-state state-sent">
              <div className="plane-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em" strokeWidth="0.5px" stroke="black">
                  <g style={{ filter: "url(#shadow2)" }}>
                    <path fill="currentColor" d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" />
                    <path fill="currentColor" d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z" />
                  </g>
                  <defs>
                    <filter id="shadow2">
                      <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
                    </filter>
                  </defs>
                </svg>
              </div>
              <p>
                {"Let's Go!".split("").map((letter, i) => (
                  <span key={i} style={{ "--i": i } as React.CSSProperties}>
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </p>
            </div>
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-body">Scroll</span>
        <ChevronDown className="h-5 w-5 text-white/40 animate-bounce-gentle" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
