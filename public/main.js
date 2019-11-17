let nasaPicData
let spaceXInfoData
let nasaUrl
let i = 0
let interval = null
let interval2 = null

const main = () => {
	interval = setInterval(beginCountDown, 1000)
	interval2 = setInterval(changeI, 10000)
}

const changeI = () => {
	i += 1
	displaySpaceXData()
}
const getNasaPic = async () => {
	console.log('going out to api')
	const response = await fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
	console.log('back from api')
	console.log(response)
	nasaPicData = await response.json()
	console.log(nasaPicData)
	displayData(nasaPicData)
}

const displayData = (nasaPicData) => {
	nasaUrl = nasaPicData.url
	// console.log(nasaUrl)
	document.querySelector('.middle-section').style.backgroundImage = "url('" + nasaUrl + "')"
	document.querySelector('#copyright').textContent = 'copyright: ' + nasaPicData.copyright + ' | '
	document.querySelector('#title').textContent = ' title: ' + nasaPicData.title
}

let spaceXInfo = async () => {
	console.log('going out to spacex api')
	const response2 = await fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
	console.log('back from spacex api')
	console.log(response2)
	spaceXInfoData = await response2.json()
	console.log(spaceXInfoData)
	displaySpaceXData()
}

const displaySpaceXData = () => {
	document.querySelector('#mission').textContent = spaceXInfoData[i].mission_name
	if (spaceXInfoData[i].details === null) {
		document.querySelector('#details').textContent = 'No details yet.'
	} else {
		document.querySelector('#details').textContent = spaceXInfoData[i].details
	}
}

const beginCountDown = () => {
	const unixConversion = spaceXInfoData[i].launch_date_unix * 1000
	const now = new Date().getTime()
	const t = unixConversion - now
	const days = Math.floor(t / (1000 * 60 * 60 * 24))
	const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((t % (1000 * 60)) / 1000)
	if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
		document.querySelector('#days').textContent = 'launched.'
		document.querySelector('#hours').textContent = ''
		document.querySelector('#minutes').textContent = ''
		document.querySelector('#seconds').textContent = ''
	} else {
		document.querySelector('#days').textContent = days + ' ' + 'days,'
		document.querySelector('#hours').textContent = hours + ' hours, '
		document.querySelector('#minutes').textContent = minutes + ' minutes, '
		document.querySelector('#seconds').textContent = seconds + ' seconds'
	}

	document.querySelector('#launch-site-long').textContent = spaceXInfoData[i].launch_site.site_name_long
}

const cycleIMinus = () => {
	if (i == 0) {
		i = spaceXInfoData.length - 1
	} else {
		i -= 1
	}
	displaySpaceXData(spaceXInfoData)
}

const cycleIPlus = () => {
	if (i == spaceXInfoData.length - 1) {
		i = 0
	} else {
		i += 1
	}
	displaySpaceXData(spaceXInfoData)
}

document.addEventListener('DOMContentLoaded', getNasaPic)
document.addEventListener('DOMContentLoaded', spaceXInfo)
document.addEventListener('DOMContentLoaded', main)
document.querySelector('#left-button').addEventListener('click', cycleIMinus)
document.querySelector('#right-button').addEventListener('click', cycleIPlus)
