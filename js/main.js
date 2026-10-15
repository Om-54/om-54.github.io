/**
 * OM PRAKASH RAHANGDALE — SOCIAL MEDIA STRATEGIST PORTFOLIO
 * High-performance, lightweight interactions & asset inspector.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initNavActiveIndicator();
  initPortfolioFilters();
  initModalLightbox();
  updateCategoryCounts();
  initStrategyInspector();
  initAARRRFunnel();
  initHeroCockpit();
  initHeroAmbientSpotlight();

  // The 12 Animation System Initializers (Refined, Touch-Safe & Editorial)
  initStatsCountUp();
  initWorkCardReveals();
  initScrollStorytelling();
  initStrategyProgressiveReveal();
  initVideoHoverInteractions();
  initMagneticPills();
  initMagneticButtons();
  initWorkCursorSpotlight();
  initHorizontalScroll();
  initSmoothParallax();
  initBlurSharpReveal();
  initSectionPageTransitions();
});

/* ==========================================================================
   NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], main > section[id]');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    if (window.updateNavIndicator) {
      window.updateNavIndicator();
    }
  }, { passive: true });

  // Mobile drawer controls
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  if (drawerCloseBtn && mobileDrawer) {
    drawerCloseBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // Close mobile drawer on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ==========================================================================
   PORTFOLIO FILTER TABS (SELECTED WORK)
   ========================================================================== */
function initPortfolioFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const workCards = document.querySelectorAll('.work-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      workCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

function updateCategoryCounts() {
  const workCards = document.querySelectorAll('.work-card');
  let counts = {
    all: workCards.length,
    reels: 0,
    social: 0,
    graphics: 0,
    campaigns: 0
  };

  workCards.forEach(card => {
    const cat = card.getAttribute('data-category');
    if (counts[cat] !== undefined) {
      counts[cat]++;
    }
  });

  const countAll = document.getElementById('count-all');
  const countReels = document.getElementById('count-reels');
  const countSocial = document.getElementById('count-social');
  const countGraphics = document.getElementById('count-graphics');
  const countCampaigns = document.getElementById('count-campaigns');

  if (countAll) countAll.textContent = counts.all;
  if (countReels) countReels.textContent = counts.reels;
  if (countSocial) countSocial.textContent = counts.social;
  if (countGraphics) countGraphics.textContent = counts.graphics;
  if (countCampaigns) countCampaigns.textContent = counts.campaigns;
}

/* ==========================================================================
   MODAL LIGHTBOX & VIDEO PREVIEW
   ========================================================================== */
function initModalLightbox() {
  const modal = document.getElementById('previewModal');
  if (!modal) return;

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      const assetDrawer = document.getElementById('assetDrawer');
      if (assetDrawer && assetDrawer.classList.contains('open')) {
        assetDrawer.classList.remove('open');
      }
      const mobileDrawer = document.getElementById('mobileDrawer');
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}

window.openAssetPreview = function(assetPath, title, description) {
  const modal = document.getElementById('previewModal');
  const modalMediaContainer = document.getElementById('modalMediaContainer');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalBadge = document.getElementById('modalBadge');
  const modalMetadata = document.getElementById('modalMetadata');
  const modalAssetPath = document.getElementById('modalAssetPath');

  if (!modal || !modalMediaContainer) return;

  modalMediaContainer.innerHTML = `<img src="${assetPath}" alt="${title}" id="modalImg" class="modal-img">`;
  modalBadge.textContent = 'CREDENTIAL & ASSET INSPECTION';
  modalTitle.textContent = title;
  modalDesc.textContent = description;
  modalAssetPath.textContent = assetPath;

  modalMetadata.innerHTML = `
    <div class="modal-meta-item">
      <span class="modal-meta-label">SOURCE LOCATION</span>
      <span class="modal-meta-val font-mono">${assetPath}</span>
    </div>
    <div class="modal-meta-item">
      <span class="modal-meta-label">VERIFICATION STATUS</span>
      <span class="modal-meta-val font-mono" style="color: #10b981;">✓ Verified Official Credential</span>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.openVideoModal = function(assetPath, title, platform, contribution, tools, aspect, driveId, localVideoPath) {
  const modal = document.getElementById('previewModal');
  const modalMediaContainer = document.getElementById('modalMediaContainer');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalBadge = document.getElementById('modalBadge');
  const modalMetadata = document.getElementById('modalMetadata');
  const modalAssetPath = document.getElementById('modalAssetPath');

  if (!modal || !modalMediaContainer) return;

  modalBadge.textContent = driveId ? 'LIVE DEMO VIDEO' : (localVideoPath ? 'BRAND VIDEO OUTRO (MP4)' : 'VIDEO ASSET PREVIEW');
  modalTitle.textContent = title;
  modalDesc.textContent = `Short-form video asset demonstrating hook architecture, rapid retention pacing, sound design, and platform-specific packaging.`;
  modalAssetPath.textContent = driveId ? `Google Drive Demo: ${driveId}` : (localVideoPath ? localVideoPath : assetPath);

  if (localVideoPath) {
    modalMediaContainer.innerHTML = `
      <div class="video-embed-container" style="display:flex; justify-content:center; align-items:center; background:#000; border-radius:8px; overflow:hidden;">
        <video src="${localVideoPath}" controls autoplay playsinline class="modal-video-player" style="max-height: 68vh; max-width: 100%; border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.8);"></video>
      </div>
    `;
    modalMetadata.innerHTML = `
      <div class="modal-meta-item">
        <span class="modal-meta-label">TARGET PLATFORM</span>
        <span class="modal-meta-val">${platform}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">FORMAT / ASPECT</span>
        <span class="modal-meta-val font-mono">${aspect} Vertical</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">MY CONTRIBUTION</span>
        <span class="modal-meta-val">${contribution}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">CREATIVE TOOLS</span>
        <span class="modal-meta-val">${tools}</span>
      </div>
      <div class="modal-meta-item full-meta-item">
        <a href="${localVideoPath}" download class="modal-drive-btn" style="background: rgba(250, 204, 21, 0.15); border-color: rgba(250, 204, 21, 0.4); color: #facc15;">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" style="width: 1rem; height: 1rem;"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          DOWNLOAD VIDEO OUTRO (MP4) ↓
        </a>
      </div>
    `;
  } else if (driveId) {
    const drivePreviewUrl = `https://drive.google.com/file/d/${driveId}/preview`;
    const driveViewUrl = `https://drive.google.com/file/d/${driveId}/view?usp=sharing`;
    modalMediaContainer.innerHTML = `
      <div class="video-embed-container">
        <iframe src="${drivePreviewUrl}" class="modal-video-iframe" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="${title}"></iframe>
      </div>
    `;
    modalMetadata.innerHTML = `
      <div class="modal-meta-item">
        <span class="modal-meta-label">TARGET PLATFORM</span>
        <span class="modal-meta-val">${platform}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">FORMAT / ASPECT</span>
        <span class="modal-meta-val font-mono">${aspect} Vertical</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">MY CONTRIBUTION</span>
        <span class="modal-meta-val">${contribution}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">CREATIVE TOOLS</span>
        <span class="modal-meta-val">${tools}</span>
      </div>
      <div class="modal-meta-item full-meta-item">
        <a href="${driveViewUrl}" target="_blank" rel="noopener noreferrer" class="modal-drive-btn">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" style="width: 1rem; height: 1rem;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          OPEN FULLSCREEN IN GOOGLE DRIVE ↗
        </a>
      </div>
    `;
  } else {
    modalMediaContainer.innerHTML = `<img src="${assetPath}" alt="${title}" id="modalImg" class="modal-img">`;
    modalMetadata.innerHTML = `
      <div class="modal-meta-item">
        <span class="modal-meta-label">TARGET PLATFORM</span>
        <span class="modal-meta-val">${platform}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">FORMAT / ASPECT</span>
        <span class="modal-meta-val font-mono">${aspect} Vertical</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">MY CONTRIBUTION</span>
        <span class="modal-meta-val">${contribution}</span>
      </div>
      <div class="modal-meta-item">
        <span class="modal-meta-label">CREATIVE TOOLS</span>
        <span class="modal-meta-val">${tools}</span>
      </div>
    `;
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const modal = document.getElementById('previewModal');
  const modalMediaContainer = document.getElementById('modalMediaContainer');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Stop any playing video or iframe immediately
    if (modalMediaContainer) {
      const vid = modalMediaContainer.querySelector('video');
      if (vid) {
        vid.pause();
        vid.src = '';
      }
      modalMediaContainer.innerHTML = '<img src="" alt="Modal Asset Preview" id="modalImg" class="modal-img">';
    }
  }
};


/* ==========================================================================
   CLIPBOARD UTILITY
   ========================================================================== */
window.copyToClipboard = function(text, buttonElement) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showCopiedFeedback(buttonElement);
    }).catch(() => {
      fallbackCopy(text, buttonElement);
    });
  } else {
    fallbackCopy(text, buttonElement);
  }
};

function fallbackCopy(text, buttonElement) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showCopiedFeedback(buttonElement);
  } catch (err) {
    console.error('Copy fallback failed', err);
  }
  document.body.removeChild(textArea);
}

function showCopiedFeedback(buttonElement) {
  if (!buttonElement) return;
  const originalText = buttonElement.textContent;
  buttonElement.textContent = 'COPIED!';
  buttonElement.style.color = '#fff';
  buttonElement.style.backgroundColor = '#10b981';
  buttonElement.style.borderColor = '#10b981';

  setTimeout(() => {
    buttonElement.textContent = originalText;
    buttonElement.style.color = '';
    buttonElement.style.backgroundColor = '';
    buttonElement.style.borderColor = '';
  }, 2200);
}

/* ==========================================================================
   TOUCHABLE STRATEGY FRAMEWORK INSPECTOR
   ========================================================================== */
function initStrategyInspector() {
  const steps = document.querySelectorAll('.framework-step');
  const badge = document.getElementById('inspectorBadge');
  const title = document.getElementById('inspectorTitle');
  const body = document.getElementById('inspectorBody');
  const meta = document.getElementById('inspectorMeta');

  if (!steps.length || !badge) return;

  const strategyData = [
    {
      badge: 'STEP 01 — AUDIENCE ARCHITECTURE',
      title: 'Deconstructing Viewer Psychology Before Touching the Timeline',
      body: 'Every high-performing post begins with deep empathy for the viewer’s state. For college students, that means targeting exam bottlenecks, all-nighter struggles, and skepticism toward corporate software hype.',
      meta: 'STRATEGIC GOAL: Map authentic student vernacular, fears, and high-friction daily tasks.'
    },
    {
      badge: 'STEP 02 — OBJECTIVE & ALGORITHMIC TARGET',
      title: 'Defining What Metric Signals "Success" for Each Asset',
      body: 'Clarify whether a post aims for top-of-funnel reach (shares/views), mid-funnel education (watch-time/saves), or product trial (link bio clicks). Single-focus content prevents diluted audience response.',
      meta: 'STRATEGIC GOAL: Align creative rhythm with Instagram / YouTube algorithmic recommendation signals.'
    },
    {
      badge: 'STEP 03 — CONTENT PILLAR GOVERNANCE',
      title: 'Balancing the Thematic Mix Across 5 Intentional Buckets',
      body: 'Organize daily production into Educate, Entertain, Demonstrate, Community, and Trend buckets. This guarantees thematic breadth so feeds never feel like repetitive advertisements.',
      meta: 'STRATEGIC GOAL: Sustain high weekly publishing volume without audience fatigue.'
    },
    {
      badge: 'STEP 04 — PLATFORM-NATIVE FORMAT SELECTION',
      title: 'Selecting the Canvas Dimensions for Maximum Dwell Time',
      body: 'Tailor asset anatomy to platform norms: 9:16 vertical video for fast hook velocity; 4:5 portrait swipe carousels for dense LinkedIn frameworks; 16:9 for YouTube search intent.',
      meta: 'STRATEGIC GOAL: Zero lazy cross-posting; format compliance boosts organic feed distribution.'
    },
    {
      badge: 'STEP 05 — 1.5-SECOND HOOK ENGINEERING',
      title: 'Stopping Thumb Momentum in the Opening 2 Seconds',
      body: 'The first 1.5s determines whether a viewer stays or scrolls. We test contrarian, curated listicle, and live experiment hooks that instantly disrupt cognitive feed momentum.',
      meta: 'STRATEGIC GOAL: Achieve 40%+ 3-second hook rate to trigger algorithmic push.'
    },
    {
      badge: 'STEP 06 — LOW-FRICTION CALL-TO-ACTION (CTA)',
      title: 'Guiding the Viewer Toward One Clear, Low-Friction Step',
      body: 'Match the CTA to the content type: "Save this for exams" drives save signals; "Comment your tool" triggers algorithmic comment ranking. Never ask for three things at once.',
      meta: 'STRATEGIC GOAL: Convert passive attention into measurable audience engagement.'
    },
    {
      badge: 'STEP 07 — RETENTION MEASUREMENT & SIGNAL AUDIT',
      title: 'Reading Retention Curves & Qualitative Viewer Feedback',
      body: 'Review second-by-second watch-time curves to identify where viewers dropped off. Review qualitative comments to discover what objections or questions were raised.',
      meta: 'STRATEGIC GOAL: Objective audience data replaces subjective guesswork.'
    },
    {
      badge: 'STEP 08 — RAPID SPRINT ITERATION',
      title: 'Compounding Creative Learnings Into the Next Production Sprint',
      body: 'Double down on winning hooks, spin off popular comment threads into standalone videos, and tighten visual pacing where drop-offs occurred in previous batches.',
      meta: 'STRATEGIC GOAL: Continuous creative improvement cycle across 120+ video iterations.'
    }
  ];

  steps.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      btn.classList.add('active');

      const data = strategyData[idx];
      if (data) {
        badge.textContent = data.badge;
        title.textContent = data.title;
        body.textContent = data.body;
        meta.textContent = data.meta;
      }
    });
  });
}

/* ==========================================================================
   INTERACTIVE AARRR FUNNEL INSPECTOR
   ========================================================================== */
function initAARRRFunnel() {
  const cards = document.querySelectorAll('.aarrr-card');
  if (!cards.length) return;

  const funnelDetails = {
    acquisition: {
      badge: 'STAGE 01 — ACQUISITION',
      title: 'Top-of-Funnel Professional Discovery',
      text: 'LinkedIn acquires users through organic SEO indexing of public profiles and job postings, as well as high-conversion email invite loops when existing members sync address books.'
    },
    activation: {
      badge: 'STAGE 02 — ACTIVATION (PROPOSED EXPERIMENT)',
      title: 'Goal-Based Adaptive Onboarding Flow',
      text: 'The primary bottleneck for early-career professionals is an empty feed. Proposed experiment guides users to pick their primary career goal on Day 1, instantly curating high-signal creators and campus alumni to reach the "Aha!" moment in under 3 minutes.'
    },
    retention: {
      badge: 'STAGE 03 — RETENTION',
      title: 'Forming Daily Professional Habits',
      text: 'Sustained by algorithmic relevance, industry newsletters, comment threads, and milestone notifications (work anniversaries, job switches) that prompt organic return visits.'
    },
    revenue: {
      badge: 'STAGE 04 — REVENUE',
      title: 'Multi-Tiered Monetization Architecture',
      text: 'Monetized through individual subscriptions (LinkedIn Premium Career/Business), enterprise B2B tools (Recruiter & Sales Navigator), and targeted Sponsored InMail/Feed campaigns.'
    },
    referral: {
      badge: 'STAGE 05 — REFERRAL',
      title: 'Organic Network Multiplier Loops',
      text: 'Referrals are embedded into the core UX: "People You May Know" graph algorithms, post mentions, and viral career achievement sharing (e.g. "I am thrilled to announce...") that draw new visitors.'
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const stage = card.getAttribute('data-stage');
      const info = funnelDetails[stage];
      if (info) {
        const titleEl = document.querySelector('.experiment-title');
        const textEl = document.querySelector('.experiment-text');
        if (titleEl && textEl && stage !== 'activation') {
          titleEl.textContent = info.title;
          textEl.textContent = info.text;
        } else if (titleEl && textEl && stage === 'activation') {
          titleEl.textContent = 'Goal-Driven Adaptive Onboarding Flow';
          textEl.textContent = 'Instead of dropping new users into a cold, generic timeline with zero context, the user selects their immediate objective on Day 1:';
        }
      }
    });
  });
}

/* ==========================================================================
   ANIMATION SYSTEM 02: STATS COUNT-UP ON ENTERING VIEWPORT (★★★☆☆)
   ========================================================================== */
function initStatsCountUp() {
  const statElements = document.querySelectorAll('.stat-counter');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        obs.unobserve(el);
        animateCounter(el);
      }
    });
  }, { threshold: 0.25 });

  statElements.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * target);

      el.textContent = current >= 1000 ? current.toLocaleString('en-US') : current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target >= 1000 ? target.toLocaleString('en-US') : target;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   ANIMATION SYSTEM 03: SELECTED WORK IMAGE REVEAL & HOVER MOVEMENT (★★★★☆)
   ========================================================================== */
function initWorkCardReveals() {
  const cards = document.querySelectorAll('.work-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(card => observer.observe(card));
}

/* ==========================================================================
   ANIMATION SYSTEM 04: CASE STUDIES SCROLL-TRIGGERED STORYTELLING (★★★★☆)
   ========================================================================== */
function initScrollStorytelling() {
  const storyBlocks = document.querySelectorAll('.case-block');
  if (!storyBlocks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('story-active');
      } else {
        entry.target.classList.remove('story-active');
      }
    });
  }, { threshold: 0.2, rootMargin: '-8% 0px -25% 0px' });

  storyBlocks.forEach(b => observer.observe(b));
}

/* ==========================================================================
   ANIMATION SYSTEM 05: STRATEGY PROGRESSIVE STEP REVEAL (★★★☆☆)
   ========================================================================== */
function initStrategyProgressiveReveal() {
  const flow = document.getElementById('frameworkFlow');
  if (!flow) return;

  const steps = flow.querySelectorAll('.framework-step');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      obs.unobserve(flow);
      steps.forEach((step, idx) => {
        setTimeout(() => {
          step.classList.add('step-revealed');
        }, idx * 85);
      });
    }
  }, { threshold: 0.25 });

  observer.observe(flow);
}

/* ==========================================================================
   ANIMATION SYSTEM 06: VIDEOS HOVER-TO-PREVIEW & PLAY INTERACTION (★★★★☆)
   ========================================================================== */
function initVideoHoverInteractions() {
  const videoCards = document.querySelectorAll('.work-card[data-category="reels"], .lemon-asset-card');
  videoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('video-hovering');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('video-hovering');
    });
  });
}

/* ==========================================================================
   ANIMATION SYSTEM 07: SKILLS & TOOLS MAGNETIC MICRO-INTERACTIONS (★★☆☆☆)
   ========================================================================== */
function initMagneticPills() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const pills = document.querySelectorAll('.toolkit-pill, .skill-tag, .platform-chip, .platform-tag');
  pills.forEach(pill => {
    pill.addEventListener('mousemove', (e) => {
      const rect = pill.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      // Gentle, restrained magnetic pull (max 3px) - ★★☆☆☆ intensity
      const pullX = (relX * 0.16).toFixed(1);
      const pullY = (relY * 0.16).toFixed(1);
      pill.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });

    pill.addEventListener('mouseleave', () => {
      pill.style.transform = 'translate(0px, 0px)';
      pill.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        pill.style.transition = '';
      }, 350);
    });
  });
}

/* ==========================================================================
   ANIMATION SYSTEM 08: NAVIGATION SMOOTH ACTIVE-SECTION INDICATOR (★★☆☆☆)
   ========================================================================== */
function initNavActiveIndicator() {
  const navList = document.querySelector('.desktop-nav .nav-list');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  if (!navList || !navLinks.length) return;

  let indicator = document.querySelector('.nav-active-indicator');
  if (!indicator) {
    indicator = document.createElement('li');
    indicator.className = 'nav-active-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    navList.appendChild(indicator);
  }

  function updateIndicator(targetLink) {
    if (!targetLink) {
      indicator.style.opacity = '0';
      return;
    }
    const listRect = navList.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();
    const offsetLeft = linkRect.left - listRect.left;
    const width = linkRect.width;

    indicator.style.opacity = '1';
    indicator.style.transform = `translateX(${offsetLeft}px)`;
    indicator.style.width = `${width}px`;
  }

  function syncActive() {
    const activeLink = document.querySelector('.desktop-nav .nav-link.active');
    updateIndicator(activeLink);
  }

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => updateIndicator(link));
    link.addEventListener('mouseleave', () => syncActive());
  });

  window.addEventListener('resize', syncActive);
  setTimeout(syncActive, 200);

  window.updateNavIndicator = syncActive;
}

/* ==========================================================================
   ANIMATION SYSTEM 09 & 10: LARGE TYPOGRAPHY REVEAL & PAGE TRANSITIONS (★★☆☆☆)
   ========================================================================== */
function initSectionPageTransitions() {
  const sections = document.querySelectorAll('section.section-padding, section.section-padding-sm');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   HERO COCKPIT INTERACTIVE SWITCHER
   ========================================================================== */
function initHeroCockpit() {
  const tabs = document.querySelectorAll('.cockpit-tab');
  const views = {
    metrics: document.getElementById('cockpitViewMetrics'),
    preview: document.getElementById('cockpitViewPreview'),
    formula: document.getElementById('cockpitViewFormula')
  };

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetKey = tab.getAttribute('data-cockpit-tab');
      Object.keys(views).forEach(key => {
        const view = views[key];
        if (!view) return;
        if (key === targetKey) {
          view.style.display = 'block';
          view.classList.add('active');
        } else {
          view.style.display = 'none';
          view.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   HERO AMBIENT STUDIO SPOTLIGHT TRACKER (TOUCH-SAFE & PERFORMANCE OPTIMIZED)
   ========================================================================== */
function initHeroAmbientSpotlight() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  let ticking = false;
  hero.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        hero.style.setProperty('--hero-mouse-x', `${x}px`);
        hero.style.setProperty('--hero-mouse-y', `${y}px`);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ==========================================================================
   ANIMATION SYSTEM: MAGNETIC BUTTONS (CTAS) (★★★★☆)
   ========================================================================== */
function initMagneticButtons() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const buttons = document.querySelectorAll('.btn, .btn-hero-reel, .cockpit-tab, .filter-tab');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const pullX = (relX * 0.16).toFixed(1);
      const pullY = (relY * 0.16).toFixed(1);
      btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        btn.style.transition = '';
      }, 350);
    });
  });
}

/* ==========================================================================
   ANIMATION SYSTEM: WORK CURSOR SPOTLIGHT TRACKER (★★★☆☆)
   ========================================================================== */
function initWorkCursorSpotlight() {
  const workSec = document.getElementById('work');
  const spotlight = document.getElementById('workCursorSpotlight');
  if (!workSec || !spotlight) return;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  let ticking = false;
  workSec.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = workSec.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        workSec.style.setProperty('--work-mouse-x', `${x}px`);
        workSec.style.setProperty('--work-mouse-y', `${y}px`);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ==========================================================================
   ANIMATION SYSTEM: HORIZONTAL SCROLL (DRAG & MOUSEWHEEL) (★★★★☆)
   ========================================================================== */
function initHorizontalScroll() {
  const flow = document.getElementById('frameworkFlow');
  if (!flow) return;

  let isDown = false;
  let startX, scrollLeft;

  flow.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - flow.offsetLeft;
    scrollLeft = flow.scrollLeft;
  });

  flow.addEventListener('mouseleave', () => {
    isDown = false;
  });

  flow.addEventListener('mouseup', () => {
    isDown = false;
  });

  flow.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - flow.offsetLeft;
    const walk = (x - startX) * 1.5;
    flow.scrollLeft = scrollLeft - walk;
  });

  flow.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      flow.scrollLeft += e.deltaY * 0.8;
    }
  }, { passive: true });
}

/* ==========================================================================
   ANIMATION SYSTEM: SMOOTH PARALLAX (SELECTED VISUALS) (★★★★☆)
   ========================================================================== */
function initSmoothParallax() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const parallaxTargets = document.querySelectorAll('.parallax-media, .work-media-container img');
  if (!parallaxTargets.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const vh = window.innerHeight;
        parallaxTargets.forEach(target => {
          const rect = target.getBoundingClientRect();
          if (rect.top < vh && rect.bottom > 0) {
            const offset = Math.round(((rect.top + rect.height / 2) - vh / 2) * 0.04);
            target.style.setProperty('--parallax-y', `${offset}px`);
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   ANIMATION SYSTEM: BLUR -> SHARP REVEAL (IMAGES & TEXT) (★★★★☆)
   ========================================================================== */
function initBlurSharpReveal() {
  const blurItems = document.querySelectorAll('.blur-reveal');
  if (!blurItems.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-sharp');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  blurItems.forEach(item => observer.observe(item));
}


