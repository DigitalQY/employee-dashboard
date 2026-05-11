"use strict"
  ; (function () {
    let dashboard = 'dashboard';
    let table = document.querySelector(`.${dashboard}__table`);
    let percent = document.querySelector(`.${dashboard}__percent`);
    let employees = [
      { name: 'employee1', age: 30, salary: 400 },
      { name: 'employee2', age: 31, salary: 500 },
      { name: 'employee3', age: 32, salary: 600 },
    ];
    for (let item of employees) {
      let creater = (text) => {
        let td = document.createElement('td');
        td.textContent = text;
        td.dataset.flag = true;
        return td;
      };
      function check(num = 10) {
        if (Number(num)) {
          return num;
        } else {
          return 10
        }
      };
      let event = (elem) => {
        elem.addEventListener('click', () => {
          if (Number(elem.textContent) && elem.dataset.flag == 'true') {
            elem.textContent = (elem.textContent * check(percent.value) / 100) + Number(elem.textContent);
          }
          elem.dataset.flag = false;
        })
      };
      let tr = document.createElement('tr');
      table.appendChild(tr);
      let td1 = creater(item.name);
      tr.appendChild(td1);
      event(td1)
      let td2 = creater(item.age);
      tr.appendChild(td2);
      event(td2)
      let td3 = creater(item.salary);
      tr.appendChild(td3);
      event(td3)
    };
  }());