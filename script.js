const inputSlider = document.querySelector("[data-lengthSlider");
const lengthDisplay = document.querySelector("[data-lengthNo");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".Generate");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();

// set passwords length
function handleSlider()
{
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    //shadow
}

function getRandomInteger(min,maxx)
{
    return min + Math.floor(Math.random()*(maxx-min));
}

function generateRandomNumber()
{
    return getRandomInteger(0,9);
}

function generateLowerCase ()
{
    return String.fromCharCode(getRandomInteger(97,123) + 'A');
}

function generateUpperCase ()
{
    return String.fromCharCode(getRandomInteger(65,91) + 'A');
}

function generateSymbol()
{
    let num = getRandomInteger(0,symbols.length);
    return symbols.charAt(num);
}

function calcStrength()
{
    let hasUpper  = false;
    let hasLower  = false;
    let hasSym  = false;
    let hasNum  = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasSym = true;
    if(symbolsCheck.checked) hasNum = true;

    if(hasUpper && hasLower && (hasNum||hasSym) && passwordLength >= 8)
        setIndicator("#0f0");
    else if((hasLower||hasUpper) && (hasNum||hasSym) && passwordLength >= 6)
        setIndicator("#ff0");
    else
        setIndicator("#f00");
}

async function copyContent()
{
    try
    {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e)
    {
        copyMsg.innerText = "Failed";
    }
    
    copyMsg.classList.add("active");
    setTimeout(() => {
       copyMsg.classList.remove("active"); 
    }, 2000);
}

inputSlider.addEventListener('input', (e)=> {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', ()=>{

})

function handleCheckBoxChange()
{
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    })

    if(checkCount > passwordLength)
    {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});