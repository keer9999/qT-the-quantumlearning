/* global-ui.js — back button logic */

/* ── Auto-inject the button if the page doesn't have one ── */
(function () {
  /* Never show on the landing page */
  const isHome = window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname.endsWith('/');
  if (isHome) return;

  /* Inject if not already present */
  if (!document.querySelector('.global-back-btn')) {
    const btn = document.createElement('div');
    btn.className = 'global-back-btn';
    btn.title = 'Drag to move · Click to go back';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', 'Go back');
    document.body.appendChild(btn);
  }

  /* ── Init drag after DOM ready ── */
  initDraggableBackBtn();
})();

/* ── Make the back button draggable ── */
function initDraggableBackBtn() {
  const STORAGE_KEY = 'global-back-btn-pos';

  function getBtn() { return document.querySelector('.global-back-btn'); }

  /* Restore saved position */
  function restorePosition(btn) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        btn.style.left = saved.left;
        btn.style.bottom = saved.bottom;
        btn.style.right = 'auto';
        btn.style.top = 'auto';
      }
    } catch (_) { }
  }

  /* Clamp to viewport */
  function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

  function makeDraggable(btn) {
    let dragging = false;
    let startX, startY, origL, origT;

    /* ── Mouse ── */
    btn.addEventListener('mousedown', (e) => {
      dragging = false;
      startX = e.clientX;
      startY = e.clientY;
      const rect = btn.getBoundingClientRect();
      origL = rect.left;
      origT = rect.top;

      btn.style.left = origL + 'px';
      btn.style.top = origT + 'px';
      btn.style.bottom = 'auto';
      btn.style.right = 'auto';
      btn.style.transition = 'none';

      e.preventDefault();

      function onMouseMove(e) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!dragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
          dragging = true;
          btn.classList.add('dragging');
        }
        if (dragging) {
          const size = btn.offsetWidth;
          const newL = clamp(origL + dx, 0, window.innerWidth - size);
          const newT = clamp(origT + dy, 0, window.innerHeight - size);
          btn.style.left = newL + 'px';
          btn.style.top = newT + 'px';
        }
      }

      function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        btn.style.transition = '';
        btn.classList.remove('dragging');

        if (dragging) {
          /* Save position as left / bottom from viewport */
          const rect = btn.getBoundingClientRect();
          const posLeft = rect.left + 'px';
          const posBottom = (window.innerHeight - rect.bottom) + 'px';
          btn.style.bottom = posBottom;
          btn.style.top = 'auto';
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: posLeft, bottom: posBottom }));
          } catch (_) { }
        } else {
          /* It was a click — navigate back */
          goBackGlobal();
        }
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    /* ── Touch ── */
    btn.addEventListener('touchstart', (e) => {
      dragging = false;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      const rect = btn.getBoundingClientRect();
      origL = rect.left;
      origT = rect.top;
      btn.style.left = origL + 'px';
      btn.style.top = origT + 'px';
      btn.style.bottom = 'auto';
      btn.style.right = 'auto';
      btn.style.transition = 'none';
    }, { passive: true });

    btn.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (!dragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        dragging = true;
        btn.classList.add('dragging');
      }
      if (dragging) {
        e.preventDefault();
        const size = btn.offsetWidth;
        const newL = clamp(origL + dx, 0, window.innerWidth - size);
        const newT = clamp(origT + dy, 0, window.innerHeight - size);
        btn.style.left = newL + 'px';
        btn.style.top = newT + 'px';
      }
    }, { passive: false });

    btn.addEventListener('touchend', () => {
      btn.style.transition = '';
      btn.classList.remove('dragging');
      if (dragging) {
        const rect = btn.getBoundingClientRect();
        const posLeft = rect.left + 'px';
        const posBottom = (window.innerHeight - rect.bottom) + 'px';
        btn.style.bottom = posBottom;
        btn.style.top = 'auto';
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: posLeft, bottom: posBottom }));
        } catch (_) { }
      } else {
        goBackGlobal();
      }
    });
  }

  /* Wait for DOM then init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const btn = getBtn();
      if (btn) { restorePosition(btn); makeDraggable(btn); }
    });
  } else {
    const btn = getBtn();
    if (btn) { restorePosition(btn); makeDraggable(btn); }
  }
}

/* ── Navigation: one step back in history ── */
function goBackGlobal() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    const path = window.location.pathname;
    if (path.includes('/quantum-algorithms/')) {
      window.location.href = '../quantum-algorithms.html';
    } else if (path.includes('/noise-imperfections/') ||
      path.includes('/physics/') ||
      path.includes('/math/') ||
      path.includes('/uncertainty/') ||
      path.includes('/quantum-composer/')) {
      window.location.href = '../index.html';
    } else {
      window.location.href = 'qt-learning-platform.html';
    }
  }
}

/* ── Hide when fullscreen ── */
function handleFullscreen() {
  const btn = document.querySelector('.global-back-btn');
  if (!btn) return;
  if (document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement) {
    btn.classList.add('hidden');
  } else {
    btn.classList.remove('hidden');
  }
}

document.addEventListener('fullscreenchange', handleFullscreen);
document.addEventListener('webkitfullscreenchange', handleFullscreen);
document.addEventListener('msfullscreenchange', handleFullscreen);

/* ── Keyboard shortcut: Escape ── */
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'Escape') {
    e.preventDefault();
    goBackGlobal();
  }
});
