// ─── PORTFOLIO DATA ─── (edit this file to update your portfolio)
module.exports = {
  personal: {
    name:       'Jayant Kumar',
    role:       'Software Engineer Trainee',
    tagline:    'Full-Stack · Blockchain · Data Analytics · ML',
    bio:        'Aspiring Software Engineer with strong foundations in Data Structures & Algorithms, Web Development, and Machine Learning. Experienced in building full-stack applications, scalable backend systems, and data-driven solutions.',
    location:   'Delhi, India',
    phone:      '+91 8409105003',
    email:      'kjayantnagar8596@gmail.com',
    github:     'https://github.com/withjayant',
    linkedin:   'https://linkedin.com/in/withjayant',
    leetcode:   'https://leetcode.com/withjayant',
    avatar:     '/images/avatar.png',           // add your photo here
    resume:     '/Jayant_Resume.pdf',
  },

  dsa: {
    totalSolved:  320,
    platforms: [
      { name: 'LeetCode',        solved: 220, total: 3000, color: '#f59e0b', icon: '🟡', url: 'https://leetcode.com/withjayant' },
      { name: 'GeeksForGeeks',   solved:  60, total: 2000, color: '#34d399', icon: '🟢', url: 'https://geeksforgeeks.org' },
      { name: 'Codeforces',      solved:  25, total: 8000, color: '#60a5fa', icon: '🔵', url: 'https://codeforces.com' },
      { name: 'HackerRank',      solved:  15, total: 1000, color: '#a78bfa', icon: '🟣', url: 'https://hackerrank.com' },
    ],
    topics: [
      { name: 'Arrays & Hashing',    solved: 52, total: 60,  pct: 87 },
      { name: 'Two Pointers',        solved: 18, total: 20,  pct: 90 },
      { name: 'Sliding Window',      solved: 16, total: 18,  pct: 89 },
      { name: 'Stack & Queue',       solved: 24, total: 28,  pct: 86 },
      { name: 'Binary Search',       solved: 22, total: 26,  pct: 85 },
      { name: 'Linked List',         solved: 20, total: 24,  pct: 83 },
      { name: 'Trees & BST',         solved: 38, total: 48,  pct: 79 },
      { name: 'Graphs (BFS/DFS)',    solved: 26, total: 40,  pct: 65 },
      { name: 'Dynamic Programming', solved: 32, total: 55,  pct: 58 },
      { name: 'Backtracking',        solved: 14, total: 24,  pct: 58 },
      { name: 'Greedy',              solved: 28, total: 36,  pct: 78 },
      { name: 'Bit Manipulation',    solved: 10, total: 16,  pct: 63 },
    ],
    difficulty: { easy: 140, medium: 138, hard: 42 },
    streak: 45,
    badges: ['50 Days', '100 Days', 'Knight', 'Guardian'],
  },

  skills: [
    { icon: '💻', cat: 'Languages',      tags: ['Java','Python','JavaScript','Solidity','SQL'] },
    { icon: '🌐', cat: 'Web & Backend',  tags: ['Node.js','Express.js','React.js','MongoDB','Mongoose','REST APIs','EJS','HTML5','CSS3'] },
    { icon: '🤖', cat: 'Data & ML',      tags: ['Power BI','DAX','Pandas','NumPy','Scikit-learn','XGBoost','SMOTE','SHAP','Streamlit'] },
    { icon: '⛓️', cat: 'Blockchain',     tags: ['Solidity','Hardhat','ethers.js','Web3.js','MetaMask','IPFS','ERC-20','NFT'] },
    { icon: '🛠️', cat: 'Tools & Cloud', tags: ['Git','GitHub','Docker','Firebase','Azure AI','Postman','Vercel','Cloudinary'] },
  ],

  experience: [
    {
      role:     'Data Analyst Intern',
      company:  'Edunet Foundation & Shell',
      period:   'Jan 2025 – Mar 2025',
      location: 'Remote, India',
      type:     'Internship',
      bullets: [
        'Executed ETL pipelines on structured datasets, transforming raw business data into clean, analysis-ready formats for downstream reporting.',
        'Engineered interactive Power BI dashboards with DAX-driven KPIs, enabling stakeholders to monitor real-time business performance metrics.',
        'Conducted in-depth analysis of sales, profit, and COGS data to surface actionable trends directly supporting strategic decision-making.',
      ],
    },
  ],

  projects: [
    {
      id:       'withjayant',
      icon:     '⛓️',
      date:     'May 2026',
      name:     'WithJayant — Blockchain Social Network',
      tagline:  '100% On-Chain · NFT Posts · CGT Token Economy',
      desc:     'Fully decentralised social media platform where every post is minted as an NFT on Ethereum Sepolia Testnet using Solidity smart contracts. Implements a CGT token reward economy for engagement (posts, likes, comments). Zero backend servers — fully decentralised, hosted on Vercel.',
      image:    '/images/withjayant.png',         // LinkedIn screenshot goes here
      stack:    ['Solidity 0.8.24','React.js','ethers.js','Hardhat','MetaMask','Ethereum Sepolia','Vercel'],
      github:   'https://github.com/withjayant',
      live:     '',
      featured: true,
    },
    {
      id:       'wanderlust',
      icon:     '🏡',
      date:     'Apr 2026',
      name:     'Wanderlust — Vacation Rental Platform',
      tagline:  'Full-Stack MVC · 28+ Listings · Airbnb-Inspired',
      desc:     'Airbnb-inspired rental platform with full CRUD across 28+ listings. MVC architecture using Node.js, Express.js, and MongoDB with Mongoose ODM. RESTful APIs, EJS server-side templating, Cloudinary for optimised cloud image delivery.',
      image:    '/images/wanderlust.png',
      stack:    ['Node.js','Express.js','MongoDB','Mongoose','EJS','Cloudinary','REST API','MVC'],
      github:   'https://github.com/withjayant',
      live:     '',
      featured: true,
    },
    {
      id:       'bankloan',
      icon:     '📊',
      date:     'Apr 2025',
      name:     'Bank Loan Data Insights — Power BI Dashboard',
      tagline:  '38,576 Records · $435.8M · 3 Dashboards',
      desc:     'Analysed 38,576 loan records worth $435.8M across 3 interconnected dashboards covering KPI summary, trend analysis, and borrower segmentation. Built DAX-driven KPI cards tracking MTD/MoM metrics; segmented portfolio into Good (86.2%) vs Bad (13.8%) loans.',
      image:    '/images/bankloan.png',
      stack:    ['Power BI','DAX','SQL','Excel','Data Modelling'],
      github:   'https://github.com/withjayant',
      live:     '',
      featured: false,
    },
  ],

  bankLoan: {
    stats: [
      { label: 'Total Applications', value: '38,576',  sub: 'Loan records analysed',   color: 'blue'  },
      { label: 'Total Funded',       value: '$435.8M', sub: 'Total portfolio value',   color: 'green' },
      { label: 'Total Received',     value: '$473.1M', sub: 'Payments received',        color: 'purple'},
      { label: 'Good Loans',         value: '86.2%',   sub: '33,243 applications',     color: 'green' },
      { label: 'Bad Loans',          value: '13.8%',   sub: '5,333 applications',      color: 'red'   },
      { label: 'Avg Interest Rate',  value: '12.05%',  sub: 'Across all loan grades',  color: 'amber' },
      { label: 'Avg DTI',            value: '13.33%',  sub: 'Debt-to-income ratio',    color: 'amber' },
      { label: 'MoM Growth',         value: '+13.0%',  sub: 'Month-over-month funded', color: 'green' },
    ],
    tools:    ['Power BI', 'DAX', 'SQL', 'Excel', 'Data Modelling', 'KPI Design', 'Drill-through'],
    features: [
      'Geographic heatmaps by US State',
      'Monthly trend lines (MTD / MoM KPIs)',
      'Borrower segmentation by Grade & Purpose',
      'Drill-through detail tables',
      'Interactive slicers: State, Grade, Loan Status',
    ],
  },

  achievements: [
    { icon: '🥉', title: '3rd Rank — Data Analytics',       desc: 'Chandigarh University Coursera Marathon — competitive recognition in the data analytics track.' },
    { icon: '🎓', title: 'Student Coordinator, DLL',         desc: 'Leadership & coordination role at Chandigarh University — Aug 2024 to Present.' },
    { icon: '☁️', title: 'AI on Microsoft Azure',            desc: 'Certified by Edunet Foundation & AICTE — May 2025 to Jul 2025.' },
    { icon: '📜', title: 'IT Specialist — Data Analytics',   desc: 'Certiport (Pearson VUE) — Certified November 2025.' },
  ],

  education: {
    degree:  'B.E. Computer Science Engineering',
    spec:    'Big Data Analytics',
    uni:     'Chandigarh University',
    period:  '2023 – 2027',
    cgpa:    '',      // add if you want
  },
};
