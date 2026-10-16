/**
 * OM PRAKASH RAHANGDALE — SOCIAL MEDIA STRATEGIST PORTFOLIO
 * High-performance, lightweight interactions & asset inspector.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteIntroSequence();
  initNavigation();
  initNavActiveIndicator();
  initPortfolioFilters();
  initModalLightbox();
  updateCategoryCounts();
  initStrategyInspector();
  initHeroAmbientSpotlight();
  initHeroCanvasParallax();
  initHeroCanvasCursor();
  initHeroInlineVideoObserver();
  initHeroScrollTransition();

  // The 12 Animation System Initializers (Refined, Touch-Safe & Editorial)
  initStatsCountUp();
  initWorkCardReveals();
  initScrollStorytelling();
  initStrategyProgressiveReveal();
  initVideoHoverInteractions();
  initMagneticPills();
  initMagneticButtons();
  initWorkCardGlare();
  initWorkCursorSpotlight();
  initHorizontalScroll();
  initSmoothParallax();
  initBlurSharpReveal();
  initSectionPageTransitions();
});

/* ==========================================================================
   PREMIUM EDITORIAL FIRST-ENTRY INTRO PACING (INTEGRATED HERO REVEAL)
   ========================================================================== */
function initSiteIntroSequence() {
  document.body.classList.remove('intro-active');

  const heroVideo = document.getElementById('heroInlineVideo');
  if (heroVideo) {
    // Seamlessly initiate muted inline playback as media canvas reveals at 1.0s
    setTimeout(() => {
      heroVideo.play().catch(() => {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});
      });
    }, 950);
  }
}

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
      badge: '01 — UNDERSTAND',
      title: 'Who are we creating for?',
      body: 'Before writing a script or opening editing software, clarify the viewer’s perspective. What problem are they trying to solve right now? What stresses or frustrates them? What speaks their natural language?',
      meta: 'PRACTICAL FOCUS: Empathy for the viewer’s current state and real everyday questions.'
    },
    {
      badge: '02 — DEFINE',
      title: 'What should this content achieve?',
      body: 'Define a single clear goal for each asset: earning broad discovery, teaching an actionable workflow, building community trust, or driving viewers to a link. Single-purpose content prevents mixed signals.',
      meta: 'PRACTICAL FOCUS: One clear outcome per post instead of trying to do everything at once.'
    },
    {
      badge: '03 — CREATE',
      title: 'What idea deserves attention?',
      body: 'Develop an idea that genuinely respects the viewer’s time—a practical shortcut, an honest breakdown of a common struggle, a behind-the-scenes look at real work, or a relatable situation that feels authentic.',
      meta: 'PRACTICAL FOCUS: Value-dense content that people want to save or share with a friend.'
    },
    {
      badge: '04 — ADAPT',
      title: 'How should the idea work on this platform?',
      body: 'Match the concept to the right platform canvas: 9:16 vertical video for fast visual rhythm and energy; multi-slide carousels for step-by-step frameworks; high-contrast thumbnails for YouTube tutorials.',
      meta: 'PRACTICAL FOCUS: Native format execution rather than identical cross-posting.'
    },
    {
      badge: '05 — PUBLISH',
      title: 'What format, caption and CTA fit?',
      body: 'Pair the finished asset with a scannable caption and one simple, low-friction next step: "Save this for Sunday prep", "Share with someone who needs this", or a direct question that invites meaningful discussion.',
      meta: 'PRACTICAL FOCUS: Low-friction action that feels natural, not pushy.'
    },
    {
      badge: '06 — LEARN',
      title: 'What does the audience response tell us?',
      body: 'Look at real audience signals: retention drop-off points, average watch time, save-to-reach ratio, and qualitative comments to understand what actually resonated with viewers.',
      meta: 'PRACTICAL FOCUS: Objective feedback from real viewers to learn what worked.'
    },
    {
      badge: '07 — ITERATE',
      title: 'What should change next?',
      body: 'Take what the audience and comments revealed and apply it directly to the next batch: tighten pacing where viewers dropped off, turn top comments into new videos, and double down on winning formats.',
      meta: 'PRACTICAL FOCUS: Continuous improvement grounded in real performance.'
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
   ANIMATION SYSTEM 02: STATS COUNT-UP ON ENTERING VIEWPORT (★★★☆☆)
   ========================================================================== */
function initStatsCountUp() {
  const statElements = document.querySelectorAll('.stat-counter');
  if (!statElements.length) return;

  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    const duration = 1200;
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

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.1 });

  statElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animateCounter(el);
    } else {
      observer.observe(el);
    }
  });
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
   HERO INTERACTIVE CONTENT CANVAS: PARALLAX DEPTH & CURSOR (TOUCH-SAFE)
   ========================================================================== */
function initHeroCanvasParallax() {
  const canvas = document.getElementById('heroMediaCanvas');
  if (!canvas) return;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const items = canvas.querySelectorAll('.canvas-item[data-parallax-depth]');
  if (!items.length) return;

  let mouseTargetX = 0;
  let mouseTargetY = 0;
  let currentX = 0;
  let currentY = 0;
  let isHovered = false;
  let animFrameId = null;

  function updateParallax() {
    // Smooth lerp interpolation to eliminate jitter
    const ease = 0.08;
    currentX += (mouseTargetX - currentX) * ease;
    currentY += (mouseTargetY - currentY) * ease;

    items.forEach(item => {
      const depth = parseFloat(item.getAttribute('data-parallax-depth')) || 0.05;
      const transX = (currentX * depth * 200).toFixed(2);
      const transY = (currentY * depth * 200).toFixed(2);
      item.style.transform = `translate3d(${transX}px, ${transY}px, 0)`;
    });

    // Continue loop while hovered or until settled
    if (isHovered || Math.abs(mouseTargetX - currentX) > 0.001 || Math.abs(mouseTargetY - currentY) > 0.001) {
      animFrameId = requestAnimationFrame(updateParallax);
    } else {
      animFrameId = null;
    }
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    // Normalized offset between -0.5 and 0.5 from center of canvas
    mouseTargetX = ((e.clientX - rect.left) / rect.width) - 0.5;
    mouseTargetY = ((e.clientY - rect.top) / rect.height) - 0.5;
    isHovered = true;

    if (!animFrameId) {
      animFrameId = requestAnimationFrame(updateParallax);
    }
  });

  canvas.addEventListener('mouseleave', () => {
    mouseTargetX = 0;
    mouseTargetY = 0;
    isHovered = false;
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(updateParallax);
    }
  });
}

function initHeroCanvasCursor() {
  const canvas = document.getElementById('heroMediaCanvas');
  const cursor = document.getElementById('canvasCursor');
  const cursorLabel = document.getElementById('canvasCursorLabel');
  if (!canvas || !cursor || !cursorLabel) return;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  let cursorX = 0;
  let cursorY = 0;
  let targetX = 0;
  let targetY = 0;
  let rafId = null;

  function renderCursor() {
    cursorX += (targetX - cursorX) * 0.2;
    cursorY += (targetY - cursorY) * 0.2;
    cursor.style.left = `${cursorX.toFixed(1)}px`;
    cursor.style.top = `${cursorY.toFixed(1)}px`;

    if (canvas.classList.contains('cursor-visible') || canvas.classList.contains('cursor-hover') || canvas.classList.contains('cursor-active')) {
      rafId = requestAnimationFrame(renderCursor);
    } else {
      rafId = null;
    }
  }

  canvas.addEventListener('mouseenter', (e) => {
    canvas.classList.add('cursor-visible');
    const rect = canvas.getBoundingClientRect();
    cursorX = e.clientX - rect.left;
    cursorY = e.clientY - rect.top;
    targetX = cursorX;
    targetY = cursorY;
    if (!rafId) {
      rafId = requestAnimationFrame(renderCursor);
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;

    // Check if hovering over element with custom cursor label
    const hoveredItem = e.target.closest('[data-cursor]');
    if (hoveredItem) {
      canvas.classList.add('cursor-hover');
      const label = hoveredItem.getAttribute('data-cursor');
      if (label) cursorLabel.textContent = label;
    } else {
      canvas.classList.remove('cursor-hover');
      cursorLabel.textContent = '';
    }

    if (!rafId) {
      rafId = requestAnimationFrame(renderCursor);
    }
  });

  canvas.addEventListener('mouseleave', () => {
    canvas.classList.remove('cursor-visible', 'cursor-hover', 'cursor-active');
  });
}

function initHeroInlineVideoObserver() {
  const video = document.getElementById('heroInlineVideo');
  if (!video) return;

  // Autoplay video when hero is intersecting, pause when out of view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.15 });

  observer.observe(video);
}

function initHeroScrollTransition() {
  const canvas = document.getElementById('heroMediaCanvas');
  const hero = document.getElementById('hero');
  if (!canvas || !hero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          const shift = Math.min(scrollY * 0.08, 36);
          canvas.style.transform = `translate3d(0, -${shift.toFixed(1)}px, 0)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   ANIMATION SYSTEM: MAGNETIC BUTTONS (CTAS) (★★★★☆)
   ========================================================================== */
function initMagneticButtons() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const buttons = document.querySelectorAll('.magnetic-btn, .btn, .btn-hero-reel, .cockpit-tab, .filter-tab');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const pullX = Math.max(-5, Math.min(5, relX * 0.16)).toFixed(1);
      const pullY = Math.max(-5, Math.min(5, relY * 0.16)).toFixed(1);
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
   ANIMATION SYSTEM: WORK CARD 3D TILT & GLARE EFFECT
   ========================================================================== */
function initWorkCardGlare() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const cards = document.querySelectorAll('.work-card.compact-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width;
      const normY = (e.clientY - rect.top) / rect.height;

      // Update glare position
      card.style.setProperty('--glare-x', `${(normX * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${(normY * 100).toFixed(1)}%`);

      // Subtle 3D tilt
      const tiltX = ((normY - 0.5) * -4).toFixed(2);
      const tiltY = ((normX - 0.5) * 4).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.removeProperty('--glare-x');
      card.style.removeProperty('--glare-y');
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


