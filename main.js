//랜덤번호지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면 맞췄습니다!
//랜덤번호가 < 유저번호 Down
//랜덤번호가 > 유저번호 Up
//Reset 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝남(더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자 입력하면 알려줌. 기회를 깎지 않는다
//유저가 이미 입력한 숫자를 또입력하면 기회를 깎지 않음
let chance = 5;
let computerNum = 0;
let gameOver = false;
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let chanceArea = document.getElementById("chance-area")
let playButton = document.getElementById("play-button")
let resetButton = document.getElementById("reset-button")
let userHistory = [];

playButton.addEventListener("click",play)
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){
    userInput.value = "";
});

function randomNum(){
    computerNum = Math.floor(Math.random()*50)+1;
    console.log("정답:",computerNum);
}



function play(){
    let userValue = userInput.value;

    
    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "1~50 사이의 숫자를 입력해주세요."
        return; // chance 안깎이고 밑에꺼 실행안시키고 그냥 종료
    }

    if(userHistory.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요."
        return;
    }
    chance --;
    
    if(userValue > computerNum){
        resultArea.textContent = "Down!!"
    } else if(userValue < computerNum){
        resultArea.textContent = "Up!!"
    } else {
        ++chance;
        resultArea.textContent = "정답!!";
        gameOver = true;
    }
    
    chanceArea.textContent = `남은 기회 : ${chance}번`

    userHistory.push(userValue);  
    console.log(userHistory);

    if(chance < 1){
        gameOver = true;
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
}


function reset(){
    userInput.value = "";
    randomNum();
    gameOver = false;
    userHistory = [];
    chance = 5;
    chanceArea.textContent = `남은 기회 : ${chance}번`

    resultArea.textContent = "게임을 시작합니다."
}

randomNum();