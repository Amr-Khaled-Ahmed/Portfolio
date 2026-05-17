export default function PharaohAnimationBg() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0e1a]">
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.08); } }
        @keyframes orbit { from { transform: rotate(0deg) translateX(140px) rotate(0deg); } to { transform: rotate(360deg) translateX(140px) rotate(-360deg); } }
        .ring-1 { animation: spin-slow 12s linear infinite; }
        .ring-2 { animation: spin-reverse 8s linear infinite; }
        .ring-3 { animation: spin-slow 20s linear infinite; }
        .eye-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .orb-1 { animation: orbit 10s linear infinite; }
        .orb-2 { animation: orbit 10s linear infinite; animation-delay: -2.5s; }
        .orb-3 { animation: orbit 10s linear infinite; animation-delay: -5s; }
        .orb-4 { animation: orbit 10s linear infinite; animation-delay: -7.5s; }
      `}</style>

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer orbit dots */}
        <div className="absolute w-0 h-0">
          <div
            className="orb-1 absolute w-3 h-3 bg-yellow-500 rounded-full shadow-lg"
            style={{ boxShadow: "0 0 10px #FFD700" }}
          />
          <div
            className="orb-2 absolute w-3 h-3 bg-yellow-400 rounded-full"
            style={{ boxShadow: "0 0 10px #FFD700" }}
          />
          <div
            className="orb-3 absolute w-3 h-3 bg-yellow-500 rounded-full"
            style={{ boxShadow: "0 0 10px #FFD700" }}
          />
          <div
            className="orb-4 absolute w-3 h-3 bg-yellow-400 rounded-full"
            style={{ boxShadow: "0 0 10px #FFD700" }}
          />
        </div>

        {/* Outer ring */}
        <div className="ring-3 absolute w-72 h-72 rounded-full border border-yellow-600/20" />

        {/* Middle ring */}
        <div
          className="ring-2 absolute w-52 h-52 rounded-full border-2 border-yellow-500/40"
          style={{ boxShadow: "0 0 20px rgba(212,175,55,0.2)" }}
        />

        {/* Inner ring */}
        <div
          className="ring-1 absolute w-36 h-36 rounded-full border-2 border-yellow-400/60"
          style={{ boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}
        />

        {/* Eye of Horus center */}
        <div
          className="eye-glow absolute flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10"
          style={{ boxShadow: "0 0 40px rgba(212,175,55,0.5)" }}
        >
          <span
            className="text-5xl select-none"
            style={{ filter: "drop-shadow(0 0 12px #FFD700)" }}
          >
            𓂀
          </span>
        </div>
      </div>

      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
