let data = {};
let table = [];

const renderTable = () => {
  let id = localStorage.type;
  
  let ren = `<table class="isi"><tr><th>No</th>`;
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
  
  document.getElementById('table').innerHTML = ren;
}

const getTable = async () => {
  let req = {
    type: localStorage.type,
    begin: localStorage.begin,
    end: localStorage.end
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
  }
  else {
    alert(`Terjadi ${res.error}!`);
  }
}

const main = async () => {
  await getLetterType();
  await getTable();
  window.print();
}

main()
