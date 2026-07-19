const productImages = document.querySelectorAll('.product-image');

productImages.forEach((image) => {
  image.addEventListener('pointermove', (event) => {
    const bounds = image.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    image.style.setProperty('--pointer-x', `${x}%`);
    image.style.setProperty('--pointer-y', `${y}%`);
  });

  image.addEventListener('pointerleave', () => {
    image.style.removeProperty('--pointer-x');
    image.style.removeProperty('--pointer-y');
  });
});

const stories = document.querySelectorAll('.story-product');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateScrollInteraction() {
  if (reducedMotion) return;

  const viewport = window.innerHeight;
  stories.forEach((story) => {
    const rect = story.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
    const art = story.querySelector('.story-art');
    const copy = story.querySelector('.story-copy');

    if (art) {
      const translate = (0.5 - progress) * 42;
      const scale = 0.9 + Math.sin(progress * Math.PI) * 0.1;
      art.style.transform = `translateY(${translate}px) scale(${scale})`;
      art.style.opacity = `${Math.min(1, progress * 1.8)}`;
    }
    if (copy) {
      copy.style.opacity = `${Math.min(1, Math.max(0.16, progress * 1.65))}`;
      copy.style.transform = `translateY(${(0.5 - progress) * 24}px)`;
    }
  });
}

/* transição de logo com scroll */
const logo = document.querySelector(".collections-logo img");
const colecoes = document.querySelector("#colecoes");

let logoAtual = "verde";

window.addEventListener("scroll", () => {
    const topo = colecoes.getBoundingClientRect().top;
    const novaLogo =
        topo <= window.innerHeight / 2
            ? "branca"
            : "verde";

    if(novaLogo !== logoAtual){
        logo.classList.add("fade");
        setTimeout(() => {
            if(novaLogo === "branca"){
                logo.src = "/Imagens/LOGO COPTA.png";
            }else{
                logo.src = "/Imagens/LOGO COPTA 2.png";
            }
            logo.classList.remove("fade");
            logoAtual = novaLogo;
        }, 180);
    }
});

window.addEventListener('scroll', updateScrollInteraction, { passive: true });
window.addEventListener('resize', updateScrollInteraction);
updateScrollInteraction();
