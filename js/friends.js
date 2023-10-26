const wrapper = document.querySelector('.wrapper')
const friends = document.querySelector('.friends')
const closingX = friends.querySelector('.closing-x')
const openingButton = document.querySelector('.header__friends')
const headerProfile = document.querySelector('.header__profile')

closingX.addEventListener('click', friendsClose)
openingButton.addEventListener('click', friendsOpen)

function friendsClose() {
	wrapper.classList.toggle('wrapper--closed')
	friends.classList.toggle('friends--closed')
	frindsButtonShift()
}
function friendsOpen() {
	if (friends.classList.contains('friends--closed')) {
		wrapper.classList.toggle('wrapper--closed')
		friends.classList.toggle('friends--closed')
		frindsButtonShift()
	}
}
function frindsButtonShift() {
	openingButton.classList.toggle('header__friends--opened')
	headerProfile.classList.toggle('header__profile--opened')
}
