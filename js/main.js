(() => {
    console.log("IIFE Fired");

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
})();
