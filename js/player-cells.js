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