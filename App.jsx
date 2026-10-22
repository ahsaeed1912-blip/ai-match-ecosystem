import React, { useEffect, useState } from 'react';

export default function App() {
  const [talents, setTalents] = useState([
    { id: 1, name: "Ahmed Said", role: "Full-Stack Lead", skills: ["Python", "FastAPI", "React"], match: "95%", experience: 3, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    { id: 2, name: "Maha Samy", role: "UX/UI Specialist", skills: ["UI/UX", "Figma", "Tailwind"], match: "89%", experience: 2, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" },
    { id: 3, name: "Kareem Farouk", role: "Data Scientist", skills: ["Python", "Machine Learning", "SQL"], match: "94%", experience: 4, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { id: 4, name: "Sara Mahmoud", role: "Frontend Dev", skills: ["React", "JavaScript", "Tailwind"], match: "88%", experience: 2, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { id: 5, name: "Omar Hassan", role: "Backend Engineer", skills: ["Python", "FastAPI", "Docker"], match: "91%", experience: 3, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: "GreenEnergy App", skills: ["Python", "Data"], desc: "Sustainable analytics engine and forecasting platform.", duration: "30 days", color: "#10b981", match: "94%" },
    { id: 2, title: "AI Recruitment", skills: ["Python", "FastAPI", "React"], desc: "Comprehensive AI-powered matching ecosystem.", duration: "20 days", color: "#6366f1", match: "87%" },
    { id: 3, title: "Urban Analytics", skills: ["React", "Data"], desc: "Spatial analytics and visual dashboard.", duration: "25 days", color: "#3b82f6", match: "85%" }
  ]);

  const [selectedTalent, setSelectedTalent] = useState(talents[0]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const [matchData, setMatchData] = useState({
    compatibility: 94.5,
    recommendation: "Highly Recommended",
    matched_skills: ["Python", "FastAPI"],
    missing_skills: ["Data"]
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState("talent");
  
  const [newName, setNewName] = useState("");
  const [newRoleOrDesc, setNewRoleOrDesc] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const runVectorMatch = async (talent, project) => {
    if (!talent || !project) return;
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          talent_name: talent.name,
          talent_skills: talent.skills,
          experience_years: talent.experience || 3,
          project_required_skills: project.skills
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMatchData({
          compatibility: data.compatibility_score,
          recommendation: data.recommendation,
          matched_skills: data.matched_skills || [],
          missing_skills: data.missing_skills || []
        });
      }
    } catch (err) {
      const matched = talent.skills.filter(s => project.skills.some(ps => ps.toLowerCase() === s.toLowerCase()));
      const score = Math.round((matched.length / project.skills.length) * 100) || 75;
      setMatchData({
        compatibility: score,
        recommendation: score >= 80 ? "Highly Recommended" : "Good Fit",
        matched_skills: matched,
        missing_skills: project.skills.filter(s => !talent.skills.includes(s))
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runVectorMatch(selectedTalent, selectedProject);
  }, [selectedTalent, selectedProject]);

  const handleCreateEntity = (e) => {
    e.preventDefault();
    if (!newName) return;
    const skillsArr = newSkills.split(",").map(s => s.trim()).filter(Boolean);

    if (modalType === "talent") {
      const newT = {
        id: talents.length + 1,
        name: newName,
        role: newRoleOrDesc || "Developer",
        skills: skillsArr.length ? skillsArr : ["Python", "React"],
        match: "90%",
        experience: 3,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
      };
      setTalents([newT, ...talents]);
      setSelectedTalent(newT);
    } else {
      const newP = {
        id: projects.length + 1,
        title: newName,
        desc: newRoleOrDesc || "Custom high-impact project opportunity.",
        skills: skillsArr.length ? skillsArr : ["Python", "FastAPI"],
        duration: "30 days",
        color: "#38bdf8",
        match: "88%"
      };
      setProjects([newP, ...projects]);
      setSelectedProject(newP);
    }

    setNewName("");
    setNewRoleOrDesc("");
    setNewSkills("");
    setShowAddModal(false);
  };

  return (
    <div style={{ 
      background: "radial-gradient(circle at 50% 20%, #0f2347 0%, #070e1c 60%, #03060c 100%)", 
      color: "#ffffff", 
      minHeight: "100vh", 
      fontFamily: "'Inter', sans-serif", 
      display: "flex", 
      flexDirection: "column",
      width: "100vw", 
      overflowX: "hidden",
      position: "relative"
    }}>
      
      {/* High-Luminosity Neon Glow Lighting Background Elements */}
      <div style={{ position: "absolute", top: "5%", left: "15%", width: "400px", height: "400px", background: "rgba(56, 189, 248, 0.18)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", right: "15%", width: "400px", height: "400px", background: "rgba(52, 211, 153, 0.18)", filter: "blur(100px)", pointerEvents: "none" }} />

      {/* Top Navbar */}
      <div style={{ height: "70px", backgroundColor: "rgba(11, 20, 38, 0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(56, 189, 248, 0.25)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 35px", zIndex: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "22px", color: "#38bdf8", textShadow: "0 0 10px #38bdf8" }}>⚡</span>
          <h2 style={{ fontSize: "17px", fontWeight: "900", margin: "0", color: "#f8fafc", letterSpacing: "1px" }}>AI-MATCH ECOSYSTEM // NEURAL DASHBOARD</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button 
            onClick={() => { setModalType("talent"); setShowAddModal(true); }}
            style={{ background: "linear-gradient(135deg, #38bdf8, #0284c7)", color: "#000", border: "none", padding: "9px 20px", borderRadius: "20px", fontSize: "11px", fontWeight: "900", cursor: "pointer", boxShadow: "0 0 20px rgba(56, 189, 248, 0.6)" }}
          >
            + ADD TALENT
          </button>
          <button 
            onClick={() => { setModalType("project"); setShowAddModal(true); }}
            style={{ background: "linear-gradient(135deg, #34d399, #059669)", color: "#000", border: "none", padding: "9px 20px", borderRadius: "20px", fontSize: "11px", fontWeight: "900", cursor: "pointer", boxShadow: "0 0 20px rgba(52, 211, 153, 0.6)" }}
          >
            + ADD PROJECT
          </button>

          <span style={{ backgroundColor: "rgba(52, 211, 153, 0.15)", color: "#34d399", border: "1px solid rgba(52, 211, 153, 0.5)", padding: "6px 14px", borderRadius: "20px", fontSize: "10px", fontWeight: "800", textShadow: "0 0 8px rgba(52,211,153,0.6)" }}>
            ● LIVE VECTOR ENGINE
          </span>
        </div>
      </div>

      {/* 📊 SECTION 1: DASHBOARD ANALYTICS BAR (لوحة المؤشرات والبيانات الرئيسية) */}
      <div style={{ padding: "20px 35px 10px 35px", zIndex: 5 }}>
        <div style={{ 
          background: "linear-gradient(135deg, rgba(16, 30, 58, 0.9), rgba(11, 18, 34, 0.9))", 
          border: "1px solid rgba(56, 189, 248, 0.3)", 
          borderRadius: "16px", 
          padding: "18px 25px", 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "20px",
          boxShadow: "0 0 30px rgba(56, 189, 248, 0.15)",
          backdropFilter: "blur(12px)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "800", letterSpacing: "1px" }}>TOTAL TALENT NODES</span>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#38bdf8", textShadow: "0 0 10px rgba(56,189,248,0.5)" }}>{talents.length} Active</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "800", letterSpacing: "1px" }}>PROJECT OPPORTUNITIES</span>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#34d399", textShadow: "0 0 10px rgba(52,211,153,0.5)" }}>{projects.length} Open</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "800", letterSpacing: "1px" }}>AVG COMPATIBILITY</span>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#facc15", textShadow: "0 0 10px rgba(250,204,21,0.5)" }}>91.4%</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "800", letterSpacing: "1px" }}>AI ENGINE STATUS</span>
            <span style={{ fontSize: "16px", fontWeight: "900", color: "#34d399", marginTop: "4px" }}>Optimal (TF-IDF)</span>
          </div>
        </div>
      </div>

      {/* 🌐 SECTION 2: NEURAL MATCH CANVAS (الشبكة التفاعلية والربط بين المواهب والمشاريع) */}
      <div style={{ flex: 1, padding: "10px 35px 30px 35px", display: "flex", flexDirection: "column", gap: "15px", zIndex: 5 }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: "0 0 2px 0", fontSize: "20px", fontWeight: "900", color: "#ffffff", textShadow: "0 0 15px rgba(255,255,255,0.3)" }}>Live Neural Match Canvas</h1>
            <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>Select any talent node and project node to compute real-time vector alignment.</p>
          </div>
        </div>

        {/* 3-Column Bright Luminous Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.2fr", gap: "30px", alignItems: "center", marginTop: "5px" }}>
          
          {/* Left: Luminous Talent Nodes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }} />
              <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "900", color: "#38bdf8", letterSpacing: "1.5px", textShadow: "0 0 8px rgba(56,189,248,0.5)" }}>TALENT NODES</h3>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "520px", overflowY: "auto", paddingRight: "6px" }}>
              {talents.map((item) => {
                const isSelected = selectedTalent?.id === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedTalent(item)}
                    style={{ 
                      backgroundColor: isSelected ? "rgba(56, 189, 248, 0.22)" : "rgba(15, 28, 54, 0.75)", 
                      borderLeft: isSelected ? "5px solid #38bdf8" : "5px solid transparent",
                      borderTop: isSelected ? "1px solid rgba(56, 189, 248, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                      borderRight: isSelected ? "1px solid rgba(56, 189, 248, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: isSelected ? "1px solid rgba(56, 189, 248, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "14px", 
                      padding: "14px 18px", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "14px", 
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: isSelected ? "0 0 25px rgba(56, 189, 248, 0.35)" : "0 4px 15px rgba(0,0,0,0.3)",
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", border: isSelected ? "2px solid #38bdf8" : "2px solid rgba(255,255,255,0.2)", boxShadow: isSelected ? "0 0 10px #38bdf8" : "none" }} 
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#ffffff" }}>{item.name}</h4>
                        <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: "900", textShadow: "0 0 8px rgba(56,189,248,0.6)" }}>{item.match}</span>
                      </div>
                      <p style={{ margin: "2px 0 6px 0", fontSize: "10px", color: "#cbd5e1" }}>{item.role}</p>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {item.skills.map((s, i) => (
                          <span key={i} style={{ backgroundColor: "rgba(56, 189, 248, 0.2)", color: "#38bdf8", fontSize: "9px", padding: "2px 7px", borderRadius: "4px", fontWeight: "700" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center: Glowing Luminous AI Bridge */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "22px", padding: "20px" }}>
            
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "11px", color: "#38bdf8", letterSpacing: "2px", fontWeight: "900", textTransform: "uppercase", textShadow: "0 0 10px rgba(56,189,248,0.6)" }}>AI MATCHING BRIDGE</span>
            </div>

            {/* Glowing Interactive Radial Score Node */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "175px", height: "175px", borderRadius: "50%", border: "2px dashed rgba(52, 211, 153, 0.6)", position: "absolute", animation: "spin 20s linear infinite", boxShadow: "0 0 20px rgba(52, 211, 153, 0.2)" }} />
              <div style={{ 
                width: "145px", 
                height: "145px", 
                borderRadius: "50%", 
                background: "radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, rgba(8, 16, 34, 0.95) 100%)", 
                border: "3px solid #34d399", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center",
                boxShadow: "0 0 45px rgba(52, 211, 153, 0.5)",
                backdropFilter: "blur(12px)"
              }}>
                <span style={{ fontSize: "8px", color: "#cbd5e1", fontWeight: "800" }}>COSINE SIM</span>
                <span style={{ fontSize: "34px", fontWeight: "900", color: "#34d399", textShadow: "0 0 15px rgba(52,211,153,0.8)" }}>{loading ? "..." : `${matchData.compatibility}%`}</span>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "13px", color: "#facc15", fontWeight: "900", display: "block", textShadow: "0 0 10px rgba(250,204,21,0.5)" }}>{matchData.recommendation}</span>
              <span style={{ fontSize: "10px", color: "#94a3b8" }}>TF-IDF Vector Space Alignment</span>
            </div>

            {/* Luminous Match Breakdown Pill */}
            <div style={{ width: "100%", backgroundColor: "rgba(15, 28, 54, 0.85)", border: "1px solid rgba(52, 211, 153, 0.4)", borderRadius: "14px", padding: "16px", fontSize: "11px", backdropFilter: "blur(10px)", boxShadow: "0 0 25px rgba(52, 211, 153, 0.15)" }}>
              <p style={{ margin: "0 0 6px 0", color: "#34d399", fontWeight: "800" }}><strong>✓ Matched:</strong> {matchData.matched_skills.join(", ") || "None"}</p>
              <p style={{ margin: 0, color: "#f87171", fontWeight: "800" }}><strong>✗ Missing:</strong> {matchData.missing_skills.join(", ") || "None"}</p>
            </div>

          </div>

          {/* Right: Luminous Project Nodes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#34d399", boxShadow: "0 0 10px #34d399" }} />
              <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "900", color: "#34d399", letterSpacing: "1.5px", textShadow: "0 0 8px rgba(52,211,153,0.5)" }}>PROJECT NODES</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "520px", overflowY: "auto" }}>
              {projects.map((proj) => {
                const isSelected = selectedProject?.id === proj.id;
                return (
                  <div 
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    style={{ 
                      backgroundColor: isSelected ? "rgba(52, 211, 153, 0.22)" : "rgba(15, 28, 54, 0.75)", 
                      borderRight: isSelected ? "5px solid #34d399" : "5px solid transparent",
                      borderTop: isSelected ? "1px solid rgba(52, 211, 153, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                      borderLeft: isSelected ? "1px solid rgba(52, 211, 153, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: isSelected ? "1px solid rgba(52, 211, 153, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "14px", 
                      padding: "16px", 
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: isSelected ? "0 0 25px rgba(52, 211, 153, 0.35)" : "0 4px 15px rgba(0,0,0,0.3)",
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <div style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: proj.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", boxShadow: "0 0 10px rgba(52,211,153,0.4)" }}>📁</div>
                      <h4 style={{ margin: "0", fontSize: "13px", fontWeight: "800", color: "#ffffff" }}>{proj.title}</h4>
                      <span style={{ marginLeft: "auto", color: "#34d399", fontSize: "11px", fontWeight: "900", textShadow: "0 0 8px rgba(52,211,153,0.6)" }}>{proj.match}</span>
                    </div>
                    <p style={{ margin: "0 0 10px 0", fontSize: "10px", color: "#cbd5e1", lineHeight: "1.4" }}>{proj.desc}</p>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {proj.skills.map((s, i) => (
                        <span key={i} style={{ backgroundColor: "rgba(52, 211, 153, 0.2)", color: "#34d399", fontSize: "9px", padding: "2px 7px", borderRadius: "4px", fontWeight: "700" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Dynamic Creation Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(3, 6, 12, 0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#0b162c", border: "1px solid rgba(56, 189, 248, 0.4)", borderRadius: "20px", padding: "28px", width: "420px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 0 50px rgba(56, 189, 248, 0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "16px", color: "#ffffff", fontWeight: "900" }}>{modalType === "talent" ? "+ Add Talent Node" : "+ Add Project Node"}</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>

            <form onSubmit={handleCreateEntity} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input 
                type="text" 
                placeholder={modalType === "talent" ? "Full Name" : "Project Title"} 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(56,189,248,0.3)", color: "#fff", padding: "11px", borderRadius: "10px", fontSize: "12px", outline: "none" }} 
              />
              
              <input 
                type="text" 
                placeholder={modalType === "talent" ? "Role (e.g. Lead Engineer)" : "Description"} 
                value={newRoleOrDesc} 
                onChange={e => setNewRoleOrDesc(e.target.value)} 
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(56,189,248,0.3)", color: "#fff", padding: "11px", borderRadius: "10px", fontSize: "12px", outline: "none" }} 
              />

              <input 
                type="text" 
                placeholder="Skills (comma separated, e.g. Python, React)" 
                value={newSkills} 
                onChange={e => setNewSkills(e.target.value)} 
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(56,189,248,0.3)", color: "#fff", padding: "11px", borderRadius: "10px", fontSize: "12px", outline: "none" }} 
              />

              <button 
                type="submit" 
                style={{ background: modalType === "talent" ? "linear-gradient(135deg, #38bdf8, #0284c7)" : "linear-gradient(135deg, #34d399, #059669)", color: "#000", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "900", cursor: "pointer", marginTop: "8px", boxShadow: "0 0 20px rgba(56,189,248,0.5)" }}
              >
                {modalType === "talent" ? "Save Talent Node" : "Save Project Node"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}