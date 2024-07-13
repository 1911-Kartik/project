const Base_URL= "https://2024-03-06.currency-api.pages.dev/v1/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select");
const getRateBtn=document.querySelector("button");
const fromCurr=document.querySelector(".from select ");
const toCurr=document.querySelector(".TO select ");
const swap=document.querySelector("i")
const msgDisplay=document.querySelector(".message");
const input=document.querySelector("input")
const spinningImage=document.querySelector(".fullscreen-bg img")

input.addEventListener("click",()=>{
msgDisplay.classList.remove("before");
getRateBtn.classList.add("before")
msgDisplay.innerText="";
spinningImage.classList.remove('spin');
});


for(let select of dropdowns ){
    for(let code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
            if(select.id==='from' && code==='USD'){
                newOption.selected="selected";
            }
            else if(select.id==='to' && code==='INR'){
                newOption.selected="selected";
            }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt)=>{
    changeFlag(evt.target);
    }); 
}


swap.addEventListener("click", ()=>{
    let temp=toCurr.value;
    toCurr.value=fromCurr.value;
    swapflag(toCurr);
    fromCurr.value=temp;
    swapflag(fromCurr);
});


const updateData = async () =>{
    let amtVal=input.value;
    if(isNaN(amtVal)){
        msgDisplay.classList.add("before");
        msgDisplay.innerText="ENTER A VALID NUMBER";
        console.log("done");
        input.value='1';    
        
    }
    else{
    if(amtVal===''||amtVal<1){
        amtVal=1;
        input.value='1';
    }
    
    let URL=Base_URL+'/'+fromCurr.value.toLowerCase()+'.json ';
    let response = await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
     
    let finalAmount= amtVal*rate;
    spinningImage.classList.add('spin');
    setTimeout(()=>{
    getRateBtn.classList.remove("before");
    msgDisplay.classList.add("before");
    msgDisplay.innerText=amtVal+' '+fromCurr.value+' = '+finalAmount+' '+toCurr.value;
    console.log("print");
    },1000);

}
}


const swapflag = (name) =>{
    let currCode=name.value;
    let countryCode=countryList[currCode];
    let newURL='https://flagsapi.com/'+countryCode+'/shiny/64.png';
    let img= name.parentElement.querySelector("img");
        img.src=newURL;
    msgDisplay.innerText="";
}

const changeFlag = (Element) => {
    let currCode=Element.value;
    let countryCode=countryList[currCode];
    let newURL='https://flagsapi.com/'+countryCode+'/shiny/64.png';
    let img= Element.parentElement.querySelector("img");
        img.src=newURL;
}

getRateBtn.addEventListener("click",  (evt)=>{
    spinningImage.classList.add('spin');
    evt.preventDefault();
    updateData(2000);
    spinningImage.classList.remove('spin');
    msgDisplay.innerText="";
    
});


/* " Optional " if you wnat to load the data at the time of window loadig that is when html conetnts are loaded into webpage.   
window.addEventListener("load",() =>{
   updateDta();
});
*/
