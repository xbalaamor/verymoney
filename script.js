const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const gameContainer = document.getElementById('gameContainer');
const loginContainer = document.getElementById('loginContainer');
const bitcoinMessage = document.getElementById('bitcoinMessage');
const bitcoinBalance = document.getElementById('bitcoinBalance');
const withdrawButton = document.getElementById('withdrawButton'); // Botão de saque

// Usuário e senha
const validUsername = 'xbala';
const validPassword = 'xereca';

let currentBitcoinBalance = 0; // Variável para armazenar o saldo de bitcoins

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        loginContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        startGame();
    } else {
        loginMessage.textContent = 'Usuário ou senha incorretos.';
    }
});

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};
let score = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Desenha a cobra
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'lightgreen' : 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
        simulateBitcoinMining(); // Simula mineração de bitcoins
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over! Pontuação: ' + score);
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Pontuação: ' + score, 10, 20);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Função para simular a mineração de bitcoins
function simulateBitcoinMining() {
    bitcoinMessage.textContent = 'Minerando bitcoins...';
    bitcoinMessage.style.visibility = 'visible';

    setTimeout(() => {
        const minedAmount = 0.00001 + (Math.random() * 0.0001); // Simula a quantidade de BTC minerada
        currentBitcoinBalance += minedAmount; // Incrementa o saldo
        bitcoinMessage.textContent = `Você minerou ${minedAmount.toFixed(8)} BTC!`;
        bitcoinBalance.textContent = `Saldo de Bitcoins: ${currentBitcoinBalance.toFixed(8)} BTC`; // Atualiza o saldo em tempo real

        setTimeout(() => {
            bitcoinMessage.style.visibility = 'hidden';
        }, 2000);
    }, 1000);
}

// Função para sacar bitcoins
function withdrawBitcoin() {
    if (currentBitcoinBalance > 0) {
        alert(`Você sacou ${currentBitcoinBalance.toFixed(8)} BTC!`);
        currentBitcoinBalance = 0; // Reseta o saldo após o saque
        bitcoinBalance.textContent = `Saldo de Bitcoins: ${currentBitcoinBalance.toFixed(8)} BTC`;
    } else {
        alert('Saldo insuficiente para saque.');
    }
}

// Vincula o evento de clique ao botão de saque
withdrawButton.addEventListener('click', withdrawBitcoin);

function startGame() {
    setInterval(drawGame, 100);
}
