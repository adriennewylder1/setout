import { auth } from '@clerk/nextjs/server'

export default async function HomePage() {
  const { userId } = await auth()
  const isLoggedIn = !!userId

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --ink:#181810;--forest:#1e3318;--forest-mid:#2d4d25;--canopy:#3d6633;
          --lichen:#7da862;--sage:#b8cc9e;--parch:#f0ead8;--cream:#faf6ed;
          --sand:#ede5d0;--ember:#c4722a;--ember-light:#e8964a;--ember-pale:#f5dab8;
          --stone:#9a9280;--mist:#e2ddd0;--white:#ffffff;
          --t1:#1e1e14;--t2:#484834;--t3:#7a7a60;--t4:#a8a890;
        }
        html{scroll-behavior:smooth;}
        body{background:var(--cream);color:var(--t1);font-family:'Instrument Sans',sans-serif;font-weight:300;overflow-x:hidden;}
        body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:999;opacity:0.35;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");}
        nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 3rem;background:rgba(250,246,237,0.9);backdrop-filter:blur(16px);border-bottom:1px solid rgba(30,51,24,0.07);transition:box-shadow 0.3s;}
        .logo{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--forest);letter-spacing:0.02em;text-decoration:none;}
        .logo em{font-style:normal;color:var(--ember);}
        .nav-promise{font-family:'DM Mono',monospace;font-size:11px;font-weight:300;color:var(--ember);letter-spacing:0.1em;padding:5px 14px;border:1px solid rgba(196,114,42,0.3);border-radius:100px;display:none;}
        @media(min-width:700px){.nav-promise{display:block;}}
        .nav-right{display:flex;gap:12px;align-items:center;}
        .nav-link{font-size:13px;color:var(--t3);text-decoration:none;transition:color 0.2s;}
        .nav-link:hover{color:var(--forest);}
        .nav-cta{font-size:13px;font-weight:500;background:var(--forest);color:var(--parch);padding:9px 20px;border-radius:100px;text-decoration:none;letter-spacing:0.02em;transition:all 0.2s;}
        .nav-cta:hover{background:var(--forest-mid);transform:translateY(-1px);}
        .hero{min-height:100vh;display:grid;grid-template-columns:55fr 45fr;padding-top:64px;position:relative;overflow:hidden;}
        .hero-left{display:flex;flex-direction:column;justify-content:center;padding:5rem 4rem 5rem 6rem;position:relative;z-index:2;background:var(--cream);}
        .zero-commission{display:inline-flex;align-items:center;gap:8px;background:var(--forest);color:var(--ember-pale);font-family:'DM Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;padding:8px 16px;border-radius:100px;margin-bottom:2rem;width:fit-content;opacity:0;animation:rise 0.7s ease 0.1s forwards;}
        .zero-commission::before{content:'★';font-size:12px;color:var(--ember-light);}
        h1{font-family:'Playfair Display',serif;font-size:clamp(44px,5.2vw,72px);font-weight:900;line-height:1.05;color:var(--forest);letter-spacing:-0.025em;margin-bottom:1.6rem;opacity:0;animation:rise 0.8s ease 0.25s forwards;}
        h1 em{font-style:italic;color:var(--ember);font-weight:700;}
        .hero-body{font-size:17px;line-height:1.75;color:var(--t2);font-weight:300;max-width:500px;margin-bottom:2.4rem;opacity:0;animation:rise 0.8s ease 0.4s forwards;}
        .hero-body strong{color:var(--forest);font-weight:500;}
        .hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:1.6rem;opacity:0;animation:rise 0.8s ease 0.55s forwards;}
        .btn-forest{display:inline-flex;align-items:center;gap:8px;background:var(--forest);color:var(--parch);font-family:'Instrument Sans',sans-serif;font-size:14px;font-weight:500;padding:14px 26px;border-radius:100px;text-decoration:none;letter-spacing:0.02em;transition:all 0.2s;border:none;cursor:pointer;}
        .btn-forest:hover{background:var(--forest-mid);transform:translateY(-2px);box-shadow:0 10px 28px rgba(30,51,24,0.25);}
        .btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--forest);font-family:'Instrument Sans',sans-serif;font-size:14px;font-weight:500;padding:14px 26px;border-radius:100px;text-decoration:none;letter-spacing:0.02em;transition:all 0.2s;border:1px solid rgba(30,51,24,0.25);}
        .btn-ghost:hover{border-color:var(--forest);background:rgba(30,51,24,0.04);}
        .hero-proof{display:flex;align-items:center;gap:16px;opacity:0;animation:rise 0.8s ease 0.7s forwards;}
        .proof-tag{font-family:'DM Mono',monospace;font-size:11px;color:var(--t3);letter-spacing:0.08em;display:flex;align-items:center;gap:6px;}
        .proof-tag::before{content:'✓';color:var(--lichen);}
        .proof-divider{width:1px;height:14px;background:var(--mist);}
        .hero-right{position:relative;overflow:hidden;}
        .hero-bg{position:absolute;inset:0;background:linear-gradient(145deg,#1a3015 0%,#0f1e0b 50%,#080f06 100%);}
        .hero-topo{position:absolute;inset:0;opacity:0.06;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='700'%3E%3Ccircle cx='350' cy='350' r='60' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='350' r='110' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='350' r='160' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='350' r='210' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='350' r='260' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='350' r='310' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='350' cy='350' r='330' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3C/svg%3E");background-size:700px 700px;background-position:center;}
        .hero-glow{position:absolute;inset:0;background:radial-gradient(ellipse at 60% 40%,rgba(125,168,98,0.18) 0%,transparent 55%),radial-gradient(ellipse at 30% 75%,rgba(196,114,42,0.15) 0%,transparent 45%);}
        .hero-cards{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:16px;padding:3rem 2.5rem;}
        .ui-card{background:rgba(250,246,237,0.97);border-radius:18px;padding:18px 22px;box-shadow:0 24px 60px rgba(0,0,0,0.45);width:100%;max-width:340px;opacity:0;}
        .ui-card:nth-child(1){animation:slideIn 0.8s ease 0.9s forwards;}
        .ui-card:nth-child(2){animation:slideIn 0.8s ease 1.1s forwards;}
        .ui-card:nth-child(3){animation:slideIn 0.8s ease 1.3s forwards;}
        .card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
        .card-guide-info{display:flex;align-items:center;gap:10px;}
        .guide-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--canopy),var(--forest));display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--sage);font-weight:500;font-family:'Playfair Display',serif;}
        .guide-name{font-size:13px;font-weight:500;color:var(--forest);}
        .guide-loc{font-family:'DM Mono',monospace;font-size:10px;color:var(--t3);letter-spacing:0.06em;}
        .live-dot{display:flex;align-items:center;gap:5px;font-family:'DM Mono',monospace;font-size:10px;color:var(--lichen);letter-spacing:0.08em;}
        .live-dot::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--lichen);animation:pulse 2s ease infinite;}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
        .card-trip-name{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--forest);margin-bottom:3px;}
        .card-trip-meta{font-size:12px;color:var(--t3);margin-bottom:14px;}
        .card-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;}
        .cstat{background:var(--sand);border-radius:10px;padding:8px;text-align:center;}
        .cstat-val{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--forest);line-height:1;margin-bottom:3px;}
        .cstat-label{font-family:'DM Mono',monospace;font-size:9px;color:var(--t3);letter-spacing:0.08em;text-transform:uppercase;}
        .progress-wrap{background:var(--mist);border-radius:100px;height:5px;overflow:hidden;margin-bottom:6px;}
        .progress-bar{height:100%;border-radius:100px;background:linear-gradient(90deg,var(--forest),var(--lichen));}
        .p1{width:0;animation:grow 1.8s ease 2s forwards;}
        .p2{width:0;animation:grow2 1.8s ease 2.2s forwards;}
        @keyframes grow{to{width:75%;}}
        @keyframes grow2{to{width:40%;}}
        .progress-meta{display:flex;justify-content:space-between;font-size:11px;color:var(--t3);}
        .earnings-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--mist);}
        .earnings-row:last-child{border-bottom:none;}
        .er-label{font-size:12px;color:var(--t2);}
        .er-val{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:var(--forest);}
        .er-sub{font-size:11px;color:var(--lichen);font-weight:400;}
        .viral-header{font-family:'DM Mono',monospace;font-size:10px;color:var(--ember);letter-spacing:0.1em;margin-bottom:10px;}
        .share-row{display:flex;gap:8px;margin-bottom:10px;}
        .share-btn{flex:1;padding:8px;border-radius:10px;font-size:11px;font-weight:500;text-align:center;cursor:pointer;border:none;transition:transform 0.15s;}
        .share-btn:hover{transform:scale(1.02);}
        .share-ig{background:#f0e8f8;color:#8b5cf6;}
        .share-tk{background:#e8f8f8;color:#0891b2;}
        .share-link{background:var(--sand);color:var(--forest);}
        .referral-tag{background:var(--ember-pale);border-radius:10px;padding:8px 12px;font-size:12px;color:var(--ember);display:flex;align-items:center;justify-content:space-between;}
        .referral-tag span{font-weight:500;}
        .commission-banner{background:var(--forest);padding:1.6rem 6rem;display:flex;align-items:center;justify-content:center;gap:3rem;flex-wrap:wrap;}
        .cb-item{display:flex;align-items:center;gap:10px;font-family:'DM Mono',monospace;font-size:12px;color:#c8c4b0;letter-spacing:0.06em;}
        .cb-item strong{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--ember-light);font-style:italic;}
        .cb-divider{width:1px;height:28px;background:rgba(255,255,255,0.12);}
        .pitch{padding:7rem 6rem;background:var(--parch);position:relative;overflow:hidden;}
        .pitch-wrap{max-width:860px;margin:0 auto;}
        .pitch-eyebrow{font-family:'DM Mono',monospace;font-size:11px;color:var(--ember);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1.4rem;display:flex;align-items:center;gap:10px;}
        .pitch-eyebrow::before{content:'';width:28px;height:1px;background:var(--ember);}
        .pitch-quote{font-family:'Playfair Display',serif;font-size:clamp(28px,3.8vw,50px);font-weight:400;font-style:italic;color:var(--forest);line-height:1.35;margin-bottom:2.5rem;}
        .pitch-quote strong{font-style:normal;font-weight:700;color:var(--ember);}
        .pitch-cols{display:grid;grid-template-columns:1fr 1fr;gap:3rem;}
        .pitch-col p{font-size:16px;line-height:1.8;color:var(--t2);font-weight:400;}
        .personas{background:var(--ink);display:grid;grid-template-columns:1fr 1fr 1fr;min-height:640px;}
        .persona{padding:4rem 3rem;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden;border-right:1px solid rgba(255,255,255,0.06);transition:all 0.4s;cursor:pointer;}
        .persona:last-child{border-right:none;}
        .persona-bg{position:absolute;inset:0;transition:opacity 0.4s;}
        .persona-topo{position:absolute;inset:0;opacity:0.05;background-size:500px 500px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Ccircle cx='250' cy='250' r='50' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='250' cy='250' r='100' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='250' cy='250' r='150' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='250' cy='250' r='200' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3Ccircle cx='250' cy='250' r='230' fill='none' stroke='%23fff' stroke-width='0.8'/%3E%3C/svg%3E");}
        .persona-1 .persona-bg{background:linear-gradient(160deg,#1a3015 0%,#0c1a09 100%);}
        .persona-2 .persona-bg{background:linear-gradient(160deg,#2a1a08 0%,#130d04 100%);}
        .persona-3 .persona-bg{background:linear-gradient(160deg,#0d1a2a 0%,#060e18 100%);}
        .persona:hover .persona-bg{opacity:0.7;}
        .persona:hover{transform:scale(1.01);}
        .persona-num{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:2rem;position:relative;z-index:1;}
        .persona-1 .persona-num{color:var(--sage);}
        .persona-2 .persona-num{color:var(--ember-light);}
        .persona-3 .persona-num{color:#7ec8e3;}
        .persona-icon{font-size:36px;margin-bottom:1rem;position:relative;z-index:1;}
        .persona-title{font-family:'Playfair Display',serif;font-size:clamp(20px,2.2vw,28px);font-weight:700;color:var(--parch);line-height:1.15;margin-bottom:0.8rem;position:relative;z-index:1;}
        .persona-subtitle{font-style:italic;font-family:'Playfair Display',serif;font-size:15px;color:#c8c2a8;margin-bottom:1.2rem;position:relative;z-index:1;}
        .persona-body{font-size:13px;line-height:1.7;color:#b8b49e;margin-bottom:1.8rem;position:relative;z-index:1;font-weight:400;}
        .persona-cta{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:500;padding:11px 22px;border-radius:100px;text-decoration:none;letter-spacing:0.03em;position:relative;z-index:1;transition:all 0.2s;width:fit-content;}
        .persona-1 .persona-cta{background:var(--lichen);color:var(--forest);}
        .persona-2 .persona-cta{background:var(--ember);color:white;}
        .persona-3 .persona-cta{background:#3b82f6;color:white;}
        .persona-cta:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.35);}
        .no-commission{background:var(--cream);padding:7rem 6rem;}
        .nc-inner{max-width:1000px;margin:0 auto;}
        .nc-header{margin-bottom:4rem;}
        .section-eyebrow{font-family:'DM Mono',monospace;font-size:11px;color:var(--ember);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:1rem;display:flex;align-items:center;gap:10px;}
        .section-eyebrow::before{content:'';width:24px;height:1px;background:var(--ember);}
        h2{font-family:'Playfair Display',serif;font-size:clamp(34px,4vw,54px);font-weight:900;line-height:1.08;color:var(--forest);letter-spacing:-0.02em;}
        h2 em{font-style:italic;font-weight:700;color:var(--ember);}
        .nc-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:3rem;}
        .nc-card{background:var(--parch);border-radius:20px;padding:2.2rem;border:1px solid rgba(30,51,24,0.07);transition:transform 0.2s,box-shadow 0.2s;}
        .nc-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.06);}
        .nc-card.dark{background:var(--forest);border-color:transparent;}
        .nc-emoji{font-size:30px;margin-bottom:1rem;display:block;}
        .nc-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--forest);margin-bottom:0.6rem;}
        .nc-card.dark .nc-title{color:var(--parch);}
        .nc-body{font-size:13.5px;line-height:1.75;color:var(--t2);font-weight:300;}
        .nc-card.dark .nc-body{color:#c0bca8;}
        .comparison-bar{background:var(--forest);border-radius:20px;padding:2.5rem 3rem;display:grid;grid-template-columns:1fr auto 1fr;gap:2rem;align-items:center;}
        .comp-side{text-align:center;}
        .comp-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;}
        .comp-them .comp-label{color:#a8a490;}
        .comp-us .comp-label{color:var(--ember-light);}
        .comp-val{font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,52px);font-weight:900;line-height:1;}
        .comp-them .comp-val{color:#e87676;text-decoration:line-through;text-decoration-color:rgba(232,118,118,0.5);}
        .comp-us .comp-val{color:var(--ember-light);}
        .comp-sub{font-size:12px;color:#a8a490;margin-top:6px;font-weight:300;}
        .comp-vs{font-family:'Playfair Display',serif;font-size:28px;font-style:italic;color:rgba(240,234,216,0.2);}
        .comp-example{margin-top:1.2rem;background:rgba(240,234,216,0.08);border-radius:12px;padding:12px 16px;font-size:12px;color:#a8a490;font-style:italic;grid-column:1/-1;text-align:center;}
        .how{background:var(--parch);padding:7rem 6rem;}
        .how-inner{max-width:1000px;margin:0 auto;}
        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;margin-top:3.5rem;background:var(--mist);border-radius:24px;overflow:hidden;}
        .step{background:var(--cream);padding:2.2rem 2rem;position:relative;transition:background 0.3s;}
        .step:hover{background:var(--sand);}
        .step-n{font-family:'Playfair Display',serif;font-size:60px;font-weight:900;color:var(--mist);line-height:1;margin-bottom:1rem;transition:color 0.3s;}
        .step:hover .step-n{color:rgba(30,51,24,0.1);}
        .step-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--forest);margin-bottom:0.6rem;}
        .step-body{font-size:13px;line-height:1.7;color:var(--t2);font-weight:300;}
        .step-gone{margin-top:1rem;font-family:'DM Mono',monospace;font-size:10px;color:var(--lichen);letter-spacing:0.08em;display:flex;align-items:center;gap:5px;}
        .step-gone::before{content:'✓';}
        .gone{background:var(--forest);padding:5rem 6rem;}
        .gone-inner{max-width:900px;margin:0 auto;}
        .gone-title{font-family:'Playfair Display',serif;font-size:clamp(28px,3.5vw,46px);font-weight:700;font-style:italic;color:var(--parch);line-height:1.3;margin-bottom:2.5rem;}
        .gone-title strong{font-style:normal;color:var(--ember-light);}
        .gone-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;background:rgba(255,255,255,0.06);border-radius:16px;overflow:hidden;}
        .gone-item{background:rgba(255,255,255,0.03);padding:1.5rem;transition:background 0.2s;}
        .gone-item:hover{background:rgba(255,255,255,0.07);}
        .gone-x{color:#e87676;font-size:16px;margin-bottom:8px;}
        .gone-label{font-size:13px;color:#b0ac98;line-height:1.5;font-weight:400;}
        .gone-label del{color:#787060;}
        .capture{background:linear-gradient(135deg,var(--forest) 0%,var(--ink) 100%);padding:7rem 6rem;text-align:center;position:relative;overflow:hidden;}
        .capture::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 25% 60%,rgba(125,168,98,0.1) 0%,transparent 50%),radial-gradient(ellipse at 75% 40%,rgba(196,114,42,0.1) 0%,transparent 50%);}
        .capture-inner{position:relative;z-index:1;max-width:560px;margin:0 auto;}
        .capture h2{color:var(--parch);margin-bottom:0.8rem;}
        .capture h2 em{color:var(--ember-light);}
        .capture-sub{font-size:16px;color:#b0ac98;line-height:1.75;font-weight:300;margin-bottom:2.5rem;}
        .capture-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:1.2rem;}
        .capture-fine{font-family:'DM Mono',monospace;font-size:11px;color:#787868;letter-spacing:0.06em;}
        footer{background:var(--ink);padding:3rem 6rem;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.04);}
        .footer-logo{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:#b8b0a0;letter-spacing:0.02em;}
        .footer-logo em{font-style:normal;color:var(--ember);}
        .footer-tagline{font-family:'DM Mono',monospace;font-size:11px;color:#686860;letter-spacing:0.1em;margin-top:5px;}
        .footer-links{display:flex;gap:2rem;}
        .footer-link{font-size:12px;color:#686860;text-decoration:none;letter-spacing:0.04em;transition:color 0.2s;}
        .footer-link:hover{color:#b8b0a0;}
        @keyframes rise{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
        @keyframes slideIn{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.75s ease,transform 0.75s ease;}
        .reveal.in{opacity:1;transform:translateY(0);}
        .reveal-d1{transition-delay:0.1s;}
        .reveal-d2{transition-delay:0.2s;}
        .reveal-d3{transition-delay:0.3s;}
        @media(max-width:960px){
          nav{padding:1.1rem 1.5rem;}
          .hero{grid-template-columns:1fr;min-height:auto;}
          .hero-left{padding:5rem 1.8rem 3rem;}
          .hero-right{height:420px;order:2;}
          h1{color:var(--forest);}
          .hero-body{color:var(--t2);}
          section,.pitch,.gone,.how,.no-commission,.capture{padding:4rem 1.8rem;}
          .commission-banner{padding:1.4rem 1.8rem;gap:1.5rem;}
          .personas{grid-template-columns:1fr;}
          .persona{min-height:320px;}
          .nc-grid{grid-template-columns:1fr;}
          .steps{grid-template-columns:1fr 1fr;}
          .gone-grid{grid-template-columns:1fr 1fr;}
          .comparison-bar{grid-template-columns:1fr;text-align:center;}
          .comp-vs{display:none;}
          .pitch-cols{grid-template-columns:1fr;}
          footer{flex-direction:column;gap:1.5rem;text-align:center;padding:2rem 1.8rem;}
        }
        @media(max-width:560px){
          .gone-grid{grid-template-columns:1fr;}
          .steps{grid-template-columns:1fr;}
          .nav-cta,.nav-promise{display:none;}
          h1{font-size:40px;}
          .hero-left{padding:4.5rem 1.4rem 2.5rem;}
          .hero-right{height:360px;}
          .commission-banner{flex-direction:column;gap:1rem;padding:1.8rem 1.4rem;}
          .cb-divider{display:none;}
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Instrument+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />

      <nav id="nav">
        <a href="/" className="logo">Set<em>out</em>.guide</a>
        <div className="nav-promise">Zero commission. Ever.</div>
        <div className="nav-right">
          <a href="#how" className="nav-link">How it works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href={isLoggedIn ? "/dashboard" : "/sign-up"} className="nav-cta">
            {isLoggedIn ? "Dashboard →" : "Get started →"}
          </a>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-left">
          <div className="zero-commission">Zero commission. Flat fee. Guides keep everything.</div>
          <h1>Get paid<br/>to guide.<br/><em>Keep it all.</em></h1>
          <p className="hero-body">
            The best trips don&apos;t come from travel agencies. They come from the person who&apos;s fished that river a hundred times, hiked that ridge every fall, or arrived in a new country and found trails nobody else knows. <strong>Setout gives those guides the tools to get paid — with zero commission, ever.</strong>
          </p>
          <div className="hero-actions">
            <a href={isLoggedIn ? "/dashboard" : "/sign-up"} className="btn-forest">
              {isLoggedIn ? "Go to dashboard →" : "Start guiding →"}
            </a>
            <a href={isLoggedIn ? "/dashboard" : "/sign-up"} className="btn-ghost">
              {isLoggedIn ? "Your trips" : "Plan a trip"}
            </a>
          </div>
          <div className="hero-proof">
            <span className="proof-tag">Free to start</span>
            <div className="proof-divider"></div>
            <span className="proof-tag">No credit card</span>
            <div className="proof-divider"></div>
            <span className="proof-tag">Live in 15 minutes</span>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-bg"></div>
          <div className="hero-topo"></div>
          <div className="hero-glow"></div>
          <div className="hero-cards">
            <div className="ui-card">
              <div className="card-top">
                <div className="card-guide-info">
                  <div className="guide-avatar">M</div>
                  <div>
                    <div className="guide-name">Marcus Rivera</div>
                    <div className="guide-loc">📍 Deschutes River, OR</div>
                  </div>
                </div>
                <div className="live-dot">Live</div>
              </div>
              <div className="card-trip-name">Early Season Fly Fishing</div>
              <div className="card-trip-meta">May 12 · $140/person · 6 of 8 booked</div>
              <div className="card-stats">
                <div className="cstat"><div className="cstat-val">$840</div><div className="cstat-label">Collected</div></div>
                <div className="cstat"><div className="cstat-val">6</div><div className="cstat-label">Booked</div></div>
                <div className="cstat"><div className="cstat-val">$0</div><div className="cstat-label">Commission</div></div>
              </div>
              <div className="progress-wrap"><div className="progress-bar p1"></div></div>
              <div className="progress-meta"><span>75% full</span><span>2 spots left</span></div>
            </div>
            <div className="ui-card">
              <div className="card-top">
                <div className="guide-name">This month&apos;s earnings</div>
                <div className="live-dot">Updated</div>
              </div>
              <div className="earnings-row"><span className="er-label">3 trips · 22 participants</span><span className="er-val">$2,640 <span className="er-sub">kept</span></span></div>
              <div className="earnings-row"><span className="er-label">Commission taken by Setout</span><span className="er-val" style={{color:'var(--lichen)'}}>$0.00</span></div>
              <div className="earnings-row"><span className="er-label">Platform fee</span><span className="er-val" style={{fontSize:'13px',color:'var(--t2)'}}>$19/mo flat</span></div>
            </div>
            <div className="ui-card">
              <div className="viral-header">↗ Share your trip · Build your audience</div>
              <div className="card-trip-name" style={{fontSize:'14px',marginBottom:'10px'}}>Sunrise Ridge Hike · Tirana, Albania</div>
              <div className="share-row">
                <button className="share-btn share-ig">📸 Instagram</button>
                <button className="share-btn share-tk">🎵 TikTok</button>
                <button className="share-btn share-link">🔗 Copy link</button>
              </div>
              <div className="referral-tag">
                Referral link active · <span>Earn 1 free month per guide you bring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="commission-banner">
        <div className="cb-item"><strong>$0</strong> commission on every booking</div>
        <div className="cb-divider"></div>
        <div className="cb-item">Flat <strong>$19/mo</strong> — unlimited trips</div>
        <div className="cb-divider"></div>
        <div className="cb-item">FareHarbor takes <strong>6–8%</strong> — we never do</div>
        <div className="cb-divider"></div>
        <div className="cb-item">You earned it. <strong>You keep it.</strong></div>
      </div>

      <div className="pitch">
        <div className="pitch-wrap">
          <div className="pitch-eyebrow reveal">The guide economy</div>
          <p className="pitch-quote reveal">&ldquo;The person who&apos;s fished that river a hundred times, hiked that ridge every fall, or arrived somewhere new and found trails nobody else knows — they deserve to <strong>get paid.</strong> Not after a platform takes its cut. <strong>All of it.</strong>&rdquo;</p>
          <div className="pitch-cols reveal">
            <p className="pitch-col">Setout handles booking pages, deposit collection, automated pre-trip emails, waivers, and post-trip reviews — so guides can do the thing they actually love. Simple tools. Zero overhead. One flat monthly fee.</p>
            <p className="pitch-col">Whether you guide from home, from a van, or from a new country every season — Setout goes with you. Build your audience, grow your bookings, and get paid to take people to the places you know better than anyone.</p>
          </div>
        </div>
      </div>

      <div className="personas" id="who">
        <div className="persona persona-1">
          <div className="persona-bg"></div>
          <div className="persona-topo"></div>
          <div className="persona-num">For the organizer</div>
          <div className="persona-icon">🏕</div>
          <div className="persona-title">Going back somewhere you loved?</div>
          <div className="persona-subtitle">&ldquo;Bring friends. Go for free.&rdquo;</div>
          <div className="persona-body">Organize the return trip. Charge your crew what it cost you. Cover your costs — or make it your gift to them. A professional booking link, automatic payments, no awkward Venmo requests.</div>
          <a href={isLoggedIn ? "/dashboard" : "/sign-up"} className="persona-cta">Plan a trip →</a>
        </div>
        <div className="persona persona-2">
          <div className="persona-bg"></div>
          <div className="persona-topo"></div>
          <div className="persona-num">For the local expert</div>
          <div className="persona-icon">🎣</div>
          <div className="persona-title">You know this river better than anyone.</div>
          <div className="persona-subtitle">&ldquo;Time to get paid for it.&rdquo;</div>
          <div className="persona-body">You&apos;ve guided friends for free for years. They keep saying you should charge. Now you can — with a professional booking page, gear list emails, waivers, and your money going straight to you.</div>
          <a href={isLoggedIn ? "/dashboard" : "/sign-up"} className="persona-cta">Start guiding →</a>
        </div>
        <div className="persona persona-3">
          <div className="persona-bg"></div>
          <div className="persona-topo"></div>
          <div className="persona-num">For the nomad guide</div>
          <div className="persona-icon">🌍</div>
          <div className="persona-title">Every place you land, you find trails nobody else knows.</div>
          <div className="persona-subtitle">&ldquo;Get paid to explore the world.&rdquo;</div>
          <div className="persona-body">You&apos;re in Albania this month, the Azores next. You discover routes, find hidden spots, build a following. Setout lets you monetize wherever you are — build your audience, run trips, keep everything you earn.</div>
          <a href={isLoggedIn ? "/dashboard" : "/sign-up"} className="persona-cta">Guide the world →</a>
        </div>
      </div>

      <section className="no-commission" id="pricing-teaser">
        <div className="nc-inner">
          <div className="nc-header">
            <div className="section-eyebrow reveal">The model that&apos;s actually fair</div>
            <h2 className="reveal">Zero commission.<br/><em>Not a slogan. A promise.</em></h2>
          </div>
          <div className="nc-grid reveal">
            <div className="nc-card dark">
              <span className="nc-emoji">⚡</span>
              <div className="nc-title">Flat monthly. That&apos;s it.</div>
              <div className="nc-body">FareHarbor, Peek Pro, and Airbnb Experiences take 6–30% of every booking. On a $2,000 group trip, that&apos;s up to $600 gone before you see a dollar. Setout charges one flat monthly fee. Nothing more. Ever.</div>
            </div>
            <div className="nc-card">
              <span className="nc-emoji">💰</span>
              <div className="nc-title">What participants pay, you receive.</div>
              <div className="nc-body">Every dollar your participants pay goes directly to you through Stripe. Setout never touches your booking revenue. The platform fee is between you and us — completely separate from your trips.</div>
            </div>
            <div className="nc-card">
              <span className="nc-emoji">📈</span>
              <div className="nc-title">Grow without penalty.</div>
              <div className="nc-body">Run 1 trip or 50. Take 5 participants or 500. Your fee stays flat. The more you grow, the better the deal gets. We win when you subscribe — not when you earn.</div>
            </div>
            <div className="nc-card">
              <span className="nc-emoji">🌍</span>
              <div className="nc-title">Works wherever you are.</div>
              <div className="nc-body">Guiding in Oregon or Albania, New Zealand or Norway — Setout and Stripe handle the payments globally. One platform, one fee, every country you take people into.</div>
            </div>
          </div>
          <div className="comparison-bar reveal">
            <div className="comp-side comp-them">
              <div className="comp-label">Other platforms take</div>
              <div className="comp-val">6–30%</div>
              <div className="comp-sub">per booking, forever</div>
            </div>
            <div className="comp-vs">vs</div>
            <div className="comp-side comp-us">
              <div className="comp-label">Setout charges</div>
              <div className="comp-val">$19/mo</div>
              <div className="comp-sub">flat. zero cuts. unlimited trips.</div>
            </div>
            <div className="comp-example">On a $2,000 group trip: competitors take up to $600. Setout takes $0 of it. Your $19 monthly fee is the only thing we ever charge.</div>
          </div>
        </div>
      </section>

      <section className="how" id="how">
        <div className="how-inner">
          <div className="section-eyebrow reveal">Simple by design</div>
          <h2 className="reveal">From signup to<br/><em>first booking</em> in 15 minutes.</h2>
          <div className="steps reveal">
            <div className="step"><div className="step-n">01</div><div className="step-title">Create your trip page</div><div className="step-body">Choose your activity, set your date, price, and deposit. Your public booking page is live and shareable immediately.</div><div className="step-gone">Up in 15 minutes</div></div>
            <div className="step"><div className="step-n">02</div><div className="step-title">Share the link</div><div className="step-body">Post it to Instagram, drop it in a Facebook group, text it to your crew. Participants book and pay a deposit in one clean flow.</div><div className="step-gone">No Venmo. No spreadsheet.</div></div>
            <div className="step"><div className="step-n">03</div><div className="step-title">Automations fire</div><div className="step-body">Gear lists, permit reminders, weather updates, and waivers go out automatically. You don&apos;t type another message.</div><div className="step-gone">No chasing. No follow-ups.</div></div>
            <div className="step"><div className="step-n">04</div><div className="step-title">Build as you go</div><div className="step-body">Post-trip reviews build your profile. Referral links spread your name. Trip cards go viral. Your audience grows with every trip.</div><div className="step-gone">Every trip grows the next one</div></div>
          </div>
        </div>
      </section>

      <div className="gone">
        <div className="gone-inner">
          <p className="gone-title reveal">This is what <strong>disappears</strong><br/>the moment you use Setout.</p>
          <div className="gone-grid reveal">
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>&ldquo;Who hasn&apos;t paid yet?&rdquo; texts</del></div></div>
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>The participant spreadsheet</del></div></div>
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>Copy-pasted gear list emails</del></div></div>
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>Chasing waiver signatures</del></div></div>
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>Venmo / PayPal / cash chaos</del></div></div>
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>&ldquo;What time do we meet?&rdquo; DMs</del></div></div>
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>The 6–8% platform tax</del></div></div>
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>Manual weather check reminders</del></div></div>
            <div className="gone-item"><div className="gone-x">✗</div><div className="gone-label"><del>Post-trip radio silence</del></div></div>
          </div>
        </div>
      </div>

      <section className="capture" id="early-access">
        <div className="capture-inner">
          <div className="section-eyebrow reveal" style={{justifyContent:'center',color:'#a8a490'}}>Ready to start</div>
          <h2 className="reveal">Be first<br/>on the <em>trail.</em></h2>
          <p className="capture-sub reveal">Create your free account and have your first trip live in 15 minutes. Zero commission. No credit card required.</p>
          <div className="capture-actions reveal">
            <a href={isLoggedIn ? "/dashboard" : "/sign-up"} className="btn-forest" style={{fontSize:'15px',padding:'16px 32px'}}>
              {isLoggedIn ? "Go to dashboard →" : "Create free account →"}
            </a>
            {!isLoggedIn && (
              <a href="/sign-in" className="btn-ghost" style={{fontSize:'15px',padding:'16px 32px',borderColor:'rgba(240,234,216,0.3)',color:'var(--parch)'}}>Sign in</a>
            )}
          </div>
          <p className="capture-fine reveal">Free to start. No credit card. Cancel any time.</p>
        </div>
      </section>

      <footer>
        <div>
          <div className="footer-logo">Set<em>out</em>.guide</div>
          <div className="footer-tagline">Get paid to guide. Keep everything you earn.</div>
        </div>
        <div className="footer-links">
          <a href="#who" className="footer-link">Who it&apos;s for</a>
          <a href="#how" className="footer-link">How it works</a>
          <a href="#pricing" className="footer-link">Pricing</a>
          <a href={isLoggedIn ? "/dashboard" : "/sign-up"} className="footer-link">
            {isLoggedIn ? "Dashboard" : "Get started"}
          </a>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{__html: `
        const obs = new IntersectionObserver((entries) => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              setTimeout(() => e.target.classList.add('in'), i * 90);
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.08 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        window.addEventListener('scroll', () => {
          const nav = document.getElementById('nav');
          if (nav) nav.style.boxShadow = window.scrollY > 30 ? '0 4px 24px rgba(0,0,0,0.07)' : 'none';
        });
      `}} />
    </>
  )
}