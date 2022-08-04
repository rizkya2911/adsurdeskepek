let data = {};
let table = [];

const printTable = () => {
  localStorage.type = document.getElementById('letter-type').value;
  localStorage.begin = document.getElementById('begin').value;
  localStorage.end = document.getElementById('end').value;
  window.open('/print/', '_blank');
}

const renderTable = () => {
  let id = document.getElementById('letter-type').value;
  if (id === 'none') return;
  
  
  let ren = `<table><tr><th>No</th>`;
  let form = data[id].isian;
  for (let key in form) {
    ren += `<th>${key}</th>`;
  }
  ren += `</tr>`;
  table.forEach((val) => {
    ren += `<tr><td>${val.id}</td>`;
    for (let key in form) {
      ren += `<td>${val[key]}</td>`;
    }
    ren += `</tr>`;
  });
  
  ren += `</table><button onClick="printTable()">Cetak</button>`;
  document.getElementById('table').innerHTML = ren;
}

const getTable = async () => {
  let req = {
    type: document.getElementById('letter-type').value,
    begin: document.getElementById('begin').value,
    end: document.getElementById('end').value
  };
  let res = null;
  
  if (req.type === 'none' || req.begin.length !== 10 || req.end.length !== 10) return;
  
  try {
    await fetch('/api/pelaporan/read.php', {
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
    table = res.data;
    renderTable();
  }
  else {
    alert(`Terjadi ${res.error}!`);
  }
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
