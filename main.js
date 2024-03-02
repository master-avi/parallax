class Parallax {
    constructor(obj){
        this.clouds = document.querySelectorAll(obj.clouds);
        this.boat   = document.querySelector(obj.boat);
        this.bg     = document.querySelector(obj.bg);

        window.addEventListener('scroll', () => {this.moveElements() })
    }
    moveElements(){
        this.clouds.forEach(cloud => {
            let speed = cloud.getAttribute('data-speed')
            cloud.style.transform = `translateX(${window.scrollY * speed}px)`
        })
        this.boat.style.transform = `translateX(${window.scrollY * 0.7}px)`
        this.bg.style.objectPosition = `0 ${window.scrollY / 8}%`
    }
}

const parallax = new Parallax({
    clouds: '.header__cloud',
    boat: '.header__boat',
    bg: '.header__fantasy'
})

class Text {
    constructor(obj){
        this.text = document.querySelector(obj.text)
        this.fullText = this.text.innerHTML
        this.text.innerHTML = ''
        this.str()
    }
    str(x = 0){
        this.text.innerHTML += this.fullText[x]
        x++
        if(x < this.fullText.length){
            setTimeout(() => {
                this.str(x)
            },100)
        }
    }
    
}

const text = new Text({
    text: '.header__title'
})
class ParallaxMove {
    constructor (obj){
        this.moveEl = document.querySelectorAll(obj.moveEl);
        window.addEventListener('mousemove', (e) => {this.moveItems(e)})
    }
    moveItems(e){
        this.moveEl.forEach(ball => {
            let speed = ball.getAttribute('data-speed')
            const X = (window.innerWidth - e.pageX * speed) / 100
            const Y = (window.innerWidth - e.pageY * speed ) / 200

        ball.style.transform = `translate(${X}px, ${Y}px)`
        })
    }
}
const parallaxMove = new ParallaxMove({
    moveEl: '.parallax__ball'
})

class ScrollMove{
    constructor(obj){
        this.section = document.querySelector(obj.section);
        window.addEventListener('scroll', () => {
            this.fadeAnim(this.section, 2)
        })
    }
    fadeAnim(section, coordinate){
        const fadeRight = section.querySelectorAll('.fade-right');
        fadeRight.forEach(fadeRight => {
            const speed = fadeRight.getAttribute('data-speed')
            fadeRight.style.transition = speed + 'ms'
            if(window.scrollY >= (section.offsetTop - section.offsetHeight * coordinate)){
                fadeRight.classList.add('active')
            }else{
                fadeRight.classList.remove('active')
            }
        })
    }
}
const scrollMove = new ScrollMove({
    section: '.scroll'
})
const scrollMove2 = new ScrollMove({
    section: '.about'
})

class Timer{
    constructor(obj){
        this.timerNUms = document.querySelectorAll(obj.timerNUms);
        this.timerSection = document.querySelector(obj.timerSection);
        this.state = true

        window.addEventListener('scroll', () => {this.timerScroll()})
    }
    timerScroll(){
        if(this.state) {
            if(window.scrollY >= (this.timerSection.offsetTop - this.timerSection.offsetHeight * 2)){
                this.timerSet()
                this.state = false
            }
        }
    }
    timerSet(){
        this.timerNUms.forEach(num => {
            const count = +num.getAttribute('data-num')
            num.innerHTML = 0
            function timer(k = 0){
                num.innerHTML = k
                k++
                if(k <= count){
                    setTimeout(() => {
                        timer(k)
                    }, 5);
                }
            }
            timer()
        })
    }
}
const timer = new Timer({
    timerNUms: '.timer__num',
    timerSection: '.timer'
})

class Bubble {
    constructor(obj){
        this.bubbles = document.querySelectorAll(obj.bubbles);

        this.bubbles.forEach(bubble => {
            bubble.addEventListener('mousemove',(e) => this.bubbleShow(e, bubble))
        })
    }
    bubbleShow(e, bubble){
        const X = e.pageX - bubble.offsetLeft
        const Y = e.pageY - bubble.offsetTop

        let span = bubble.querySelector('span')
        span.style.left = `${X}px`
        span.style.top = `${Y}px`
    }
}
const bubbles = new Bubble({
    bubbles: '.timer__btn'
})
class Rotate3D {
    constructor(obj){
        this.cards = document.querySelectorAll(obj.cards);

        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.rotate(e, card))
            card.addEventListener('mouseout', () => this.rotateNone(card))
        })
    }
    rotate(e, card){
        const cardItem = card.querySelector('.card__item');
        const halfHeight = cardItem.offsetHeight / 2
        cardItem.style.transform = `rotateX(${(halfHeight - e.offsetY) / 5}deg) rotateY(${-(halfHeight - e.offsetX) / 5}deg)`
    }
    rotateNone(card){
        const cardItem = card.querySelector('.card__item');
        cardItem.style.transform = `rotate(0)`
    }
}
const rotate3D = new Rotate3D({
    cards: '.card'
})