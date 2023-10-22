const body = document.body
const friends = document.querySelector('.friends')
const closingX = friends.querySelector('.closing-x')
const openingButton = document.querySelector('.header__friends')

closingX.addEventListener('click', friendsClose)
openingButton.addEventListener('click', friendsOpen)

function frindsButtonShift() {
	openingButton.classList.toggle('header__friends--closed')
	document.querySelector('.header__profile').classList.toggle('.header__profile--closed')
}
function friendsClose() {
	body.style.gridTemplateColumns = '310px 1fr 0px'
	friends.classList.toggle('closed')
	console.log('closed')
	frindsButtonShift()
}
function friendsOpen() {
	if (friends.classList.contains('closed')) {
		body.style.gridTemplateColumns = '310px 1fr 310px'
	}
	friends.classList.toggle('closed')
	console.log('opened')
	frindsButtonShift()
}
