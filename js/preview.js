const dropArrow = document.querySelector('.preview-dropArrow')
const preview = document.querySelector('.player__preview')
let playerHeight = document.querySelector('.player').offsetHeight
let previewHeight = preview.offsetHeight
// preview.style.bottom = `${playerHeight}px`

window.addEventListener('resize', () => {
	playerHeight = document.querySelector('.player').offsetHeight
	previewHeight = preview.offsetHeight
	// preview.style.bottom = `${playerHeight}px`
})


dropArrow.addEventListener('click', hidePreview)
function hidePreview() {
	console.log('playerHeight: ', playerHeight)
	// let windowWidth = document.documentElement.clientWidth
	if (!preview.classList.contains('player__preview--hide')) {
		// preview.style.bottom = `${-previewHeight + playerHeight}px`
		preview.classList.toggle('player__preview--hide')
		dropArrow.classList.toggle('preview-dropArrow--hide')
	} else if (preview.classList.contains('player__preview--hide')) {
		// preview.style.bottom = `${playerHeight}px`
		preview.classList.toggle('player__preview--hide')
		dropArrow.classList.toggle('preview-dropArrow--hide')
	}
}

preview.addEventListener('mouseenter', (e) => {
    e.stopPropagation();
})