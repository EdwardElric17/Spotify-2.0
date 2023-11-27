// Контроль ширины блоков в плеере
// const control_elems = document.querySelectorAll('.control__elem')

// widthControl_pf()
// window.addEventListener('resize', widthControl_pf)
// function widthControl_pf() {
// 	control_elems.forEach(elem => {
// 		let cellHeigth = elem.offsetHeight
// 		elem.style.width = `${cellHeigth}px`
// 		// console.log('cellHeigth: ', elem.offsetHeight)
// 	});
// }

// Кнопка расширения и уменьшения плеера
const reduceButton = document.querySelector('#reducePlayer')
const expandButton = document.querySelector('.expandPlayer')
const arrow_back = document.querySelector('.arrow-back')
const player_full = document.querySelector('.player__full')

expandButton.addEventListener('click', expandPlayer)
reduceButton.addEventListener('click', reducePlayer)
arrow_back.addEventListener('click', reducePlayer)

function expandPlayer() {
	console.log('dfsdf')
	player_full.classList.add('player__full--full')
}
function reducePlayer() {
	player_full.classList.remove('player__full--full')
}



// Смена кнопки плея
const play_stop_FP = document.querySelector('#pause')

play_stop_FP.addEventListener('click', changePlayStop)
function changePlayStop() {
	const pauseImg = play_stop.querySelector('img')
	if (play_stop_FP.classList.contains('stop')) {
		// Смена на расширенном плеере
		play_stop_FP.querySelector('img').src = "./img/player/pause.svg"
		play_stop_FP.classList.toggle('stop')
		// Смена на основном плеере
		pauseImg.src = './img/player/pause.svg'
		pauseImg.classList.toggle('paused')
	} else {
		// Смена на расширенном плеере
		play_stop_FP.querySelector('img').src = "./img/player/play.svg"
		play_stop_FP.classList.toggle('stop')
		// Смена на основном плеере
		pauseImg.src = './img/player/play.svg'
		pauseImg.classList.toggle('paused')
	}
}



// Смена кнопки микса 
const mixFP = document.querySelector('#mix-song')

mixFP.addEventListener('click', changeMix)
function changeMix() {
	const innerMix = mix.querySelector('.inner__cell')
	if (mixFP.classList.contains('control__elem--active')) {
		innerMix.style.background = '#181818'
		innerMix.classList.toggle('active')

		mixFP.classList.toggle('control__elem--active')
	} else {
		innerMix.style.background = '#3b3b3b'
		innerMix.classList.toggle('active')

		mixFP.classList.toggle('control__elem--active')
	}
}



// Смена кнопки повтора 
const repeatFP = document.querySelector('#repeat-song')

repeatFP.addEventListener('click', repeatFP_Change)
function repeatFP_Change() {
	const repeatImg = repeat.querySelector('img')
	const repeatImg_FP = repeatFP.querySelector('img')
	repeatIndex = (repeatIndex + 1) % repeatOptions.length
	repeatImg.src = `./img/player/${repeatOptions[repeatIndex]}.svg`
    repeatImg_FP.src = `./img/player/${repeatOptions[repeatIndex]}.svg`
	
	const innerRepeat = repeat.querySelector('.inner__cell')
	if (repeatIndex == 0) {
		innerRepeat.style.background = '#181818'
		innerRepeat.classList.remove('active')

		repeatFP.classList.remove('control__elem--active')
	} else {
		innerRepeat.style.background = '#3b3b3b'
		innerRepeat.classList.add('active')

		repeatFP.classList.add('control__elem--active')
	}
}


// Смена лайка и дизлайка
const like_FP = document.querySelector('#like-song')
const dislike_FP = document.querySelector('#dislike-song')

like_FP.addEventListener('click', likeChange_FP)
dislike_FP.addEventListener('click', dislikeChange_FP)

function likeChange_FP() {
	if (!like_FP.classList.contains('clicked')) {
		like.classList.add('clicked')
		like_FP.classList.add('clicked')
		if (dislike_FP.classList.contains('clicked')) {
			dislike.classList.remove('clicked')
			dislike_FP.classList.remove('clicked')
		}
	}
	else if (like_FP.classList.contains('clicked')) {
		like.classList.remove('clicked')
		like_FP.classList.remove('clicked')
	}
}
function dislikeChange_FP() {
	if (!dislike_FP.classList.contains('clicked')) {
		dislike.classList.add('clicked')
		dislike_FP.classList.add('clicked')
		if (like_FP.classList.contains('clicked')) {
			like.classList.remove('clicked')
			like_FP.classList.remove('clicked')
		}
	}
	else if (dislike_FP.classList.contains('clicked')) {
		dislike.classList.remove('clicked')
		dislike_FP.classList.remove('clicked')
	}
}



// Контроль линии трека

// Параметры ширины у блока прогресса
var progressLine_width = progressLine.offsetWidth
var progressLine_wrapper_width = progressLine_wrapper.offsetWidth
var progressFullness = progressLine_width / progressLine_wrapper_width

var progressLine_pf_width = progressLine_pf.offsetWidth
var progressLine_wrapper_pf_width = progressLine_wrapper_pf.offsetWidth
var progressFullness_pf = progressLine_pf_width / progressLine_wrapper_pf_width
document.addEventListener('resize', () => {
	progressLine_width = progressLine.offsetWidth
	progressLine_wrapper_width = progressLine_wrapper.offsetWidth
	progressFullness = progressLine_width / progressLine_wrapper_width

	progressLine_pf_width = progressLine_pf.offsetWidth
	progressLine_wrapper_pf_width = progressLine_wrapper_pf.offsetWidth
	progressFullness_pf = progressLine_pf_width / progressLine_wrapper_pf_width
})

function progressChange_pf(e) {
	progressLine_width = progressLine.offsetWidth
	progressLine_wrapper_width = progressLine_wrapper.offsetWidth
	progressFullness = progressLine_width / progressLine_wrapper_width
	progressLine_pf_width = progressLine_pf.offsetWidth
	progressLine_wrapper_pf_width = progressLine_wrapper_pf.offsetWidth
	progressFullness_pf = progressLine_pf_width / progressLine_wrapper_pf_width

	const rect = progressLine_wrapper_pf.getBoundingClientRect();
	let mouseX = e.clientX - rect.left + 1;

	if (mouseX <= progressLine_wrapper_pf_width) {
		progressLine_pf.style.width = `${(mouseX / progressLine_wrapper_pf_width) * 100}%`;
		progressLine.style.width = `${(progressFullness_pf * 100)}%`;
	}
	if (mouseX > progressLine_wrapper_pf_width) {
		progressLine_pf.style.width = `100%`;
		progressLine.style.width = `100%`;
	}
}
progressLine_wrapper_pf.addEventListener('mousedown', (e) => {
	progressLine_width = progressLine.offsetWidth
	progressLine_wrapper_width = progressLine_wrapper.offsetWidth
	progressFullness = progressLine_width / progressLine_wrapper_width
	progressLine_pf_width = progressLine_pf.offsetWidth
	progressLine_wrapper_pf_width = progressLine_wrapper_pf.offsetWidth
	progressFullness_pf = progressLine_pf_width / progressLine_wrapper_pf_width

	const rect = progressLine_wrapper_pf.getBoundingClientRect();
	let mouseX = e.clientX - rect.left + 1;

	if (mouseX <= progressLine_wrapper_pf_width) {
		progressLine_pf.style.width = `${mouseX}px`;
		progressLine.style.width = `${(mouseX / progressLine_wrapper_pf_width) * 100}%`;
	}
	if (mouseX > progressLine_wrapper_pf_width) {
		progressLine.style.width = `100%`;
		progressLine_pf.style.width = `100%`;
	}
	
	document.addEventListener('mousemove', progressChange_pf)
	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', progressChange_pf);
	})
})

