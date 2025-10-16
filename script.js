const singleLevels = {
  pineapple: 0.3,
  papaya: 1.1,
  ginger: 10.0,
  turmeric: 1.0,
  aloe: 0.3
};

const testedCombos = {
  'aloe-ginger-pineapple': {value:0.3, label:'Combo A (Pineapple + Ginger + Aloe)'},
  'ginger-papaya-pineapple': {value:1.0, label:'Combo C (Papaya + Pineapple + Ginger)'},
  'ginger-papaya-turmeric': {value:1.2, label:'Combo B (Papaya + Turmeric + Ginger)'}
};

function classifyLevel(v){
  if (v <= 0.3) return {cat:'Low', color:'#6ec84d'};
  if (v >= 10) return {cat:'High', color:'#e74c3c'};
  return {cat:'Moderate', color:'#f1c40f'};
}

function predictCombo(){
  const boxes = document.querySelectorAll('#combo-form input[name="extract"]:checked');
  const chosen = Array.from(boxes).map(b=>b.value);
  if (chosen.length === 0) { alert('Select at least one.'); return; }
  if (chosen.length > 3) { alert('Select up to three.'); return; }

  const key = chosen.slice().sort().join('-');
  let predicted, label;
  if (testedCombos[key]){
    predicted = testedCombos[key].value;
    label = testedCombos[key].label + ' (Measured)';
  } else {
    let sum = 0;
    chosen.forEach(x => sum += singleLevels[x]);
    predicted = sum / chosen.length;
    label = chosen.join(' + ');
    if (chosen.includes('papaya') && chosen.includes('pineapple')) predicted *= 0.7;
    if (chosen.includes('aloe')) predicted -= 0.1;
  }

  if (predicted < 0.3) predicted = 0.3;
  predicted = Math.round(predicted * 100) / 100;

  const cls = classifyLevel(predicted);
  document.getElementById('combo-result').style.display = 'block';
  document.getElementById('combo-names').textContent = label;
  document.getElementById('combo-value').textContent = predicted;
  document.getElementById('combo-color').style.background = cls.color;
  document.getElementById('combo-interpret').textContent = `Category: ${cls.cat}`;
  document.getElementById('combo-explain').innerHTML = explainCombo(chosen, cls.cat);
}

function resetCombo(){
  document.querySelectorAll('#combo-form input[name="extract"]').forEach(b=>b.checked=false);
  document.getElementById('combo-result').style.display='none';
}

function explainCombo(chosen, cat){
  let text = '';
  if (chosen.includes('pineapple')) text += 'Bromelain helps break down proteins. ';
  if (chosen.includes('papaya')) text += 'Papain supports gluten digestion. ';
  if (chosen.includes('ginger')) text += 'Ginger helps with inflammation. ';
  if (chosen.includes('turmeric')) text += 'Turmeric has antioxidant benefits. ';
  if (chosen.includes('aloe')) text += 'Aloe soothes the gut lining. ';
  text += `Overall, this combo is in the ${cat} range.`;
  return text;
}
