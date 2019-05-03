const domSelector = selector => document.querySelector(selector);

const domValueSelector = (node, selector) => selector.length ? node.querySelector(selector).innerText : node.innerText;

const profileScrapper = template => Object.keys(template).reduce(
	(block, blockKey) => {
		const { selector, fields } = template[blockKey];
		if(node !== null){
			const node = domSelector(selector);
			const blockFields = Object.keys(fields).reduce(
				(acc, field) => (acc[field] = domValueSelector(node, fields[field]), acc)
			, {});
			return Object.assign({}, { [blockKey]: blockFields });
		}
		return block;
	}, {});

const sendMessageToExtension = (event, message) => {
	console.log("event:", event);
	console.log("message:", message);
}

const isProfilePage = () => window.location.href.includes('https://www.linkedin.com/in/');

const scrapProfile = () => {
	if(isProfilePage()){
		console profile = profileScrapper(profileTemplateSchema);
		sendMessageToExtension("PROFILE_READ", profile);
	}
}

/*
	Add scrolling event here
*/


const onScroll = () => scrapProfile();
