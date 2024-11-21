(() => {
    console.log("IIFE Fired");

    gsap.registerPlugin(ScrollToPlugin);

// 1_Smooth Scrollinhg
    const navLinks = document.querySelectorAll("#menu nav ul li a, #footer-nav nav ul li a");

    function scrollLink(e) {
        e.preventDefault(); 
        let selectedLink = e.currentTarget.hash;

        gsap.to(window, {duration: 1, scrollTo: {y: selectedLink, offsetY: 100}});
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", scrollLink);
    });

// 2_Back to top button
    const backToTopButton = document.querySelector("#back-to-top");

    window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.addEventListener("click", function() {
    gsap.to(window, {duration: 1, scrollTo: {y: 0}});
});

// 3_Hotspot for AR Model
    const hotspotData = {
        'hotspot-1': {
            title: 'Diamond Design',
            description: 'Elegance meets luxury with a stunning diamond design that enhances the earbuds premium quality.',
            image: 'images/icon-diamond.png' 
        },
        'hotspot-2': {
            title: 'Noise Cancellation',
            description: 'Advanced technology that blocks out ambient noise for an immersive listening experience.',
            image: 'images/icon-noise.png' 
        },
        'hotspot-3': {
            title: 'Deep Bass Function',
            description: 'Experience rich, resonant sound with enhanced bass that brings your music to life.',
            image: 'images/icon-bass.png' 
        },
        'hotspot-4': {
            title: 'Premium Quality',
            description: 'Crafted from high-quality materials for durability and sophisticated sound performance.',
            image: 'images/icon-premium.png' 
        }
    };

    const hotspots = document.querySelectorAll('.Hotspot');
    console.log(hotspots);

    function showInfo(e) {
        const slot = e.currentTarget.slot;
        const selected = document.querySelector(`button[slot="${slot}"] > div`);

        selected.innerHTML = '';

        if (hotspotData[slot]) { 
            const h2 = document.createElement('h2');
            h2.textContent = hotspotData[slot].title;

            const p = document.createElement('p');
            p.textContent = hotspotData[slot].description;

            const img = document.createElement('img');
            img.src = hotspotData[slot].image; 
            img.alt = hotspotData[slot].title; 
            img.style.display = 'block';

            selected.appendChild(h2);
            selected.appendChild(img);
            selected.appendChild(p);

            gsap.to(selected, 1, { autoAlpha: 1 });
        } else {
            console.error(`No data found for slot: ${slot}`);
        }
    }

    function hideInfo(e) {
        const selected = document.querySelector(`button[slot="${e.currentTarget.slot}"] > div`);
        selected.innerHTML = '';
        gsap.to(selected, 1, { autoAlpha: 0 });
    }

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseover', showInfo);
        hotspot.addEventListener('mouseout', hideInfo);
    });

// 4_Hamburger Menu
    const menu = document.querySelector("#menu");
    const hambuger = document.querySelector("#hamburger");
    const closeButton = document.querySelector("#close");
    const menuLinks = document.querySelectorAll("#menu ul a");

    function toggleMenu() {
        menu.classList.toggle("open");
    }

    hambuger.addEventListener("click", toggleMenu);
    closeButton.addEventListener("click", toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener("click", toggleMenu);
    })

// 5_Earbuds Color Change
    const earbuds = document.querySelector("#ear-buds");
    const buttons = document.querySelectorAll("#color-con button");

    function swapColor(e) {
        const selected = e.currentTarget.id;
        earbuds.src = `images/earc-${selected}.png`;
    }

    buttons.forEach(button => {
        button.addEventListener("click", swapColor);
    })

// 6_Video Scroll Animation
    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");

 canvas.width = 1920;
 canvas.height = 1080;
 
 const frameCount = 449;
 const images = []; 

for(let i = 0; i < frameCount; i++){
    const img = new Image();
    img.src = `scroll/SKY-Scroll_${(i + 1).toString().padStart(5, '0')}.webp`;
    images.push(img);
}

    const buds = {
        frame:0
    }

    gsap.to(buds, {
        frame: 448, 
        snap: "frame",
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            scrub: 1,
            markers: false,
            start: "top top",
            end:"300% end"
        },
        onUpdate: render
    })

    images[0].addEventListener("load", render)

    function render() {
        console.log(images[buds.frame]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0,0);
    }

// 7_Xray Slider
    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");

  function moveDivisor() {
    console.log("slider.value");
    divisor.style.width = `${slider.value}%`;
  }

  slider.addEventListener("input", moveDivisor);

// 8_Plyr video player
  const player = new Plyr('#ear-video');

  const playButton = document.getElementById('play-button');
  const pauseButton = document.getElementById('pause-button');
  const muteButton = document.getElementById('mute-button');
  const fullscreenButton = document.getElementById('fullscreen-button');

  if (playButton && pauseButton && muteButton && fullscreenButton) {
      playButton.addEventListener('click', () => {
          player.play();
          playButton.style.display = 'none'; 
          pauseButton.style.display = 'inline';
      });

      pauseButton.addEventListener('click', () => {
          player.pause();
          pauseButton.style.display = 'none';
          playButton.style.display = 'inline'; 
      });

      muteButton.addEventListener('click', () => {
          player.muted = !player.muted; 
          muteButton.textContent = player.muted ? 'Unmute' : 'Mute'; 
      });

      fullscreenButton.addEventListener('click', () => {
          player.fullscreen.toggle(); 
      });
  }


// 9_Scroll Trigger - Diamond View
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  gsap.from("#diamond360", {
      x: "100%",
      opacity: 0,
      duration: 1,
      scrollTrigger: {
          trigger: "#diamond360", 
          start: "top 80%",
          end: "top 30%", 
          scrub: 0.5, 
          markers: false, 
          toggleActions: "play none none none"
      }
  });

// 10_Earbuds Colors
function applyAnimation() {
    const isMobile = window.innerWidth < 768;  
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1200; 
    const isDesktop = window.innerWidth >= 1200 && window.innerWidth < 1400; 
    const isLargeScreen = window.innerWidth >= 1400; 
  
    if (isMobile) {
      gsap.utils.toArray(["#earbud-color"]).forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            duration: 1,
            margin: "0 auto",
            transform: "translateX(-100%)", 
          },
          {
            opacity: 1,
            duration: 1,
            transform: "translateX(0%)", 
            scrollTrigger: {
              trigger: element,
              start: "top 60%",
              end: "bottom 50%",
              scrub: 2,
              onLeave: () => {
                gsap.to(element, { transform: "translateX(0%)" });
              }
            },
          }
        );
      });
    }
    
    if (isTablet) {
      gsap.utils.toArray(["#earbud-color"]).forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            duration: 1,
            margin: "0 auto",
            transform: "translateX(-100%)", 
          },
          {
            opacity: 1.5,
            duration: 2,
            transform: "translateX(22%)", 
            scrollTrigger: {
              trigger: element,
              start: "top 60%",
              end: "bottom 50%",
              scrub: 2,
              onLeave: () => {
                gsap.to(element, { transform: "translateX(0%)" });
              }
            },
          }
        );
      });
    }
  
    if (isDesktop) {
      gsap.utils.toArray(["#earbud-color"]).forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            duration: 1,
            margin: "0 auto",
            transform: "translateX(-100%)", 
          },
          {
            opacity: 1.5,
            duration: 2,
            transform: "translateX(28%)", 
            scrollTrigger: {
              trigger: element,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 2,
              onLeave: () => {
                gsap.to(element, { transform: "translateX(0%)" });
              }
            },
          }
        );
      });
    }

    if (isLargeScreen) {
      gsap.utils.toArray(["#earbud-color"]).forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            duration: 1,
            margin: "0 auto",
            transform: "translateX(-100%)", 
          },
          {
            opacity: 1.5,
            duration: 2,
            transform: "translateX(15%)", 
            scrollTrigger: {
              trigger: element,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 2,
              onLeave: () => {
                gsap.to(element, { transform: "translateX(0%)"});
              }
            },
          }
        );
      });
    }
  }
  
  window.addEventListener("load", applyAnimation);
  window.addEventListener("resize", applyAnimation);


})();
