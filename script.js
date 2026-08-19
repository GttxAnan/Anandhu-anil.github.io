/**
 * Anandhu Anil - Backend Engineer Portfolio Scripts
 * Handles interactive terminal, telemetry visualization, skills filtering, theme toggle, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initTelemetrySimulator();
  initSkillsFilter();
  initTerminal();
  initCopyButtons();
  initScrollSpy();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });

    // Close menu on nav item click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars-staggered';
      });
    });
  }
}

/* ==========================================================================
   2. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggle.title = 'Switch to light mode';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggle.title = 'Switch to dark mode';
    }
  }
}

/* ==========================================================================
   3. TELEMETRY STREAM SIMULATOR (Live Backend Vibe)
   ========================================================================== */
function initTelemetrySimulator() {
  const visualizer = document.getElementById('stream-visualizer');
  const rateElem = document.getElementById('stream-rate');
  if (!visualizer || !rateElem) return;

  const bars = visualizer.querySelectorAll('.bar');

  setInterval(() => {
    // Randomize bar heights dynamically for ingestion stream look
    bars.forEach(bar => {
      const randomHeight = Math.floor(Math.random() * 65) + 35; // 35% - 100%
      bar.style.height = `${randomHeight}%`;
    });

    // Randomize rate around ~48,000 - 52,000 msg/sec
    const randomRate = Math.floor(Math.random() * 4500) + 47500;
    rateElem.textContent = `~${randomRate.toLocaleString()} msg/sec`;
  }, 900);
}

/* ==========================================================================
   4. SKILLS FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCategories = document.querySelectorAll('.skill-category');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCategories.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE TERMINAL EMULATOR
   ========================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const history = document.getElementById('terminal-history');
  const chips = document.querySelectorAll('.term-chip');
  const screen = document.getElementById('terminal-screen');

  if (!input || !history) return;

  const commands = {
    help: `Available commands:
  - <span class="term-cmd">skills</span>       : View primary tech stack and competencies
  - <span class="term-cmd">metrics</span>      : Production system metrics & telemetry stats
  - <span class="term-cmd">projects</span>     : List featured backend systems and repositories
  - <span class="term-cmd">experience</span>   : Work history and role summary at Tata Elxsi
  - <span class="term-cmd">curl -I /health</span>: Run healthcheck against backend microservice
  - <span class="term-cmd">contact</span>      : Display email, phone, and LinkedIn handles
  - <span class="term-cmd">sudo hire</span>    : Fast-track candidate selection protocol ;)
  - <span class="term-cmd">whoami</span>       : Display current user credentials
  - <span class="term-cmd">clear</span>        : Clear terminal output history`,

    skills: `<span class="term-welcome">=== TECHNICAL CAPABILITIES ===</span>
  - <strong>Languages:</strong> Java (8/11/17/21), Python (Boto3), JavaScript, SQL
  - <strong>Frameworks:</strong> Spring Boot, Spring Cloud, Spring Security, Hibernate/JPA
  - <strong>Cloud (AWS):</strong> IoT Core, Lambda, Kinesis, Firehose, S3, Glue, Athena, MSK
  - <strong>Databases & Cache:</strong> MySQL, Amazon DynamoDB, Cassandra, MongoDB, Redis
  - <strong>Messaging & IoT:</strong> Apache Kafka, MQTT (VerneMQ), Protobuf
  - <strong>Security:</strong> OAuth 2.0, JWT, Mutual TLS (mTLS), AWS IAM
  - <strong>Testing & Observability:</strong> JUnit 5, Mockito, TDD, Prometheus, Grafana, CloudWatch`,

    metrics: `<span class="term-welcome">=== PRODUCTION SYSTEM METRICS ===</span>
  - <strong>Concurrent IoT Devices:</strong> 500,000+ via VerneMQ & AWS IoT Core
  - <strong>Command Delivery Reliability:</strong> 99.9% across 10,000+ connected vehicles
  - <strong>Mean Time To Resolution (MTTR):</strong> Reduced by 35% via Grafana/Prometheus
  - <strong>Unit Test Code Coverage:</strong> 85%+ maintained with JUnit 5 & Mockito
  - <strong>Data Processing Volume:</strong> Petabyte-scale vehicle telemetry on AWS Athena`,

    projects: `<span class="term-welcome">=== FEATURED PROJECTS & REPOSITORIES ===</span>
  1. <strong>Big Data Telemetry Analytics Pipeline</strong>
     [AWS Kinesis · Firehose · S3 · Glue · Athena · Grafana · Protobuf]
     Processes millions of vehicle events daily with sub-second queries.

  2. <strong>IoT Device Command & Security Framework</strong>
     [AWS IoT Shadows · mTLS · OAuth 2.0 · Spring Security · JUnit 5]
     High-reliability bidirectional vehicle command execution with auto-rollback.

  3. <strong>Audiobook Creator (PDF to Audio)</strong>
     [EdgeTTS · JavaScript · Supabase · Vercel]
     Live: <a href="https://gttx.vercel.app" target="_blank" style="color:#38bdf8; text-decoration:underline;">gttx.vercel.app</a> | Repo: <a href="https://github.com/GttxAnan/Gttx" target="_blank" style="color:#38bdf8; text-decoration:underline;">github.com/GttxAnan/Gttx</a>

  4. <strong>BruxGuard</strong>
     [JavaScript · IoT Telemetry · Bio-Sensor Tracking]
     Repo: <a href="https://github.com/GttxAnan/BruxGuard" target="_blank" style="color:#38bdf8; text-decoration:underline;">github.com/GttxAnan/BruxGuard</a>`,

    experience: `<span class="term-welcome">=== PROFESSIONAL EXPERIENCE ===</span>
  • <strong>Senior Engineer @ Tata Elxsi</strong> (March 2025 – Present)
    - Architected Protobuf decoding in Java/AWS Lambda for telemetry pipelines.
    - Reduced data query latency on AWS Athena with 100% data sync.
    - Implemented Prometheus & Grafana alerting, reducing MTTR by 35%.
    - Spearheaded a backend team of 5 in Agile/Scrum.

  • <strong>Engineer @ Tata Elxsi</strong> (Feb 2023 – March 2025)
    - Built Spring Boot REST APIs with OAuth 2.0/JWT security.
    - Engineered VerneMQ MQTT IoT ingestion for 500k+ concurrent connections.
    - Achieved 85%+ test coverage with JUnit 5 & Mockito.`,

    'curl -i /health': `HTTP/2 200 OK
date: ${new Date().toUTCString()}
content-type: application/json; charset=utf-8
server: spring-boot-embedded-tomcat/10.1
x-runtime-env: aws-ecs-fargate-ap-south-1

{
  "status": "UP",
  "components": {
    "db": { "status": "UP", "details": { "database": "MySQL/DynamoDB", "validationQuery": "isValid()" } },
    "kafka": { "status": "UP", "details": { "cluster": "aws-msk-prod", "lag": "0ms" } },
    "redis": { "status": "UP", "details": { "version": "7.2", "hit_rate": "98.4%" } },
    "diskSpace": { "status": "UP", "details": { "free": "1.2TB", "threshold": "50GB" } }
  }
}`,

    'curl -i health': `HTTP/2 200 OK\nStatus: UP\nAll services operational.`,

    contact: `<span class="term-welcome">=== CONTACT INFORMATION ===</span>
  - <strong>Name:</strong> Anandhu Anil
  - <strong>Email:</strong> <a href="mailto:Anandhuanilk21@gmail.com" style="color:#38bdf8;">Anandhuanilk21@gmail.com</a>
  - <strong>Phone:</strong> +91-8943960925
  - <strong>Location:</strong> Bengaluru, Karnataka, India
  - <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/anandhu-anil" target="_blank" style="color:#38bdf8;">linkedin.com/in/anandhu-anil</a>
  - <strong>GitHub:</strong> <a href="https://github.com/GttxAnan" target="_blank" style="color:#38bdf8;">github.com/GttxAnan</a>`,

    'sudo hire': `<span class="term-success">[ACCESS GRANTED]</span> Initiating automated hiring pipeline...
  ✓ Match found: Senior Java Backend Engineer (3.7+ YOE)
  ✓ High-Throughput & IoT Distributed Systems: Certified
  ✓ Spring Boot Microservices & AWS Cloud: Ready
  ✓ Contacting candidate: Anandhuanilk21@gmail.com
  🎉 Ready to schedule initial discussion!`,

    whoami: `guest@anandhu-portfolio: You are an esteemed engineering leader or recruiter looking for an exceptional backend developer.`
  };

  function executeCommand(cmdRaw) {
    const cmdClean = cmdRaw.trim().toLowerCase();
    
    // Create entry in history
    const entry = document.createElement('div');
    entry.className = 'term-entry';

    const inputLine = document.createElement('div');
    inputLine.className = 'term-line';
    inputLine.innerHTML = `<span class="term-prompt">anandhu@prod-cluster:~$</span> ${escapeHTML(cmdRaw)}`;
    entry.appendChild(inputLine);

    if (cmdClean === 'clear') {
      history.innerHTML = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'term-line output';

    if (cmdClean === '') {
      // Empty enter
    } else if (commands[cmdClean]) {
      outputLine.innerHTML = commands[cmdClean];
      entry.appendChild(outputLine);
    } else if (cmdClean.startsWith('echo ')) {
      outputLine.textContent = cmdRaw.substring(5);
      entry.appendChild(outputLine);
    } else {
      outputLine.innerHTML = `command not found: <span style="color:#ef4444;">${escapeHTML(cmdClean)}</span>. Type <span class="term-cmd">help</span> for a list of valid commands.`;
      entry.appendChild(outputLine);
    }

    history.appendChild(entry);
    screen.scrollTop = screen.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
      input.value = '';
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
      input.focus();
    });
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

/* ==========================================================================
   6. COPY TO CLIPBOARD & TOAST NOTIFICATIONS
   ========================================================================== */
function initCopyButtons() {
  const emailBtn = document.getElementById('copy-email-btn');
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('Anandhuanilk21@gmail.com').then(() => {
        showToast('Email copied to clipboard: Anandhuanilk21@gmail.com');
      }).catch(() => {
        showToast('Email: Anandhuanilk21@gmail.com');
      });
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

/* ==========================================================================
   7. SCROLL SPY FOR ACTIVE NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM SUBMISSION HANDLER
   ========================================================================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const subject = document.getElementById('form-subject').value;
  const message = document.getElementById('form-message').value;

  const mailtoUrl = `mailto:Anandhuanilk21@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Hi Anandhu,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  window.location.href = mailtoUrl;
  showToast('Opening default mail client...');
}
