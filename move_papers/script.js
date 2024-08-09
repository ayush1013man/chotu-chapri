let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener("mousemove", (e) => {
      this.handleMouseMove(e, paper);
    });

    paper.addEventListener("mousedown", (e) => {
      this.handleMouseDown(e, paper);
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Touch events
    paper.addEventListener("touchstart", (e) => {
      this.handleTouchStart(e, paper);
    });

    paper.addEventListener("touchmove", (e) => {
      this.handleTouchMove(e, paper);
    });

    window.addEventListener("touchend", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }

  handleMouseMove(e, paper) {
    if (!this.rotating) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }
    this.movePaper(paper);
  }

  handleMouseDown(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    paper.style.zIndex = highestZ;
    highestZ += 1;
    if (e.button === 0) {
      this.mouseTouchX = this.mouseX;
      this.mouseTouchY = this.mouseY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    }
    if (e.button === 2) {
      this.rotating = true;
    }
  }

  handleTouchStart(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    paper.style.zIndex = highestZ;
    highestZ += 1;
    const touch = e.touches[0];
    this.mouseTouchX = touch.clientX;
    this.mouseTouchY = touch.clientY;
    this.prevMouseX = touch.clientX;
    this.prevMouseY = touch.clientY;
  }

  handleTouchMove(e, paper) {
    const touch = e.touches[0];
    this.mouseX = touch.clientX;
    this.mouseY = touch.clientY;
    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;
    this.movePaper(paper);
  }

  movePaper(paper) {
    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
