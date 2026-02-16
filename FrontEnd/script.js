const bridge = window.chrome.webview.hostObjects.bridge;

async function updateStats() {
    // 1. Get the specific element that called the function
    if (element) {
        console.log("Upgrading Stat ID:", element.id);
        const currentVal = parseInt(element.value);

        const costForNext = await window.chrome.webview.hostObjects.bridge.GetStatUpgradeCost(currentVal);

        // document.getElementById(element.id + '-cost').innerText = costForNext;
        //document.getElementById(element.id).innerText = costForNext;
    }

    // 1. Get values from your HTML table inputs
    const baseLv = 1; // You can add an input for this too
    const s = parseInt(document.getElementById('in-str').value);
    const a = parseInt(document.getElementById('in-agi').value);
    const v = parseInt(document.getElementById('in-vit').value);
    const i = parseInt(document.getElementById('in-int').value);
    const d = parseInt(document.getElementById('in-dex').value);
    const l = parseInt(document.getElementById('in-luk').value);

    // 2. Call the C# Logic
    const raw = await window.chrome.webview.hostObjects.bridge.CalculateStats(s, a, v, i, d, l, baseLv);
    const res = JSON.parse(raw);

    // 3. Update the table cells
    document.getElementById('res-atk').innerText = res.atk;
    document.getElementById('res-matk').innerText = res.matk;
    document.getElementById('res-hit').innerText = res.hit;
    document.getElementById('res-flee').innerText = res.flee;
    document.getElementById('res-crit').innerText = res.crit;
    document.getElementById('res-aspd').innerText = res.aspd;
    document.getElementById('res-def').innerText = res.def;
    document.getElementById('res-mdef').innerText = res.mdef;
    document.getElementById('res-points').innerText = 48 - res.pointsUsed; // 48 is starting points
}

// Attach listeners to all inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateStats);
});