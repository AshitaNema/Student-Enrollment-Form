const pageAnimation = () => {
  document.querySelector('body').style.opacity = 1;
};


let flag = false;

const onSubmit = () => {
  let gender;
  let data = [];
  let skills = [];

  const name = document.getElementById('inputName').value;
  const email = document.getElementById('inputEmail').value;
  const website = document.getElementById('inputWebsite').value;
  const image = document.getElementById('inputImage').value;
  const gen = document.getElementsByName('gender');
  const ele = document.getElementsByName('skills');

  for (let i = 0; i < gen.length; i++) {
    if (gen[i].checked) {
      gender = gen[i].value;
    }
  }

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      skills.push(ele[i].value);
    }
  }
  data = new Array();
  data = JSON.parse(localStorage.getItem("students")) ? JSON.parse(localStorage.getItem("students")) : [];

  if (data.some((v) => { return v.email == email })) {
    alert("Duplicate Email");
  }
  else {
    data.push({
      name: name,
      email: email,
      website: website,
      image: image,
      gender: gender,
      skills: [...skills]
    });
    if (!flag) {
      showTable();
      flag = true;
    }
    localStorage.setItem("students",JSON.stringify(data));
    addRow(data);
    data = null;
  }

};

const showTable = () => {
  const temp = document.querySelector('template');
  const dataTable = temp.content.cloneNode(true);
  const enrolledSection = document.querySelector('.enrolled-section');
  const old_child = enrolledSection.children[0];
  enrolledSection.replaceChild(dataTable, old_child);
};

const addRow = (data) => {
  console.log(data);
  let table = document.getElementById('table-data');
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);

  row.insertCell(0).innerHTML = `<td>
    <span class="font-weight-bold">${data[data.length-1].name}</span><br />
    <span>${data[data.length-1].gender}</span><br />
    <span>${data[data.length-1].email}</span><br />
    <a
      href="https://${data[data.length-1].website}"
      target="_blank"
      rel="noopener noreferrer"
      ><u>${data[data.length-1].website}</u></a
    ><br />
    ${data[data.length-1].skills.map((skill) => {
    return `<span>${skill}</span>`;
  })}
  </td>`;

  row.insertCell(1).innerHTML = `<td style="width:100px;height:140px">
                      <img src="${data[data.length-1].image}" 
                      onerror="this.src='assets/fallback-image.jpg'"
                      alt="image"/>
                  </td>`;
};


