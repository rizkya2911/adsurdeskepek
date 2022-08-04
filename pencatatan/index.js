let data = {};
let divs = {
  time: 'type="date"',
  number: 'type="number"',
  text: 'type="text"'
};

const create = async () => {
  let req = {
    type: document.getElementById('letter-type').value
  };
  let res = null;
  
  for (key in data[req.type].isian) {
    let tmp = document.getElementById(key).value;
    
    if (data[req.type].isian[key] === 'number') {
      tmp = parseInt(tmp);
    }
    
    req[key] = tmp;
  }

  try {
    await fetch('/api/pencatatan/create.php', {
      method: 'POST',
      body: JSON.stringify(req)
    })
    .then(response => response.json())
    .then(data => {res = data});
  }
  catch {
    res = {
      success: false,
      error: 'kesalahan internal'
    }
  }
  
  if (res.success) {
    alert(`Berhasil tercatat dengan nomor ${res.id}.`);
  }
  else {
    alert(`Terjadi ${res.error}!`);
  }
}

const reset = () => {
  id = document.getElementById('letter-type').value;
  if (id === 'none') return;
  
  let form = data[id].isian;
  for (let key in form) {
    document.getElementById(key).value = '';
  }
}

const renderForm = () => {
  id = document.getElementById('letter-type').value;
  if (id === 'none') return;
  
  let ren = '';
  let form = data[id].isian;
  for (let key in form) {
    ren += `<div>${key}<input id="${key}" ${divs[form[key]]}></div>`;
  }
  
  ren += '<button class="catat" onClick="create()">Catat</button>';
  ren += '<button class="hapus" onClick="reset()">Hapus</button>';
  document.getElementById('form').innerHTML = ren;
}

const renderLetterType = () => {
  let elem = document.getElementById('letter-type');
  elem.value = 'none';
  elem.options[0].text = 'Pilih Jenis Surat';
  
  for (key in data) {
    let item = document.createElement("option");
    item.value = key;
    item.text = data[key].judul;
    elem.options.add(item, null);
  }
}

const getLetterType = async () => {
  try {
    await fetch('/api/config.php')
    .then(response => response.json())
    .then(data => {res = data});
  }
  catch {
    res = {
      success: false,
      error: 'kesalahan internal'
    }
  }
  
  if (res.success) {
    data = res.data;
    renderLetterType();
  }
  else {
    alert(`Terjadi ${res.error}!`);
  }
}

const main = () => {
  getLetterType();
}

main()
