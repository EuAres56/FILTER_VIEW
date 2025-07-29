function createCircle(id_filter) {
    const paint = document.getElementById('paint');
    const circle = document.createElement('div');

    const filters = document.getElementById('control-filters');
    const layer = document.createElement('div');
    layer.classList.add('layer');
    filters.appendChild(layer);

    paint.appendChild(circle);
    circle.classList.add('circle');
    circle.classList.add(`filter_${id_filter}`);

    console.log(id_filter);
    console.log(circle);

    if (id_filter == '1') {
        const input = document.createElement('input');
        input.type = 'text';

        const filters = document.querySelectorAll('.filter_1');
        const idSuffix = filters.length;

        circle.id = 'area_' + idSuffix;
        input.id = 'layer_' + idSuffix;

        layer.appendChild(input);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.classList.add('remove-button');
        layer.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            circle.remove();
            layer.remove();
        });

        input.addEventListener('input', (event) => {
            circle.innerText = event.target.value;
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
        removeBtn.textContent = 'Remover';
        removeBtn.classList.add('remove-button');
        layer.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            circle.remove();
            layer.remove();
        });

        input.addEventListener('input', (event) => {
            circle.innerText = event.target.value;
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
        removeBtn.textContent = 'Remover';
        removeBtn.classList.add('remove-button');
        layer.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            circle.remove();
            layer.remove();
        });

        input.addEventListener('input', (event) => {
            circle.innerText = event.target.value;
        });
    }

    let isDragging = false;
    let isTouchDragging = false;
    let touchHoldTimer = null;

    function moveCircle(x, y) {
        circle.style.left = (x - circle.clientWidth / 2) + 'px';
        circle.style.top = (y - circle.clientHeight / 2) + 'px';
    }

    function onMouseMove(event) {
        if (isDragging) {
            moveCircle(event.clientX, event.clientY);
        }
    }

    function startDragging(x, y) {
        isDragging = true;
        moveCircle(x, y);
        paint.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDragging);
    }

    function stopDragging() {
        isDragging = false;
        isTouchDragging = false;
        paint.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopDragging);
    }

    // Desktop
    circle.addEventListener('mousedown', (e) => {
        startDragging(e.clientX, e.clientY);
    });

    // Mobile
    circle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];

        // leve atraso para iniciar o drag
        touchHoldTimer = setTimeout(() => {
            isTouchDragging = true;
            startDragging(touch.clientX, touch.clientY);
        }, 500);
    });

    circle.addEventListener('touchmove', (e) => {
        if (isTouchDragging) {
            const touch = e.touches[0];
            moveCircle(touch.clientX, touch.clientY);
        }
    });

    circle.addEventListener('touchend', () => {
        clearTimeout(touchHoldTimer);
        stopDragging();
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-retrail');
    const sidebar = document.getElementById('sidebar');
    const symbol = document.getElementById('toggle-symbol');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        symbol.textContent = sidebar.classList.contains('collapsed') ? '<<' : '>>';
    });
});
