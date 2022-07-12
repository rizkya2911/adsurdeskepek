let data = [];
let divs = {
  time: 'type="text" placeholder="YYYY-MM-DD"',
  number: 'type="number"',
  text: 'type="text"'
};

const renderForm = () => {
  id = document.getElementById('letter-type').value;
  if (id === -1) return;
  
  let ren = '';
  let form = data[id].isian;
  for (let key in form) {
    ren += `<div>${key}<input id="${key}$" {divs[form[key]]}></div>`;
  }
  
  ren += '<button>Catat</button>';
  document.getElementById('form').innerHTML = ren;
}

const renderLetterType = () => {
  let elem = document.getElementById('letter-type');
  elem.value = -1;
  elem.options[0].text = 'Pilih Jenis Surat';
  
  data.forEach((val, id) => {
    let item = document.createElement("option");
    item.value = id.toString();
    item.text = val.judul;
    elem.options.add(item, null);
  });
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
