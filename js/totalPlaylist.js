const currentPlaylist_button = document.querySelector('.current__playlist')
const totalPlaylist = document.querySelector('.totalPlaylist')
const greeting = document.querySelector('.greeting')
const mixes = document.querySelector('.mixes')

currentPlaylist_button.addEventListener('click', openPlaylist)

function openPlaylist() {
	if (!totalPlaylist.classList.contains('totalPlaylist--open')) {
		totalPlaylist.classList.add('totalPlaylist--open')
		greeting.style.display = 'none'
		mixes.style.display = 'none'
	} else {
		totalPlaylist.classList.remove('totalPlaylist--open')
		greeting.style.display = 'unset'
		mixes.style.display = 'unset'
	}
}