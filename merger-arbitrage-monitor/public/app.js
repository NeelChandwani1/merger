async function fetchMergerDeals() {
    try {
        console.log('Fetching merger deals...');
        const response = await fetch('http://localhost:3001/api/mergers');
        const deals = await response.json();
        console.log('Received deals:', deals);
        displayMergerDeals(deals);
        updateStats(deals);
    } catch (error) {
        console.error('Error fetching merger deals:', error);
        displayError();
    }
}

function displayMergerDeals(deals) {
    const tableBody = document.getElementById('mergerData');
    console.log('TableBody element:', tableBody);
    
    if (!tableBody) {
        console.error('Could not find mergerData element');
        return;
    }

    if (!Array.isArray(deals) || deals.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem;">
                    No merger deals available at the moment.
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = '';
    deals.forEach(deal => {
        const spread = calculateSpread(deal.offerPrice, deal.currentPrice);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="company-info">
                    <span class="company-name">${deal.targetCompany}</span>
                    <span class="deal-value">$${formatNumber(deal.dealValue)}</span>
                </div>
            </td>
            <td>${deal.acquirerCompany}</td>
            <td>$${deal.offerPrice.toFixed(2)}</td>
            <td>$${deal.currentPrice?.toFixed(2) || 'N/A'}</td>
            <td class="${spread >= 0 ? 'positive' : 'negative'}">${spread}%</td>
            <td><span class="status-badge status-${deal.status.toLowerCase()}">${deal.status}</span></td>
            <td>${formatDate(deal.expectedCloseDate)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function updateStats(deals) {
    const activeDealCount = deals.filter(deal => deal.status === 'PENDING').length;
    const totalValue = deals.reduce((sum, deal) => sum + deal.dealValue, 0);
    const avgSpread = calculateAverageSpread(deals);

    document.getElementById('activeDealCount').textContent = activeDealCount;
    document.getElementById('totalValue').textContent = `$${(totalValue / 1e9).toFixed(1)}B`;
    document.getElementById('avgSpread').textContent = `${avgSpread.toFixed(2)}%`;
}

function calculateSpread(offerPrice, currentPrice) {
    if (!currentPrice) return 'N/A';
    return ((offerPrice - currentPrice) / currentPrice * 100).toFixed(2);
}

function calculateAverageSpread(deals) {
    const spreads = deals
        .filter(deal => deal.currentPrice && deal.status === 'PENDING')
        .map(deal => ((deal.offerPrice - deal.currentPrice) / deal.currentPrice * 100));
    
    return spreads.length ? spreads.reduce((a, b) => a + b) / spreads.length : 0;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatNumber(num) {
    return (num / 1e9).toFixed(1) + 'B';
}

function refreshData() {
    fetchMergerDeals();
}

function displayError() {
    const tableBody = document.getElementById('mergerData');
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: #dc2626; padding: 2rem;">
                    Error loading merger deals. Please try again later.
                </td>
            </tr>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching deals...');
    fetchMergerDeals();
});

setInterval(fetchMergerDeals, 300000);