/* GI 321 qgis2web dashboard extension.
   Load this file AFTER resources/qgis2web.js so that `map` and the
   qgis2web layer variables already exist. */

(function () {
  'use strict';

  const normalise = (value) => String(value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase();

  function flattenLayers(collection) {
    const result = [];
    (collection || []).forEach((layer) => {
      if (layer && typeof layer.getLayers === 'function') {
        result.push(...flattenLayers(layer.getLayers().getArray()));
      } else if (layer) {
        result.push(layer);
      }
    });
    return result;
  }

  function findLayer(possibleNames) {
    const wanted = possibleNames.map(normalise);
    const candidates = flattenLayers(
      window.layersList || map.getLayers().getArray()
    );
    return candidates.find((layer) => {
      const label = normalise(
        layer.get('popuplayertitle') || layer.get('title') || ''
      );
      return wanted.some((name) => label.includes(name));
    }) || null;
  }

  function safeFeatures(layer) {
    if (!layer || !layer.getSource || !layer.getSource()) return [];
    const source = layer.getSource();
    return typeof source.getFeatures === 'function' ? source.getFeatures() : [];
  }

  function countBy(features, field) {
    return features.reduce((acc, feature) => {
      const value = String(feature.get(field) ?? 'Unknown').trim() || 'Unknown';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  function getFirstProperty(feature, names) {
    for (const name of names) {
      const value = feature.get(name);
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        return value;
      }
    }
    return null;
  }

  function parseNumber(value) {
    const match = String(value ?? '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  function fitFeatures(features) {
    if (!features.length) return;
    const extent = ol.extent.createEmpty();
    features.forEach((feature) => {
      const geometry = feature.getGeometry();
      if (geometry) ol.extent.extend(extent, geometry.getExtent());
    });
    if (!ol.extent.isEmpty(extent)) {
      map.getView().fit(extent, {
        padding: [80, 420, 80, 80],
        maxZoom: 17,
        duration: 500
      });
    }
  }

  // Find layers by their human-friendly names. Rename layers in QGIS before export.
  const culvertLayer = findLayer(['culverts', 'culvert condition']);
  const outletLayer = findLayer(['stream outlets', 'river and creek location', 'rivers and creek location']);
  const roadLayer = findLayer(['road centreline', 'road centerline', 'road cl']);
  const gradientLayer = findLayer(['road gradient', 'gradient slope', 'gradient segments']);
  const riskLayer = findLayer(['inundation risk', 'road inundation']);
  const chainageLayer = findLayer(['chainage points', 'chainage 150m']);

  // Add a metric scale bar. qgis2web may not create one unless explicitly selected.
  map.addControl(new ol.control.ScaleLine({
    units: 'metric',
    bar: true,
    steps: 4,
    text: true,
    minWidth: 135
  }));

  // Build the title, north arrow and dashboard interface without editing generated core files.
  const title = document.createElement('div');
  title.id = 'gi321-title';
  title.textContent = 'GI 321 Rural Road Inventory Web Map';
  document.body.appendChild(title);

  const north = document.createElement('div');
  north.id = 'north-arrow';
  north.innerHTML = '<span class="north-label">N</span><span class="north-symbol" aria-hidden="true">↑</span>';
  north.setAttribute('aria-label', 'North arrow');
  document.body.appendChild(north);
  const northSymbol = north.querySelector('.north-symbol');
  const updateNorth = () => {
    const rotation = map.getView().getRotation() || 0;
    northSymbol.style.transform = `rotate(${-rotation}rad)`;
  };
  map.getView().on('change:rotation', updateNorth);
  updateNorth();

  const toggle = document.createElement('button');
  toggle.id = 'dashboard-toggle';
  toggle.type = 'button';
  toggle.textContent = 'Dashboard';
  toggle.setAttribute('aria-controls', 'dashboard-panel');
  toggle.setAttribute('aria-expanded', 'true');
  document.body.appendChild(toggle);

  const panel = document.createElement('aside');
  panel.id = 'dashboard-panel';
  panel.innerHTML = `
    <div class="dashboard-heading">
      <h2>Road Inventory Dashboard</h2>
      <button class="dashboard-close" type="button" aria-label="Close dashboard">×</button>
    </div>
    <p class="dashboard-note">Select a card to filter and zoom. Select Reset to restore all features.</p>
    <div class="dashboard-grid" id="metric-grid"></div>
    <section class="dashboard-section">
      <h3>Culvert condition</h3>
      <div id="culvert-bars"></div>
    </section>
    <section class="dashboard-section">
      <h3>Interactive query</h3>
      <div class="dashboard-actions">
        <select id="condition-filter" aria-label="Filter culverts by condition">
          <option value="">All culvert conditions</option>
        </select>
        <input id="feature-search" type="search" placeholder="Search culvert ID or chainage" aria-label="Search culvert ID or chainage">
        <button id="search-button" type="button">Search</button>
        <button id="reset-dashboard" type="button">Reset</button>
      </div>
      <div id="dashboard-status" role="status" aria-live="polite">Dashboard ready.</div>
    </section>`;
  document.body.appendChild(panel);

  const closeButton = panel.querySelector('.dashboard-close');
  const showPanel = (show) => {
    panel.hidden = !show;
    toggle.setAttribute('aria-expanded', String(show));
  };
  toggle.addEventListener('click', () => showPanel(panel.hidden));
  closeButton.addEventListener('click', () => showPanel(false));

  const culvertFeatures = safeFeatures(culvertLayer);
  const outletFeatures = safeFeatures(outletLayer);
  const gradientFeatures = safeFeatures(gradientLayer);
  const riskFeatures = safeFeatures(riskLayer);
  const chainageFeatures = safeFeatures(chainageLayer);
  const roadFeatures = safeFeatures(roadLayer);

  const conditionField = culvertFeatures.length && ['condition', 'Condition'].find((f) => culvertFeatures[0].get(f) !== undefined) || 'condition';
  const flowField = outletFeatures.length && ['flow_status', 'Flow_Statu', 'Flow Status'].find((f) => outletFeatures[0].get(f) !== undefined) || 'flow_status';
  const riskField = riskFeatures.length && ['risk_level', 'Dete_risk_', 'Inundation and Deteriorate Level of Risk'].find((f) => riskFeatures[0].get(f) !== undefined) || 'risk_level';

  const conditionCounts = countBy(culvertFeatures, conditionField);
  const flowCounts = countBy(outletFeatures, flowField);
  const highRiskCount = riskFeatures.filter((f) => /high/i.test(String(f.get(riskField) ?? ''))).length;
  const roadLength = roadFeatures.reduce((sum, f) => {
    const value = getFirstProperty(f, ['length_m', 'lenght', 'Lenght (m)']);
    return sum + parseNumber(value);
  }, 0);

  function countMatching(regex) {
    return Object.entries(conditionCounts)
      .filter(([label]) => regex.test(label))
      .reduce((sum, [, count]) => sum + count, 0);
  }

  const metrics = [
    { label: 'Total culverts', value: culvertFeatures.length, type: 'all', css: 'neutral' },
    { label: 'Deteriorated', value: countMatching(/^deteriorated$/i), type: 'Deteriorated', css: 'danger' },
    { label: 'Barely functional', value: countMatching(/barely/i), type: 'Barely functional', css: 'warning' },
    { label: 'Functional', value: countMatching(/^functional$/i), type: 'Functional', css: '' },
    { label: 'Stream outlets', value: outletFeatures.length, type: 'streams', css: 'neutral' },
    { label: 'High-risk zones', value: highRiskCount, type: 'risk', css: 'danger' },
    { label: 'Gradient segments', value: gradientFeatures.length, type: 'gradient', css: 'neutral' },
    { label: 'Road length', value: roadLength ? `${(roadLength / 1000).toFixed(2)} km` : 'n/a', type: 'road', css: '' }
  ];

  const metricGrid = panel.querySelector('#metric-grid');
  metrics.forEach((metric) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `metric-card ${metric.css}`.trim();
    card.dataset.type = metric.type;
    card.innerHTML = `<span class="metric-value">${metric.value}</span><span class="metric-label">${metric.label}</span>`;
    metricGrid.appendChild(card);
  });

  const originalCulvertStyle = culvertLayer && culvertLayer.getStyle();
  let activeCondition = '';
  function filteredCulverts(condition) {
    if (!condition) return culvertFeatures;
    return culvertFeatures.filter((feature) => normalise(feature.get(conditionField)) === normalise(condition));
  }

  function applyCulvertFilter(condition) {
    activeCondition = condition || '';
    if (!culvertLayer) return;
    culvertLayer.setVisible(true);
    culvertLayer.setStyle((feature, resolution) => {
      if (!activeCondition || normalise(feature.get(conditionField)) === normalise(activeCondition)) {
        return typeof originalCulvertStyle === 'function'
          ? originalCulvertStyle(feature, resolution)
          : originalCulvertStyle;
      }
      return null;
    });
    const selected = filteredCulverts(activeCondition);
    fitFeatures(selected);
    panel.querySelector('#dashboard-status').textContent = activeCondition
      ? `${selected.length} culvert(s) match “${activeCondition}”.`
      : `Showing all ${selected.length} culverts.`;
  }

  // Culvert condition bars and dropdown.
  const barContainer = panel.querySelector('#culvert-bars');
  const conditionSelect = panel.querySelector('#condition-filter');
  const maxCount = Math.max(1, ...Object.values(conditionCounts));
  Object.entries(conditionCounts).sort((a, b) => b[1] - a[1]).forEach(([label, count]) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'bar-row';
    row.innerHTML = `<span>${label}</span><span class="bar-track"><span class="bar-fill" style="display:block;width:${(count/maxCount)*100}%"></span></span><strong>${count}</strong>`;
    row.addEventListener('click', () => {
      conditionSelect.value = label;
      applyCulvertFilter(label);
    });
    barContainer.appendChild(row);

    const option = document.createElement('option');
    option.value = label;
    option.textContent = `${label} (${count})`;
    conditionSelect.appendChild(option);
  });
  conditionSelect.addEventListener('change', (event) => applyCulvertFilter(event.target.value));

  metricGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.metric-card');
    if (!card) return;
    const type = card.dataset.type;
    if (['Deteriorated', 'Barely functional', 'Functional'].includes(type)) {
      conditionSelect.value = type;
      applyCulvertFilter(type);
    } else if (type === 'all') {
      conditionSelect.value = '';
      applyCulvertFilter('');
    } else if (type === 'streams') {
      if (outletLayer) outletLayer.setVisible(true);
      fitFeatures(outletFeatures);
    } else if (type === 'risk') {
      if (riskLayer) riskLayer.setVisible(true);
      fitFeatures(riskFeatures);
    } else if (type === 'gradient') {
      if (gradientLayer) gradientLayer.setVisible(true);
      fitFeatures(gradientFeatures);
    } else if (type === 'road') {
      if (roadLayer) roadLayer.setVisible(true);
      fitFeatures(roadFeatures);
    }
  });

  function searchFeatures() {
    const query = normalise(panel.querySelector('#feature-search').value);
    const status = panel.querySelector('#dashboard-status');
    if (!query) {
      status.textContent = 'Enter a culvert ID or chainage value.';
      return;
    }
    const candidates = [...culvertFeatures, ...chainageFeatures];
    const matches = candidates.filter((feature) => {
      const properties = feature.getProperties();
      return Object.entries(properties)
        .filter(([key]) => key !== 'geometry')
        .some(([, value]) => normalise(value).includes(query));
    });
    if (!matches.length) {
      status.textContent = `No feature matched “${panel.querySelector('#feature-search').value}”.`;
      return;
    }
    fitFeatures(matches);
    status.textContent = `${matches.length} matching feature(s) found.`;
  }

  panel.querySelector('#search-button').addEventListener('click', searchFeatures);
  panel.querySelector('#feature-search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') searchFeatures();
  });

  panel.querySelector('#reset-dashboard').addEventListener('click', () => {
    conditionSelect.value = '';
    applyCulvertFilter('');
    if (riskLayer) riskLayer.setVisible(false);
    panel.querySelector('#feature-search').value = '';
    panel.querySelector('#dashboard-status').textContent = 'Filters reset.';
  });

  // Report layer-name problems visibly instead of failing silently.
  const missing = [
    ['culvert layer', culvertLayer],
    ['stream outlet layer', outletLayer],
    ['road layer', roadLayer],
    ['gradient layer', gradientLayer],
    ['inundation risk layer', riskLayer]
  ].filter(([, layer]) => !layer).map(([label]) => label);
  if (missing.length) {
    panel.querySelector('#dashboard-status').textContent =
      `Dashboard loaded, but could not find: ${missing.join(', ')}. Rename layers in QGIS or update the alias list in custom-dashboard.js.`;
    console.warn('GI321 dashboard missing layers:', missing);
  }

  window.GI321_DASHBOARD = {
    layers: { culvertLayer, outletLayer, roadLayer, gradientLayer, riskLayer, chainageLayer },
    counts: { conditionCounts, flowCounts },
    applyCulvertFilter
  };
})();
