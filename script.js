function updateTextInput(val) {
  document.getElementById("textInput").value = val;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "~!@#$%^&*?/.+";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numberElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

//console.log(getRandomSymbol());

generateElement.addEventListener("click", () => {
  const length = parseInt(lengthElement.value);
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numberElement.checked;
  const hasSymbol = symbolsElement.checked;
  //console.log(length);

  resultElement.innerHTML = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = "";

  const typesCount = symbol + upper + lower + number;

  // console.log(typesCount);
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  //console.log(typesArr);

  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      console.log(funcName);

      generatedPassword += randomFunction[funcName]();
    });
  }
  console.log(generatedPassword.slice(0, length));
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

clipboardElement.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const pass = resultElement.innerHTML;

  if (!pass) {
    return;
  }
  textarea.value = pass;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
