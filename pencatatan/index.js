const renderLetterType = (data) => {
  let elem = document.getElementById('letter-type');
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
    renderLetterType(res.data);
  }
  else {
    alert(`Terjadi ${res.error}!`);
  }
}

const main = () => {
  getLetterType();
}

main()
