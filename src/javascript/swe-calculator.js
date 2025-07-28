document.addEventListener('DOMContentLoaded', function () {
    const tareRadiosContainer = document.querySelector('[name="tare"]').closest('div');
    const resultsDiv = document.getElementById('results');

    const SETTINGS_KEY = 'cocorahsGaugeWeights';

    function getSavedWeights() {
        const defaults = {
            tropo: 510.0,
            stratus: 453.6
        };
        const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
        return {
            tropo: saved.tropo ?? defaults.tropo,
            stratus: saved.stratus ?? defaults.stratus
        };
    }

    function loadGauges() {
        const { tropo, stratus } = getSavedWeights();

        tareRadiosContainer.innerHTML = `
            <label class="flex items-center">
                <input type="radio" name="tare" value="${tropo}" class="form-radio text-blue-500">
                <span class="ml-2">TROPO 4" Gauge (${tropo.toFixed(1)} g)</span>
            </label>
            <label class="flex items-center">
                <input type="radio" name="tare" value="${stratus}" class="form-radio text-blue-500">
                <span class="ml-2">Stratus 4" Gauge (${stratus.toFixed(1)} g)</span>
            </label>
        `;

        const savedTare = localStorage.getItem('selectedTare');
        const radios = [...document.getElementsByName('tare')];

        if (savedTare && radios.some(r => r.value === savedTare)) {
            radios.find(r => r.value === savedTare).checked = true;
        } else {
            radios[0].checked = true;
        }

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    localStorage.setItem('selectedTare', radio.value);
                }
            });
        });
    }

    // Settings modal logic
    document.getElementById('openSettings').addEventListener('click', () => {
        const { tropo, stratus } = getSavedWeights();
        document.getElementById('tropoWeight').value = tropo.toFixed(1);
        document.getElementById('stratusWeight').value = stratus.toFixed(1);
        document.getElementById('settingsModal').classList.remove('hidden');
        document.getElementById('settingsModal').classList.add('flex');
    });

    document.getElementById('closeSettings').addEventListener('click', () => {
        document.getElementById('settingsModal').classList.add('hidden');
        document.getElementById('settingsModal').classList.remove('flex');
    });

    document.getElementById('settingsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const tropo = parseFloat(document.getElementById('tropoWeight').value);
        const stratus = parseFloat(document.getElementById('stratusWeight').value);

        if (isNaN(tropo) || isNaN(stratus)) {
            alert('Please enter valid weights.');
            return;
        }

        localStorage.setItem(SETTINGS_KEY, JSON.stringify({ tropo, stratus }));
        document.getElementById('settingsModal').classList.add('hidden');
        document.getElementById('settingsModal').classList.remove('flex');
        loadGauges();
    });

    // Calculation logic
    document.getElementById('calculateButton').addEventListener('click', () => {
        const grossWeight = parseFloat(document.getElementById('grossWeight').value);
        const selectedTare = [...document.getElementsByName('tare')].find(r => r.checked);
        const tareWeight = parseFloat(selectedTare?.value);

        resultsDiv.classList.add('hidden');
        resultsDiv.classList.remove('bg-red-800', 'bg-blue-800');
        resultsDiv.innerHTML = '';

        if (isNaN(tareWeight) || isNaN(grossWeight) || grossWeight <= tareWeight) {
            resultsDiv.innerHTML = `<p>Please enter valid weights. Gross weight must be greater than tare weight.</p>`;
            resultsDiv.classList.remove('hidden');
            resultsDiv.classList.add('bg-red-800', 'text-white', 'p-4', 'rounded-lg', 'shadow-md');
            return;
        }

        const netWeight = grossWeight - tareWeight;
        const waterDensity = 2.54 ** 3;
        const gaugeRadius = 2;
        const waterInches = netWeight / (Math.PI * (gaugeRadius ** 2) * waterDensity);

        resultsDiv.innerHTML = `
            <div class="flex flex-col items-center">
                <table class="w-full text-left text-gray-200 border-separate border-spacing-y-2">
                    <tbody>
                        <tr>
                            <th class="text-lg font-bold pr-4">Snow Weight:</th>
                            <td class="text-lg">${netWeight.toFixed(1)} g</td>
                        </tr>
                        <tr>
                            <th class="text-lg font-bold pr-4">Liquid Equivalent:</th>
                            <td class="text-lg">${waterInches.toFixed(2)} in</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        resultsDiv.classList.remove('hidden');
        resultsDiv.classList.add('bg-blue-800');
    });

    loadGauges();
});
