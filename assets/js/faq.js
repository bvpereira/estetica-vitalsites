export function initFaq(root) {
  const items = [...root.querySelectorAll('.faq-item')];
  // Native details/summary provides keyboard and expanded-state semantics.
  // The name attribute groups details; this also supports browsers without grouping.
  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) items.forEach(other => { if (other !== item) other.open = false; });
    });
  });
}
