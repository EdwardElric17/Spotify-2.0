const body = document.querySelector('body')

bodySizeControl()
window.addEventListener('resize', bodySizeControl)

function bodySizeControl() {
	if (document.documentElement.clientWidth <= 1280) {
		body.classList.add('tablet')
	} else {
		body.classList.remove('tablet')
	}
}