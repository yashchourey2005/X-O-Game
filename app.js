let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let h1 = document.querySelector("h1");
let winner = document.querySelector(".winner");
let body = document.querySelector("body");

let container = document.querySelector(".container");


let turnO = true;
let finish = false;

let winningPattern = [[0,1,2],[0,4,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

for(let box of boxes){
    box.addEventListener("click", ()=>{
        console.log("box clicked");
        if(box.classList.contains("active")){
            if(turnO){
            box.innerText = "X";
            turnO = false;
            }else{
                box.innerText = "O";
                turnO = true;
            }
            box.classList.remove("active");
        }
        showWinner();

        if(!finish){
            checkDrow();
        }
    })
}

function disableBoxes(){
    for(let box of boxes){
        box.classList.remove("active");
    }
}

function activeBoxes(){
    for(let box of boxes){
        box.classList.add("active");
        box.innerText = "";
    }
}

reset.addEventListener("click", ()=>{
    turnO = true;
    activeBoxes();
    winner.classList.add("hide");
    finish = false;
})

function checkDrow(){
    let cnt = 0;
    for(let box of boxes){
        if(box.innerText != ""){
            cnt++;
        }
    }
    if(cnt == 9){
        winner.innerText = "Oops!....Game is Drow";
        winner.classList.remove("hide");
        drowBackground();
        finish = true;
    }
}


function showWinner(){

    for(pattern of winningPattern){

    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if(val1 != "" && val2 != "" && val3 != ""){
        if(val1 == val2 && val2 == val3){
            console.log("Winner is : ", val1);
            winner.innerHTML = `WINNER is <b>${val1}</b>`
            winner.classList.remove("hide");
            winnerBackground();
            disableBoxes();
            finish = true;
        }
    }
    }
}

    function winnerBackground(){
        body.classList.add("green");
        winner.style.color = "black";
        setTimeout(()=>{
            body.classList.remove("green");
        }, 2000);
    }

    function drowBackground(){
        body.classList.add("red");
        setTimeout(async ()=>{
            body.classList.remove("red");
            await dogImg();
        }, 2000);
    }




    //-------------------------------------------------------------------------------------
    // This is informal code 

    let url = "https://dog.ceo/api/breeds/image/random"
    

    async function dogImg(){
        let img = document.createElement("img");
        let res = await axios.get(url);

        container.classList.add("hide");
        img.setAttribute("src", res.data.message);
        body.appendChild(img);
        img.style.height = "50%";
        img.style.width = "50%";

        setTimeout(()=>{
            body.removeChild(img);
            container.classList.remove("hide");
        },4000);
        
    }

