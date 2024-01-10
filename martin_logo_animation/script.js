var logoEl = document.querySelector('.logo-animation');
var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)');
var innerWidth = window.innerWidth;
var maxWidth = 840;
var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1;
let krumelurPathAnimation;

var logoTimeline = anime.timeline({
  begin: function() {
    // When the animation begins, make the SVG text visible
    document.querySelector('.letters').style.opacity = '1';
    document.querySelector('.letters').style.visibility = 'visible';
  },
  complete: function() {
    bounceTriangle();
    window.addEventListener('scroll', function handleScroll() {
      anime.remove('.krumelur');
      anime({
        targets: '.krumelur',
        scale: [0.5, 1, 0], // Scale down to zero
        easing: 'easeInOutQuad',
        duration: 500,
        complete: function() {
          explodeParticles();
        }
      });
      window.removeEventListener('scroll', handleScroll);
    });
  }
});

logoEl.style.transform = 'translateY(50px) scale('+logoScale+')';

function explodeParticles() {
  const krumelur = document.querySelector('.krumelur');
  const rect = krumelur.getBoundingClientRect();
  const numberOfParticles = 20;

  for (let i = 0; i < numberOfParticles; i++) {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);

    // Adjust the starting position based on the current scroll position
    const scrollY = window.scrollY || window.pageYOffset;

    // Position the particle at the krumelur's position including scroll offset
    particle.style.left = `${rect.left + window.scrollX}px`;
    particle.style.top = `${rect.top + scrollY}px`;
  }
  anime({
    targets: '.particle',
    translateX: function() {
      // Reduced distance
      return anime.random(-15, 15) + 'vw'; // Adjust distance as needed
    },
    translateY: function() {
      // Reduced distance
      return anime.random(-15, 15) + 'vh'; // Adjust distance as needed
    },
    scale: [1, 0], // Start from full size, shrink to zero
    easing: 'easeOutCirc',
    duration: 1000,
    complete: function(anim) {
      document.querySelectorAll('.particle').forEach(p => p.remove());
    }
  });
}

logoTimeline
  .add({
  targets: '.dot-i',
  translateY: { value: [-250,0], duration: 1250, elasticity: 400 },
  rotate: {
    value: [-90,0],
    duration: 500,
    easing: 'linear'
  },
  scale: [
    { value: [0.5, 1], duration: 1200, easing: 'easeOutQuart' },
  ],
  delay: 1200,
  offset: 0
}, '+=750')
  .add({
  targets: '.fill.in',
  strokeDashoffset: {
    value: [anime.setDashoffset, 0],
    duration: 600,
    delay: function(el, i, t) { return 700 + ( i * 100 ); },
    easing: 'easeOutQuart',
  },
  stroke: {
    value: ['#FFF', function(el) { return el.parentNode.getAttribute('stroke'); } ],
    duration: 500,
    delay: 500,
    easing: 'easeInQuad'
  },
  opacity: {
    value: 0,
    duration: 1,
    delay: function(el, i, t) { return 5500 + ( i * 80 ); },
  },
  offset: 0
}, 250)
  .add({
    targets: '.krumelur',
    opacity: {
      value: 1,
    },
    translateX: {
      duration: 250,
      delay: 500,
      value: 60,
      easing: 'easeOutQuint',
    },
    translateY: {
      duration: 250,
      delay: 1000, 
      value: 60,
      easing: 'easeOutBack'
      // easing: 'easeOutElastic' 
    },
    rotate: {
      value: 360,
      delay: 500,
      duration: 510,
      easing: 'easeOutQuint',
    },
    scale: {
      value: .5,
      delay: 1000,
      duration: 250,
    }
  }, '-=250')
  .add({
  targets: ['.icon-text path', '.icon-text polygon'],
  // translateY: [150, 0],
  opacity: { value: [0, 1], duration: 100, easing: 'linear' },
  delay: function(el, i, t) { return 3000 + ( i * 20 ); },
  offset: 0
}, -250)
.add({
  targets: '.letter-e',
  translateX: {
    duration: 100,
    value: -16,
    easing: 'easeOutQuint'
  },
}, '-=225');

function bounceTriangle() {
  anime({
    targets: '.triangle',
    opacity: [0,1],
    duration: 4000,
  })
  anime({
    targets: '.triangle',
    translateY: [0, -10, 0], // Move up and down
    duration: 800,
    easing: 'easeInOutQuad',
    loop: true,
    delay: 1000,
  });
}