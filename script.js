
var vidas = 3;
var pontos = 0;
var fase = 1;
var segundaFaseConcluida = false;

// JOGADOR
var jogador = createSprite(200, 365);
jogador.setAnimation("jogador");

// CARROS
var carro1 = createSprite(50, 280);
carro1.setAnimation("carro_vermelho");
carro1.velocityX = 3;

var carro2 = createSprite(350, 210);
carro2.setAnimation("carro_azul");
carro2.velocityX = -4;

var carro3 = createSprite(80, 190);
carro3.setAnimation("carro_amarelo");
carro3.velocityX = 0;

// CAMINHÃO
var caminhao = createSprite(350, 130);
caminhao.setAnimation("caminhao");
caminhao.velocityX = 0;

// PREPARAR O JOGO
prepararFase1();

// FUNÇÃO PRINCIPAL
function draw() {
  if (fase == 1) {
    jogarFase1();
  }
  else if (fase == 2) {
    jogarFase2();
  }
}

// MOVIMENTO DO JOGADOR
function moverJogador() {
  if (keyWentDown("up")) {
    jogador.y = jogador.y - 35;
  }

  if (keyWentDown("down")) {
    jogador.y = jogador.y + 35;
  }

  if (keyWentDown("left")) {
    jogador.x = jogador.x - 35;
  }

  if (keyWentDown("right")) {
    jogador.x = jogador.x + 35;
  }

  // LIMITES DA TELA
  if (jogador.x < 20) {
    jogador.x = 20;
  }

  if (jogador.x > 380) {
    jogador.x = 380;
  }

  if (jogador.y > 380) {
    jogador.y = 380;
  }
}

// MOVIMENTAÇÃO DOS VEÍCULOS
function movimentarVeiculos() {
  if (carro1.x > 440) {
    carro1.x = -40;
  }

  if (carro1.x < -40) {
    carro1.x = 440;
  }

  if (carro2.x > 440) {
    carro2.x = -40;
  }

  if (carro2.x < -40) {
    carro2.x = 440;
  }

  if (carro3.x > 440) {
    carro3.x = -40;
  }

  if (carro3.x < -40) {
    carro3.x = 440;
  }

  if (caminhao.x > 460) {
    caminhao.x = -60;
  }

  if (caminhao.x < -60) {
    caminhao.x = 460;
  }
}

// VERIFICAR COLISÕES
function verificarColisoes() {
  if (
    jogador.isTouching(carro1) ||
    jogador.isTouching(carro2) ||
    jogador.isTouching(carro3) ||
    jogador.isTouching(caminhao)
  ) {
    perderVida();
  }
}

// PERDER VIDA
function perderVida() {
  if (vidas > 0) {
    vidas = vidas - 1;

    jogador.x = 200;
    jogador.y = 365;
  }
}

// MOSTRAR INFORMAÇÕES
function mostrarInformacoes() {
  fill("white");
  stroke("black");
  strokeWeight(3);
  textSize(15);

  text("VIDAS: " + vidas, 10, 20);
  text("PONTOS: " + pontos, 125, 20);
  text("FASE: " + fase, 315, 20);

  noStroke();
}

// PREPARAR FASE 1
function prepararFase1() {
  jogador.x = 200;
  jogador.y = 365;

  carro1.x = 50;
  carro1.y = 280;
  carro1.velocityX = 3;

  carro2.x = 350;
  carro2.y = 210;
  carro2.velocityX = -4;

  // GUARDAR NOVOS VEÍCULOS
  carro3.x = -200;
  carro3.y = -200;
  carro3.velocityX = 0;

  caminhao.x = -200;
  caminhao.y = -200;
  caminhao.velocityX = 0;
}

// JOGAR FASE 1
function jogarFase1() {
  background("green");

  moverJogador();
  movimentarVeiculos();
  verificarColisoes();

  drawSprites();
  mostrarInformacoes();

  // PASSAR PARA A FASE 2
  if (jogador.y < 50) {
    pontos = pontos + 100;
    fase = 2;
    prepararFase2();
  }
}

// PREPARAR FASE 2
function prepararFase2() {
  jogador.x = 200;
  jogador.y = 365;

  carro1.x = 30;
  carro1.y = 310;
  carro1.velocityX = 5;

  carro2.x = 350;
  carro2.y = 250;
  carro2.velocityX = -6;

  carro3.x = 70;
  carro3.y = 190;
  carro3.velocityX = 7;

  caminhao.x = 350;
  caminhao.y = 130;
  caminhao.velocityX = -4;
}

// JOGAR FASE 2
function jogarFase2() {
  background("darkgreen");

  moverJogador();
  movimentarVeiculos();
  verificarColisoes();

  drawSprites();
  mostrarInformacoes();

  // CONCLUSÃO PROVISÓRIA DA FASE 2
  if (jogador.y < 50 && segundaFaseConcluida == false) {
    pontos = pontos + 200;
    segundaFaseConcluida = true;
  }

  if (segundaFaseConcluida == true) {
    fill("yellow");
    stroke("black");
    strokeWeight(3);
    textSize(18);
    text("FASE 2 CONCLUIDA!", 90, 85);
    noStroke();
  }
}
