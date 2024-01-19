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
let checkCount = 0;
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
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase ()
{
    return String.fromCharCode(getRandomInteger(65,91));
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

function shuffle(arr)
{
    // fisher yates method
    for(let i=arr.length-1; i>0; i--)
    {
        const j = Math.floor(Math.random() * (i+1));

        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp; 
    }

    let ans = "";
    arr.forEach((s) => (ans += s));
    return ans;
}

generateBtn.addEventListener('click', ()=>
{
    if(checkCount == 0)
    {
        passwordDisplay.value = "";
        return;
    }

    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);
    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    for(let i=0; i<funcArr.length; i++)
        password += funcArr[i]();

    for(let i=0; i<passwordLength-funcArr.length; i++)
    {
        let randInt = getRandomInteger(0,funcArr.length);
        password += funcArr[randInt]();
    }

    password = shuffle(Array.from(password));
    
    passwordDisplay.value = password;
    calcStrength();
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