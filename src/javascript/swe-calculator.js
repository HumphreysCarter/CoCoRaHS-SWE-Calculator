document.addEventListener("DOMContentLoaded", function () {

    const tareRadios = document.getElementsByName('tare');
    const resultsDiv = document.getElementById('results');

    // Perform calculation on button click
    document.getElementById('calculateButton').addEventListener('click', () => {
        const grossWeight = parseFloat(document.getElementById('grossWeight').value);
        const selectedTare = Array.from(tareRadios).find(radio => radio.checked);
        const tareWeight = parseFloat(selectedTare.value);

        // Reset resultsDiv before calculations
        resultsDiv.classList.add('hidden'); // Hide it initially
        resultsDiv.classList.remove('bg-red-800'); // Remove error styling
        resultsDiv.classList.remove('bg-blue-800'); // Remove success styling
        resultsDiv.innerHTML = ''; // Clear previous messages

        // Validate inputs
        if (isNaN(tareWeight) || isNaN(grossWeight) || grossWeight <= tareWeight) {
            resultsDiv.innerHTML = `<p>Please enter valid weights. Gross weight must be greater than tare weight.</p>`;
            resultsDiv.classList.remove('hidden'); // Show the container
            resultsDiv.classList.add('bg-red-800', 'text-white', 'p-4', 'rounded-lg', 'shadow-md');
            return;
        }

        // Calculate net weight
        const netWeight = grossWeight - tareWeight; // grams

        // Calculate inches of liquid water
        // h = m / πr² * ρ [m = mass of snow (g), r = gauge radius (in), ρ = density of water (g/in³)]
        const waterDensity = 2.54 ** 3; // Density of water is 1 g/cm³, need to convert to g/in³ (1 in = 2.54 cm)
        const gaugeRadius = 2 // Assuming 4 inch rain gauge;
        const waterInches = netWeight / (Math.PI * (gaugeRadius ** 2) * waterDensity);

        // Populate results and reveal the container
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
        resultsDiv.classList.remove('bg-red-800');
        resultsDiv.classList.add('bg-blue-800');
    });

});