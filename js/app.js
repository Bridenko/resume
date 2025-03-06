function animation(animItems) {
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        animOnScroll();

        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('active');
                } else {
                    if (animItem.classList.contains('anim-no-hide')) {
                        animItem.classList.remove('active');
                    }
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            }
        }
    }
}

function showWaveHover() {
    if (window.innerWidth <= 1024) return;

    const btns = document.querySelectorAll(".wave-hover");

    let eventStatus = false;

    btns.forEach((el) => {
        el.addEventListener("mouseover", function (e) {
            if (!eventStatus) {
                eventStatus = true;
                waveEvent(e, el);
                eventStatus = false;
            }
        });
    });

    function waveEvent(e, el) {
        let size = Math.max(el.offsetWidth, el.offsetHeight),
            x = e.offsetX - size / 2,
            y = e.offsetY - size / 2,
            wave = el.querySelector(".wave");

        if (!wave) {
            wave = document.createElement("i");
            wave.classList.add("wave");
        }
        wave.style.width = size + "px";
        wave.style.height = size + "px";
        wave.style.top = y + "px";
        wave.style.left = x + "px";

        el.appendChild(wave);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const animItemsX = document.querySelectorAll('.anim-x');
    const animItemsY = document.querySelectorAll('.anim-y');
    // const animItems = document.querySelectorAll('.anim-item');
    // animation(animItems);
    animation(animItemsX);
    animation(animItemsY);
    showWaveHover();
});