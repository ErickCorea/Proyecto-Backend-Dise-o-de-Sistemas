(() => {
    'use strict';

    const $ = (id) => document.getElementById(id);
    const form = $('matriculaForm');
    let submitted = false;

    /* ---------- Datos ---------- */
    const MUNICIPIOS = {
        'Managua': 'Managua|Ciudad Sandino|El Crucero|Mateare|San Francisco Libre|San Rafael del Sur|Ticuantepe|Tipitapa|Villa El Carmen',
        'León': 'León|Achuapa|El Jicaral|El Sauce|La Paz Centro|Larreynaga|Nagarote|Quezalguaque|Santa Rosa del Peñón|Telica',
        'Granada': 'Granada|Diriá|Diriomo|Nandaime',
        'Masaya': 'Masaya|Catarina|La Concepción|Masatepe|Nandasmo|Nindirí|Niquinohomo|San Juan de Oriente|Tisma',
        'Carazo': 'Jinotepe|Diriamba|Dolores|El Rosario|La Conquista|La Paz de Carazo|San Marcos|Santa Teresa',
        'Chinandega': 'Chinandega|Chichigalpa|Cinco Pinos|Corinto|El Realejo|El Viejo|Posoltega|Puerto Morazán|San Francisco del Norte|San Pedro del Norte|Santo Tomás del Norte|Somotillo|Villanueva',
        'Rivas': 'Rivas|Altagracia|Belén|Buenos Aires|Cárdenas|Moyogalpa|Potosí|San Jorge|San Juan del Sur|Tola',
        'Madriz': 'Somoto|Las Sabanas|Palacagüina|San José de Cusmapa|San Juan de Río Coco|San Lucas|Telpaneca|Totogalpa|Yalagüina',
        'Estelí': 'Estelí|Condega|La Trinidad|Pueblo Nuevo|San Juan de Limay|San Nicolás',
        'Nueva Segovia': 'Ocotal|Ciudad Antigua|Dipilto|El Jícaro|Jalapa|Macuelizo|Mozonte|Murra|Quilalí|San Fernando|Santa María|Wiwilí de Nueva Segovia',
        'Matagalpa': 'Matagalpa|Ciudad Darío|Esquipulas|La Dalia|Matiguás|Muy Muy|Rancho Grande|Río Blanco|San Dionisio|San Isidro|San Ramón|Sébaco|Terrabona',
        'Jinotega': 'Jinotega|El Cuá|La Concordia|San José de Bocay|San Rafael del Norte|San Sebastián de Yalí|Santa María de Pantasma|Wiwilí de Jinotega',
        'Boaco': 'Boaco|Camoapa|San José de los Remates|San Lorenzo|Santa Lucía|Teustepe',
        'Chontales': 'Juigalpa|Acoyapa|Comalapa|Cuapa|El Coral|La Libertad|San Pedro de Lóvago|Santo Domingo|Santo Tomás|Villa Sandino',
        'Río San Juan': 'San Carlos|El Almendro|El Castillo|Morrito|San Juan de Nicaragua|San Miguelito',
        'RAAN': 'Puerto Cabezas|Bonanza|Mulukukú|Prinzapolka|Rosita|Siuna|Waslala|Waspam',
        'RAAS': 'Bluefields|Corn Island|Desembocadura del Río Grande|El Ayote|El Rama|El Tortuguero|Kukra Hill|La Cruz de Río Grande|Laguna de Perlas|Muelle de los Bueyes|Nueva Guinea|Paiwas'
    };

    const NIVELES = {
        'Educación Inicial': { modalidad: 'Preescolar-formal', grados: 'Primer Nivel|Segundo Nivel|Tercer Nivel' },
        'Educación Primaria': { modalidad: 'Primaria', grados: 'Primer grado|Segundo grado|Tercer grado|Cuarto grado|Quinto grado|Sexto grado' },
        'Educación Secundaria': { modalidad: 'Secundaria', grados: 'Séptimo grado/Primer año|Octavo grado/Segundo año|Noveno grado/Tercer año|Décimo grado/Cuarto año|Undécimo grado/Quinto año' }
    };

    /* ---------- Utilidades ---------- */
    const fillSelect = (select, items, placeholder, keep) => {
        const prev = keep ? select.value : '';
        select.innerHTML = '';
        select.add(new Option(placeholder, ''));
        items.forEach((t) => select.add(new Option(t, t)));
        if (items.includes(prev)) select.value = prev;
    };

    const todayISO = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

    const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;
    const CEDULA_RE = /^\d{3}-\d{6}-\d{4}[A-Z]$/;

    const age = (iso) => {
        const b = new Date(iso + 'T00:00:00'), n = new Date();
        let m = (n.getFullYear() - b.getFullYear()) * 12 + n.getMonth() - b.getMonth();
        if (n.getDate() < b.getDate()) m--;
        return m; // meses
    };

    /* ---------- Reglas de validación ---------- */
    const nameRule = (v) => (v.length < 2 || !NAME_RE.test(v)) ? 'Use solo letras (mínimo 2).' : '';
    const phoneRule = (v) => /^\d{8}$/.test(v) ? '' : 'Ingrese 8 dígitos, solo números.';
    const cedulaRule = (v) => CEDULA_RE.test(v) ? '' : 'Formato válido: 001-234567-8910A';
    const rangeRule = (min, max, unit) => (v) => {
        const n = Number(v);
        return (isNaN(n) || n < min || n > max) ? `Ingrese un valor entre ${min} y ${max} ${unit}.` : '';
    };

    const rules = {
        nombre: nameRule, segundoNombre: nameRule, apellido1: nameRule, apellido2: nameRule,
        telefono: phoneRule,
        direccion: (v) => v.length < 10 ? 'Escriba una dirección más detallada (mínimo 10 caracteres).' : '',
        nacionalidad: nameRule,
        paisNacimiento: nameRule,
        peso: rangeRule(5, 200, 'kg'),
        talla: rangeRule(40, 220, 'cm'),
        fechaNacimiento: (v) => {
            if (v > todayISO()) return 'La fecha de nacimiento no puede ser futura.';
            if (age(v) < 24) return 'El estudiante debe tener al menos 2 años.';
            return age(v) > 12 * 100 ? 'Revise la fecha de nacimiento.' : '';
        },
        fechaMatricula: (v) => {
            const nac = $('fechaNacimiento').value;
            return (nac && v < nac) ? 'No puede ser anterior a la fecha de nacimiento.' : '';
        }
    };

    /* ---------- Mostrar errores ---------- */
    const fieldOf = (el) => el.closest('.field');

    const setError = (el, msg) => {
        const f = fieldOf(el);
        if (!f) return;
        f.classList.toggle('invalid', !!msg);
        el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        const out = f.querySelector('.error');
        if (out) out.textContent = msg;
    };

    document.querySelectorAll('.field').forEach((f) => {
        const e = document.createElement('small');
        e.className = 'error';
        e.setAttribute('aria-live', 'polite');
        f.appendChild(e);
    });

    /* ---------- Validación de campos ---------- */
    const checkRadio = (name) => {
        const radios = form.querySelectorAll(`input[name="${name}"]`);
        const ok = [...radios].some((r) => r.checked);
        setError(radios[0], ok ? '' : 'Seleccione una opción.');
        return ok;
    };

    const check = (el) => {
        if (el.type === 'radio') return checkRadio(el.name);
        if (el.dataset.group) return validateGuardians();
        const v = el.value.trim();
        let msg = '';
        if (el.required && !v) msg = el.tagName === 'SELECT' ? 'Seleccione una opción.' : 'Este campo es obligatorio.';
        else if (v && rules[el.id]) msg = rules[el.id](v);
        setError(el, msg);
        return !msg;
    };

    /* Madre / Padre / Tutor: si se llena un dato, se exigen los tres; al menos un grupo completo */
    const GROUPS = ['Madre', 'Padre', 'Tutor'];
    function validateGuardians() {
        let anyComplete = false;
        GROUPS.forEach((g) => {
            const els = [...form.querySelectorAll(`[data-group="${g}"]`)];
            const touched = els.some((e) => e.value.trim());
            let groupOk = touched;
            els.forEach((el) => {
                const v = el.value.trim();
                let msg = '';
                if (touched && !v) msg = `Complete este dato ${{ Madre: 'de la madre', Padre: 'del padre', Tutor: 'del tutor' }[g]}.`;
                else if (v) msg = el.id.startsWith('nombre') ? nameRule(v) : el.hasAttribute('data-cedula') ? cedulaRule(v) : phoneRule(v);
                setError(el, msg);
                if (msg) groupOk = false;
            });
            if (groupOk) anyComplete = true;
        });
        $('error-message').hidden = !(submitted && !anyComplete);
        return anyComplete;
    }

    /* ---------- Máscaras de escritura ---------- */
    const maskCedula = (raw) => {
        let digits = '', letter = '';
        for (const ch of raw.toUpperCase().replace(/[^0-9A-Z]/g, '')) {
            if (digits.length < 13) { if (/\d/.test(ch)) digits += ch; }
            else if (!letter && /[A-Z]/.test(ch)) letter = ch;
        }
        let out = digits.slice(0, 3);
        if (digits.length > 3) out += '-' + digits.slice(3, 9);
        if (digits.length > 9) out += '-' + digits.slice(9, 13);
        return out + letter;
    };

    form.addEventListener('input', (e) => {
        const el = e.target;
        $('successMsg').hidden = true;
        if (el.type === 'tel') el.value = el.value.replace(/\D/g, '').slice(0, 8);
        if (el.hasAttribute('data-cedula')) el.value = maskCedula(el.value);
        if (fieldOf(el)?.classList.contains('invalid') || (el.dataset.group && submitted)) check(el);
        updateProgress();
    });

    form.addEventListener('change', (e) => {
        if (e.target.type !== 'text' && e.target.type !== 'tel') check(e.target);
        updateProgress();
    });

    form.addEventListener('focusout', (e) => {
        const el = e.target;
        if (!el.matches('input, select, textarea') || el.type === 'radio' || el.readOnly) return;
        if (el.dataset.group && !submitted && !GROUPS.some((g) => [...form.querySelectorAll(`[data-group="${g}"]`)].some((x) => x.value.trim()))) return;
        check(el);
    });

    /* ---------- Departamento / Municipio ---------- */
    const dep = $('departamento'), mun = $('municipio'), depC = $('departamentoCentro');
    const deps = Object.keys(MUNICIPIOS);
    fillSelect(dep, deps, 'Seleccione un departamento');
    fillSelect(depC, deps, 'Seleccione un departamento');
    let depCTouched = false;

    dep.addEventListener('change', () => {
        if (dep.value) {
            fillSelect(mun, MUNICIPIOS[dep.value].split('|'), 'Seleccione un municipio');
            mun.disabled = false;
        } else {
            fillSelect(mun, [], 'Primero seleccione un departamento');
            mun.disabled = true;
        }
        setError(mun, '');
        if (!depCTouched) { depC.value = dep.value; setError(depC, ''); }
    });
    depC.addEventListener('change', () => { depCTouched = true; });

    /* ---------- Autocompletar respuestas repetidas ---------- */
    const nac = $('nacionalidad'), pais = $('paisNacimiento');
    nac.addEventListener('blur', () => {
        if (!pais.value.trim() && /nicaragu/i.test(nac.value)) { pais.value = 'Nicaragua'; setError(pais, ''); updateProgress(); }
    });

    const terr = $('territorioIndigena'), habita = $('habitaIndigena');
    let habitaTouched = false;
    habita.addEventListener('input', () => { habitaTouched = true; });
    terr.addEventListener('input', () => { if (!habitaTouched) habita.value = terr.value; });

    /* ---------- Edad ---------- */
    const fn = $('fechaNacimiento'), fm = $('fechaMatricula');
    fn.max = todayISO();
    fm.value = todayISO();
    fn.addEventListener('change', () => {
        const hint = $('edadHint');
        if (!fn.value || fn.value > todayISO()) { hint.textContent = ''; return; }
        const m = age(fn.value);
        hint.textContent = m >= 0 ? `Edad: ${Math.floor(m / 12)} años y ${m % 12} meses` : '';
        if (fm.value) check(fm);
    });

    /* ---------- Nivel educativo ⇄ Modalidad ⇄ Grado ---------- */
    const nivel = $('nivelEducativo'), modal = $('modalidad'), grado = $('grado');

    const updateGrados = () => {
        const n = NIVELES[nivel.value];
        if (n) { fillSelect(grado, n.grados.split('|'), 'Seleccione un grado', true); grado.disabled = false; }
        else { fillSelect(grado, [], 'Primero seleccione el nivel educativo'); grado.disabled = true; }
        setError(grado, '');
    };

    nivel.addEventListener('change', () => {
        modal.value = NIVELES[nivel.value] ? NIVELES[nivel.value].modalidad : '';
        setError(modal, '');
        updateGrados();
    });

    modal.addEventListener('change', () => {
        nivel.value = Object.keys(NIVELES).find((k) => NIVELES[k].modalidad === modal.value) || '';
        setError(nivel, '');
        updateGrados();
    });

    /* ---------- Barra de avance ---------- */
    function updateProgress() {
        const names = new Set(), done = new Set();
        form.querySelectorAll('[required]').forEach((el) => {
            const key = el.name;
            names.add(key);
            const ok = el.type === 'radio' ? form.querySelector(`input[name="${key}"]:checked`) : el.value.trim();
            if (ok) done.add(key);
        });
        const guardian = GROUPS.some((g) => [...form.querySelectorAll(`[data-group="${g}"]`)].every((e) => e.value.trim()));
        const total = names.size + 1, count = done.size + (guardian ? 1 : 0);
        const pct = Math.round((count / total) * 100);
        $('progressFill').style.width = pct + '%';
        $('progressText').textContent = pct + '%';
    }
/* ---------- Envío conectado al Backend NestJS ---------- */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitted = true;

        const seen = new Set();
        let valid = true;
        [...form.elements].forEach((el) => {
            if (!el.name || el.readOnly || el.dataset.group || el.type === 'submit') return;
            if (el.type === 'radio') {
                if (seen.has(el.name)) return;
                seen.add(el.name);
            } else if (!el.required && !rules[el.id]) return;
            if (!check(el)) valid = false;
        });
        if (!validateGuardians()) valid = false;

        if (!valid) {
            const bad = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
            const target = !$('error-message').hidden ? $('error-message') : bad;
            target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (bad) bad.focus({ preventScroll: true });
            return;
        }

        const data = {};
        [...form.elements].forEach((el) => {
            if (!el.name || el.type === 'submit') return;
            if (el.type === 'radio') { if (el.checked) data[el.name] = el.value; }
            else data[el.name] = el.value.trim();
        });

        // Convertir peso y talla a números y anexar datos de sesión y flujograma
        data.peso = parseFloat(data.peso);
        data.talla = parseFloat(data.talla);
        data.tipoMatricula = localStorage.getItem('tipoMatricula') || 'Nuevo ingreso';
        data.aceptoReglamento = true;

        const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
        if (usuario && usuario.id) {
            data.usuarioId = Number(usuario.id);
        }

        try {
            const response = await fetch('/matriculas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

           const result = await response.json();

            if (!response.ok) {
                alert('Error al guardar la matrícula: ' + (result.message || 'Verifique los datos ingresados.'));
                return;
            }

            // Alerta de éxito indicando el estado y el código de matrícula generado
            alert(
                '¡Matrícula registrada con éxito!\n' +
                'Estado: ' + result.estado + '\n' +
                'Código de Matrícula: ' + result.codigoMatricula
            );

            // Redirección inmediata a la página principal (index.html)
            window.location.href = '/index.html';

        } catch (error) {
            alert('Error de conexión con el servidor al intentar registrar la matrícula.');
        }
    });

    updateProgress();
})();