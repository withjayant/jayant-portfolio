/* main.js */
(function(){

/* ── CURSOR ── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx+'px';
  cur.style.top  = my+'px';
});
(function animR(){
  rx += (mx-rx)*.12;
  ry += (my-ry)*.12;
  curR.style.left = rx+'px';
  curR.style.top  = ry+'px';
  requestAnimationFrame(animR);
})();

const hoverEls = document.querySelectorAll('a,button,.sk-card,.proj-card,.plat-card,.ach-card,.bstat,.soc-card,.feat-card');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter',()=>{
    cur.style.transform='scale(2.4)';
    curR.style.opacity='.18';
    curR.style.transform='scale(1.5)';
    cur.style.background='#a78bfa';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.transform='scale(1)';
    curR.style.opacity='.4';
    curR.style.transform='scale(1)';
    cur.style.background='#60a5fa';
  });
});

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i*55);
  });
}, { threshold:.08, rootMargin:'0px 0px -30px 0px' });
document.querySelectorAll('.rev').forEach(el => obs.observe(el));

/* ── ACTIVE NAV on scroll ── */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');
const navEl      = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 80;
  sections.forEach(sec => {
    if(y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight){
      navLinks.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if(match) match.classList.add('active');
    }
  });
  navEl.style.padding = window.scrollY > 40 ? '.7rem 4rem' : '.95rem 4rem';
}, { passive:true });

/* ── MOBILE MENU ── */
window.toggleMenu = function(){
  document.getElementById('navLinks').classList.toggle('open');
};

/* ── TOPIC BARS (animate on enter) ── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const bar = e.target;
      bar.style.width = bar.dataset.w;
      barObs.unobserve(bar);
    }
  });
}, { threshold:.2 });
document.querySelectorAll('.topic-bar[data-w]').forEach(b => barObs.observe(b));

/* ── CHARTS ── */
Chart.defaults.color = '#6b7280';
Chart.defaults.font.family = "'Inter',system-ui,sans-serif";
Chart.defaults.font.size = 11;

/* Difficulty donut */
const dd = document.getElementById('diffDonut');
if(dd){
  new Chart(dd, {
    type:'doughnut',
    data:{
      labels:['Easy','Medium','Hard'],
      datasets:[{
        data:[140,138,42],
        backgroundColor:['rgba(52,211,153,.82)','rgba(245,158,11,.82)','rgba(248,113,113,.82)'],
        borderColor:['#34d399','#f59e0b','#f87171'],
        borderWidth:2, hoverOffset:8,
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:true, cutout:'72%',
      plugins:{
        legend:{ display:false },
        tooltip:{ callbacks:{ label: c => ` ${c.label}: ${c.formattedValue}` }},
      }
    }
  });
}

/* Loan good/bad donut */
const ld = document.getElementById('loanDonut');
if(ld){
  new Chart(ld,{
    type:'doughnut',
    data:{
      labels:['Good (86.2%)','Bad (13.8%)'],
      datasets:[{
        data:[86.2,13.8],
        backgroundColor:['rgba(52,211,153,.78)','rgba(248,113,113,.78)'],
        borderColor:['#34d399','#f87171'],
        borderWidth:2, hoverOffset:5,
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false, cutout:'70%',
      plugins:{
        legend:{ position:'bottom', labels:{ color:'#9ca3af', padding:14, boxWidth:11 }},
        tooltip:{ callbacks:{ label: c => ` ${c.label} — ${c.formattedValue}%` }},
      }
    }
  });
}

/* Monthly trend */
const lt = document.getElementById('loanTrend');
if(lt){
  new Chart(lt,{
    type:'line',
    data:{
      labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets:[
        { label:'Funded ($M)', data:[22,25,28,30,34,38,36,40,44,48,51,54],
          borderColor:'#60a5fa', backgroundColor:'rgba(96,165,250,.09)',
          fill:true, tension:.42, pointRadius:3, pointBackgroundColor:'#60a5fa', borderWidth:2 },
        { label:'Received ($M)', data:[18,20,22,26,28,30,29,33,36,40,42,46],
          borderColor:'#a78bfa', backgroundColor:'rgba(167,139,250,.06)',
          fill:true, tension:.42, pointRadius:3, pointBackgroundColor:'#a78bfa', borderWidth:2 },
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      interaction:{ mode:'index', intersect:false },
      scales:{
        x:{ grid:{ color:'rgba(255,255,255,.04)' }, ticks:{ color:'#6b7280' }},
        y:{ grid:{ color:'rgba(255,255,255,.04)' }, ticks:{ color:'#6b7280', callback: v=>'$'+v+'M' }},
      },
      plugins:{ legend:{ labels:{ color:'#9ca3af', boxWidth:10 }}}
    }
  });
}

/* Purpose bar */
const lp = document.getElementById('loanPurpose');
if(lp){
  new Chart(lp,{
    type:'bar',
    data:{
      labels:['Debt Consol.','Credit Card','Home Impr.','Other','Small Biz','Car','Medical'],
      datasets:[{
        label:'Applications',
        data:[13205,4926,2869,3818,1777,939,664],
        backgroundColor:['rgba(96,165,250,.72)','rgba(167,139,250,.72)','rgba(52,211,153,.72)','rgba(245,158,11,.72)','rgba(248,113,113,.72)','rgba(99,102,241,.72)','rgba(20,184,166,.72)'],
        borderRadius:4, borderWidth:0,
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false, indexAxis:'y',
      scales:{
        x:{ grid:{ color:'rgba(255,255,255,.04)' }, ticks:{ color:'#6b7280' }},
        y:{ grid:{ display:false }, ticks:{ color:'#9ca3af' }},
      },
      plugins:{ legend:{ display:false }}
    }
  });
}

/* Grade bar */
const lg = document.getElementById('loanGrade');
if(lg){
  new Chart(lg,{
    type:'bar',
    data:{
      labels:['Grade A','Grade B','Grade C','Grade D','Grade E','Grade F','Grade G'],
      datasets:[{
        label:'Loans',
        data:[9052,10378,7562,5280,2690,950,664],
        backgroundColor:'rgba(96,165,250,.65)',
        borderRadius:4, borderWidth:0,
        hoverBackgroundColor:'rgba(96,165,250,.9)',
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      scales:{
        x:{ grid:{ color:'rgba(255,255,255,.04)' }, ticks:{ color:'#6b7280' }},
        y:{ grid:{ color:'rgba(255,255,255,.04)' }, ticks:{ color:'#6b7280' }},
      },
      plugins:{ legend:{ display:false }}
    }
  });
}

/* ── LIVE DATA: GitHub ── */
async function fetchGitHub(){
  try{
    const [user, repos] = await Promise.all([
      fetch('https://api.github.com/users/withjayant').then(r=>r.json()),
      fetch('https://api.github.com/users/withjayant/repos?per_page=100').then(r=>r.json())
    ]);
    if(user.login){
      const repoEl = document.getElementById('ghReposVal');
      const starsEl = document.getElementById('ghStarsVal');
      const fwEl = document.getElementById('ghFollowersVal');
      let stars = 0;
      if(Array.isArray(repos)) repos.forEach(r=>stars+=r.stargazers_count||0);
      if(repoEl) repoEl.textContent = user.public_repos || '—';
      if(starsEl) starsEl.textContent = stars;
      if(fwEl) fwEl.textContent = user.followers || '0';
      const statRepos = document.getElementById('statRepos');
      if(statRepos) statRepos.textContent = (user.public_repos||'—') + ' Repos';
    }
  }catch(e){}
}
fetchGitHub();

/* ── LIVE DATA: LeetCode ── */
async function fetchLeetCode(){
  try{
    const body = JSON.stringify({
      query:`query{matchedUser(username:"withjayant"){submitStats{acSubmissionNum{difficulty count}}}}`,
    });
    const res = await fetch('https://leetcode.com/graphql',{
      method:'POST',
      headers:{'Content-Type':'application/json','Referer':'https://leetcode.com'},
      body
    });
    if(!res.ok) throw new Error();
    const data = await res.json();
    const nums = data?.data?.matchedUser?.submitStats?.acSubmissionNum;
    if(nums){
      let easy=0,med=0,hard=0,total=0;
      nums.forEach(n=>{
        if(n.difficulty==='Easy') easy=n.count;
        if(n.difficulty==='Medium') med=n.count;
        if(n.difficulty==='Hard') hard=n.count;
        if(n.difficulty==='All') total=n.count;
      });
      const setEl = (id,v)=>{ const el=document.getElementById(id); if(el&&v) el.textContent=v; };
      setEl('lcTotalVal', total);
      setEl('lcEasyVal', easy);
      setEl('lcMedVal', med);
      setEl('lcHardVal', hard);
      setEl('statSolved', total+'+ DSA');
    }
  }catch(e){}
}
fetchLeetCode();

})();
