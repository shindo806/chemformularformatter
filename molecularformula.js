// Regex for matching chemistry formular
const REG1 = /([a-zA-Z])(\d+)/g; // use for H2SO4, Ba(HCO3)2
const REG2 = /([a-zA-Z])(\d+)(\d-)/g; // use for CO32-
const REG3 = /([a-zA-Z])(\d)(\-)/g; // use for HCO3-
const REG4 = /([a-zA-Z])(\d)(\+)/g; // use for NH4+


const inputField = document.getElementById('input-field--user');
inputField.addEventListener('keyup', MolecularFormulaFormat);

const formatTabs = document.querySelectorAll('.format-tab');


function MolecularFormulaFormat() {
   let spans = document.getElementById('input-field--user');
   let result = document.getElementById('result');

   let valueArr = spans.value.split(' ');
   for (let i = 0; i < valueArr.length; i++) {
      if (valueArr[i].match(REG2)) {
         valueArr[i] = valueArr[i].replace(/([a-zA-Z])(\d+)(\d-)/g, "$1<sub>$2</sub><sup>$3</sup>")
         // result.innerHTML = valueArr[i].replace(/([a-zA-Z])(\d+)(\d-)/g, "$1<sub>$2</sub><sup>$3</sup>");
      } else if (valueArr[i].match(REG3)) {
         valueArr[i] = valueArr[i].replace(/([a-zA-Z])(\d)(\-)/g, "$1<sub>$2</sub><sup>$3</sup>");
         // result.innerHTML = valueArr[i].replace(/([a-zA-Z])(\d)(\-)/g, "$1<sub>$2</sub><sup>$3</sup>");
      } else if (valueArr[i].match(REG4)) {
         valueArr[i] = valueArr[i].replace(/([a-zA-Z])(\d)(\+)/g, "$1<sub>$2</sub><sup>$3</sup>");
         result.innerHTML = valueArr[i].replace(/([a-zA-Z])(\d)(\+)/g, "$1<sub>$2</sub><sup>$3</sup>");
      } else if (valueArr[i].match(REG1)) {
         valueArr[i] = valueArr[i].replace(/([)a-zA-Z])(\d+)/g, "$1<sub>$2</sub>");
         // result.innerHTML = valueArr[i].replace(/([)a-zA-Z])(\d+)/g, "$1<sub>$2</sub>");
      } else {
         valueArr[i] = valueArr[i];
      }
   }
   console.log(valueArr);
   result.innerHTML = valueArr.join(' ')

}
