let scale = 1;
let translateX = 0;
let translateY = 0;

function createCircle(id_filter) {
    const paint = document.getElementById('paint-content');
    const circle = document.createElement('div');
    const textDiv = document.createElement('div');

    const filters = document.getElementById('control-filters');
    const layer = document.createElement('div');
    layer.classList.add('layer');

    filters.appendChild(layer);
    paint.appendChild(circle);
    circle.appendChild(textDiv);

    circle.classList.add('circle');
    circle.classList.add(`filter_${id_filter}`);
    textDiv.classList.add('circle-text');

    if (id_filter == '1') {
        const input = document.createElement('input');
        input.type = 'text';

        const filters = document.querySelectorAll('.filter_1');
        const idSuffix = filters.length;

        circle.id = 'area_' + idSuffix;
        input.id = 'layer_' + idSuffix;

        layer.appendChild(input);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'DEL';
        removeBtn.classList.add('remove-button');
        removeBtn.classList.add('btn_remove_blue');
        layer.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            circle.remove();
            layer.remove();
        });

        input.addEventListener('input', (event) => {
            updateCircleText(circle.id, event.target.value);
        });
    }

    if (id_filter == '2') {
        const input = document.createElement('input');
        input.type = 'text';

        const filters = document.querySelectorAll('.filter_2');
        const idSuffix = filters.length;

        circle.id = 'identidade_' + idSuffix;
        input.id = 'layer_' + idSuffix;

        layer.appendChild(input);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'DEL';
        removeBtn.classList.add('remove-button');
        removeBtn.classList.add('btn_remove_red');
        layer.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            circle.remove();
            layer.remove();
        });

        input.addEventListener('input', (event) => {
            updateCircleText(circle.id, event.target.value);
        });
    }
    if (id_filter == '3') {
        const input = document.createElement('input');
        input.type = 'text';

        const filters = document.querySelectorAll('.filter_3');
        const idSuffix = filters.length;

        circle.id = 'habilidade_' + idSuffix;
        input.id = 'layer_' + idSuffix;

        layer.appendChild(input);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'DEL';
        removeBtn.classList.add('remove-button');
        removeBtn.classList.add('btn_remove_yellow');
        layer.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            circle.remove();
            layer.remove();
        });

        input.addEventListener('input', (event) => {
            updateCircleText(circle.id, event.target.value);
        });
    }
    if (id_filter == '4') {
        const input = document.createElement('input');
        input.type = 'text';

        const filters = document.querySelectorAll('.filter_3');
        const idSuffix = filters.length;

        circle.id = 'habilidade_' + idSuffix;
        input.id = 'layer_' + idSuffix;

        layer.appendChild(input);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'DEL';
        removeBtn.classList.add('remove-button');
        removeBtn.classList.add('btn_remove_green');
        layer.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            circle.remove();
            layer.remove();
        });

        input.addEventListener('input', (event) => {
            updateCircleText(circle.id, event.target.value);
        });
    }

    const col = getInvertedCSSVariable('--color-background', paint);
    circle.style.setProperty('--color-text', col);


    // Posição inicial aleatória
    let posX = 100 + Math.random() * 200;
    let posY = 100 + Math.random() * 200;

    // Salvar posição nos atributos do elemento
    circle.dataset.x = posX;
    circle.dataset.y = posY;

    // Aplicar transform inicial
    applyTransform(circle);

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    function applyTransform(el) {
        el.style.transform = `translate(${el.dataset.x}px, ${el.dataset.y}px)`;
    }

    function onMouseDown(e) {
        isDragging = true;
        const rect = circle.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
        if (!isDragging) return;
        const paintRect = paint.getBoundingClientRect();
        const x = (e.clientX - offsetX - paintRect.left) / scale;
        const y = (e.clientY - offsetY - paintRect.top) / scale;
        circle.dataset.x = x;
        circle.dataset.y = y;
        applyTransform(circle);
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Touch
    function onTouchStart(e) {
        const touch = e.touches[0];
        const rect = circle.getBoundingClientRect();
        offsetX = touch.clientX - rect.left - (rect.width / 2);
        offsetY = touch.clientY - rect.top - (rect.height / 2);
        isDragging = true;
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    }

    function onTouchMove(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        const paintRect = paint.getBoundingClientRect();
        const x = (touch.clientX - offsetX - paintRect.left) / scale;
        const y = (touch.clientY - offsetY - paintRect.top) / scale;
        circle.dataset.x = x;
        circle.dataset.y = y;
        applyTransform(circle);
        e.preventDefault();
    }

    function onTouchEnd() {
        isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }

    circle.addEventListener('mousedown', onMouseDown);
    circle.addEventListener('touchstart', onTouchStart);
}

let isDraggingBackground = false;
let dragStartX = 0;
let dragStartY = 0;
function updateTransform() {
    const paintContent = document.getElementById('paint-content');
    paintContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}
const base = document.getElementById('paint');

base.addEventListener('mousedown', (e) => {
    if (e.target.id === 'paint' || e.target.id === 'paint-content') {
        isDraggingBackground = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
    }
});

window.addEventListener('mousemove', (e) => {
    if (isDraggingBackground) {
        const dx = (e.clientX - dragStartX);
        const dy = (e.clientY - dragStartY);

        translateX += dx;
        translateY += dy;

        dragStartX = e.clientX;
        dragStartY = e.clientY;

        updateTransform();
    }
});

window.addEventListener('mouseup', () => {
    isDraggingBackground = false;
});
base.addEventListener('wheel', (e) => {
    e.preventDefault();

    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    const rect = base.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const x = (mouseX - translateX) / scale;
    const y = (mouseY - translateY) / scale;

    scale *= delta;

    translateX = mouseX - x * scale;
    translateY = mouseY - y * scale;

    updateTransform();
}, { passive: false });

let lastTouchDistance = null;
let isPanningMobile = false;
let lastTouchX = 0;
let lastTouchY = 0;

paint.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        const target = e.target;
        if (!target.classList.contains('circle') && !target.closest('.circle')) {
            isPanningMobile = true;
            lastTouchX = e.touches[0].clientX;
            lastTouchY = e.touches[0].clientY;
        }
    }
});

paint.addEventListener('touchmove', (e) => {
    if (isPanningMobile && e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - lastTouchX;
        const dy = touch.clientY - lastTouchY;
        lastTouchX = touch.clientX;
        lastTouchY = touch.clientY;

        translateX += dx;
        translateY += dy;
        updateTransform();
    }
}, { passive: false });

paint.addEventListener('touchend', (e) => {
    if (e.touches.length === 0) {
        isPanningMobile = false;
    }
});

base.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const [touch1, touch2] = e.touches;

        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (lastTouchDistance !== null) {
            const delta = distance / lastTouchDistance;
            const rect = base.getBoundingClientRect();

            const midX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
            const midY = (touch1.clientY + touch2.clientY) / 2 - rect.top;

            const x = (midX - translateX) / scale;
            const y = (midY - translateY) / scale;

            scale *= delta;

            translateX = midX - x * scale;
            translateY = midY - y * scale;

            updateTransform();
        }

        lastTouchDistance = distance;
    }
}, { passive: false });

base.addEventListener('touchend', () => {
    lastTouchDistance = null;
});


function getInvertedCSSVariable(variableName, element) {
    const cssValue = getComputedStyle(element).getPropertyValue(variableName).trim();

    let r, g, b;

    if (cssValue.startsWith("#")) {
        const hex = cssValue.slice(1);
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        } else {
            throw new Error("Hex inválido: " + cssValue);
        }
    } else if (cssValue.startsWith("rgb")) {
        const rgbMatch = cssValue.match(/\d+/g);
        if (rgbMatch) {
            [r, g, b] = rgbMatch.map(Number);
        }
    } else {
        throw new Error("Formato de cor não suportado: " + cssValue);
    }

    const ri = 255 - r;
    const gi = 255 - g;
    const bi = 255 - b;

    const toHex = (value) => value.toString(16).padStart(2, "0");

    return `#${toHex(ri)}${toHex(gi)}${toHex(bi)}`;
}


document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-retrail');
    const sidebar = document.getElementById('sidebar');
    const symbol = document.getElementById('toggle-symbol');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        symbol.textContent = sidebar.classList.contains('collapsed') ? '◄' : '►';
    });

    const id_color = document.getElementById('background');
    id_color.addEventListener('input', (event) => {
        const paint = document.getElementById('paint');
        const circle = document.querySelectorAll('.circle');
        paint.style.setProperty('--color-background', id_color.value);

        circle.forEach(element => {
            const col = getInvertedCSSVariable('--color-background', paint);
            element.style.setProperty('--color-text', col);
        });
    });
});

function updateCircleText(circleId, text) {
    const circle = document.getElementById(circleId);
    if (!circle) return;

    const textDiv = circle.querySelector('.circle-text');
    textDiv.textContent = text;

    let fontSize = 32;
    const minFontSize = 6;

    const maxWidth = textDiv.clientWidth;
    const maxHeight = textDiv.clientHeight;

    textDiv.style.fontSize = fontSize + 'px';

    while (fontSize > minFontSize) {
        const { scrollWidth, scrollHeight } = textDiv;

        if (scrollWidth <= maxWidth && scrollHeight <= maxHeight) {
            break;
        }

        fontSize--;
        textDiv.style.fontSize = fontSize + 'px';
    }
}



// --- Código para gerar o PDF ---
document.getElementById('export-pdf').addEventListener('click', function () {
    const input = document.getElementById('paint');

    html2canvas(input, {
        scale: 2,
        useCORS: true,
        foreignObjectRendering: true // Adicione esta linha
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'px',
            format: [imgWidth, imgHeight]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("FilterView.pdf");
    });
});
