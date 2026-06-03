// Booking URL — single source of truth. Swap to TidyCal later by changing this one value.
const BOOKING_URL = "https://cal.com/visyn-studio/free-shoot"; // TODO: replace with real Cal.com link

// Pack pricing table, Q = 1..99. Q = products × scenes. Photos = Q×10. Videos = Q×3.
const PRICE_TABLE = {
  onetime: {
    1: 199, 2: 379, 3: 499, 4: 679, 5: 849, 6: 999.2, 7: 1189, 8: 1359, 9: 1499.3, 10: 1699,
    11: 1869, 12: 1999.4, 13: 2209, 14: 2379, 15: 2498.5, 16: 2719, 17: 2889, 18: 2998.6, 19: 3229, 20: 3399,
    21: 3498.7, 22: 3739, 23: 3909, 24: 3998.8, 25: 4249, 26: 4419, 27: 4498.9, 28: 4759, 29: 4929, 30: 4999,
    31: 5269, 32: 5439, 33: 5499.1, 34: 5779, 35: 5949, 36: 5999.2, 37: 6289, 38: 6459, 39: 6499.3, 40: 6799,
    41: 6969, 42: 6999.4, 43: 7309, 44: 7479, 45: 7498.5, 46: 7819, 47: 7989, 48: 7998.6, 49: 8329, 50: 8499,
    51: 8498.7, 52: 8839, 53: 9009, 54: 8998.8, 55: 9349, 56: 9519, 57: 9498.9, 58: 9859, 59: 10029, 60: 9999,
    61: 10369, 62: 10539, 63: 10499.1, 64: 10879, 65: 11049, 66: 10999.2, 67: 11389, 68: 11559, 69: 11499.3, 70: 11899,
    71: 12069, 72: 11999.4, 73: 12409, 74: 12579, 75: 12498.5, 76: 12919, 77: 13089, 78: 12998.6, 79: 13429, 80: 13599,
    81: 13498.7, 82: 13939, 83: 14109, 84: 13998.8, 85: 14449, 86: 14619, 87: 14498.9, 88: 14959, 89: 15129, 90: 14999,
    91: 15469, 92: 15639, 93: 15499.1, 94: 15979, 95: 16149, 96: 15999.2, 97: 16489, 98: 16659, 99: 16499.3
  },
  monthly: {
    1: 149, 2: 279, 3: 398.97, 4: 539, 5: 674, 6: 799, 7: 944, 8: 1079, 9: 1198.8, 10: 1349,
    11: 1499.19, 12: 1599, 13: 1728.5, 14: 1859, 15: 1998.5, 16: 2129, 17: 2268.5, 18: 2399, 19: 2528.5, 20: 2659,
    21: 2798.5, 22: 2929, 23: 3068.5, 24: 3199, 25: 3328.5, 26: 3469, 27: 3598.5, 28: 3729, 29: 3858.5, 30: 3999,
    31: 4138.5, 32: 4269, 33: 4398.5, 34: 4539, 35: 4668.5, 36: 4799, 37: 4938.5, 38: 5069, 39: 5198.5, 40: 5339,
    41: 5458.5, 42: 5599, 43: 5738.5, 44: 5869, 45: 5998.5, 46: 6139, 47: 6268.5, 48: 6399, 49: 6538.5, 50: 6659,
    51: 6808.5, 52: 6939, 53: 7058.5, 54: 7209, 55: 7338.5, 56: 7459, 57: 7598.5, 58: 7739, 59: 7858.5, 60: 7999,
    61: 8138.5, 62: 8269, 63: 8408.5, 64: 8539, 65: 8658.5, 66: 8799, 67: 8938.5, 68: 9059, 69: 9198.5, 70: 9329,
    71: 9478.5, 72: 9599, 73: 9738.5, 74: 9879, 75: 9998.5, 76: 10139, 77: 10278.5, 78: 10409, 79: 10538.5, 80: 10679,
    81: 10798.5, 82: 10939, 83: 11078.5, 84: 11199, 85: 11338.5, 86: 11479, 87: 11598.5, 88: 11739, 89: 11878.5, 90: 11999,
    91: 12148.5, 92: 12279, 93: 12398.5, 94: 12549, 95: 12678.5, 96: 12799, 97: 12948.5, 98: 13079, 99: 13198.5
  }
};

// Round UP to nearest whole number ending in 9.
function roundToNine(n) {
  var c = Math.ceil(n);
  var rem = c % 10;
  if (rem === 9) return c;
  return c + (9 - rem + 10) % 10;
}

// Format as whole-dollar price (no decimals — all values go through roundToNine first).
function formatPrice(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getBilling() {
  var active = document.querySelector('.billing-btn.is-active');
  return active ? active.dataset.billing : 'monthly';
}

// Update a preset card (Q = 3, 6, or 9)
function updatePresetCard(Q) {
  var billing = getBilling();
  var ot  = roundToNine(PRICE_TABLE.onetime[Q]);
  var mo  = roundToNine(PRICE_TABLE.monthly[Q]);
  var saving = ot - mo;

  var mainEl    = document.getElementById('preset-' + Q + '-main');
  var periodEl  = document.getElementById('preset-' + Q + '-period');
  var compareEl = document.getElementById('preset-' + Q + '-compare');
  if (!mainEl) return;

  if (billing === 'monthly') {
    mainEl.textContent   = formatPrice(mo);
    periodEl.textContent = '/ month';
    compareEl.innerHTML  =
      '<s>' + formatPrice(ot) + ' one-time</s>' +
      '<span class="save-note">Save ' + formatPrice(saving) + ' every month</span>';
  } else {
    mainEl.textContent   = formatPrice(ot);
    periodEl.textContent = 'one-time';
    compareEl.innerHTML  =
      '<span class="save-note">Switch to monthly — save ' + formatPrice(saving) + '/mo</span>';
  }
}

// Update the custom configurator
function setContactSalesState() {
  document.getElementById('price').textContent    = 'Contact Sales';
  document.getElementById('period').textContent   = '';
  document.getElementById('savings-note').textContent = 'Talk to Steve about volume pricing for larger projects.';
  var photosEl = document.getElementById('custom-photos');
  var videosEl = document.getElementById('custom-videos');
  if (photosEl) photosEl.textContent = '—';
  if (videosEl) videosEl.textContent = '—';
}

function updateCustomConfigurator() {
  var productsVal = document.getElementById('products').value;
  var scenesVal   = document.getElementById('scenes').value;
  var billing     = getBilling();

  if (productsVal === '10plus' || scenesVal === '10plus') {
    setContactSalesState();
    return;
  }

  var Q = parseInt(productsVal, 10) * parseInt(scenesVal, 10);
  if (Q >= 100 || !PRICE_TABLE.onetime[Q]) {
    setContactSalesState();
    return;
  }

  // Update custom pill counts
  var photos = Q * 10;
  var videos = Q * 3;
  var photosEl = document.getElementById('custom-photos');
  var videosEl = document.getElementById('custom-videos');
  if (photosEl) photosEl.textContent = photos;
  if (videosEl) videosEl.textContent = videos;

  var ot     = roundToNine(PRICE_TABLE.onetime[Q]);
  var mo     = roundToNine(PRICE_TABLE.monthly[Q]);
  var saving = ot - mo;
  var active = (billing === 'monthly') ? mo : ot;

  document.getElementById('price').textContent  = formatPrice(active);
  document.getElementById('period').textContent = (billing === 'monthly') ? '/ month' : 'one-time';

  var noteEl = document.getElementById('savings-note');
  if (billing === 'monthly') {
    noteEl.textContent = 'Saving ' + formatPrice(saving) + ' vs. one-time. Cancel anytime.';
  } else {
    noteEl.textContent = 'Switch to monthly — save ' + formatPrice(saving) + ' every month.';
  }
}

function updateBillingHint() {
  var hint = document.getElementById('billing-hint');
  if (!hint) return;
  var billing = getBilling();
  hint.textContent = billing === 'monthly'
    ? 'Monthly pricing shown — save vs. one-time every month.'
    : 'One-time pricing shown — switch to monthly to save more.';
}

function updateAll() {
  updatePresetCard(3);
  updatePresetCard(6);
  updatePresetCard(9);
  updateCustomConfigurator();
  updateBillingHint();
}

// Billing toggle
document.querySelectorAll('.billing-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.billing-btn').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    updateAll();
  });
});

// Custom configurator dropdowns
document.getElementById('products').addEventListener('change', updateCustomConfigurator);
document.getElementById('scenes').addEventListener('change', updateCustomConfigurator);

// Wire all [data-book] elements to the booking URL
document.querySelectorAll('[data-book]').forEach(function (el) {
  el.setAttribute('href', BOOKING_URL);
});

// Initialize (monthly is default — already has is-active in HTML)
updateAll();
