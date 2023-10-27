const header_profile = document.querySelector('.header__profile') 
const profile = document.querySelector('.profile')
const contextMenu = document.querySelector('.context-menu')

header_profile.addEventListener('click', dropList)
document.addEventListener('click', hideContext)

function dropList() {
	contextMenu.classList.toggle('context-menu--closed')
}
function hideContext(event) {
	if (
		!header_profile.contains(event.target)
		&&
		!contextMenu.classList.contains('context-menu--closed')
		)
	{
		contextMenu.classList.add('context-menu--closed')
	}
}
// const headerWidth = profile.offsetWidth
// header_profile.style.width = `${headerWidth}px`
// console.log(headerWidth)