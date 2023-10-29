const main = document.querySelector('.main')
const friends = document.querySelector('.friends')
const closingX = friends.querySelector('.closing-x')
const openingButton = document.querySelector('.header__friends')
const headerProfile = document.querySelector('.header__profile')

closingX.addEventListener('click', friendsClose)
openingButton.addEventListener('click', friendsOpen)
window.addEventListener('resize', autoClose)

function friendsClose() {
	main.classList.toggle('main--closed')
	friends.classList.toggle('friends--closed')
	frindsButtonShift()
}
function friendsOpen() {
	if (friends.classList.contains('friends--closed')) {
		main.classList.toggle('main--closed')
		friends.classList.toggle('friends--closed')
		frindsButtonShift()
	}
	else if (!friends.classList.contains('friends--closed')) {
		main.classList.toggle('main--closed')
		friends.classList.toggle('friends--closed')
		frindsButtonShift()
	}
}
function frindsButtonShift() {
	openingButton.classList.toggle('header__friends--opened')
	headerProfile.classList.toggle('header__profile--opened')
}

function autoClose() {
	if (
		!friends.classList.contains('friends--closed') 
		&& 
		document.documentElement.clientWidth <= 1500
		) 
	{
		friendsClose()
	}
}