// Контроль ширины блоков в плеере
const outer_cells = document.querySelectorAll('.outer__cell')
const inner_cells = document.querySelectorAll('.inner__cell')

widthControl()
window.addEventListener('resize', widthControl)
function widthControl() {
	outer_cells.forEach(elem => {
		let cellHeigth = elem.offsetHeight
		console.log('height: ', cellHeigth)
		elem.style.width = `${cellHeigth}px`
	});
}



// Свечение в внутри блоков
inner_cells.forEach(cell => {

	cell.addEventListener('mousemove', e => {

		if (!cell.classList.contains('active')) {
			const rect = cell.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			
			cell.style.background = `radial-gradient(2.5rem at ${x * 100}% ${y * 100}%, rgba(59,59,59,1) 0%, rgba(41,41,41,1) 82%, rgba(36,36,36,1) 100%)`;
		}
		
	})
	// Убераем свечение при выходе из блока
	cell.addEventListener('mouseout', () => {
		if (!cell.classList.contains('active')) {
			cell.style.background = '#181818'
		}
	})

});



// Свечение снаружи блоков
outer_cells.forEach(cell => {

	document.addEventListener('mousemove', e => {
		const rect = cell.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
	
		const glowDistance = 50;
		if ( 
			( (e.clientX > rect.left - glowDistance) && (e.clientY > rect.top - glowDistance) )
			&&
			( (e.clientX < rect.right + glowDistance) && (e.clientY > rect.top - glowDistance) )
			&&
			( (e.clientY < rect.bottom + glowDistance) && (e.clientX < rect.right + glowDistance) )
			&&
			( (e.clientY < rect.bottom + glowDistance) && (e.clientX > rect.left - glowDistance) )
		)
		{	
			let minDistance = Math.min(
				Math.abs(e.clientX - rect.left),
				Math.abs(e.clientX - rect.right),
				Math.abs(e.clientY - rect.top),
				Math.abs(e.clientX - rect.bottom)
			)
			let glowValue = 1 - (minDistance / glowDistance);
	
			cell.style.background = `radial-gradient(3rem at ${x * 100}% ${y * 100}%, rgba(120,120,120, ${glowValue}), rgba(24,24,24))`;
		}
		else if (
			( (e.clientX > rect.left) && (e.clientX < rect.right) )
			&&
			( (e.clientY > rect.top) && (e.clientY < rect.bottom) )
		)
		{
			cell.style.background = `radial-gradient(3rem at ${x * 100}% ${y * 100}%, rgba(120,120,120, 1), rgba(24,24,24))`;
		}
		else {
			cell.style.background = '#181818'
		}
	})
	document.addEventListener('mouseout', e => {
		cell.style.background = '#181818'
	})

});



// Смена иконок блоков при нажатии 

// Смена лайка
const like = document.querySelector('.song__like')

like.addEventListener('click', likeChange)
function likeChange() {
	const likeImg = like.querySelector('img')
	if (likeImg.classList.contains('liked')) {
		likeImg.src = './img/player/like_empty.svg'
		likeImg.classList.remove('liked')
	} else {
		likeImg.src = './img/player/like.svg'
		likeImg.classList.add('liked')
	}
}



// Смена перемешивания
const mix = document.querySelector('.mix__song')

mix.addEventListener('click', mixChange)
function mixChange() {
	const innerMix = mix.querySelector('.inner__cell')
	if (innerMix.classList.contains('active')) {
		innerMix.style.background = '#181818'
		innerMix.classList.toggle('active')
	} else {
		innerMix.style.background = '#3b3b3b'
		innerMix.classList.toggle('active')
	}
}




// Смена повтора
const repeat = document.querySelector('.repeat__song')
const repeatOptions = ['repeat-song', 'repeat-song', 'repeat-song-1']
let repeatIndex = 0;

repeat.addEventListener('click', repeatChange)
function repeatChange() {
	const repeatImg = repeat.querySelector('img')
	repeatIndex = (repeatIndex + 1) % repeatOptions.length
    repeatImg.src = `./img/player/${repeatOptions[repeatIndex]}.svg`
	
	const innerRepeat = repeat.querySelector('.inner__cell')
	if (repeatIndex == 0) {
		innerRepeat.style.background = '#181818'
		innerRepeat.classList.remove('active')
	} else {
		innerRepeat.style.background = '#3b3b3b'
		innerRepeat.classList.add('active')
	}
}




// Смена кнопки плея
const pause = document.querySelector('.pause__song')

pause.addEventListener('click', pauseChange)
function pauseChange() {
	const pauseImg = pause.querySelector('img')
	if (!pauseImg.classList.contains('paused')) {
		pauseImg.src = './img/player/play.svg'
		pauseImg.classList.toggle('paused')
	} else {
		pauseImg.src = './img/player/pause.svg'
		pauseImg.classList.toggle('paused')
	}
}




// Смена кнопки громкости
const volumeImg = document.querySelector('.volumeImg')
const volumeWrapper = document.querySelector('.volume__line-wrapper')
const volumeLine = document.querySelector('.volume__line')
const volume_image = volumeImg.querySelector('img')
const volume_container = document.querySelector('.volume__container')

// Переменная для хранения громкости
let volumeValue = 0.5
volumeLine.style.width = `${volumeValue * 100}%`

// Параметры ширины у блоков громкости\
var volumeLine_width = volumeLine.offsetWidth
var volumeWrapper_width = volumeWrapper.offsetWidth
var volumeFullness = volumeLine_width / volumeWrapper_width
document.addEventListener('resize', () => {
	volumeLine_width = volumeLine.offsetWidth
	volumeWrapper_width = volumeWrapper.offsetWidth
	volumeFullness = volumeLine_width / volumeWrapper_width
})

// Вкл\Выкл при нажатиии на иконку громкости 
volumeImg.addEventListener('click', volumeMute) 	
function volumeMute() {
	if (volume_image.classList.contains('muted')) {
		volume_image.src = './img/player/volume.svg'
		volume_image.classList.remove('muted')
		volumeLine.style.width = `${volumeValue * 100}%`
		console.log('volumeValue: ', volumeValue)
	} else {
		volume_image.src = './img/player/mute.svg'
		volume_image.classList.add('muted')
		volumeValue = volumeLine.offsetWidth / volumeWrapper_width
		volumeLine.style.width = `0%`
	}
}

// Контроль линии громкости
function volumeChange(e) {
	const rect = volumeWrapper.getBoundingClientRect();
	let mouseX = e.clientX - rect.left + 1;
	if (mouseX <= volumeWrapper_width) {
		volumeLine.style.width = `${(mouseX / volumeWrapper_width) * 100}%`;
	}
	if (mouseX > volumeWrapper_width) {
		volumeLine.style.width = `100%`;
	}
	if (mouseX < 1) {
		volumeLine.style.width = `0%`;
		volumeValue = volumeLine.offsetWidth / volumeWrapper_width
		volume_image.src = './img/player/mute.svg'
		volume_image.classList.add('muted')
	} else {
		volume_image.src = './img/player/volume.svg'
		volume_image.classList.remove('muted')
	}
	// const rectRange = volumeLine.getBoundingClientRect();
	// audio.volume = (Math.round(((rectRange.right - rectRange.left) / 119) * 100)) / 100;
	// console.log('volume: ' + audio.volume)
}
volumeWrapper.addEventListener('mousedown', (e) => {
	const rect = volumeWrapper.getBoundingClientRect();
	let mouseX = e.clientX - rect.left + 1;
	if (mouseX <= volumeWrapper_width) {
		volumeLine.style.width = `${mouseX}px`;
	}
	if (mouseX > volumeWrapper_width) {
		volumeLine.style.width = `100%`;
	}
	if (mouseX < 1) {
		volumeLine.style.width = `0px`;
		volume_image.src = './img/player/mute.svg'
		volume_image.classList.add('muted')
	} else {
		volume_image.src = './img/player/volume.svg'
		volume_image.classList.remove('muted')
	}
	
	document.addEventListener('mousemove', volumeChange)
	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', volumeChange);
	})
	// const rectRange = volumeLine.getBoundingClientRect();
	// audio.volume = (Math.round(((rectRange.right - rectRange.left) / 119) * 100)) / 100;
	// console.log('volume: ' + audio.volume)
})



// Наведение на иконку и линию громкости при ширине экрана <=780px
const volume = document.querySelector('.volume')
var containerStatus = false
var imgStatus = false
let volumeImgTimer
let volumeLineTimer
volumeImg.addEventListener('mouseenter', imgAppear)
volume.addEventListener('mouseenter', (e) => {
    e.stopPropagation();
})
volumeLine.addEventListener('mouseenter', (e) => {
    e.stopPropagation();
})
// Наведение на иконку
function imgAppear() {
	if (document.documentElement.clientWidth <= 780) {
		imgStatus = true
		volume_container.style.opacity = '1'
		clearTimeout(volumeImgTimer)
		volume_container.addEventListener('mouseenter', containerAppear)
		volumeImg.addEventListener('mouseleave', imgDisappear)
	}
	console.log('containerStatus: ', containerStatus)
	console.log('imgStatus: ', imgStatus)
}
function imgDisappear() {
	if (document.documentElement.clientWidth <= 780) {
		imgStatus = false
		volumeImgTimer = setTimeout(() => {
			if (containerStatus == false) {
				volume_container.style.opacity = '0'
			}
		}, 1500)
	}
	console.log('containerStatus: ', containerStatus)
	console.log('imgStatus: ', imgStatus)
}
// Наведение на линию
function containerAppear() {
	containerStatus = true
	volume_container.style.opacity = '1'
	clearTimeout(volumeLineTimer)
	volume_container.addEventListener('mouseleave', containerDisappear)
	console.log('containerStatus: ', containerStatus)
	console.log('imgStatus: ', imgStatus)
}
function containerDisappear() {
	containerStatus = false
	volumeLineTimer = setTimeout(() => {
		if (containerStatus == false && imgStatus == false) {
			volume_container.style.opacity = '0'	
			volume_container.removeEventListener('mouseenter', containerAppear)
		}
	}, 1500);
	console.log('containerStatus: ', containerStatus)
	console.log('imgStatus: ', imgStatus)
}